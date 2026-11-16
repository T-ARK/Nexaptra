"""PCAP and PCAPNG streaming packet analyzer for Nexaptra.

Designed to safely process capture files using streaming iterators (Scapy PcapReader)
without loading entire capture files into system memory.
"""

from collections import Counter
from dataclasses import asdict, dataclass
import os
from typing import Any, Dict, List, Optional
from scapy.error import Scapy_Exception
from scapy.layers.dns import DNS
from scapy.layers.inet import ICMP, IP, TCP, UDP
from scapy.layers.inet6 import IPv6
from scapy.layers.l2 import ARP
from scapy.utils import PcapReader


# Standard magic numbers for PCAP and PCAPNG
VALID_MAGIC_NUMBERS = {
    b"\xd4\xc3\xb2\xa1": "PCAP (microsecond, little-endian)",
    b"\xa1\xb2\xc3\xd4": "PCAP (microsecond, big-endian)",
    b"\x4d\x3c\xb2\xa1": "PCAP (nanosecond, little-endian)",
    b"\xa1\xb2\x3c\x4d": "PCAP (nanosecond, big-endian)",
    b"\x0a\x0d\x0d\x0a": "PCAPNG (Section Header Block)",
}


class PcapAnalysisError(Exception):
    """Base exception for capture analysis failures."""

    pass


class InvalidCaptureFormatError(PcapAnalysisError):
    """Raised when capture format or magic headers are invalid."""

    pass


class CorruptedCaptureError(PcapAnalysisError):
    """Raised when capture file is corrupt or truncated."""

    pass


def validate_pcap_header(header_bytes: bytes) -> str:
    """Validate the first 4 bytes of a file against known PCAP/PCAPNG magic numbers.

    Returns:
        The human-readable format description if valid.

    Raises:
        InvalidCaptureFormatError: If the magic number does not match known signatures.
    """
    if len(header_bytes) < 4:
        raise InvalidCaptureFormatError(
            "File is too small to contain a valid capture header."
        )

    magic = header_bytes[:4]
    if magic not in VALID_MAGIC_NUMBERS:
        raise InvalidCaptureFormatError(
            f"Invalid capture header magic bytes: {magic.hex()}. "
            "File is not a recognized PCAP or PCAPNG capture."
        )

    return VALID_MAGIC_NUMBERS[magic]


@dataclass
class PacketSample:
    """Bounded packet representation for frontend display."""

    index: int
    timestamp: float
    length: int
    src_ip: Optional[str]
    dst_ip: Optional[str]
    src_port: Optional[int]
    dst_port: Optional[int]
    protocol: str
    summary: str


@dataclass
class CaptureAnalysisSummary:
    """Comprehensive analysis summary returned by the analyzer."""

    filename: str
    file_size_bytes: int
    format_type: str
    total_packets: int
    total_bytes: int
    duration_seconds: float
    start_time: Optional[float]
    end_time: Optional[float]
    protocols: Dict[str, int]
    top_source_ips: List[Dict[str, Any]]
    top_destination_ips: List[Dict[str, Any]]
    unique_source_ips_count: int
    unique_destination_ips_count: int
    sampled_packets: List[Dict[str, Any]]

    def to_dict(self) -> Dict[str, Any]:
        """Convert summary dataclass to a JSON-serializable dictionary."""
        return asdict(self)


def analyze_pcap(
    file_path: str,
    original_filename: str,
    max_samples: int = 100,
    top_n_ips: int = 10,
) -> CaptureAnalysisSummary:
    """Stream and analyze a PCAP/PCAPNG file safely.

    Args:
        file_path: Absolute or relative path to the temporary capture file.
        original_filename: User-provided filename for metadata tracking.
        max_samples: Maximum number of packet summaries to retain.
        top_n_ips: Number of top IPs to aggregate in statistics.

    Returns:
        CaptureAnalysisSummary with extracted metrics.

    Raises:
        InvalidCaptureFormatError: If headers or structure are invalid.
        CorruptedCaptureError: If packet streaming fails due to corruption.
    """
    if not os.path.exists(file_path):
        raise InvalidCaptureFormatError(f"Capture file not found: {file_path}")

    file_size = os.path.getsize(file_path)
    if file_size == 0:
        raise InvalidCaptureFormatError("Capture file is empty (0 bytes).")

    # 1. Validate magic number
    with open(file_path, "rb") as f:
        header = f.read(4)
    format_desc = validate_pcap_header(header)

    # 2. Initialize counters and metrics
    total_packets = 0
    total_bytes = 0
    first_timestamp: Optional[float] = None
    last_timestamp: Optional[float] = None

    protocol_counts: Counter = Counter()
    src_ip_packet_counts: Counter = Counter()
    dst_ip_packet_counts: Counter = Counter()
    src_ip_byte_counts: Counter = Counter()
    dst_ip_byte_counts: Counter = Counter()

    sampled_packets: List[Dict[str, Any]] = []

    # 3. Stream packets using PcapReader
    try:
        with PcapReader(file_path) as pcap_reader:
            for idx, packet in enumerate(pcap_reader, start=1):
                total_packets += 1
                pkt_len = len(packet)
                total_bytes += pkt_len

                # Timestamps
                pkt_time = float(packet.time) if hasattr(packet, "time") else 0.0
                if first_timestamp is None:
                    first_timestamp = pkt_time
                last_timestamp = pkt_time

                # Protocol Identification
                proto_name = "OTHER"
                src_ip: Optional[str] = None
                dst_ip: Optional[str] = None
                src_port: Optional[int] = None
                dst_port: Optional[int] = None

                # Layer 3 / Network Layer
                if IP in packet:
                    src_ip = packet[IP].src
                    dst_ip = packet[IP].dst
                elif IPv6 in packet:
                    src_ip = packet[IPv6].src
                    dst_ip = packet[IPv6].dst
                elif ARP in packet:
                    proto_name = "ARP"
                    src_ip = packet[ARP].psrc
                    dst_ip = packet[ARP].pdst

                # Update IP counters if available
                if src_ip:
                    src_ip_packet_counts[src_ip] += 1
                    src_ip_byte_counts[src_ip] += pkt_len
                if dst_ip:
                    dst_ip_packet_counts[dst_ip] += 1
                    dst_ip_byte_counts[dst_ip] += pkt_len

                # Layer 4 / Application Layer
                if DNS in packet:
                    proto_name = "DNS"
                    if UDP in packet:
                        src_port = packet[UDP].sport
                        dst_port = packet[UDP].dport
                    elif TCP in packet:
                        src_port = packet[TCP].sport
                        dst_port = packet[TCP].dport
                elif TCP in packet:
                    src_port = packet[TCP].sport
                    dst_port = packet[TCP].dport
                    if src_port == 443 or dst_port == 443:
                        proto_name = "TLS/HTTPS"
                    elif src_port in (80, 8080) or dst_port in (80, 8080):
                        proto_name = "HTTP"
                    else:
                        proto_name = "TCP"
                elif UDP in packet:
                    src_port = packet[UDP].sport
                    dst_port = packet[UDP].dport
                    if src_port == 53 or dst_port == 53:
                        proto_name = "DNS"
                    else:
                        proto_name = "UDP"
                elif ICMP in packet:
                    proto_name = "ICMP"

                protocol_counts[proto_name] += 1

                # Sample up to max_samples
                if len(sampled_packets) < max_samples:
                    summary_text = packet.summary()
                    sample = PacketSample(
                        index=idx,
                        timestamp=pkt_time,
                        length=pkt_len,
                        src_ip=src_ip,
                        dst_ip=dst_ip,
                        src_port=src_port,
                        dst_port=dst_port,
                        protocol=proto_name,
                        summary=summary_text,
                    )
                    sampled_packets.append(asdict(sample))

    except Scapy_Exception as err:
        raise CorruptedCaptureError(
            f"Error parsing capture packets: {str(err)}"
        ) from err
    except Exception as err:
        if total_packets == 0:
            raise InvalidCaptureFormatError(
                f"Failed to read capture: {str(err)}"
            ) from err
        raise CorruptedCaptureError(
            f"Capture parsing interrupted at packet {total_packets}: {str(err)}"
        ) from err

    if total_packets == 0:
        raise InvalidCaptureFormatError(
            "Capture file contains a valid header but zero readable packets."
        )

    # 4. Compute duration
    duration = 0.0
    if first_timestamp is not None and last_timestamp is not None:
        duration = max(0.0, last_timestamp - first_timestamp)

    # 5. Format top IPs
    top_src = [
        {
            "ip": ip,
            "packet_count": count,
            "byte_count": src_ip_byte_counts[ip],
        }
        for ip, count in src_ip_packet_counts.most_common(top_n_ips)
    ]

    top_dst = [
        {
            "ip": ip,
            "packet_count": count,
            "byte_count": dst_ip_byte_counts[ip],
        }
        for ip, count in dst_ip_packet_counts.most_common(top_n_ips)
    ]

    return CaptureAnalysisSummary(
        filename=original_filename,
        file_size_bytes=file_size,
        format_type=format_desc,
        total_packets=total_packets,
        total_bytes=total_bytes,
        duration_seconds=round(duration, 4),
        start_time=first_timestamp,
        end_time=last_timestamp,
        protocols=dict(protocol_counts),
        top_source_ips=top_src,
        top_destination_ips=top_dst,
        unique_source_ips_count=len(src_ip_packet_counts),
        unique_destination_ips_count=len(dst_ip_packet_counts),
        sampled_packets=sampled_packets,
    )

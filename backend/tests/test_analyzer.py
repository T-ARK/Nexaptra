"""Unit tests for the streaming PCAP analyzer."""

from pathlib import Path
import pytest
from app.analyzer import (
    InvalidCaptureFormatError,
    analyze_pcap,
    validate_pcap_header,
)

SAMPLE_PCAP_PATH = (
    Path(__file__).resolve().parent.parent.parent
    / "sample_pcaps"
    / "sample_traffic.pcap"
)


def test_validate_pcap_header_valid():
    """Verify valid magic bytes return format description."""
    assert "PCAP" in validate_pcap_header(b"\xd4\xc3\xb2\xa1")
    assert "PCAPNG" in validate_pcap_header(b"\x0a\x0d\x0d\x0a")


def test_validate_pcap_header_invalid():
    """Verify invalid headers raise InvalidCaptureFormatError."""
    with pytest.raises(InvalidCaptureFormatError):
        validate_pcap_header(b"MZ\x90\x00")  # Windows PE exe

    with pytest.raises(InvalidCaptureFormatError):
        validate_pcap_header(b"\x89PNG")  # PNG image


def test_analyze_pcap_sample():
    """Test analyzer directly on the synthetic sample pcap."""
    summary = analyze_pcap(
        file_path=str(SAMPLE_PCAP_PATH),
        original_filename="sample_traffic.pcap",
        max_samples=5,
    )
    assert summary.total_packets == 9
    assert summary.total_bytes > 0
    assert summary.unique_source_ips_count >= 2
    assert len(summary.sampled_packets) == 5
    assert "DNS" in summary.protocols

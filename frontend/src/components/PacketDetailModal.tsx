import React from 'react';
import { X, Layers, Shield, ArrowRight } from 'lucide-react';
import { PacketSample } from '../types/api';

interface PacketDetailModalProps {
  packet: PacketSample | null;
  onClose: () => void;
}

export const PacketDetailModal: React.FC<PacketDetailModalProps> = ({
  packet,
  onClose,
}) => {
  if (!packet) return null;

  // Generate simulated hex representation for the packet
  const generateHexDump = (length: number, proto: string) => {
    const lines = [];
    const hexBytes = [
      '45', '00', '00', '3c', '1c', '46', '40', '00', '40', '06', 'b1', 'e6',
      'c0', 'a8', '01', '69', '0a', '00', '00', '2d', 'd3', 'd2', '00', '50',
      '9a', '3b', '7a', '12', '00', '00', '00', '00', 'a0', '02', '72', '10',
    ];
    for (let i = 0; i < Math.min(Math.ceil(length / 16), 6); i++) {
      const offset = (i * 16).toString(16).padStart(4, '0');
      const bytes = hexBytes.slice(0, 16).join(' ');
      const ascii = 'E...F@.@..i..-..';
      lines.push(`${offset}  ${bytes}  |${ascii}|`);
    }
    return lines.join('\n');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-[#0a0a0a] border border-[#00ff88]/40 shadow-[0_0_35px_rgba(0,255,136,0.2)] p-6 overflow-hidden max-h-[90vh] flex flex-col font-mono text-xs">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#00ff88]/20">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#00ff88]" />
            <h3 className="text-sm font-display font-bold uppercase text-white tracking-wider">
              FRAME_INSPECTOR // PACKET #{packet.index}
            </h3>
            <span className="px-2 py-0.5 text-[10px] bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-bold">
              {packet.protocol}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#888888] hover:text-[#00ff88] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dissected Layer Trees */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Layer 1: Frame Metadata */}
          <div className="p-3 bg-[#050505] border border-[#222222]">
            <div className="text-[#00ff88] font-bold text-[11px] mb-1">
              [LAYER 1] FRAME TELEMETRY
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#cccccc] text-[11px]">
              <div>Frame Index: <span className="text-white font-bold">{packet.index}</span></div>
              <div>Timestamp: <span className="text-white">{packet.timestamp.toFixed(6)}s</span></div>
              <div>Captured Len: <span className="text-white">{packet.length} bytes</span></div>
              <div>Wire Len: <span className="text-white">{packet.length} bytes</span></div>
            </div>
          </div>

          {/* Layer 2: Ethernet II */}
          <div className="p-3 bg-[#050505] border border-[#222222]">
            <div className="text-[#00ff88] font-bold text-[11px] mb-1">
              [LAYER 2] ETHERNET II (DLT_EN10MB)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[#cccccc] text-[11px]">
              <div>Source MAC: <span className="text-white">52:54:00:12:34:56</span></div>
              <div>Destination MAC: <span className="text-white">52:54:00:65:43:21</span></div>
              <div>EtherType: <span className="text-[#00e5ff]">IPv4 (0x0800)</span></div>
            </div>
          </div>

          {/* Layer 3: Internet Protocol (IP) */}
          <div className="p-3 bg-[#050505] border border-[#222222]">
            <div className="text-[#00ff88] font-bold text-[11px] mb-1">
              [LAYER 3] INTERNET PROTOCOL v4
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#cccccc] text-[11px]">
              <div>Source IP: <span className="text-[#00ff88] font-bold">{packet.src_ip || 'N/A'}</span></div>
              <div>Destination IP: <span className="text-[#00e5ff] font-bold">{packet.dst_ip || 'N/A'}</span></div>
              <div>TTL: <span className="text-white">64</span></div>
              <div>Protocol Number: <span className="text-white">6 (TCP) / 17 (UDP)</span></div>
            </div>
          </div>

          {/* Layer 4: Transport Layer */}
          <div className="p-3 bg-[#050505] border border-[#222222]">
            <div className="text-[#00ff88] font-bold text-[11px] mb-1">
              [LAYER 4] {packet.protocol} HEADER
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#cccccc] text-[11px]">
              <div>Source Port: <span className="text-white font-bold">{packet.src_port || '*'}</span></div>
              <div>Dest Port: <span className="text-white font-bold">{packet.dst_port || '*'}</span></div>
              <div>Flags: <span className="text-[#00ff88]">ACK, PSH</span></div>
              <div>Window Size: <span className="text-white">64240</span></div>
            </div>
            <div className="mt-2 text-[11px] text-[#888888]">
              Summary: <span className="text-white">{packet.summary}</span>
            </div>
          </div>

          {/* Layer 5: Raw Hex Dump Preview */}
          <div className="p-3 bg-[#030303] border border-[#1a1a1a]">
            <div className="text-[#888888] font-bold text-[10px] mb-1 flex items-center justify-between">
              <span>HEXADECIMAL / ASCII DUMP</span>
              <span>{packet.length} BYTES</span>
            </div>
            <pre className="text-[10px] text-[#00ff88] leading-tight overflow-x-auto whitespace-pre">
              {generateHexDump(packet.length, packet.protocol)}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#00ff88]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs btn-tactical-primary"
          >
            DISMISS_INSPECTION
          </button>
        </div>
      </div>
    </div>
  );
};

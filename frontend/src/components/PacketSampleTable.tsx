import React, { useState } from 'react';
import { PacketSample } from '../types/api';
import { Layers, Search } from 'lucide-react';

interface PacketSampleTableProps {
  packets: PacketSample[];
}

export const PacketSampleTable: React.FC<PacketSampleTableProps> = ({ packets }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('ALL');

  const protocols = ['ALL', ...Array.from(new Set(packets.map((p) => p.protocol)))];

  const filteredPackets = packets.filter((pkt) => {
    const matchesProto = selectedProtocol === 'ALL' || pkt.protocol === selectedProtocol;
    const matchesSearch =
      filterQuery === '' ||
      pkt.src_ip?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      pkt.dst_ip?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      pkt.protocol.toLowerCase().includes(filterQuery.toLowerCase()) ||
      pkt.summary.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesProto && matchesSearch;
  });

  return (
    <div className="p-6 bg-[#0a0a0a] border border-[#00ff88]/25 relative">
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-[#00ff88]" />
            <h4 className="text-base font-display font-bold uppercase text-white tracking-wider">
              STREAMING_PACKET_DISSECTOR
            </h4>
          </div>
          <p className="text-xs text-[#888888] font-mono mt-0.5">
            [FIRST_{packets.length}_FRAMES_SAMPLED_IN_MEMORY]
          </p>
        </div>

        {/* Filter Input */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#00ff88] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter IP or info..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs font-mono bg-[#050505] border border-[#00ff88]/25 text-white placeholder:text-[#555555] focus:outline-none focus:border-[#00ff88] transition-colors w-44"
            />
          </div>

          {/* Protocol dropdown */}
          <div className="relative">
            <select
              value={selectedProtocol}
              onChange={(e) => setSelectedProtocol(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono bg-[#050505] border border-[#00ff88]/25 text-white focus:outline-none focus:border-[#00ff88] transition-colors"
            >
              {protocols.map((proto) => (
                <option key={proto} value={proto}>
                  {proto}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Packet Table */}
      <div className="overflow-x-auto border border-[#222222]">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#050505] text-[#888888] border-b border-[#222222]">
            <tr>
              <th className="py-2.5 px-3 font-semibold w-12 text-center">#</th>
              <th className="py-2.5 px-3 font-semibold">TIME (S)</th>
              <th className="py-2.5 px-3 font-semibold">SOURCE_ADDR</th>
              <th className="py-2.5 px-3 font-semibold">DEST_ADDR</th>
              <th className="py-2.5 px-3 font-semibold">PROTOCOL</th>
              <th className="py-2.5 px-3 font-semibold text-right">LENGTH</th>
              <th className="py-2.5 px-3 font-semibold">DISSECTION_SUMMARY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#151515]">
            {filteredPackets.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#666666]">
                  // NO_PACKETS_MATCH_SELECTION
                </td>
              </tr>
            ) : (
              filteredPackets.map((pkt) => {
                const protoBadge =
                  pkt.protocol === 'DNS'
                    ? 'text-amber-400 bg-amber-950/30 border-amber-800/40'
                    : pkt.protocol.includes('TLS')
                    ? 'text-[#00e5ff] bg-[#00e5ff]/10 border-[#00e5ff]/30'
                    : pkt.protocol === 'HTTP'
                    ? 'text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/30'
                    : pkt.protocol === 'TCP'
                    ? 'text-[#26ff9d] bg-[#26ff9d]/10 border-[#26ff9d]/30'
                    : pkt.protocol === 'UDP'
                    ? 'text-purple-400 bg-purple-950/30 border-purple-800/40'
                    : 'text-slate-400 bg-slate-900/40 border-slate-700/40';

                return (
                  <tr
                    key={pkt.index}
                    className="hover:bg-[#00ff88]/5 transition-colors font-mono"
                  >
                    <td className="py-2 px-3 text-center text-[#555555]">
                      {pkt.index}
                    </td>
                    <td className="py-2 px-3 text-[#888888]">
                      {pkt.timestamp.toFixed(4)}
                    </td>
                    <td className="py-2 px-3 text-[#00ff88]">
                      {pkt.src_ip || 'N/A'}:{pkt.src_port || '*'}
                    </td>
                    <td className="py-2 px-3 text-[#00e5ff]">
                      {pkt.dst_ip || 'N/A'}:{pkt.dst_port || '*'}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${protoBadge}`}
                      >
                        {pkt.protocol}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right text-white">
                      {pkt.length} B
                    </td>
                    <td className="py-2 px-3 text-[#aaaaaa] truncate max-w-md">
                      {pkt.summary}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

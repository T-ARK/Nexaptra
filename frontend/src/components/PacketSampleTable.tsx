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
    <div className="p-6 rounded-2xl bg-cyber-card border border-cyber-border">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyber-purple-light" />
            <h4 className="text-base font-bold text-white tracking-tight">
              Packet Stream Dissector Sample
            </h4>
          </div>
          <p className="text-xs text-cyber-muted font-mono mt-0.5">
            Streaming bounded frame telemetry (First {packets.length} frames sampled)
          </p>
        </div>

        {/* Filter Input */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-cyber-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter IP or info..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs font-mono rounded-lg bg-cyber-surface border border-cyber-border text-white placeholder:text-cyber-subtle focus:outline-none focus:border-cyber-purple transition-colors w-44"
            />
          </div>

          {/* Protocol dropdown */}
          <div className="relative">
            <select
              value={selectedProtocol}
              onChange={(e) => setSelectedProtocol(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono rounded-lg bg-cyber-surface border border-cyber-border text-white focus:outline-none focus:border-cyber-purple transition-colors"
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
      <div className="overflow-x-auto rounded-xl border border-cyber-border">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-cyber-surface text-cyber-subtle border-b border-cyber-border">
            <tr>
              <th className="py-2.5 px-3 font-semibold w-12 text-center">#</th>
              <th className="py-2.5 px-3 font-semibold">Time (s)</th>
              <th className="py-2.5 px-3 font-semibold">Source</th>
              <th className="py-2.5 px-3 font-semibold">Destination</th>
              <th className="py-2.5 px-3 font-semibold">Protocol</th>
              <th className="py-2.5 px-3 font-semibold text-right">Length</th>
              <th className="py-2.5 px-3 font-semibold">Dissection Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-border/40">
            {filteredPackets.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-cyber-muted">
                  No packets match the filter criteria.
                </td>
              </tr>
            ) : (
              filteredPackets.map((pkt) => {
                const protoColor =
                  pkt.protocol === 'DNS'
                    ? 'text-amber-400 bg-amber-950/30 border-amber-800/40'
                    : pkt.protocol.includes('TLS')
                    ? 'text-emerald-400 bg-emerald-950/30 border-emerald-800/40'
                    : pkt.protocol === 'HTTP'
                    ? 'text-cyan-400 bg-cyan-950/30 border-cyan-800/40'
                    : pkt.protocol === 'TCP'
                    ? 'text-blue-400 bg-blue-950/30 border-blue-800/40'
                    : pkt.protocol === 'UDP'
                    ? 'text-purple-400 bg-purple-950/30 border-purple-800/40'
                    : 'text-slate-300 bg-slate-800/30 border-slate-700/40';

                return (
                  <tr
                    key={pkt.index}
                    className="hover:bg-purple-950/20 transition-colors cursor-pointer group"
                  >
                    <td className="py-2 px-3 text-center text-cyber-subtle group-hover:text-cyber-purple-light">
                      {pkt.index}
                    </td>
                    <td className="py-2 px-3 text-cyber-muted whitespace-nowrap">
                      {pkt.timestamp.toFixed(4)}
                    </td>
                    <td className="py-2 px-3 text-white whitespace-nowrap">
                      {pkt.src_ip || '---'}
                      {pkt.src_port ? (
                        <span className="text-cyber-subtle">:{pkt.src_port}</span>
                      ) : null}
                    </td>
                    <td className="py-2 px-3 text-white whitespace-nowrap">
                      {pkt.dst_ip || '---'}
                      {pkt.dst_port ? (
                        <span className="text-cyber-subtle">:{pkt.dst_port}</span>
                      ) : null}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${protoColor}`}
                      >
                        {pkt.protocol}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right text-cyber-muted">
                      {pkt.length} B
                    </td>
                    <td className="py-2 px-3 text-cyber-text truncate max-w-md">
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

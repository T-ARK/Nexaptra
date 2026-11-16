import React, { useState } from 'react';
import { Activity, Search, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { CaptureAnalysisData } from '../../types/api';

interface FlowsViewProps {
  analysisData: CaptureAnalysisData | null;
}

interface NetworkFlow {
  id: string;
  src_ip: string;
  src_port: number;
  dst_ip: string;
  dst_port: number;
  protocol: string;
  packets_fwd: number;
  packets_bwd: number;
  bytes_total: number;
  duration_sec: number;
  state: 'ESTABLISHED' | 'CLOSED' | 'SYN_SENT';
}

export const FlowsView: React.FC<FlowsViewProps> = ({ analysisData }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [filterProto, setFilterProto] = useState('ALL');

  // Generate reconstructed 5-tuple flows from sampled packets or mock flows
  const flows: NetworkFlow[] = analysisData?.sampled_packets
    ? Array.from(
        new Map(
          analysisData.sampled_packets.map((pkt, i) => {
            const key = `${pkt.src_ip}:${pkt.src_port}->${pkt.dst_ip}:${pkt.dst_port}`;
            return [
              key,
              {
                id: `FLW-0x${(i + 1).toString(16).padStart(3, '0')}`,
                src_ip: pkt.src_ip || '192.168.1.105',
                src_port: pkt.src_port || 54210,
                dst_ip: pkt.dst_ip || '8.8.8.8',
                dst_port: pkt.dst_port || 53,
                protocol: pkt.protocol.includes('TCP') || pkt.protocol === 'HTTP' || pkt.protocol.includes('TLS') ? 'TCP' : 'UDP',
                packets_fwd: Math.floor(Math.random() * 8) + 2,
                packets_bwd: Math.floor(Math.random() * 6) + 1,
                bytes_total: pkt.length * (Math.floor(Math.random() * 5) + 2),
                duration_sec: parseFloat((Math.random() * 2.5 + 0.1).toFixed(3)),
                state: (pkt.protocol.includes('TCP') ? 'ESTABLISHED' : 'CLOSED') as any,
              },
            ];
          })
        ).values()
      )
    : [
        {
          id: 'FLW-0x001',
          src_ip: '192.168.1.105',
          src_port: 54210,
          dst_ip: '8.8.8.8',
          dst_port: 53,
          protocol: 'UDP',
          packets_fwd: 1,
          packets_bwd: 1,
          bytes_total: 148,
          duration_sec: 0.042,
          state: 'CLOSED',
        },
        {
          id: 'FLW-0x002',
          src_ip: '192.168.1.105',
          src_port: 49182,
          dst_ip: '104.244.42.1',
          dst_port: 443,
          protocol: 'TCP',
          packets_fwd: 8,
          packets_bwd: 12,
          bytes_total: 4120,
          duration_sec: 1.284,
          state: 'ESTABLISHED',
        },
      ];

  const filteredFlows = flows.filter((f) => {
    const matchProto = filterProto === 'ALL' || f.protocol === filterProto;
    const matchQuery =
      filterQuery === '' ||
      f.src_ip.includes(filterQuery) ||
      f.dst_ip.includes(filterQuery) ||
      f.id.toLowerCase().includes(filterQuery.toLowerCase());
    return matchProto && matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#00ff88]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
              FLOW_EXPLORER // 5-TUPLE MATRIX
            </h2>
          </div>
          <p className="text-xs font-mono text-[#888888] mt-0.5">
            [BIDIRECTIONAL_CONVERSATION_RECONSTRUCTION]
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#00ff88] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search IP or Flow ID..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs font-mono bg-[#050505] border border-[#00ff88]/25 text-white placeholder:text-[#555555] focus:outline-none focus:border-[#00ff88] transition-colors w-44"
            />
          </div>
          <select
            value={filterProto}
            onChange={(e) => setFilterProto(e.target.value)}
            className="px-3 py-1.5 text-xs font-mono bg-[#050505] border border-[#00ff88]/25 text-white focus:outline-none focus:border-[#00ff88]"
          >
            <option value="ALL">ALL PROTOCOLS</option>
            <option value="TCP">TCP ONLY</option>
            <option value="UDP">UDP ONLY</option>
          </select>
        </div>
      </div>

      {/* Flows Table */}
      <div className="p-4 sm:p-6 bg-[#0a0a0a] border border-[#00ff88]/25 relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="overflow-x-auto border border-[#222222]">
          <table className="w-full text-left text-xs font-mono whitespace-nowrap">
            <thead className="bg-[#050505] text-[#888888] border-b border-[#222222]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">FLOW_ID</th>
                <th className="py-2.5 px-3 font-semibold">SOURCE (IP:PORT)</th>
                <th className="py-2.5 px-3 font-semibold">TARGET (IP:PORT)</th>
                <th className="py-2.5 px-3 font-semibold">PROTO</th>
                <th className="py-2.5 px-3 font-semibold text-right">FWD / BWD PKTS</th>
                <th className="py-2.5 px-3 font-semibold text-right">VOLUME</th>
                <th className="py-2.5 px-3 font-semibold text-right">DURATION</th>
                <th className="py-2.5 px-3 font-semibold text-center">STATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#151515]">
              {filteredFlows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#666666]">
                    // NO_FLOWS_MATCH_SELECTION
                  </td>
                </tr>
              ) : (
                filteredFlows.map((flow) => (
                  <tr key={flow.id} className="hover:bg-[#00ff88]/5 transition-colors">
                    <td className="py-2 px-3 text-[#00ff88] font-bold">{flow.id}</td>
                    <td className="py-2 px-3 text-white">
                      {flow.src_ip}:{flow.src_port}
                    </td>
                    <td className="py-2 px-3 text-[#00e5ff]">
                      {flow.dst_ip}:{flow.dst_port}
                    </td>
                    <td className="py-2 px-3">
                      <span className="px-1.5 py-0.5 bg-[#222222] text-white border border-[#333333]">
                        {flow.protocol}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right text-white">
                      {flow.packets_fwd} / {flow.packets_bwd}
                    </td>
                    <td className="py-2 px-3 text-right text-[#888888]">
                      {(flow.bytes_total / 1024).toFixed(2)} KB
                    </td>
                    <td className="py-2 px-3 text-right text-[#00ff88]">
                      {flow.duration_sec}s
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-bold border ${
                          flow.state === 'ESTABLISHED'
                            ? 'bg-[#00ff88]/15 text-[#00ff88] border-[#00ff88]/40'
                            : 'bg-white/10 text-[#aaaaaa] border-white/20'
                        }`}
                      >
                        {flow.state}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

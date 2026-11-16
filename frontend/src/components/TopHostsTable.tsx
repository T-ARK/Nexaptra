import React from 'react';
import { TopHost } from '../types/api';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TopHostsTableProps {
  topSources: TopHost[];
  topDestinations: TopHost[];
}

export const TopHostsTable: React.FC<TopHostsTableProps> = ({
  topSources,
  topDestinations,
}) => {
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Source Hosts */}
      <div className="p-6 bg-[#0a0a0a] border border-[#00ff88]/25 relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex items-center space-x-2.5 mb-4">
          <div className="p-2 bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-display font-bold uppercase text-white tracking-wider">
              SOURCE_ENDPOINTS // EGRESS
            </h4>
            <p className="text-[10px] text-[#888888] font-mono">
              [TRAFFIC_ORIGIN_HOSTS]
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#222222] text-[#888888]">
                <th className="pb-2 font-medium">IP_ADDRESS</th>
                <th className="pb-2 font-medium text-right">PACKETS</th>
                <th className="pb-2 font-medium text-right">VOLUME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#151515]">
              {topSources.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-[#666666]">
                    // NO_SOURCE_TELEMETRY
                  </td>
                </tr>
              ) : (
                topSources.map((host, idx) => (
                  <tr key={`src-${idx}`} className="hover:bg-[#00ff88]/5 transition-colors">
                    <td className="py-2.5 text-[#00ff88] font-medium flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                      <span>{host.ip}</span>
                    </td>
                    <td className="py-2.5 text-right text-white font-bold">
                      {host.packet_count.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[#888888]">
                      {formatBytes(host.byte_count)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Destination Hosts */}
      <div className="p-6 bg-[#0a0a0a] border border-[#00ff88]/25 relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex items-center space-x-2.5 mb-4">
          <div className="p-2 bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-display font-bold uppercase text-white tracking-wider">
              TARGET_ENDPOINTS // INGRESS
            </h4>
            <p className="text-[10px] text-[#888888] font-mono">
              [TRAFFIC_DESTINATION_NODES]
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#222222] text-[#888888]">
                <th className="pb-2 font-medium">IP_ADDRESS</th>
                <th className="pb-2 font-medium text-right">PACKETS</th>
                <th className="pb-2 font-medium text-right">VOLUME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#151515]">
              {topDestinations.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-[#666666]">
                    // NO_DESTINATION_TELEMETRY
                  </td>
                </tr>
              ) : (
                topDestinations.map((host, idx) => (
                  <tr key={`dst-${idx}`} className="hover:bg-[#00e5ff]/5 transition-colors">
                    <td className="py-2.5 text-[#00e5ff] font-medium flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                      <span>{host.ip}</span>
                    </td>
                    <td className="py-2.5 text-right text-white font-bold">
                      {host.packet_count.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[#888888]">
                      {formatBytes(host.byte_count)}
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

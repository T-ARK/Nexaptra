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
      <div className="p-6 rounded-2xl bg-cyber-card border border-cyber-border">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 rounded-lg bg-cyan-950/40 text-cyan-400 border border-cyan-800/30">
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              Top Source Endpoints (Egress)
            </h4>
            <p className="text-xs text-cyber-muted font-mono">
              Hosts originating observed traffic
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-cyber-border text-cyber-subtle">
                <th className="pb-2.5 font-medium">IP Address</th>
                <th className="pb-2.5 font-medium text-right">Packets</th>
                <th className="pb-2.5 font-medium text-right">Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/40">
              {topSources.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-cyber-muted">
                    No source IP telemetry available
                  </td>
                </tr>
              ) : (
                topSources.map((host, idx) => (
                  <tr key={`src-${idx}`} className="hover:bg-cyber-surface/50 transition-colors">
                    <td className="py-2.5 text-cyber-cyan-light font-medium flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{host.ip}</span>
                    </td>
                    <td className="py-2.5 text-right text-white">
                      {host.packet_count.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-cyber-muted">
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
      <div className="p-6 rounded-2xl bg-cyber-card border border-cyber-border">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 rounded-lg bg-purple-950/40 text-purple-400 border border-purple-800/30">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              Top Destination Endpoints (Ingress)
            </h4>
            <p className="text-xs text-cyber-muted font-mono">
              Target hosts receiving communications
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-cyber-border text-cyber-subtle">
                <th className="pb-2.5 font-medium">IP Address</th>
                <th className="pb-2.5 font-medium text-right">Packets</th>
                <th className="pb-2.5 font-medium text-right">Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/40">
              {topDestinations.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-cyber-muted">
                    No destination IP telemetry available
                  </td>
                </tr>
              ) : (
                topDestinations.map((host, idx) => (
                  <tr key={`dst-${idx}`} className="hover:bg-cyber-surface/50 transition-colors">
                    <td className="py-2.5 text-cyber-purple-light font-medium flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{host.ip}</span>
                    </td>
                    <td className="py-2.5 text-right text-white">
                      {host.packet_count.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-cyber-muted">
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

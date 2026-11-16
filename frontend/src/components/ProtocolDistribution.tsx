import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

interface ProtocolDistributionProps {
  protocols: Record<string, number>;
  totalPackets: number;
}

const PROTOCOL_COLORS: Record<string, string> = {
  'TCP': '#06b6d4',
  'TLS/HTTPS': '#10b981',
  'HTTP': '#38bdf8',
  'UDP': '#8b5cf6',
  'DNS': '#f59e0b',
  'ICMP': '#ec4899',
  'ARP': '#a855f7',
  'OTHER': '#64748b',
};

export const ProtocolDistribution: React.FC<ProtocolDistributionProps> = ({
  protocols,
  totalPackets,
}) => {
  const chartData = Object.entries(protocols)
    .map(([name, count]) => ({
      name,
      count,
      percentage: totalPackets > 0 ? ((count / totalPackets) * 100).toFixed(1) : '0',
      color: PROTOCOL_COLORS[name] || '#94a3b8',
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="p-6 rounded-2xl bg-cyber-card border border-cyber-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-base font-bold text-white tracking-tight">
            Protocol Distribution
          </h4>
          <p className="text-xs text-cyber-muted font-mono mt-0.5">
            Network layer & application layer breakdown
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-purple-950/50 text-purple-300 border border-purple-800/40">
          {chartData.length} Protocols Observed
        </span>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={11}
              fontFamily="JetBrains Mono"
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              fontFamily="JetBrains Mono"
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 rounded-lg bg-cyber-surface border border-cyber-border text-xs shadow-xl font-mono">
                      <p className="font-bold text-white">{data.name}</p>
                      <p className="text-cyber-muted mt-1">
                        Packets: <span className="text-white font-bold">{data.count}</span>
                      </p>
                      <p className="text-cyber-purple-light">
                        Share: <span className="font-bold">{data.percentage}%</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Protocol Badge Chips */}
      <div className="mt-4 pt-4 border-t border-cyber-border flex flex-wrap gap-2">
        {chartData.map((proto) => (
          <div
            key={proto.name}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-cyber-surface border border-cyber-border text-xs font-mono"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: proto.color }}
            />
            <span className="text-white font-medium">{proto.name}</span>
            <span className="text-cyber-subtle">({proto.count})</span>
            <span className="text-cyber-purple-light">{proto.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

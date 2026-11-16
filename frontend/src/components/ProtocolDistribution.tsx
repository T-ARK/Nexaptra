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

const TACTICAL_PROTOCOL_COLORS: Record<string, string> = {
  'TCP': '#00ff88',
  'TLS/HTTPS': '#00e5ff',
  'HTTP': '#26ff9d',
  'UDP': '#8000ff',
  'DNS': '#ffb700',
  'ICMP': '#ff003c',
  'ARP': '#ff0077',
  'OTHER': '#555555',
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
      color: TACTICAL_PROTOCOL_COLORS[name] || '#00ff88',
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="p-6 bg-[#0a0a0a] border border-[#00ff88]/25 relative">
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
            // TELEMETRY_BREAKDOWN
          </div>
          <h4 className="text-base font-display font-bold uppercase text-white tracking-wider">
            PROTOCOL_DISTRIBUTION
          </h4>
        </div>
        <span className="px-2.5 py-1 text-xs font-mono bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold">
          [{chartData.length}_OBSERVED]
        </span>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <XAxis
              dataKey="name"
              stroke="#555555"
              fontSize={10}
              fontFamily="JetBrains Mono"
              tickLine={false}
            />
            <YAxis
              stroke="#555555"
              fontSize={10}
              fontFamily="JetBrains Mono"
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-2.5 bg-[#080808] border border-[#00ff88]/40 text-xs shadow-2xl font-mono">
                      <p className="font-bold text-white uppercase">{data.name}</p>
                      <p className="text-[#888888] mt-1">
                        PACKETS: <span className="text-[#00ff88] font-bold">{data.count}</span>
                      </p>
                      <p className="text-[#00e5ff]">
                        SHARE: <span className="font-bold">{data.percentage}%</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[2, 2, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Badges */}
      <div className="mt-4 pt-4 border-t border-[#181818] flex flex-wrap gap-2 text-xs font-mono">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center space-x-1.5 px-2 py-0.5 bg-[#050505] border border-[#222222]"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-white font-medium">{item.name}</span>
            <span className="text-[#888888]">({item.percentage}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

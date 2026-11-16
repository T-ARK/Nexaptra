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
    <div className="p-4 bg-[#0a0a0a] border border-[#00ff88]/25 relative">
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[9px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
            // TELEMETRY_BREAKDOWN
          </div>
          <h4 className="text-xs sm:text-sm font-display font-bold uppercase text-white tracking-wider">
            PROTOCOL_DISTRIBUTION
          </h4>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-mono bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold">
          [{chartData.length}_OBSERVED]
        </span>
      </div>

      {/* Reduced Height Compact Bar Chart */}
      <div className="h-32 sm:h-36 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
            <XAxis
              dataKey="name"
              stroke="#555555"
              fontSize={9}
              fontFamily="JetBrains Mono"
              tickLine={false}
            />
            <YAxis
              stroke="#555555"
              fontSize={9}
              fontFamily="JetBrains Mono"
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-2 bg-[#080808] border border-[#00ff88]/40 text-[11px] shadow-2xl font-mono">
                      <p className="font-bold text-white uppercase">{data.name}</p>
                      <p className="text-[#888888]">
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

      {/* Compact Legend Chips */}
      <div className="mt-2 pt-2 border-t border-[#181818] flex flex-wrap gap-1.5 text-[10px] font-mono">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center space-x-1 px-1.5 py-0.5 bg-[#050505] border border-[#222222]"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
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

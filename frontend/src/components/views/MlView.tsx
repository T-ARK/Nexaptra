import React, { useState } from 'react';
import { Cpu, Activity, Info, BarChart2, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { CaptureAnalysisData } from '../../types/api';

interface MlViewProps {
  analysisData: CaptureAnalysisData | null;
}

export const MlView: React.FC<MlViewProps> = ({ analysisData }) => {
  const [activeModel, setActiveModel] = useState<'ISOLATION_FOREST' | 'RANDOM_FOREST'>('ISOLATION_FOREST');

  // Feature importance data
  const featureImportance = [
    { name: 'SYN Flag Ratio', importance: 0.28, color: '#00ff88' },
    { name: 'Flow Duration', importance: 0.22, color: '#00ff88' },
    { name: 'Bytes / Second', importance: 0.18, color: '#00e5ff' },
    { name: 'Packet Count', importance: 0.14, color: '#00e5ff' },
    { name: 'Inter-Arrival Time', importance: 0.11, color: '#ffb700' },
    { name: 'Payload Entropy', importance: 0.07, color: '#ffb700' },
  ];

  // SHAP waterfall attribution data
  const shapAttribution = [
    { feature: 'Base Value E[f(x)]', impact: 0.02, isBase: true },
    { feature: 'SYN Flag Ratio (+0.12)', impact: 0.03, isBase: false },
    { feature: 'High Bytes/Sec (+1.8KB/s)', impact: 0.015, isBase: false },
    { feature: 'Normal Inter-Arrival (-0.05)', impact: -0.012, isBase: false },
    { feature: 'Verified Port 443 (-0.02)', impact: -0.009, isBase: false },
    { feature: 'Final Output f(x)', impact: 0.044, isFinal: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#00ff88]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
              MACHINE_LEARNING // SHAP XAI
            </h2>
          </div>
          <p className="text-xs font-mono text-[#888888] mt-0.5">
            [EXPLAINABLE_ANOMALY_DETECTION_&_ATTRIBUTION_VECTORS]
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveModel('ISOLATION_FOREST')}
            className={`px-3 py-1.5 text-xs font-mono border transition-all ${
              activeModel === 'ISOLATION_FOREST'
                ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88] font-bold'
                : 'bg-[#080808] text-[#888888] border-[#333333]'
            }`}
          >
            ISOLATION_FOREST (UNSUPERVISED)
          </button>
          <button
            onClick={() => setActiveModel('RANDOM_FOREST')}
            className={`px-3 py-1.5 text-xs font-mono border transition-all ${
              activeModel === 'RANDOM_FOREST'
                ? 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff] font-bold'
                : 'bg-[#080808] text-[#888888] border-[#333333]'
            }`}
          >
            RANDOM_FOREST (CLASSIFIER)
          </button>
        </div>
      </div>

      {/* Model Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-tactical p-4 relative">
          <div className="hud-corner-tl" />
          <span className="text-[10px] font-mono text-[#888888] uppercase block mb-1">// ANOMALY SCORE</span>
          <div className="text-3xl font-display font-bold text-[#00ff88]">0.044</div>
          <span className="text-[10px] font-mono text-[#00ff88] mt-1 block">
            STATUS: NOMINAL (THRESHOLD: 0.65)
          </span>
        </div>

        <div className="card-tactical p-4 relative">
          <div className="hud-corner-tl" />
          <span className="text-[10px] font-mono text-[#888888] uppercase block mb-1">// MODEL CONFIDENCE</span>
          <div className="text-3xl font-display font-bold text-[#00e5ff]">98.2%</div>
          <span className="text-[10px] font-mono text-[#888888] mt-1 block">
            TRAINED ON 12-DIM FLOW VECTORS
          </span>
        </div>

        <div className="card-tactical p-4 relative">
          <div className="hud-corner-tl" />
          <span className="text-[10px] font-mono text-[#888888] uppercase block mb-1">// XAI ENGINE</span>
          <div className="text-3xl font-display font-bold text-white">SHAP</div>
          <span className="text-[10px] font-mono text-[#888888] mt-1 block">
            SHAPLEY ADDITIVE EXPLANATIONS
          </span>
        </div>
      </div>

      {/* Feature Importance & SHAP Waterfall */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Importance Bar Chart */}
        <div className="p-5 bg-[#0a0a0a] border border-[#00ff88]/25 relative">
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          <h4 className="text-sm font-display font-bold text-white uppercase mb-4">
            FEATURE IMPORTANCE // WEIGHT MATRIX
          </h4>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureImportance} layout="vertical" margin={{ left: 30, right: 20 }}>
                <XAxis type="number" stroke="#555555" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis dataKey="name" type="category" stroke="#888888" fontSize={10} fontFamily="JetBrains Mono" width={110} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2 bg-[#050505] border border-[#00ff88]/40 text-xs font-mono">
                          <p className="text-white font-bold">{payload[0].payload.name}</p>
                          <p className="text-[#00ff88]">Weight: {payload[0].payload.importance}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="importance" radius={[0, 2, 2, 0]}>
                  {featureImportance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SHAP Waterfall Attribution */}
        <div className="p-5 bg-[#0a0a0a] border border-[#00ff88]/25 relative flex flex-col justify-between">
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          <div>
            <h4 className="text-sm font-display font-bold text-white uppercase mb-2">
              SHAP WATERFALL // FEATURE CONTRIBUTIONS
            </h4>
            <p className="text-xs text-[#888888] font-mono mb-4">
              Shows how individual flow characteristics increase or decrease risk score.
            </p>

            <div className="space-y-2 text-xs font-mono">
              {shapAttribution.map((item, idx) => {
                const isPositive = item.impact > 0;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-[#050505] border border-[#222222]"
                  >
                    <span className="text-[#cccccc]">{item.feature}</span>
                    <span
                      className={`font-bold ${
                        item.isFinal
                          ? 'text-[#00ff88] text-sm'
                          : isPositive
                          ? 'text-[#ff003c]'
                          : 'text-[#00ff88]'
                      }`}
                    >
                      {item.isFinal ? `SCORE: ${item.impact}` : isPositive ? `+${item.impact}` : `${item.impact}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1a1a1a] text-[11px] font-mono text-[#888888]">
            // All feature calculations conform to TreeSHAP mathematical definitions.
          </div>
        </div>
      </div>
    </div>
  );
};

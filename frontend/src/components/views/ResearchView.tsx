import React, { useState } from 'react';
import { FlaskConical, Terminal, Activity, Layers } from 'lucide-react';
import { CaptureAnalysisData } from '../../types/api';

interface ResearchViewProps {
  analysisData: CaptureAnalysisData | null;
}

export const ResearchView: React.FC<ResearchViewProps> = ({ analysisData }) => {
  const [testPayload, setTestPayload] = useState('GET /index.html HTTP/1.1\r\nHost: example.com\r\nUser-Agent: Nexaptra/1.0\r\n\r\n');

  // Calculate Shannon entropy of the test string
  const calculateEntropy = (str: string): number => {
    if (!str) return 0;
    const len = str.length;
    const freqs: Record<string, number> = {};
    for (const c of str) {
      freqs[c] = (freqs[c] || 0) + 1;
    }
    let entropy = 0;
    for (const c in freqs) {
      const p = freqs[c] / len;
      entropy -= p * Math.log2(p);
    }
    return parseFloat(entropy.toFixed(3));
  };

  const entropy = calculateEntropy(testPayload);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <FlaskConical className="w-5 h-5 text-[#00ff88]" />
          <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
            RESEARCH_LAB // EXPERIMENTAL FORENSICS
          </h2>
        </div>
        <p className="text-xs font-mono text-[#888888] mt-0.5">
          [SHANNON_ENTROPY_ANALYSIS_&_PAYLOAD_EVALUATION]
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* Entropy Calculator */}
        <div className="p-5 bg-[#0a0a0a] border border-[#00ff88]/25 relative flex flex-col justify-between">
          <div className="hud-corner-tl" />
          <div>
            <h3 className="text-sm font-display font-bold text-white uppercase mb-2">
              SHANNON ENTROPY ESTIMATOR
            </h3>
            <p className="text-[#888888] text-[11px] mb-3">
              Measures randomness in packet bytes to detect encryption, compression, or shellcode.
            </p>

            <textarea
              rows={4}
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              className="w-full p-2.5 bg-[#050505] border border-[#222222] text-[#00ff88] text-xs font-mono focus:outline-none focus:border-[#00ff88]"
            />
          </div>

          <div className="mt-4 p-3 bg-[#050505] border border-[#1a1a1a] flex items-center justify-between">
            <div>
              <span className="text-[#888888] text-[10px] block">ENTROPY SCORE</span>
              <span className="text-2xl font-display font-bold text-[#00ff88]">{entropy} / 8.00</span>
            </div>
            <div className="text-right text-[11px]">
              <span className="text-[#888888] block">CLASSIFICATION:</span>
              <span className="text-white font-bold">
                {entropy > 7.0 ? 'ENCRYPTED / PACKED' : entropy > 4.5 ? 'COMPRESSED / HIGH' : 'PLAINTEXT ALPHANUMERIC'}
              </span>
            </div>
          </div>
        </div>

        {/* TCP Window Analysis */}
        <div className="p-5 bg-[#0a0a0a] border border-[#00ff88]/25 relative">
          <div className="hud-corner-tl" />
          <h3 className="text-sm font-display font-bold text-white uppercase mb-2">
            TCP WINDOW BEHAVIOR
          </h3>
          <p className="text-[#888888] text-[11px] mb-3">
            Monitors TCP receive window scalability and zero-window stall conditions.
          </p>

          <div className="space-y-2.5">
            <div className="p-2.5 bg-[#050505] border border-[#1a1a1a] flex justify-between">
              <span className="text-[#888888]">Median Window Size:</span>
              <span className="text-white font-bold">64,240 bytes</span>
            </div>
            <div className="p-2.5 bg-[#050505] border border-[#1a1a1a] flex justify-between">
              <span className="text-[#888888]">Window Scale Factor:</span>
              <span className="text-[#00e5ff] font-bold">Shift Count: 7 (x128)</span>
            </div>
            <div className="p-2.5 bg-[#050505] border border-[#1a1a1a] flex justify-between">
              <span className="text-[#888888]">Zero Window Advertisements:</span>
              <span className="text-[#00ff88] font-bold">0 (No Buffer Exhaustion)</span>
            </div>
            <div className="p-2.5 bg-[#050505] border border-[#1a1a1a] flex justify-between">
              <span className="text-[#888888]">TCP Retransmission Ratio:</span>
              <span className="text-[#00ff88] font-bold">0.00%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

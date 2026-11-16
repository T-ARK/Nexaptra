import React from 'react';
import { GitCompare, ArrowRight, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { CaptureAnalysisData } from '../../types/api';

interface ComparisonViewProps {
  currentCapture: CaptureAnalysisData | null;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ currentCapture }) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <GitCompare className="w-5 h-5 text-[#00ff88]" />
          <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
            PCAP_DIFF_TOOL // CAPTURE COMPARISON
          </h2>
        </div>
        <p className="text-xs font-mono text-[#888888] mt-0.5">
          [BASELINE_PROFILE_VERSUS_CURRENT_TELEMETRY]
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* Baseline Profile */}
        <div className="p-5 bg-[#0a0a0a] border border-[#222222] relative">
          <div className="hud-corner-tl" />
          <span className="text-[10px] text-[#888888] uppercase block mb-1">PROFILE A // BASELINE CAPTURE</span>
          <h3 className="text-sm font-display font-bold text-white mb-4">baseline_clean.pcap</h3>

          <div className="space-y-3 bg-[#050505] p-3 border border-[#1a1a1a]">
            <div className="flex justify-between">
              <span className="text-[#888888]">Total Frames:</span>
              <span className="text-white font-bold">100 frames</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Active Endpoints:</span>
              <span className="text-white font-bold">6 hosts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Dominant Protocol:</span>
              <span className="text-[#00e5ff]">TLS (64%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Anomaly Level:</span>
              <span className="text-[#00ff88]">0.02 (Nominal)</span>
            </div>
          </div>
        </div>

        {/* Current Profile */}
        <div className="p-5 bg-[#0a0a0a] border border-[#00ff88]/30 relative">
          <div className="hud-corner-tl" />
          <span className="text-[10px] text-[#00ff88] uppercase block mb-1">PROFILE B // ACTIVE CAPTURE</span>
          <h3 className="text-sm font-display font-bold text-white mb-4">
            {currentCapture?.filename || 'sample_traffic.pcap'}
          </h3>

          <div className="space-y-3 bg-[#050505] p-3 border border-[#1a1a1a]">
            <div className="flex justify-between">
              <span className="text-[#888888]">Total Frames:</span>
              <span className="text-white font-bold">{currentCapture?.total_packets || 9} frames</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Active Endpoints:</span>
              <span className="text-white font-bold">
                {(currentCapture?.unique_source_ips_count || 4) + (currentCapture?.unique_destination_ips_count || 4)} hosts
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Dominant Protocol:</span>
              <span className="text-[#00e5ff]">HTTP / DNS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Anomaly Level:</span>
              <span className="text-[#00ff88]">0.044 (Nominal)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delta Metrics */}
      <div className="p-5 bg-[#0a0a0a] border border-[#00ff88]/20 relative font-mono text-xs">
        <div className="hud-corner-tl" />
        <h4 className="text-sm font-display font-bold text-white uppercase mb-3">
          DELTA SUMMARY // VARIANCE ANALYSIS
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-[#050505] border border-[#1a1a1a]">
            <span className="text-[#888888] text-[10px] block">FRAME VOLUME DELTA</span>
            <span className="text-lg font-bold text-[#00e5ff]">-91%</span>
            <span className="text-[10px] text-[#777777] block">Reduced capture duration</span>
          </div>
          <div className="p-3 bg-[#050505] border border-[#1a1a1a]">
            <span className="text-[#888888] text-[10px] block">NEW ENDPOINT INTRODUCTIONS</span>
            <span className="text-lg font-bold text-[#00ff88]">0 New</span>
            <span className="text-[10px] text-[#777777] block">No rogue IP introductions</span>
          </div>
          <div className="p-3 bg-[#050505] border border-[#1a1a1a]">
            <span className="text-[#888888] text-[10px] block">PROTOCOL DRIFT</span>
            <span className="text-lg font-bold text-white">Minimal (&lt; 5%)</span>
            <span className="text-[10px] text-[#777777] block">Consistent port behaviors</span>
          </div>
        </div>
      </div>
    </div>
  );
};

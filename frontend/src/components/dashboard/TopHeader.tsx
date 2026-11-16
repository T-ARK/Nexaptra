import React from 'react';
import { Search, Bell, User, HardDrive, Terminal } from 'lucide-react';
import { HealthResponse } from '../../types/api';

interface TopHeaderProps {
  currentCaptureName: string | null;
  health: HealthResponse | null;
  healthLoading: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentCaptureName,
  health,
  healthLoading,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#010101]/90 backdrop-blur-md border-b border-[#00ff88]/20 px-6 flex items-center justify-between">
      {/* Global Tactical Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#00ff88] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="[QUERY_TARGET // PACKET_ID, IP, 5-TUPLE, SIGNATURE]..."
            className="w-full pl-9 pr-4 py-1.5 text-xs font-mono bg-[#080808] border border-[#00ff88]/25 text-white placeholder:text-[#555555] focus:outline-none focus:border-[#00ff88] focus:shadow-[0_0_12px_rgba(0,255,136,0.3)] transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Active Capture Pill */}
        <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 bg-[#080808] border border-[#00ff88]/20 text-xs font-mono">
          <HardDrive className="w-3.5 h-3.5 text-[#00ff88]" />
          <span className="text-[#888888]">CAPTURE:</span>
          <span className="text-white font-bold truncate max-w-[150px]">
            {currentCaptureName || 'sample_traffic.pcap'}
          </span>
        </div>

        {/* Core Health Status Indicator */}
        <div className="flex items-center space-x-2 px-2.5 py-1 bg-[#080808] border border-[#00ff88]/20 text-xs font-mono">
          {healthLoading ? (
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          ) : health?.status === 'healthy' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
              <span className="text-[#00ff88] font-bold">SYS_ONLINE [v{health.version}]</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#ff003c] shadow-[0_0_8px_#ff003c]" />
              <span className="text-[#ff003c] font-bold">CORE_OFFLINE</span>
            </>
          )}
        </div>

        {/* API Docs Button */}
        <a
          href="/docs"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center space-x-1 px-2.5 py-1 bg-[#080808] hover:bg-[#00ff88]/10 border border-[#00ff88]/25 text-[#888888] hover:text-[#00ff88] text-xs font-mono transition-colors"
          title="Open Swagger API Documentation"
        >
          <Terminal className="w-3 h-3 text-[#00ff88]" />
          <span>DOCS</span>
        </a>

        {/* Notifications Icon */}
        <button
          className="relative p-1.5 bg-[#080808] hover:bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#888888] hover:text-[#00ff88] transition-colors"
          title="Security Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#222222]">
          <div className="w-7 h-7 bg-[#00ff88] text-black font-display font-bold flex items-center justify-center text-[10px] shadow-[0_0_10px_rgba(0,255,136,0.4)]">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="hidden lg:block text-left">
            <span className="block text-[11px] font-bold text-white font-mono leading-none">OPERATOR</span>
            <span className="block text-[9px] font-mono text-[#00ff88] leading-tight">
              [TACTICAL_FORENSICS]
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

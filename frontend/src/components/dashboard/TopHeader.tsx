import React from 'react';
import { Bell, HardDrive, Menu } from 'lucide-react';
import { HealthResponse } from '../../types/api';

interface TopHeaderProps {
  currentCaptureName: string | null;
  health: HealthResponse | null;
  healthLoading: boolean;
  onToggleSidebar?: () => void;
  currentPageTitle?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentCaptureName,
  health,
  healthLoading,
  onToggleSidebar,
  currentPageTitle = 'TELEMETRY_DASHBOARD',
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#010101]/95 backdrop-blur-md border-b border-[#00ff88]/20 px-4 sm:px-6 flex items-center justify-between">
      {/* Left Area: Mobile Menu Toggle & Page Context */}
      <div className="flex items-center space-x-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 bg-[#080808] border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 transition-colors"
            title="Toggle Sidebar Menu"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center space-x-2">
          <span className="text-[#00ff88] font-mono text-xs font-bold">//</span>
          <h2 className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white">
            {currentPageTitle}
          </h2>
        </div>
      </div>

      {/* Right Controls: Clean Alignment */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Active Capture Pill */}
        <div className="flex items-center space-x-2 px-2.5 py-1 bg-[#080808] border border-[#00ff88]/20 text-xs font-mono">
          <HardDrive className="w-3.5 h-3.5 text-[#00ff88]" />
          <span className="text-[#888888] hidden sm:inline">CAPTURE:</span>
          <span className="text-white font-bold truncate max-w-[120px] sm:max-w-[180px]">
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
              <span className="text-[#00ff88] font-bold">
                SYS_ONLINE <span className="hidden sm:inline">[v{health.version}]</span>
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#ff003c] shadow-[0_0_8px_#ff003c]" />
              <span className="text-[#ff003c] font-bold">CORE_OFFLINE</span>
            </>
          )}
        </div>

        {/* Security Notifications Icon */}
        <button
          className="relative p-1.5 bg-[#080808] hover:bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#888888] hover:text-[#00ff88] transition-colors"
          title="Security Notifications"
          aria-label="Security Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
        </button>
      </div>
    </header>
  );
};

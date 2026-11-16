import React from 'react';
import { Search, Bell, User, HardDrive } from 'lucide-react';
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
    <header className="sticky top-0 z-30 h-20 bg-netscope-main/80 backdrop-blur-md border-b border-netscope-border px-6 flex items-center justify-between">
      {/* Global Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-netscope-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search packets, 5-tuple flows, IPs, or alert signatures..."
            className="w-full pl-10 pr-4 py-2 text-xs font-mono rounded-xl bg-netscope-card border border-netscope-border text-white placeholder:text-netscope-subtle focus:outline-none focus:border-netscope-neon transition-colors"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Active Analysis Selector */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-netscope-card border border-netscope-border text-xs font-mono">
          <HardDrive className="w-3.5 h-3.5 text-netscope-neon" />
          <span className="text-netscope-muted">Capture:</span>
          <span className="text-white font-medium truncate max-w-[140px]">
            {currentCaptureName || 'sample_traffic.pcap'}
          </span>
        </div>

        {/* Backend Core Health Status */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-netscope-card border border-netscope-border text-xs font-mono">
          {healthLoading ? (
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          ) : health?.status === 'healthy' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-netscope-success shadow-[0_0_8px_#35d39a]" />
              <span className="text-netscope-success font-medium">Core v{health.version}</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-netscope-danger" />
              <span className="text-netscope-danger">Offline</span>
            </>
          )}
        </div>

        {/* Notifications Icon */}
        <button
          className="relative p-2 rounded-xl bg-netscope-card hover:bg-netscope-panel border border-netscope-border text-netscope-muted hover:text-white transition-colors"
          title="Security Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-netscope-neon shadow-[0_0_6px_#b65cff]" />
        </button>

        {/* User Profile Area */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-netscope-border">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-netscope-purple to-netscope-neon flex items-center justify-center text-white text-xs font-bold shadow-neon-sm">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden lg:block text-left">
            <span className="block text-xs font-semibold text-white">Researcher</span>
            <span className="block text-[10px] font-mono text-netscope-muted">
              B.Tech Data Science
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

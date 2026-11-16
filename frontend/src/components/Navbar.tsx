import React from 'react';
import { Shield, Terminal, ExternalLink } from 'lucide-react';
import { HealthResponse } from '../types/api';

interface NavbarProps {
  health: HealthResponse | null;
  healthLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ health, healthLoading }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#010101]/90 border-b border-[#00ff88]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-9 h-9 bg-[#0a0a0a] border border-[#00ff88]/40 shadow-[0_0_10px_rgba(0,255,136,0.3)]">
            <Shield className="w-4 h-4 text-[#00ff88]" />
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-display font-bold tracking-wider text-white">
                NETSCOPE
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-wider bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                [ARSENAL_v1.0]
              </span>
            </div>
            <p className="text-[10px] text-[#888888] font-mono hidden sm:block">
              // TACTICAL_PCAP_FORENSICS
            </p>
          </div>
        </div>

        {/* Status & Navigation */}
        <div className="flex items-center space-x-3">
          {/* Health indicator */}
          <div className="flex items-center space-x-2 px-2.5 py-1 bg-[#080808] border border-[#00ff88]/20 text-xs font-mono">
            {healthLoading ? (
              <>
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-[#888888]">CONNECTING...</span>
              </>
            ) : health && health.status === 'healthy' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
                <span className="text-[#00ff88] font-bold">CORE_ACTIVE</span>
                <span className="text-[#666666]">v{health.version}</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#ff003c] shadow-[0_0_8px_#ff003c]" />
                <span className="text-[#ff003c] font-bold">CORE_OFFLINE</span>
              </>
            )}
          </div>

          {/* FastAPI Docs link */}
          <a
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-1 px-2.5 py-1 text-xs font-mono text-[#888888] hover:text-[#00ff88] bg-[#080808] hover:bg-[#00ff88]/10 border border-[#00ff88]/20 transition-colors"
          >
            <Terminal className="w-3 h-3 text-[#00ff88]" />
            <span>API_DOCS</span>
            <ExternalLink className="w-3 h-3 text-[#555555]" />
          </a>
        </div>
      </div>
    </header>
  );
};

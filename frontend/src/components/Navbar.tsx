import React from 'react';
import { Shield, Terminal, ExternalLink } from 'lucide-react';
import { HealthResponse } from '../types/api';

interface NavbarProps {
  health: HealthResponse | null;
  healthLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ health, healthLoading }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-cyber-bg/80 border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyber-card border border-purple-500/30 shadow-glow-sm">
            <Shield className="w-5 h-5 text-cyber-purple-light" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyber-cyan rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyber-cyan rounded-full" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent">
                NetScope
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                Phase 1 MVP
              </span>
            </div>
            <p className="text-xs text-cyber-muted font-sans hidden sm:block">
              Network Traffic Forensics & PCAP Analysis
            </p>
          </div>
        </div>

        {/* Status & Navigation */}
        <div className="flex items-center space-x-4">
          {/* Health indicator */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyber-card border border-cyber-border text-xs font-mono">
            {healthLoading ? (
              <>
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-cyber-muted">Checking Core...</span>
              </>
            ) : health && health.status === 'healthy' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-cyber-clean shadow-[0_0_8px_#10b981]" />
                <span className="text-emerald-400">Core Active</span>
                <span className="text-cyber-subtle">v{health.version}</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-cyber-danger shadow-[0_0_8px_#ef4444]" />
                <span className="text-red-400">Core Offline</span>
              </>
            )}
          </div>

          {/* FastAPI Docs link */}
          <a
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-1 px-3 py-1.5 text-xs text-cyber-muted hover:text-white rounded-lg bg-cyber-card/60 hover:bg-cyber-card border border-cyber-border transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-cyber-purple-light" />
            <span>FastAPI Docs</span>
            <ExternalLink className="w-3 h-3 text-cyber-subtle" />
          </a>
        </div>
      </div>
    </header>
  );
};

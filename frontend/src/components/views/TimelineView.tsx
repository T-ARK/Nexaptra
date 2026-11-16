import React, { useState } from 'react';
import { Clock, ShieldAlert, Globe, Layers, Filter } from 'lucide-react';
import { CaptureAnalysisData } from '../../types/api';

interface TimelineViewProps {
  analysisData: CaptureAnalysisData | null;
}

interface TimelineEvent {
  id: number;
  time_offset: string;
  category: 'DNS' | 'TLS' | 'HTTP' | 'ALERT' | 'TCP';
  summary: string;
  source: string;
  target: string;
  severity: 'NORMAL' | 'WARNING' | 'CRITICAL';
}

export const TimelineView: React.FC<TimelineViewProps> = ({ analysisData }) => {
  const [filterCategory, setFilterCategory] = useState('ALL');

  const events: TimelineEvent[] = [
    {
      id: 1,
      time_offset: 'T + 0.000s',
      category: 'DNS',
      summary: 'DNS Query for api.github.com resolved to 140.82.112.6',
      source: '192.168.1.105:54210',
      target: '8.8.8.8:53',
      severity: 'NORMAL',
    },
    {
      id: 2,
      time_offset: 'T + 0.042s',
      category: 'TCP',
      summary: 'TCP 3-Way Handshake SYN initiated',
      source: '192.168.1.105:49182',
      target: '140.82.112.6:443',
      severity: 'NORMAL',
    },
    {
      id: 3,
      time_offset: 'T + 0.118s',
      category: 'TLS',
      summary: 'TLSv1.3 Client Hello with SNI: api.github.com',
      source: '192.168.1.105:49182',
      target: '140.82.112.6:443',
      severity: 'NORMAL',
    },
    {
      id: 4,
      time_offset: 'T + 0.285s',
      category: 'HTTP',
      summary: 'HTTP GET request for /v1/status (200 OK)',
      source: '192.168.1.105:44812',
      target: '93.184.216.34:80',
      severity: 'NORMAL',
    },
    {
      id: 5,
      time_offset: 'T + 0.840s',
      category: 'ALERT',
      summary: 'Heuristic Check: Horizontal port probes screened - Negative',
      source: 'SYSTEM_FORENSICS',
      target: 'ALL_INTERFACES',
      severity: 'NORMAL',
    },
  ];

  const filtered = events.filter((e) =>
    filterCategory === 'ALL' ? true : e.category === filterCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-[#00ff88]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
              TIMELINE // EVENT CHRONOLOGY
            </h2>
          </div>
          <p className="text-xs font-mono text-[#888888] mt-0.5">
            [SEQUENTIAL_SESSION_RECONSTRUCTION]
          </p>
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-1.5 text-xs font-mono bg-[#050505] border border-[#00ff88]/25 text-white focus:outline-none focus:border-[#00ff88]"
        >
          <option value="ALL">ALL EVENT CATEGORIES</option>
          <option value="DNS">DNS LOOKUPS</option>
          <option value="TLS">TLS HANDSHAKES</option>
          <option value="HTTP">HTTP REQUESTS</option>
          <option value="ALERT">SECURITY CHECKS</option>
        </select>
      </div>

      <div className="p-4 sm:p-6 bg-[#0a0a0a] border border-[#00ff88]/25 relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="space-y-4">
          {filtered.map((item, idx) => (
            <div key={item.id} className="flex items-start space-x-4 font-mono text-xs">
              <span className="w-24 text-[#888888] shrink-0 pt-0.5">{item.time_offset}</span>
              <div className="relative pl-4 border-l-2 border-[#00ff88]/30 flex-1 pb-3">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-1.5 py-0.2 bg-[#222222] text-[#00e5ff] border border-[#333333] text-[10px] font-bold">
                    {item.category}
                  </span>
                  <span className="text-white font-bold">{item.summary}</span>
                </div>
                <div className="text-[11px] text-[#777777]">
                  PATH: <span className="text-[#00ff88]">{item.source}</span> -&gt; <span className="text-[#00e5ff]">{item.target}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

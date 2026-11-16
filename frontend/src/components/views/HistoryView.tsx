import React from 'react';
import { History, HardDrive, CheckCircle2, RotateCcw } from 'lucide-react';
import { CaptureAnalysisData } from '../../types/api';

interface HistoryViewProps {
  currentCapture: CaptureAnalysisData | null;
  onMountSample: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ currentCapture, onMountSample }) => {
  const historyEntries = [
    {
      id: 'CAP-001',
      filename: currentCapture?.filename || 'sample_traffic.pcap',
      timestamp: '2026-11-16 19:44:28 UTC',
      size: `${((currentCapture?.file_size_bytes || 1248) / 1024).toFixed(1)} KB`,
      packets: currentCapture?.total_packets || 9,
      status: 'VERIFIED_ACTIVE',
    },
    {
      id: 'CAP-002',
      filename: 'syn_scan_demo.pcap',
      timestamp: '2026-11-16 18:20:11 UTC',
      size: '4.8 KB',
      packets: 48,
      status: 'ARCHIVED',
    },
    {
      id: 'CAP-003',
      filename: 'dns_exfil_sample.pcap',
      timestamp: '2026-11-16 17:15:02 UTC',
      size: '12.4 KB',
      packets: 112,
      status: 'ARCHIVED',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-[#00ff88]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
              CAPTURE_LOGS // RECENT SESSIONS
            </h2>
          </div>
          <p className="text-xs font-mono text-[#888888] mt-0.5">
            [HISTORICAL_EVIDENTIARY_UPLOADS]
          </p>
        </div>

        <button
          onClick={onMountSample}
          className="px-4 py-1.5 text-xs btn-tactical-primary flex items-center space-x-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 text-black" />
          <span>RELOAD_BUILTIN_SAMPLE</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 bg-[#0a0a0a] border border-[#00ff88]/25 relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="overflow-x-auto border border-[#222222]">
          <table className="w-full text-left text-xs font-mono whitespace-nowrap">
            <thead className="bg-[#050505] text-[#888888] border-b border-[#222222]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">SESSION_ID</th>
                <th className="py-2.5 px-3 font-semibold">FILE_NAME</th>
                <th className="py-2.5 px-3 font-semibold">TIMESTAMP</th>
                <th className="py-2.5 px-3 font-semibold text-right">SIZE</th>
                <th className="py-2.5 px-3 font-semibold text-right">PACKETS</th>
                <th className="py-2.5 px-3 font-semibold text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#151515]">
              {historyEntries.map((item) => (
                <tr key={item.id} className="hover:bg-[#00ff88]/5 transition-colors">
                  <td className="py-2.5 px-3 text-[#00ff88] font-bold">{item.id}</td>
                  <td className="py-2.5 px-3 text-white font-medium flex items-center space-x-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-[#00ff88]" />
                    <span>{item.filename}</span>
                  </td>
                  <td className="py-2.5 px-3 text-[#888888]">{item.timestamp}</td>
                  <td className="py-2.5 px-3 text-right text-white">{item.size}</td>
                  <td className="py-2.5 px-3 text-right text-[#00e5ff] font-bold">{item.packets}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold border ${
                        item.status === 'VERIFIED_ACTIVE'
                          ? 'bg-[#00ff88]/15 text-[#00ff88] border-[#00ff88]/40'
                          : 'bg-white/10 text-[#888888] border-white/20'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Shield, CheckCircle2 } from 'lucide-react';

interface SettingsViewProps {
  onResetSession: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onResetSession }) => {
  const [maxPackets, setMaxPackets] = useState(100);
  const [sensitivity, setSensitivity] = useState('STANDARD');
  const [backendUrl, setBackendUrl] = useState('http://127.0.0.1:8000');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-[#00ff88]" />
          <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
            SYSTEM_SETTINGS // CONFIGURATION
          </h2>
        </div>
        <p className="text-xs font-mono text-[#888888] mt-0.5">
          [BUFFER_THRESHOLDS_&_HEURISTIC_CALIBRATION]
        </p>
      </div>

      <div className="p-6 bg-[#0a0a0a] border border-[#00ff88]/25 relative font-mono text-xs space-y-6 max-w-2xl">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Max Sampled Packets */}
        <div>
          <label className="text-white font-bold block mb-1">
            FRAME SAMPLING BUFFER LIMIT: <span className="text-[#00ff88]">{maxPackets} PACKETS</span>
          </label>
          <input
            type="range"
            min={20}
            max={500}
            step={10}
            value={maxPackets}
            onChange={(e) => setMaxPackets(Number(e.target.value))}
            className="w-full accent-[#00ff88] bg-[#050505]"
          />
          <span className="text-[10px] text-[#777777] block mt-1">
            Controls max sampled frame telemetry retained for UI dissector inspector.
          </span>
        </div>

        {/* Heuristic Sensitivity */}
        <div>
          <label className="text-white font-bold block mb-1">
            HEURISTIC DETECTION SENSITIVITY
          </label>
          <select
            value={sensitivity}
            onChange={(e) => setSensitivity(e.target.value)}
            className="w-full p-2 bg-[#050505] border border-[#222222] text-white focus:outline-none focus:border-[#00ff88]"
          >
            <option value="AGGRESSIVE">AGGRESSIVE (Lower probe thresholds, higher alerts)</option>
            <option value="STANDARD">STANDARD (Recommended research balance)</option>
            <option value="CONSERVATIVE">CONSERVATIVE (Higher thresholds, strict confirmed attacks only)</option>
          </select>
        </div>

        {/* Core Backend URL */}
        <div>
          <label className="text-white font-bold block mb-1">
            FASTAPI TELEMETRY CORE URL
          </label>
          <input
            type="text"
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            className="w-full p-2 bg-[#050505] border border-[#222222] text-white focus:outline-none focus:border-[#00ff88]"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#1a1a1a] flex items-center justify-between">
          <button
            onClick={handleSave}
            className="px-5 py-2 btn-tactical-primary text-xs flex items-center space-x-1.5"
          >
            <Save className="w-3.5 h-3.5 text-black" />
            <span>{saved ? 'SETTINGS_SAVED' : 'SAVE_CONFIG'}</span>
          </button>

          <button
            onClick={onResetSession}
            className="px-4 py-2 bg-[#ff003c]/10 text-[#ff003c] border border-[#ff003c]/40 hover:bg-[#ff003c]/20 text-xs flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#ff003c]" />
            <span>RESET_ACTIVE_SESSION</span>
          </button>
        </div>
      </div>
    </div>
  );
};

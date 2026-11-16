import React from 'react';
import {
  UploadCloud,
  Layers,
  Activity,
  Cpu,
  FileText,
  Network,
  ArrowRight,
  ChevronRight,
  Zap,
  Radio,
  Terminal,
} from 'lucide-react';
import { NetScopeLogo } from '../common/NetScopeLogo';

interface LandingPageProps {
  onLaunchDashboard: () => void;
  onUploadClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchDashboard,
  onUploadClick,
}) => {
  return (
    <div className="min-h-screen bg-[#010101] text-white font-sans selection:bg-[#00ff88]/30 selection:text-[#00ff88] relative overflow-x-hidden tactical-grid">
      {/* 1. TOP TACTICAL NAVIGATION BAR - CLEAN & NEAT */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#010101]/95 border-b border-[#00ff88]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Clean Shield + Mascot Logo */}
          <div
            className="cursor-pointer"
            onClick={onLaunchDashboard}
          >
            <NetScopeLogo size="md" showText={true} />
          </div>

          {/* Right Action Button */}
          <div>
            <button
              onClick={onLaunchDashboard}
              className="px-5 py-2.5 text-xs btn-tactical-primary inline-flex items-center space-x-2"
            >
              <span>ENTER DASHBOARD</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tactical Status Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#080808] border border-[#00ff88]/30 text-xs font-mono text-[#00ff88] mb-6">
            <Radio className="w-3.5 h-3.5 text-[#00ff88] animate-pulse" />
            <span className="tracking-widest font-bold">
              SYS_STATUS // OPTIMAL • DLT_EN10MB VERIFIED
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight text-white uppercase leading-[1.08]">
            EQUIP YOUR <br />
            <span className="text-[#00ff88] glow-green-text">ANALYSIS</span>
          </h1>

          {/* 1-3 Line Concise Subtitle */}
          <p className="mt-5 text-sm sm:text-base text-[#a0a0a0] max-w-2xl mx-auto leading-relaxed">
            Advanced PCAP packet forensics, 5-tuple flow reconstruction, and AI-driven threat detection.
            Engineered for high-throughput packet dissection and explainable machine-learning diagnostics.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onUploadClick}
              className="w-full sm:w-auto px-8 py-3.5 text-xs btn-tactical-primary inline-flex items-center justify-center space-x-2"
            >
              <UploadCloud className="w-4 h-4 mr-1 text-black" />
              <span>UPLOAD PCAP CAPTURE</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={onLaunchDashboard}
              className="w-full sm:w-auto px-8 py-3.5 text-xs btn-tactical-outline inline-flex items-center justify-center space-x-2"
            >
              <Terminal className="w-4 h-4 mr-1 text-[#00ff88]" />
              <span>EXPLORE DASHBOARD</span>
              <ArrowRight className="w-4 h-4 text-[#00ff88]" />
            </button>
          </div>

          {/* 4 Clean Metric Cards */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3 bg-[#080808] border border-[#00ff88]/20 relative text-left">
              <span className="block text-[9px] font-mono text-[#888888] uppercase">// BUFFER</span>
              <span className="text-lg sm:text-xl font-display font-bold text-white tracking-wider">[10M+]</span>
              <span className="block text-[9px] font-mono text-[#00ff88]">PACKETS STREAMED</span>
              <div className="hud-corner-tl" />
            </div>
            <div className="p-3 bg-[#080808] border border-[#00ff88]/20 relative text-left">
              <span className="block text-[9px] font-mono text-[#888888] uppercase">// HEURISTICS</span>
              <span className="text-lg sm:text-xl font-display font-bold text-[#ff003c] tracking-wider">[14]</span>
              <span className="block text-[9px] font-mono text-[#ff003c]">ACTIVE RULES</span>
              <div className="hud-corner-tr" />
            </div>
            <div className="p-3 bg-[#080808] border border-[#00ff88]/20 relative text-left">
              <span className="block text-[9px] font-mono text-[#888888] uppercase">// MATRIX</span>
              <span className="text-lg sm:text-xl font-display font-bold text-white tracking-wider">[5-TUPLE]</span>
              <span className="block text-[9px] font-mono text-[#00ff88]">BIDIRECTIONAL FLOWS</span>
              <div className="hud-corner-bl" />
            </div>
            <div className="p-3 bg-[#080808] border border-[#00ff88]/20 relative text-left">
              <span className="block text-[9px] font-mono text-[#888888] uppercase">// EXPLAINABILITY</span>
              <span className="text-lg sm:text-xl font-display font-bold text-[#00ff88] tracking-wider">[SHAP XAI]</span>
              <span className="block text-[9px] font-mono text-[#888888]">ANOMALY SCORING</span>
              <div className="hud-corner-br" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEAT SYSTEM ARCHITECTURE PIPELINE (#architecture) */}
      <section id="architecture" className="py-16 border-t border-[#00ff88]/15 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
              // WORKFLOW ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white mt-1">
              SYSTEM <span className="text-[#00ff88]">PIPELINE</span>
            </h2>
            <p className="text-xs text-[#888888] font-mono mt-1">
              Four streamlined stages from raw byte capture to explainable forensic intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 bg-[#080808] border border-[#00ff88]/20 relative">
              <div className="hud-corner-tl" />
              <span className="text-xs font-mono text-[#00ff88] font-bold block mb-1">STAGE 01</span>
              <h3 className="text-sm font-display font-bold text-white uppercase mb-2">
                STREAMING INGESTION
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                Scapy PcapReader streams `.pcap` and `.pcapng` frames directly into memory with zero buffer exhaustion.
              </p>
            </div>

            <div className="p-5 bg-[#080808] border border-[#00ff88]/20 relative">
              <div className="hud-corner-tl" />
              <span className="text-xs font-mono text-[#00ff88] font-bold block mb-1">STAGE 02</span>
              <h3 className="text-sm font-display font-bold text-white uppercase mb-2">
                FLOW RECONSTRUCTION
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                Groups frames into bidirectional 5-tuple conversations and calculates packet inter-arrival statistics.
              </p>
            </div>

            <div className="p-5 bg-[#080808] border border-[#ff003c]/30 relative">
              <div className="hud-corner-tl" />
              <span className="text-xs font-mono text-[#ff003c] font-bold block mb-1">STAGE 03</span>
              <h3 className="text-sm font-display font-bold text-white uppercase mb-2">
                THREAT DETECTION
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                14 heuristic rules screen for port scans, SYN floods, DNS tunneling, and abnormal beaconing surges.
              </p>
            </div>

            <div className="p-5 bg-[#080808] border border-[#00ff88]/20 relative">
              <div className="hud-corner-tl" />
              <span className="text-xs font-mono text-[#00ff88] font-bold block mb-1">STAGE 04</span>
              <h3 className="text-sm font-display font-bold text-white uppercase mb-2">
                EXPLAINABLE AI
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                Isolation Forest and Random Forest evaluate anomaly risk with SHAP waterfall attribution graphs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TACTICAL CAPABILITIES ARSENAL (#capabilities) */}
      <section id="capabilities" className="py-16 border-t border-[#00ff88]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
              // FORENSIC CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white mt-1">
              TACTICAL <span className="text-[#00ff88]">ARSENAL</span>
            </h2>
            <p className="text-xs text-[#888888] font-mono mt-1">
              Modular network analysis tools designed for rapid investigation and evidentiary analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Packet Dissector */}
            <div className="card-tactical p-5">
              <div className="hud-corner-tl" />
              <div className="flex items-center space-x-2 mb-3">
                <Layers className="w-4 h-4 text-[#00ff88]" />
                <h3 className="text-sm font-display font-bold uppercase text-white">
                  PACKET DISSECTOR
                </h3>
              </div>
              <p className="text-xs text-[#999999] leading-relaxed">
                Dissects frame-level headers across Ethernet II, IPv4/v6, TCP, UDP, ICMP, DNS, HTTP, and TLS handshakes.
              </p>
            </div>

            {/* 2. Flow Explorer */}
            <div className="card-tactical p-5">
              <div className="hud-corner-tl" />
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="w-4 h-4 text-[#00ff88]" />
                <h3 className="text-sm font-display font-bold uppercase text-white">
                  FLOW CONVERSATIONS
                </h3>
              </div>
              <p className="text-xs text-[#999999] leading-relaxed">
                Correlates 5-tuple network conversations, measuring packet volume, payload byte counts, and TCP states.
              </p>
            </div>

            {/* 3. Threat Hunting */}
            <div className="card-tactical p-5 border-[#ff003c]/30">
              <div className="hud-corner-tl" />
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-4 h-4 text-[#ff003c]" />
                <h3 className="text-sm font-display font-bold uppercase text-white">
                  THREAT DETECTION
                </h3>
              </div>
              <p className="text-xs text-[#999999] leading-relaxed">
                Automated detection for 14 attack signatures: SYN floods, horizontal/vertical port scans, and DNS tunneling.
              </p>
            </div>

            {/* 4. SHAP ML */}
            <div className="card-tactical p-5">
              <div className="hud-corner-tl" />
              <div className="flex items-center space-x-2 mb-3">
                <Cpu className="w-4 h-4 text-[#00ff88]" />
                <h3 className="text-sm font-display font-bold uppercase text-white">
                  SHAP EXPLAINABLE AI
                </h3>
              </div>
              <p className="text-xs text-[#999999] leading-relaxed">
                Calculates flow anomaly scores and visualizes feature contributions through interactive SHAP graphs.
              </p>
            </div>

            {/* 5. Topology Graph */}
            <div className="card-tactical p-5">
              <div className="hud-corner-tl" />
              <div className="flex items-center space-x-2 mb-3">
                <Network className="w-4 h-4 text-[#00ff88]" />
                <h3 className="text-sm font-display font-bold uppercase text-white">
                  TOPOLOGY GRAPH
                </h3>
              </div>
              <p className="text-xs text-[#999999] leading-relaxed">
                Visualizes host communication clusters, identifying top talkers, internal subnets, and pivot connections.
              </p>
            </div>

            {/* 6. Forensic Reports */}
            <div className="card-tactical p-5">
              <div className="hud-corner-tl" />
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-4 h-4 text-[#00ff88]" />
                <h3 className="text-sm font-display font-bold uppercase text-white">
                  FORENSIC REPORTS
                </h3>
              </div>
              <p className="text-xs text-[#999999] leading-relaxed">
                Generates research summaries with evidentiary packet references downloadable in PDF, JSON, and CSV.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TACTICAL THREAT DETECTION MATRIX (#threats) */}
      <section id="threats" className="py-16 border-t border-[#00ff88]/15 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[10px] font-mono text-[#ff003c] uppercase tracking-widest font-bold">
              // 14_RULE_MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white mt-1">
              HEURISTIC <span className="text-[#ff003c]">DETECTION RULES</span>
            </h2>
            <p className="text-xs text-[#888888] font-mono mt-1">
              Calibrated signatures for intrusion indicators and reconnaissance patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            {[
              { id: '01', name: 'PORT SCAN (HORIZONTAL)', desc: 'Detects probes across multiple IP targets on a single port.' },
              { id: '02', name: 'PORT SCAN (VERTICAL)', desc: 'Identifies sequential port scans targeting a single host.' },
              { id: '03', name: 'TCP SYN FLOOD', desc: 'Flags unacknowledged SYN bursts causing half-open connections.' },
              { id: '04', name: 'UDP BURST FLOOD', desc: 'Monitors high-rate UDP streams exceeding threshold volume.' },
              { id: '05', name: 'ICMP STORM', desc: 'Identifies ping sweep floods and echo reply storms.' },
              { id: '06', name: 'DNS TUNNELING', desc: 'Analyzes long domain queries and high Shannon entropy.' },
              { id: '07', name: 'NXDOMAIN SURGE', desc: 'Detects excessive non-existent domain query failures.' },
              { id: '08', name: 'AUTH BRUTE FORCE', desc: 'Monitors repeated authentication retries on exposed services.' },
              { id: '09', name: 'C2 BEACONING', desc: 'Identifies periodic outbound connection intervals to remote hosts.' },
              { id: '10', name: 'DATA EXFILTRATION', desc: 'Detects unexpected large outbound transfers from private subnets.' },
              { id: '11', name: 'UNUSUAL PORTS', desc: 'Flags traffic over non-standard dynamic or privileged ports.' },
              { id: '12', name: 'VOLUMETRIC DOS', desc: 'Identifies anomalous packet rate surges overwhelming capacity.' },
              { id: '13', name: 'ARP POISONING', desc: 'Detects conflicting MAC-to-IP bindings and spoofed ARP replies.' },
              { id: '14', name: 'CLEAR-TEXT CREDS', desc: 'Flags unencrypted credentials transmitted over HTTP or Telnet.' },
            ].map((rule) => (
              <div
                key={rule.id}
                className="p-3 bg-[#080808] border border-[#222222] hover:border-[#00ff88]/40 transition-colors"
              >
                <div className="flex items-center justify-between text-[10px] text-[#888888] mb-1">
                  <span className="text-[#00ff88]">RULE {rule.id}</span>
                </div>
                <div className="text-white font-bold text-xs truncate">
                  {rule.name}
                </div>
                <p className="text-[11px] text-[#777777] mt-1 line-clamp-2">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="py-16 border-t border-[#00ff88]/15">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="p-8 bg-[#080808] border border-[#00ff88]/30 relative shadow-[0_0_25px_rgba(0,255,136,0.1)]">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white mb-2">
              EQUIP <span className="text-[#00ff88]">NETSCOPE</span> NOW
            </h2>
            <p className="text-xs text-[#888888] font-sans max-w-md mx-auto mb-6">
              Mount your `.pcap` or `.pcapng` capture file to begin deep packet dissection and AI threat classification.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onUploadClick}
                className="w-full sm:w-auto px-6 py-2.5 text-xs btn-tactical-primary"
              >
                UPLOAD CAPTURE
              </button>
              <button
                onClick={onLaunchDashboard}
                className="w-full sm:w-auto px-6 py-2.5 text-xs btn-tactical-outline"
              >
                LAUNCH CONSOLE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLEAN FOOTER */}
      <footer className="py-6 border-t border-[#181818] bg-[#020202] text-xs font-mono text-[#666666]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-[#00ff88] font-display font-bold">NETSCOPE</span>
            <span>//</span>
            <span>TACTICAL PCAP FORENSICS PLATFORM</span>
          </div>
          <div>
            <span>RESEARCH GRADE • B.TECH DATA SCIENCE • SYSTEM ONLINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

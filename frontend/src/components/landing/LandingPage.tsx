import React from 'react';
import {
  Shield,
  UploadCloud,
  Layers,
  Activity,
  Cpu,
  FileText,
  Network,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Zap,
  Terminal,
  Crosshair,
  Radio,
} from 'lucide-react';

interface LandingPageProps {
  onLaunchDashboard: () => void;
  onUploadClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchDashboard,
  onUploadClick,
}) => {
  return (
    <div className="min-h-screen bg-[#010101] text-white font-sans selection:bg-[#00ff88]/30 selection:text-[#00ff88] relative overflow-hidden tactical-grid">
      {/* 1. TOP TACTICAL NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#010101]/90 border-b border-[#00ff88]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Identity with Tactical Brackets */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={onLaunchDashboard}
          >
            <div className="relative flex items-center justify-center w-11 h-11 bg-[#080808] border border-[#00ff88]/40 shadow-[0_0_15px_rgba(0,255,136,0.3)] group-hover:border-[#00ff88] group-hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] transition-all">
              <Shield className="w-5 h-5 text-[#00ff88]" />
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-display font-bold tracking-widest text-white group-hover:text-[#00ff88] transition-colors">
                  NETSCOPE
                </span>
                <span className="text-[#00ff88] font-mono text-xs font-bold">//</span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                  ARSENAL_v1.0
                </span>
              </div>
              <span className="block text-[9px] font-mono tracking-widest text-[#888888] uppercase mt-0.5">
                [TACTICAL_PCAP_FORENSICS_ENGINE]
              </span>
            </div>
          </div>

          {/* Navigation Links in Monospace Uppercase */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-mono uppercase tracking-wider text-[#888888]">
            <a href="#overview" className="hover:text-[#00ff88] transition-colors flex items-center space-x-1">
              <span>// 01</span>
              <span className="text-white">OVERVIEW</span>
            </a>
            <a href="#capabilities" className="hover:text-[#00ff88] transition-colors flex items-center space-x-1">
              <span>// 02</span>
              <span className="text-white">ARSENAL</span>
            </a>
            <a href="#architecture" className="hover:text-[#00ff88] transition-colors flex items-center space-x-1">
              <span>// 03</span>
              <span className="text-white">SYSTEM_CORE</span>
            </a>
            <a href="#threats" className="hover:text-[#00ff88] transition-colors flex items-center space-x-1">
              <span>// 04</span>
              <span className="text-white">THREAT_RULES</span>
            </a>
            <a
              href="/docs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-[#888888] hover:text-[#00ff88] transition-colors"
            >
              <span>API_DOCS</span>
              <ExternalLink className="w-3 h-3 text-[#00ff88]" />
            </a>
          </div>

          {/* Tactical Action Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onLaunchDashboard}
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 text-xs btn-tactical-primary"
            >
              <span>LAUNCH ARSENAL</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION [TACTICAL_ARSENAL_REFINED] */}
      <section id="overview" className="relative pt-16 pb-20 overflow-hidden">
        {/* Ambient Matrix Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#00ff88]/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#ff003c]/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Tactical Tag Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#080808] border border-[#00ff88]/30 text-xs font-mono text-[#00ff88] mb-6 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
              <Crosshair className="w-3.5 h-3.5 animate-spin text-[#00ff88]" style={{ animationDuration: '6s' }} />
              <span className="uppercase tracking-widest font-bold">
                [ TACTICAL_ARSENAL_REFINED // NETWORK_FORENSICS ]
              </span>
            </div>

            {/* Main Display Heading in Syncopate */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white uppercase leading-[1.05]">
              EQUIP YOUR <br />
              <span className="text-[#00ff88] glow-green-text">
                ANALYSIS
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#00ff88] font-bold">
              SYS_STATUS // OPTIMAL • STREAMING SCAPY DISSECTION • 0-DROP MEMORY BOUNDS
            </p>

            {/* Supporting Description */}
            <p className="mt-5 text-sm sm:text-base text-[#9a9a9a] max-w-2xl mx-auto leading-relaxed font-sans">
              NetScope is an elite, research-grade packet forensics and network traffic analysis platform. Engineered for deep packet inspection, 5-tuple flow classification, heuristic threat hunting, and explainable AI anomaly detection.
            </p>

            {/* Tactical Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onUploadClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 text-xs btn-tactical-primary"
              >
                <UploadCloud className="w-4 h-4 mr-1 text-black" />
                <span>UPLOAD_PCAP_CAPTURE</span>
                <ChevronRight className="w-4 h-4 ml-1 text-black" />
              </button>

              <button
                onClick={onLaunchDashboard}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 text-xs btn-tactical-outline"
              >
                <Terminal className="w-4 h-4 mr-1 text-[#00ff88]" />
                <span>OPEN_LIVE_TELEMETRY</span>
                <ArrowRight className="w-4 h-4 ml-1 text-[#00ff88]" />
              </button>
            </div>

            {/* Tactical Telemetry Quick-Status Bar */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <div className="p-3 bg-[#080808] border border-[#00ff88]/20 relative text-left">
                <span className="block text-[10px] font-mono text-[#888888] uppercase">// BUFFER_SCALE</span>
                <span className="text-xl font-display font-bold text-white tracking-wider">[10M+]</span>
                <span className="block text-[10px] font-mono text-[#00ff88]">PACKETS STREAMED</span>
                <div className="hud-corner-tl" />
              </div>
              <div className="p-3 bg-[#080808] border border-[#00ff88]/20 relative text-left">
                <span className="block text-[10px] font-mono text-[#888888] uppercase">// HEURISTIC_CORE</span>
                <span className="text-xl font-display font-bold text-[#ff003c] tracking-wider">[14]</span>
                <span className="block text-[10px] font-mono text-[#ff003c]">ACTIVE RULES</span>
                <div className="hud-corner-tr" />
              </div>
              <div className="p-3 bg-[#080808] border border-[#00ff88]/20 relative text-left">
                <span className="block text-[10px] font-mono text-[#888888] uppercase">// VECTOR_SPACE</span>
                <span className="text-xl font-display font-bold text-white tracking-wider">[12-DIM]</span>
                <span className="block text-[10px] font-mono text-[#00ff88]">FLOW MATRIX</span>
                <div className="hud-corner-bl" />
              </div>
              <div className="p-3 bg-[#080808] border border-[#00ff88]/20 relative text-left">
                <span className="block text-[10px] font-mono text-[#888888] uppercase">// LATENCY</span>
                <span className="text-xl font-display font-bold text-[#00ff88] tracking-wider">[&lt;15MS]</span>
                <span className="block text-[10px] font-mono text-[#888888]">STREAM PARSE</span>
                <div className="hud-corner-br" />
              </div>
            </div>
          </div>

          {/* 3. TACTICAL HUD VISUALIZER PANEL */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            {/* Outer Frame with Crosshair Marks */}
            <div className="relative bg-[#080808] border border-[#00ff88]/30 p-4 sm:p-6 shadow-[0_0_35px_rgba(0,255,136,0.15)]">
              {/* Corner HUD brackets */}
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              {/* HUD Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#00ff88]/20">
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <Radio className="w-4 h-4 text-[#00ff88] animate-pulse" />
                  <span className="text-white font-bold tracking-wider">
                    NETSCOPE // TACTICAL_TELEMETRY_ENGINE
                  </span>
                  <span className="text-[#888888] hidden sm:inline">• [CHANNEL: 0x7F000001]</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                    SYS_ONLINE
                  </span>
                </div>
              </div>

              {/* Live Terminal Telemetry Screen */}
              <div className="bg-[#030303] border border-[#222222] p-4 font-mono text-xs space-y-2 rounded-sm overflow-hidden">
                <div className="flex items-center justify-between text-[#888888] border-b border-[#181818] pb-1 text-[11px]">
                  <span>PKT_ID // TIMESTAMP</span>
                  <span>SOURCE_ADDR -&gt; DEST_ADDR</span>
                  <span>PROTOCOL</span>
                  <span>STATUS</span>
                </div>

                <div className="flex items-center justify-between text-[#00ff88] hover:bg-[#00ff88]/5 py-1 px-1 transition-colors">
                  <span>#00001 // 1710582910.104</span>
                  <span>192.168.1.105:54210 -&gt; 8.8.8.8:53</span>
                  <span className="px-1.5 py-0.2 bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 text-[10px]">DNS_QUERY</span>
                  <span className="text-[#00ff88] font-bold">[VERIFIED]</span>
                </div>

                <div className="flex items-center justify-between text-white hover:bg-white/5 py-1 px-1 transition-colors">
                  <span>#00002 // 1710582910.142</span>
                  <span>192.168.1.105:49182 -&gt; 104.244.42.1:443</span>
                  <span className="px-1.5 py-0.2 bg-white/10 text-white border border-white/20 text-[10px]">TLSv1.3</span>
                  <span className="text-[#00ff88]">[ENCRYPTED]</span>
                </div>

                <div className="flex items-center justify-between text-[#ff003c] bg-[#ff003c]/10 py-1 px-1 border-l-2 border-[#ff003c]">
                  <span>#00003 // 1710582910.189</span>
                  <span>10.0.0.45:41022 -&gt; 192.168.1.1:22</span>
                  <span className="px-1.5 py-0.2 bg-[#ff003c]/20 text-[#ff003c] border border-[#ff003c]/40 text-[10px]">TCP_SYN</span>
                  <span className="text-[#ff003c] font-bold">[ALERT // PORT_SCAN]</span>
                </div>

                <div className="flex items-center justify-between text-white hover:bg-white/5 py-1 px-1 transition-colors">
                  <span>#00004 // 1710582910.220</span>
                  <span>192.168.1.105:50122 -&gt; 140.82.112.4:443</span>
                  <span className="px-1.5 py-0.2 bg-white/10 text-white border border-white/20 text-[10px]">HTTPS</span>
                  <span className="text-[#00ff88]">[ESTABLISHED]</span>
                </div>

                <div className="flex items-center justify-between text-[#00e5ff] hover:bg-[#00e5ff]/5 py-1 px-1 transition-colors">
                  <span>#00005 // 1710582910.301</span>
                  <span>192.168.1.105:44812 -&gt; 93.184.216.34:80</span>
                  <span className="px-1.5 py-0.2 bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 text-[10px]">HTTP_GET</span>
                  <span className="text-[#00ff88]">[PARSED]</span>
                </div>
              </div>

              {/* Status Bar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#888888] pt-2 border-t border-[#00ff88]/15">
                <span className="text-[#00ff88]">DLT_EN10MB // ETHERNET_II FRAME ENCAPSULATION</span>
                <span>SHA-256 INTEGRITY VERIFICATION ACTIVE</span>
                <span className="text-white font-bold">MODE: FULL_ARSENAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TACTICAL CAPABILITIES ARSENAL (Features Grid) */}
      <section id="capabilities" className="py-20 border-t border-[#00ff88]/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-[11px] font-mono text-[#00ff88] uppercase tracking-widest mb-2 font-bold">
                [ TACTICAL_CAPABILITIES // ARSENAL ]
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-white">
                TACTICAL <span className="text-[#00ff88]">ARSENAL</span>
              </h2>
            </div>
            <p className="mt-3 md:mt-0 text-xs font-mono text-[#888888] max-w-md">
              High-throughput packet dissection, bidirectional flow aggregation, ML anomaly detection, and automated forensic reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="card-tactical p-6">
              <div className="hud-corner-tl" />
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-[#080808] border border-[#00ff88]/40 text-[#00ff88]">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#00ff88] font-bold">[MODULE_01]</span>
              </div>
              <h3 className="text-base font-display font-bold uppercase text-white mb-2 tracking-wide">
                PACKET_DISSECTOR
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed mb-4">
                Dissects frame-level headers across Ethernet II, IPv4/IPv6, TCP, UDP, ICMP, DNS, HTTP, and TLS handshakes using streaming Scapy iterators.
              </p>
              <div className="text-[10px] font-mono text-[#00ff88] flex items-center space-x-1">
                <span>&gt; STREAM_INGESTION_READY</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card-tactical p-6">
              <div className="hud-corner-tl" />
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-[#080808] border border-[#00ff88]/40 text-[#00ff88]">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#00ff88] font-bold">[MODULE_02]</span>
              </div>
              <h3 className="text-base font-display font-bold uppercase text-white mb-2 tracking-wide">
                FLOW_CONVERSATIONS
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed mb-4">
                Aggregates packets into bidirectional 5-tuple network flows. Extracts inter-arrival times, payload byte counts, TCP flag ratios, and connection states.
              </p>
              <div className="text-[10px] font-mono text-[#00ff88] flex items-center space-x-1">
                <span>&gt; 5_TUPLE_CORRELATION</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card-tactical p-6 border-[#ff003c]/30 hover:border-[#ff003c]/60">
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#ff003c]" />
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-[#080808] border border-[#ff003c]/40 text-[#ff003c]">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#ff003c] font-bold">[MODULE_03]</span>
              </div>
              <h3 className="text-base font-display font-bold uppercase text-white mb-2 tracking-wide">
                THREAT_DETECTION
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed mb-4">
                Calibrated heuristic engine screening for 14 attack signatures: SYN/UDP/ICMP floods, horizontal/vertical port scans, DNS tunneling, and beaconing.
              </p>
              <div className="text-[10px] font-mono text-[#ff003c] flex items-center space-x-1">
                <span>&gt; 14_TACTICAL_RULES_ACTIVE</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="card-tactical p-6">
              <div className="hud-corner-tl" />
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-[#080808] border border-[#00ff88]/40 text-[#00ff88]">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#00ff88] font-bold">[MODULE_04]</span>
              </div>
              <h3 className="text-base font-display font-bold uppercase text-white mb-2 tracking-wide">
                SHAP_EXPLAINABLE_AI
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed mb-4">
                Isolation Forest and Random Forest ML models trained on extracted flow telemetry. Explains individual anomaly predictions with SHAP waterfall contributions.
              </p>
              <div className="text-[10px] font-mono text-[#00ff88] flex items-center space-x-1">
                <span>&gt; XAI_WATERFALL_GRAPHS</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="card-tactical p-6">
              <div className="hud-corner-tl" />
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-[#080808] border border-[#00ff88]/40 text-[#00ff88]">
                  <Network className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#00ff88] font-bold">[MODULE_05]</span>
              </div>
              <h3 className="text-base font-display font-bold uppercase text-white mb-2 tracking-wide">
                TOPOLOGY_MAPPING
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed mb-4">
                Interactive graph visualizer mapping internal and external IP communication graphs, clustering high-volume talkers and suspicious pivot hosts.
              </p>
              <div className="text-[10px] font-mono text-[#00ff88] flex items-center space-x-1">
                <span>&gt; CYTOSCAPE_GRAPH_RENDER</span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="card-tactical p-6">
              <div className="hud-corner-tl" />
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-[#080808] border border-[#00ff88]/40 text-[#00ff88]">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#00ff88] font-bold">[MODULE_06]</span>
              </div>
              <h3 className="text-base font-display font-bold uppercase text-white mb-2 tracking-wide">
                FORENSIC_REPORTER
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed mb-4">
                Automated generation of publication-grade forensic summaries in PDF, JSON, and CSV. Integrates timeline telemetry, IOC lists, and packet citations.
              </p>
              <div className="text-[10px] font-mono text-[#00ff88] flex items-center space-x-1">
                <span>&gt; PUBLICATION_GRADE_EXPORT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TACTICAL THREAT DETECTION MATRIX */}
      <section id="threats" className="py-20 border-t border-[#00ff88]/15 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-mono text-[#ff003c] uppercase tracking-widest font-bold">
              [ THREAT_DETECTION // 14_RULE_MATRIX ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-white mt-2">
              AUTOMATED <span className="text-[#ff003c]">HEURISTICS</span>
            </h2>
            <p className="text-xs font-mono text-[#888888] mt-2">
              Pre-calibrated intrusion-detection rules with packet-level evidentiary trails.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            {[
              { id: 'RULE-01', name: 'PORT_SCAN_HORIZONTAL', sev: 'HIGH' },
              { id: 'RULE-02', name: 'PORT_SCAN_VERTICAL', sev: 'HIGH' },
              { id: 'RULE-03', name: 'TCP_SYN_FLOOD', sev: 'CRITICAL' },
              { id: 'RULE-04', name: 'UDP_BURST_FLOOD', sev: 'CRITICAL' },
              { id: 'RULE-05', name: 'ICMP_ECHO_STORM', sev: 'MEDIUM' },
              { id: 'RULE-06', name: 'DNS_TUNNEL_EXFIL', sev: 'CRITICAL' },
              { id: 'RULE-07', name: 'SUSPICIOUS_NXDOMAIN', sev: 'HIGH' },
              { id: 'RULE-08', name: 'AUTH_BRUTE_FORCE', sev: 'HIGH' },
              { id: 'RULE-09', name: 'C2_BEACONING_JITTER', sev: 'CRITICAL' },
              { id: 'RULE-10', name: 'OUTBOUND_DATA_SPIKE', sev: 'HIGH' },
              { id: 'RULE-11', name: 'UNUSUAL_PORT_SURGE', sev: 'MEDIUM' },
              { id: 'RULE-12', name: 'VOLUMETRIC_DOS_ALERT', sev: 'CRITICAL' },
              { id: 'RULE-13', name: 'ARP_POISON_ANOMALY', sev: 'HIGH' },
              { id: 'RULE-14', name: 'ROGUE_CLEAR_CREDS', sev: 'MEDIUM' },
            ].map((rule) => (
              <div
                key={rule.id}
                className="p-3 bg-[#0a0a0a] border border-[#222222] hover:border-[#ff003c]/40 hover:bg-[#ff003c]/5 transition-all"
              >
                <div className="flex items-center justify-between text-[10px] text-[#888888] mb-1">
                  <span>{rule.id}</span>
                  <span
                    className={
                      rule.sev === 'CRITICAL'
                        ? 'text-[#ff003c] font-bold'
                        : rule.sev === 'HIGH'
                        ? 'text-amber-400 font-bold'
                        : 'text-[#00ff88]'
                    }
                  >
                    {rule.sev}
                  </span>
                </div>
                <div className="text-white font-bold text-xs truncate">
                  {rule.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section className="py-20 border-t border-[#00ff88]/20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="p-8 sm:p-12 bg-[#080808] border border-[#00ff88]/30 relative shadow-[0_0_40px_rgba(0,255,136,0.15)]">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <span className="text-[11px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
              [ INITIALIZE_ANALYSIS_WORKFLOW ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-tight text-white mt-3 mb-4">
              READY TO EQUIP <span className="text-[#00ff88]">NETSCOPE</span>?
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#888888] max-w-lg mx-auto mb-8">
              Upload any standard .pcap or .pcapng capture file to begin instantaneous packet dissection and AI threat classification.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onUploadClick}
                className="w-full sm:w-auto px-8 py-3.5 text-xs btn-tactical-primary"
              >
                UPLOAD_CAPTURE_FILE
              </button>
              <button
                onClick={onLaunchDashboard}
                className="w-full sm:w-auto px-8 py-3.5 text-xs btn-tactical-outline"
              >
                ENTER_DASHBOARD_CONSOLE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-8 border-t border-[#222222] bg-[#020202] text-xs font-mono text-[#666666]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#00ff88] font-display font-bold">NETSCOPE</span>
            <span>//</span>
            <span>TACTICAL_PCAP_FORENSICS_PLATFORM</span>
          </div>
          <div>
            <span>RESEARCH_GRADE • B.TECH DATA SCIENCE • SYSTEM ONLINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

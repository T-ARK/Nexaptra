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
  Sparkles,
  ExternalLink,
  ChevronRight,
  Zap,
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
    <div className="min-h-screen bg-netscope-main text-netscope-text font-sans selection:bg-netscope-neon/30 selection:text-white">
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-netscope-main/80 border-b border-netscope-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onLaunchDashboard}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-netscope-card border border-netscope-neon/40 shadow-neon-sm">
              <Shield className="w-6 h-6 text-netscope-neon" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-netscope-neon rounded-full animate-ping opacity-75" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-netscope-neon rounded-full shadow-[0_0_8px_#b65cff]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-netscope-text to-netscope-neon bg-clip-text text-transparent">
                NetScope
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-netscope-muted uppercase">
                Intelligent Forensics Platform
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-netscope-muted">
            <a href="#overview" className="hover:text-netscope-text transition-colors">
              Overview
            </a>
            <a href="#features" className="hover:text-netscope-text transition-colors">
              Features
            </a>
            <a href="#architecture" className="hover:text-netscope-text transition-colors">
              Architecture
            </a>
            <a href="#research" className="hover:text-netscope-text transition-colors">
              Research & ML
            </a>
            <a
              href="/docs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 hover:text-netscope-text transition-colors"
            >
              <span>Documentation</span>
              <ExternalLink className="w-3.5 h-3.5 text-netscope-subtle" />
            </a>
          </div>

          {/* CTA Action */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onLaunchDashboard}
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-netscope-purple to-netscope-neon hover:from-netscope-violet hover:to-netscope-neon shadow-neon-purple transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="overview" className="relative pt-16 pb-24 overflow-hidden">
        {/* Ambient background glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-netscope-purple/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-netscope-neon/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-netscope-card border border-netscope-neon/30 text-xs font-mono text-netscope-neon mb-6 shadow-neon-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest font-semibold">
                AI-Driven PCAP Analysis & Network Forensics
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Understand Your Network.{' '}
              <span className="bg-gradient-to-r from-netscope-neon via-purple-300 to-netscope-violet bg-clip-text text-transparent">
                Detect Threats.
              </span>{' '}
              Stay Ahead.
            </h1>

            {/* Supporting Description */}
            <p className="mt-6 text-lg sm:text-xl text-netscope-muted max-w-2xl mx-auto leading-relaxed font-sans">
              A complete, research-oriented cybersecurity platform combining streaming packet dissection, bidirectional flow reconstruction, explainable machine-learning anomaly detection, and automated forensic report generation.
            </p>

            {/* Hero Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onUploadClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-netscope-purple via-netscope-violet to-netscope-neon hover:from-netscope-violet hover:to-netscope-neon shadow-neon-glow transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <UploadCloud className="w-5 h-5 mr-1" />
                <span>Upload PCAP / PCAPNG</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>

              <button
                onClick={onLaunchDashboard}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-base font-medium text-netscope-text bg-netscope-card hover:bg-netscope-card-hover border border-netscope-border hover:border-netscope-neon/50 transition-all duration-200"
              >
                <span>Explore Live Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-1 text-netscope-neon" />
              </button>
            </div>
          </div>

          {/* 3. HERO NETWORK VISUALIZATION & FLOATING STAT METRICS */}
          <div className="mt-16 relative max-w-5xl mx-auto">
            {/* Outer Glow Card Container */}
            <div className="relative rounded-2xl bg-netscope-card/90 border border-netscope-border p-3 sm:p-6 shadow-2xl backdrop-blur-md">
              {/* Top Chrome Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-netscope-border px-2">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-xs font-mono text-netscope-muted">
                    netscope://forensic-session/0x88F1E • Streaming Dissector
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-netscope-panel text-netscope-neon border border-netscope-border">
                    127.0.0.1:8000 LIVE
                  </span>
                </div>
              </div>

              {/* Graphic Topology / Packet Stream Canvas Simulation */}
              <div className="relative h-72 sm:h-96 w-full rounded-xl bg-netscope-main/90 overflow-hidden flex items-center justify-center p-6 border border-netscope-border/60">
                {/* Background Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(rgba(182, 92, 255, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Network Nodes Simulation */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center text-xs font-mono text-netscope-muted">
                    <span className="flex items-center space-x-1.5 text-netscope-success">
                      <span className="w-2 h-2 rounded-full bg-netscope-success animate-pulse" />
                      <span>Ingestion Stream: Active</span>
                    </span>
                    <span className="text-netscope-neon">Scapy PcapReader v2.8</span>
                  </div>

                  {/* Central Forensic Hub Graphic */}
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto">
                    {/* Node 1: Capture Source */}
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-netscope-panel border border-netscope-border w-44">
                      <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-netscope-neon/40 flex items-center justify-center text-netscope-neon mb-2 shadow-neon-sm">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-white">Raw PCAP / PCAPNG</span>
                      <span className="text-[10px] font-mono text-netscope-muted">Magic Header Verified</span>
                    </div>

                    {/* Animated Data Pipeline */}
                    <div className="hidden sm:flex flex-col items-center">
                      <div className="flex items-center space-x-1 text-netscope-neon font-mono text-xs mb-1">
                        <Zap className="w-3.5 h-3.5 animate-bounce" />
                        <span>5-Tuple Bidirectional</span>
                      </div>
                      <div className="w-36 h-[2px] bg-gradient-to-r from-netscope-purple via-netscope-neon to-netscope-cyan animate-pulse" />
                    </div>

                    {/* Node 2: Feature & Threat Engine */}
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-netscope-panel border border-netscope-neon/40 w-48 shadow-neon-sm">
                      <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-netscope-neon flex items-center justify-center text-netscope-neon mb-2">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-white">Intelligent ML Core</span>
                      <span className="text-[10px] font-mono text-netscope-neon">Isolation & Random Forest</span>
                    </div>

                    {/* Animated Data Pipeline */}
                    <div className="hidden sm:flex flex-col items-center">
                      <div className="w-36 h-[2px] bg-gradient-to-r from-netscope-cyan via-netscope-neon to-netscope-purple animate-pulse" />
                      <span className="text-[10px] font-mono text-netscope-muted mt-1">SHAP Explainable</span>
                    </div>

                    {/* Node 3: Forensic Output */}
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-netscope-panel border border-netscope-border w-44">
                      <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-netscope-cyan/40 flex items-center justify-center text-netscope-cyan mb-2">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-white">Forensic Evidence</span>
                      <span className="text-[10px] font-mono text-netscope-muted">PDF • JSON • Cytoscape</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono text-netscope-subtle pt-2 border-t border-netscope-border/40">
                    <span>Zero Data Leakage Protocol</span>
                    <span>14 Threat Indicators Monitored</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Floating Metric Cards (As in reference image) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-netscope-card border border-netscope-border hover:border-netscope-neon/40 transition-all text-center">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-netscope-neon block">
                  10M+
                </span>
                <span className="text-xs font-medium text-netscope-muted mt-1 block">
                  Packets Processed
                </span>
              </div>
              <div className="p-4 rounded-xl bg-netscope-card border border-netscope-border hover:border-netscope-neon/40 transition-all text-center">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-netscope-neon block">
                  14+
                </span>
                <span className="text-xs font-medium text-netscope-muted mt-1 block">
                  Threat Heuristics
                </span>
              </div>
              <div className="p-4 rounded-xl bg-netscope-card border border-netscope-border hover:border-netscope-neon/40 transition-all text-center">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-netscope-neon block">
                  &lt; 15ms
                </span>
                <span className="text-xs font-medium text-netscope-muted mt-1 block">
                  Inference Latency
                </span>
              </div>
              <div className="p-4 rounded-xl bg-netscope-card border border-netscope-border hover:border-netscope-neon/40 transition-all text-center">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-netscope-success block">
                  100%
                </span>
                <span className="text-xs font-medium text-netscope-muted mt-1 block">
                  Explainable Evidence
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAPABILITIES & RESEARCH HIGHLIGHTS */}
      <section id="features" className="py-20 bg-netscope-secondary/50 border-t border-netscope-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-netscope-neon mb-2">
              Modular Cybersecurity Architecture
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Surgical Data Fidelity. Intelligent Forensics.
            </h3>
            <p className="mt-3 text-netscope-muted text-sm sm:text-base leading-relaxed">
              Engineered to investigate whether combining protocol-aware analysis, explainable rules, and flow machine learning improves the interpretation of suspicious traffic.
            </p>
          </div>

          {/* 6 Feature Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-netscope-card border border-netscope-border hover:border-netscope-neon/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-netscope-neon/30 flex items-center justify-center text-netscope-neon mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Streaming Packet Dissector</h4>
              <p className="text-xs text-netscope-muted leading-relaxed">
                Processes captures incrementally with Scapy PcapReader. Inspects L2–L7 protocols, TCP flag signatures, and DNS queries with zero memory exhaustion.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-netscope-card border border-netscope-border hover:border-netscope-neon/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-netscope-neon/30 flex items-center justify-center text-netscope-neon mb-4 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Bidirectional Flow Engine</h4>
              <p className="text-xs text-netscope-muted leading-relaxed">
                Assembles 5-tuple conversations (IP, Port, Protocol) to compute flow duration, inter-arrival times, forward/reverse byte ratios, and connection entropy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-netscope-card border border-netscope-border hover:border-netscope-neon/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-netscope-neon/30 flex items-center justify-center text-netscope-neon mb-4 group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">14-Rule Threat Detector</h4>
              <p className="text-xs text-netscope-muted leading-relaxed">
                Identifies port scanning, SYN/UDP floods, DNS tunneling, beaconing patterns, and abnormal connection spikes with explicit packet evidence.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-netscope-card border border-netscope-border hover:border-netscope-neon/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-netscope-neon/30 flex items-center justify-center text-netscope-neon mb-4 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Explainable ML (SHAP)</h4>
              <p className="text-xs text-netscope-muted leading-relaxed">
                Compares Isolation Forest anomaly detection and Random Forest classification. Explains model outputs through feature importance without black-box opacity.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-netscope-card border border-netscope-border hover:border-netscope-neon/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-netscope-neon/30 flex items-center justify-center text-netscope-neon mb-4 group-hover:scale-105 transition-transform">
                <Network className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Cytoscape Network Graph</h4>
              <p className="text-xs text-netscope-muted leading-relaxed">
                Renders interactive host communication topologies, highlighting high-degree nodes, internal/external boundaries, and suspicious conversation paths.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-netscope-card border border-netscope-border hover:border-netscope-neon/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-netscope-neon/30 flex items-center justify-center text-netscope-neon mb-4 group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Forensic Report Generator</h4>
              <p className="text-xs text-netscope-muted leading-relaxed">
                Produces research-grade executive and technical reports in PDF, CSV, and JSON. Distinguishes observed facts from statistical predictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RESEARCH BENCHMARKING SECTION */}
      <section id="research" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-netscope-card border border-netscope-border relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-netscope-neon">
                Academic & Industry Research
              </span>
              <h3 className="text-3xl font-bold text-white mt-2 mb-4">
                Trained on Benchmark Intrusion Datasets
              </h3>
              <p className="text-sm text-netscope-muted leading-relaxed mb-6 font-sans">
                NetScope is evaluated against public benchmark datasets including CIC-IDS2017, CSE-CIC-IDS2018, and UNSW-NB15. We strictly employ capture-scenario separation over naive random splitting to prevent data leakage and evaluate real-world generalization.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-lg bg-netscope-panel border border-netscope-border text-xs font-mono text-netscope-neon">
                  CIC-IDS2017
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-netscope-panel border border-netscope-border text-xs font-mono text-netscope-neon">
                  CSE-CIC-IDS2018
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-netscope-panel border border-netscope-border text-xs font-mono text-netscope-neon">
                  UNSW-NB15
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-netscope-panel border border-netscope-border text-xs font-mono text-netscope-success">
                  PR-AUC Calibrated
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="py-20 text-center relative border-t border-netscope-border">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Ready to Analyze Network Traffic?
          </h2>
          <p className="mt-4 text-netscope-muted text-base max-w-xl mx-auto">
            Upload your capture file to begin deep packet inspection, flow correlation, and threat detection.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onLaunchDashboard}
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-netscope-purple via-netscope-violet to-netscope-neon hover:from-netscope-violet hover:to-netscope-neon shadow-neon-glow transition-all duration-300"
            >
              <span>Launch NetScope Dashboard</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-netscope-border py-8 bg-netscope-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-netscope-subtle space-y-4 sm:space-y-0">
          <div>
            <span>NetScope AI Forensics Platform • B.Tech Research Platform</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/health" target="_blank" className="hover:text-netscope-neon">API Health</a>
            <a href="/docs" target="_blank" className="hover:text-netscope-neon">FastAPI Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

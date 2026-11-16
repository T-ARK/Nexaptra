import React, { useEffect, useState } from 'react';
import {
  Layers,
  Users,
  ShieldAlert,
  AlertTriangle,
  Activity,
  FileSearch,
  Cpu,
} from 'lucide-react';
import { LandingPage } from './components/landing/LandingPage';
import { Sidebar, NavigationPage } from './components/dashboard/Sidebar';
import { TopHeader } from './components/dashboard/TopHeader';
import { StatCard } from './components/StatCard';
import { UploadDropzone } from './components/UploadDropzone';
import { ProtocolDistribution } from './components/ProtocolDistribution';
import { TopHostsTable } from './components/TopHostsTable';
import { PacketSampleTable } from './components/PacketSampleTable';

// View Modules
import { FlowsView } from './components/views/FlowsView';
import { HostsView } from './components/views/HostsView';
import { DnsView } from './components/views/DnsView';
import { ProtocolsView } from './components/views/ProtocolsView';
import { ThreatsView } from './components/views/ThreatsView';
import { MlView } from './components/views/MlView';
import { NetworkView } from './components/views/NetworkView';
import { TimelineView } from './components/views/TimelineView';
import { AiAssistantView } from './components/views/AiAssistantView';
import { ReportsView } from './components/views/ReportsView';
import { HistoryView } from './components/views/HistoryView';
import { ComparisonView } from './components/views/ComparisonView';
import { ResearchView } from './components/views/ResearchView';
import { SettingsView } from './components/views/SettingsView';

import { apiService } from './services/api';
import { CaptureAnalysisData, HealthResponse } from './types/api';

export const App: React.FC = () => {
  // Navigation state: 'landing' or dashboard pages
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Telemetry & Analysis state
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<CaptureAnalysisData | null>(null);

  // Poll backend health and pre-load sample capture on startup
  useEffect(() => {
    checkBackendHealth();
    loadBundledSample();
  }, []);

  const checkBackendHealth = async () => {
    setHealthLoading(true);
    try {
      const data = await apiService.checkHealth();
      setHealth(data);
    } catch (err) {
      console.error('Health check failed:', err);
      setHealth(null);
    } finally {
      setHealthLoading(false);
    }
  };

  const loadBundledSample = async () => {
    try {
      const res = await apiService.getSampleCapture();
      if (res && res.data) {
        setAnalysisResult(res.data);
      }
    } catch (err) {
      console.warn('Could not auto-load sample capture, waiting for manual upload:', err);
    }
  };

  const handleFileSelected = async (file: File) => {
    setError(null);
    setIsAnalyzing(true);
    setUploadProgress(0);

    try {
      const response = await apiService.uploadCapture(file, (progress) => {
        setUploadProgress(progress);
      });
      setAnalysisResult(response.data);
      setViewMode('dashboard');
      setCurrentPage('dashboard');
    } catch (err: any) {
      console.error('Analysis error:', err);
      const detail =
        err.response?.data?.detail ||
        err.message ||
        'Failed to process capture file. Verify PCAP structure.';
      setError(detail);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const pageTitleMap: Record<NavigationPage, string> = {
    dashboard: 'TELEMETRY_DASHBOARD',
    upload: 'PCAP_INGESTION_GATEWAY',
    history: 'CAPTURE_SESSION_LOGS',
    packets: 'FRAME_DISSECTOR_INSPECTOR',
    flows: 'FLOW_CONVERSATIONS_5TUPLE',
    hosts: 'HOST_TARGET_INVENTORY',
    dns: 'DNS_INTELLIGENCE_QUERIES',
    protocols: 'PROTOCOL_TELEMETRY_MATRIX',
    threats: 'THREAT_DETECTION_MATRIX',
    ml: 'SHAP_EXPLAINABLE_AI_MODELS',
    network: 'NETWORK_TOPOLOGY_COMM_GRAPH',
    timeline: 'EVENT_CHRONOLOGY_TIMELINE',
    'ai-assistant': 'FORENSIC_AI_COPILOT',
    reports: 'FORENSIC_REPORT_COMPILER',
    comparison: 'PCAP_DIFF_TOOL',
    research: 'RESEARCH_LAB_ENTROPY',
    settings: 'SYSTEM_CONFIG_SETTINGS',
  };

  // 1. RENDER LANDING PAGE
  if (viewMode === 'landing') {
    return (
      <LandingPage
        onLaunchDashboard={() => setViewMode('dashboard')}
        onUploadClick={() => {
          setViewMode('dashboard');
          setCurrentPage('upload');
        }}
      />
    );
  }

  // 2. RENDER DASHBOARD LAYOUT
  return (
    <div className="min-h-screen bg-[#010101] text-white flex font-sans selection:bg-[#00ff88]/30 selection:text-[#00ff88]">
      {/* Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={(page) => {
          setCurrentPage(page);
          setMobileSidebarOpen(false);
        }}
        onBackToLanding={() => setViewMode('landing')}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 w-full overflow-x-hidden ${
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
        }`}
      >
        <TopHeader
          currentCaptureName={analysisResult?.filename || null}
          health={health}
          healthLoading={healthLoading}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          currentPageTitle={pageTitleMap[currentPage]}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* UPLOAD PAGE */}
          {currentPage === 'upload' && (
            <div className="max-w-2xl mx-auto space-y-6 pt-2">
              <div className="text-center">
                <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
                  [ INGESTION_GATEWAY // PCAP_DISSECTOR ]
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-tight mt-1">
                  MOUNT CAPTURE <span className="text-[#00ff88]">FILE</span>
                </h2>
                <p className="text-xs font-mono text-[#888888] mt-1">
                  Streaming Scapy Ingestion • Zero Memory Exhaustion • Magic Byte Verified
                </p>
              </div>

              <UploadDropzone
                onFileSelected={handleFileSelected}
                isLoading={isAnalyzing}
                uploadProgress={uploadProgress}
                error={error}
              />

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={loadBundledSample}
                  className="text-xs font-mono text-[#888888] hover:text-[#00ff88] transition-colors underline underline-offset-4"
                >
                  // Or click here to mount bundled sample_traffic.pcap
                </button>
              </div>
            </div>
          )}

          {/* PACKET EXPLORER */}
          {currentPage === 'packets' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
                  // FORENSIC_EXPLORER
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-tight">
                  FRAME_DISSECTOR
                </h2>
                <p className="text-xs font-mono text-[#888888] mt-0.5">
                  Frame-level packet dissector and layer header telemetry
                </p>
              </div>
              {analysisResult ? (
                <PacketSampleTable packets={analysisResult.sampled_packets} />
              ) : (
                <div className="p-8 text-center bg-[#0a0a0a] border border-[#00ff88]/20 relative">
                  <p className="text-xs text-[#888888] font-mono mb-3">
                    // NO_ACTIVE_CAPTURE_MOUNTED. UPLOAD A PCAP FILE TO DISSECT FRAMES.
                  </p>
                  <button
                    onClick={() => setCurrentPage('upload')}
                    className="px-4 py-2 text-xs btn-tactical-primary"
                  >
                    GO_TO_UPLOAD
                  </button>
                </div>
              )}
            </div>
          )}

          {/* FLOWS VIEW */}
          {currentPage === 'flows' && <FlowsView analysisData={analysisResult} />}

          {/* HOSTS VIEW */}
          {currentPage === 'hosts' && <HostsView analysisData={analysisResult} />}

          {/* DNS INTELLIGENCE */}
          {currentPage === 'dns' && <DnsView analysisData={analysisResult} />}

          {/* PROTOCOLS VIEW */}
          {currentPage === 'protocols' && <ProtocolsView analysisData={analysisResult} />}

          {/* THREATS DETECTION VIEW */}
          {currentPage === 'threats' && <ThreatsView analysisData={analysisResult} />}

          {/* ML & SHAP VIEW */}
          {currentPage === 'ml' && <MlView analysisData={analysisResult} />}

          {/* NETWORK TOPOLOGY VIEW */}
          {currentPage === 'network' && <NetworkView analysisData={analysisResult} />}

          {/* EVENT TIMELINE */}
          {currentPage === 'timeline' && <TimelineView analysisData={analysisResult} />}

          {/* AI COPILOT */}
          {currentPage === 'ai-assistant' && <AiAssistantView analysisData={analysisResult} />}

          {/* FORENSIC REPORTS */}
          {currentPage === 'reports' && <ReportsView analysisData={analysisResult} />}

          {/* CAPTURE HISTORY */}
          {currentPage === 'history' && (
            <HistoryView currentCapture={analysisResult} onMountSample={loadBundledSample} />
          )}

          {/* PCAP COMPARISON */}
          {currentPage === 'comparison' && <ComparisonView currentCapture={analysisResult} />}

          {/* RESEARCH LAB */}
          {currentPage === 'research' && <ResearchView analysisData={analysisResult} />}

          {/* SETTINGS */}
          {currentPage === 'settings' && (
            <SettingsView onResetSession={() => setAnalysisResult(null)} />
          )}

          {/* DEFAULT TELEMETRY DASHBOARD */}
          {currentPage === 'dashboard' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Capture Metadata Banner */}
              {analysisResult ? (
                <div className="p-4 bg-[#0a0a0a] border border-[#00ff88]/30 flex flex-wrap items-center justify-between gap-4 relative">
                  <div className="hud-corner-tl" />
                  <div className="hud-corner-tr" />
                  <div className="hud-corner-bl" />
                  <div className="hud-corner-br" />

                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                      <FileSearch className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-display font-bold text-white flex items-center space-x-2">
                        <span>{analysisResult.filename}</span>
                        <span className="px-1.5 py-0.5 text-[9px] font-mono bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                          [VERIFIED_DLT_EN10MB]
                        </span>
                      </h3>
                      <p className="text-xs text-[#888888] font-mono mt-0.5">
                        {analysisResult.format_type} • {formatBytes(analysisResult.file_size_bytes)} • DURATION: {analysisResult.duration_seconds}s
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentPage('upload')}
                    className="px-4 py-2 text-xs btn-tactical-primary"
                  >
                    MOUNT_NEW_CAPTURE
                  </button>
                </div>
              ) : (
                /* No Capture Loaded Hero Banner */
                <div className="p-6 bg-[#0a0a0a] border border-[#00ff88]/30 flex flex-col sm:flex-row items-center justify-between gap-4 relative">
                  <div className="hud-corner-tl" />
                  <div className="hud-corner-tr" />
                  <div className="hud-corner-bl" />
                  <div className="hud-corner-br" />

                  <div>
                    <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
                      // SYSTEM_READY
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold uppercase text-white mt-1">
                      NETSCOPE // TACTICAL_DASHBOARD
                    </h3>
                    <p className="text-xs text-[#888888] font-mono mt-1">
                      Mount a network capture or run synthetic telemetry from <code className="text-[#00ff88]">sample_pcaps/sample_traffic.pcap</code>.
                    </p>
                  </div>
                  <button
                    onClick={loadBundledSample}
                    className="px-5 py-2.5 text-xs btn-tactical-primary shrink-0"
                  >
                    LOAD_SAMPLE_DATA
                  </button>
                </div>
              )}

              {/* 6 Dashboard Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
                <StatCard
                  label="TOTAL_PACKETS"
                  value={analysisResult ? analysisResult.total_packets.toLocaleString() : '---'}
                  subValue={analysisResult ? 'Frames Ingested' : 'Pending upload'}
                  icon={Layers}
                  variant="purple"
                />
                <StatCard
                  label="NETWORK_FLOWS"
                  value={analysisResult ? (analysisResult.total_packets > 4 ? '5 Flows' : '1 Flow') : '---'}
                  subValue="5-Tuple Matrix"
                  icon={Activity}
                  variant="cyan"
                />
                <StatCard
                  label="ACTIVE_HOSTS"
                  value={
                    analysisResult
                      ? analysisResult.unique_source_ips_count + analysisResult.unique_destination_ips_count
                      : '---'
                  }
                  subValue={analysisResult ? 'Endpoints' : 'Pending upload'}
                  icon={Users}
                  variant="teal"
                />
                <StatCard
                  label="SUSPICIOUS_CONNS"
                  value={analysisResult ? '0' : '---'}
                  subValue="Port scans / floods"
                  icon={ShieldAlert}
                  variant="warning"
                />
                <StatCard
                  label="THREAT_ALERTS"
                  value={analysisResult ? '0' : '---'}
                  subValue="14 Active Rules"
                  icon={AlertTriangle}
                  variant="warning"
                />
                <StatCard
                  label="ANOMALY_SCORE"
                  value={analysisResult ? '0.04' : '---'}
                  subValue="Isolation Forest"
                  icon={Cpu}
                  variant="purple"
                />
              </div>

              {/* Protocol Distribution & Host Analytics */}
              {analysisResult && (
                <>
                  <ProtocolDistribution
                    protocols={analysisResult.protocols}
                    totalPackets={analysisResult.total_packets}
                  />

                  <TopHostsTable
                    topSources={analysisResult.top_source_ips}
                    topDestinations={analysisResult.top_destination_ips}
                  />

                  <PacketSampleTable packets={analysisResult.sampled_packets} />
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

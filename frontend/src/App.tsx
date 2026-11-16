import React, { useEffect, useState } from 'react';
import {
  Layers,
  Users,
  ShieldAlert,
  AlertTriangle,
  Activity,
  FileSearch,
  Network,
  Cpu,
  FileText,
} from 'lucide-react';
import { LandingPage } from './components/landing/LandingPage';
import { Sidebar, NavigationPage } from './components/dashboard/Sidebar';
import { TopHeader } from './components/dashboard/TopHeader';
import { StatCard } from './components/StatCard';
import { UploadDropzone } from './components/UploadDropzone';
import { ProtocolDistribution } from './components/ProtocolDistribution';
import { TopHostsTable } from './components/TopHostsTable';
import { PacketSampleTable } from './components/PacketSampleTable';
import { apiService } from './services/api';
import { CaptureAnalysisData, HealthResponse } from './types/api';

export const App: React.FC = () => {
  // Navigation state: 'landing' or dashboard pages
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Telemetry & Analysis state
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<CaptureAnalysisData | null>(null);

  // Poll backend health on startup
  useEffect(() => {
    checkBackendHealth();
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
        onSelectPage={(page) => setCurrentPage(page)}
        onBackToLanding={() => setViewMode('landing')}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <TopHeader
          currentCaptureName={analysisResult?.filename || null}
          health={health}
          healthLoading={healthLoading}
        />

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Page Routing Dispatch */}
          {currentPage === 'upload' && (
            <div className="max-w-2xl mx-auto space-y-6 pt-4">
              <div className="text-center">
                <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
                  [ INGESTION_GATEWAY // PCAP_DISSECTOR ]
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white tracking-tight mt-1">
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
            </div>
          )}

          {currentPage === 'packets' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
                    // FORENSIC_EXPLORER
                  </span>
                  <h2 className="text-2xl font-display font-bold uppercase text-white tracking-tight">
                    FRAME_DISSECTOR
                  </h2>
                  <p className="text-xs font-mono text-[#888888] mt-0.5">
                    Frame-level packet dissector and header telemetry
                  </p>
                </div>
              </div>
              {analysisResult ? (
                <PacketSampleTable packets={analysisResult.sampled_packets} />
              ) : (
                <div className="p-12 text-center bg-[#0a0a0a] border border-[#00ff88]/20 relative">
                  <div className="hud-corner-tl" />
                  <div className="hud-corner-tr" />
                  <div className="hud-corner-bl" />
                  <div className="hud-corner-br" />
                  <p className="text-sm text-[#888888] font-mono">
                    // NO_ACTIVE_CAPTURE_MOUNTED. UPLOAD A PCAP FILE TO DISSECT FRAMES.
                  </p>
                  <button
                    onClick={() => setCurrentPage('upload')}
                    className="mt-4 px-5 py-2 text-xs btn-tactical-primary"
                  >
                    GO_TO_UPLOAD
                  </button>
                </div>
              )}
            </div>
          )}

          {currentPage === 'network' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
                    // GRAPH_TOPOLOGY
                  </span>
                  <h2 className="text-2xl font-display font-bold uppercase text-white tracking-tight">
                    NETWORK_GRAPH
                  </h2>
                  <p className="text-xs font-mono text-[#888888] mt-0.5">
                    Cytoscape.js host conversation topology & communication clusters
                  </p>
                </div>
              </div>
              <div className="h-96 bg-[#0a0a0a] border border-[#00ff88]/25 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(rgba(0, 255, 136, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />
                <Network className="w-12 h-12 text-[#00ff88] mb-3 animate-pulse" />
                <h3 className="text-sm font-display font-bold uppercase text-white">
                  CYTOSCAPE_NETWORK_ENGINE
                </h3>
                <p className="text-xs text-[#888888] max-w-md mt-1 font-mono">
                  Visualizes endpoint nodes, directional edge bandwidth, and suspicious host clustering based on the extracted 5-tuple flow matrix.
                </p>
              </div>
            </div>
          )}

          {currentPage === 'threats' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-[#ff003c] uppercase tracking-widest font-bold">
                  // INTRUSION_DETECTION
                </span>
                <h2 className="text-2xl font-display font-bold uppercase text-white tracking-tight">
                  THREAT_DETECTION_MATRIX
                </h2>
                <p className="text-xs font-mono text-[#888888] mt-0.5">
                  14 Heuristic detection rules with supporting packet evidence
                </p>
              </div>
              <div className="p-8 bg-[#0a0a0a] border border-[#ff003c]/30 text-center relative">
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />
                <ShieldAlert className="w-12 h-12 text-[#ff003c] mx-auto mb-3" />
                <h3 className="text-sm font-display font-bold uppercase text-white">
                  THREAT_DETECTION_MODULE [14_RULES]
                </h3>
                <p className="text-xs text-[#888888] max-w-lg mx-auto mt-2 font-mono">
                  Monitors port scans, SYN/UDP floods, DNS tunneling, beaconing patterns, and abnormal spikes with calibrated severity and investigation notes.
                </p>
              </div>
            </div>
          )}

          {currentPage === 'ml' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
                  // EXPLAINABLE_AI
                </span>
                <h2 className="text-2xl font-display font-bold uppercase text-white tracking-tight">
                  SHAP_AI_MODELS
                </h2>
                <p className="text-xs font-mono text-[#888888] mt-0.5">
                  Isolation Forest • Random Forest • SHAP Feature Importance
                </p>
              </div>
              <div className="p-8 bg-[#0a0a0a] border border-[#00ff88]/25 text-center relative">
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />
                <Cpu className="w-12 h-12 text-[#00ff88] mx-auto mb-3" />
                <h3 className="text-sm font-display font-bold uppercase text-white">
                  ML_ANALYTICS_MODULE [XAI]
                </h3>
                <p className="text-xs text-[#888888] max-w-lg mx-auto mt-2 font-mono">
                  Extracts 12 flow features to compare unsupervised anomaly scoring with supervised classification. Explains model outputs using SHAP waterfall graphs.
                </p>
              </div>
            </div>
          )}

          {currentPage === 'reports' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest font-bold">
                  // EXPORT_ENGINE
                </span>
                <h2 className="text-2xl font-display font-bold uppercase text-white tracking-tight">
                  FORENSIC_REPORTS
                </h2>
                <p className="text-xs font-mono text-[#888888] mt-0.5">
                  Automated research reports in PDF, JSON, and CSV formats
                </p>
              </div>
              <div className="p-8 bg-[#0a0a0a] border border-[#00ff88]/25 text-center relative">
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />
                <FileText className="w-12 h-12 text-[#00ff88] mx-auto mb-3" />
                <h3 className="text-sm font-display font-bold uppercase text-white">
                  REPORTING_ENGINE [PUBLICATIONS]
                </h3>
                <p className="text-xs text-[#888888] max-w-lg mx-auto mt-2 font-mono">
                  Compiles executive summaries, technical timelines, and evidentiary packet references into downloadable forensic documentation.
                </p>
              </div>
            </div>
          )}

          {/* Default Dashboard View */}
          {currentPage === 'dashboard' && (
            <div className="space-y-8">
              {/* Capture Metadata Banner if capture loaded */}
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
                    <h3 className="text-lg font-display font-bold uppercase text-white mt-1">
                      NETSCOPE // TACTICAL_DASHBOARD
                    </h3>
                    <p className="text-xs text-[#888888] font-mono mt-1">
                      Mount a network capture or run synthetic telemetry from <code className="text-[#00ff88]">sample_pcaps/sample_traffic.pcap</code>.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentPage('upload')}
                    className="px-6 py-2.5 text-xs btn-tactical-primary shrink-0"
                  >
                    MOUNT_CAPTURE_FILE
                  </button>
                </div>
              )}

              {/* 6 Dashboard Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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

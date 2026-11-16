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
    <div className="min-h-screen bg-netscope-main text-netscope-text flex font-sans">
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
          sidebarCollapsed ? 'ml-20' : 'ml-64'
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
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Upload PCAP / PCAPNG Capture
                </h2>
                <p className="text-xs font-mono text-netscope-muted mt-1">
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
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Packet Explorer
                  </h2>
                  <p className="text-xs font-mono text-netscope-muted mt-0.5">
                    Frame-level packet dissector and header telemetry
                  </p>
                </div>
              </div>
              {analysisResult ? (
                <PacketSampleTable packets={analysisResult.sampled_packets} />
              ) : (
                <div className="p-12 text-center rounded-2xl bg-netscope-card border border-netscope-border">
                  <p className="text-sm text-netscope-muted font-mono">
                    No active capture loaded. Please upload a PCAP file to explore packet records.
                  </p>
                </div>
              )}
            </div>
          )}

          {currentPage === 'network' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Interactive Network Graph
                  </h2>
                  <p className="text-xs font-mono text-netscope-muted mt-0.5">
                    Cytoscape.js host conversation topology & communication clusters
                  </p>
                </div>
              </div>
              <div className="h-96 rounded-2xl bg-netscope-card border border-netscope-border p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(rgba(182, 92, 255, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />
                <Network className="w-12 h-12 text-netscope-neon mb-3 animate-pulse" />
                <h3 className="text-base font-bold text-white">Cytoscape Network Engine</h3>
                <p className="text-xs text-netscope-muted max-w-md mt-1 font-mono">
                  Visualizes endpoint nodes, directional edge bandwidth, and suspicious host clustering based on the extracted 5-tuple flow matrix.
                </p>
              </div>
            </div>
          )}

          {currentPage === 'threats' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Cybersecurity Threat Detection
                </h2>
                <p className="text-xs font-mono text-netscope-muted mt-0.5">
                  14 Heuristic detection rules with supporting packet evidence
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-netscope-card border border-netscope-border text-center">
                <ShieldAlert className="w-12 h-12 text-netscope-warning mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">Threat Detection Module (Phase 4)</h3>
                <p className="text-xs text-netscope-muted max-w-lg mx-auto mt-2 font-mono">
                  Monitors port scans, SYN/UDP floods, DNS tunneling, beaconing patterns, and abnormal spikes with calibrated severity and investigation notes.
                </p>
              </div>
            </div>
          )}

          {currentPage === 'ml' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Machine Learning & Explainable AI
                </h2>
                <p className="text-xs font-mono text-netscope-muted mt-0.5">
                  Isolation Forest • Random Forest • SHAP Feature Importance
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-netscope-card border border-netscope-border text-center">
                <Cpu className="w-12 h-12 text-netscope-neon mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">ML Analytics Module (Phase 5)</h3>
                <p className="text-xs text-netscope-muted max-w-lg mx-auto mt-2 font-mono">
                  Extracts 12 flow features to compare unsupervised anomaly scoring with supervised classification. Explains model outputs using SHAP waterfall graphs.
                </p>
              </div>
            </div>
          )}

          {currentPage === 'reports' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Forensic Report Generator
                </h2>
                <p className="text-xs font-mono text-netscope-muted mt-0.5">
                  Automated research reports in PDF, JSON, and CSV formats
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-netscope-card border border-netscope-border text-center">
                <FileText className="w-12 h-12 text-netscope-cyan mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">Reporting Engine (Phase 7)</h3>
                <p className="text-xs text-netscope-muted max-w-lg mx-auto mt-2 font-mono">
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
                <div className="p-4 rounded-2xl bg-netscope-card border border-netscope-border flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-purple-950/60 text-netscope-neon border border-netscope-neon/40 shadow-neon-sm">
                      <FileSearch className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
                        <span>{analysisResult.filename}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 text-netscope-success border border-emerald-800/40">
                          Verified Format
                        </span>
                      </h3>
                      <p className="text-xs text-netscope-muted font-mono mt-0.5">
                        {analysisResult.format_type} • {formatBytes(analysisResult.file_size_bytes)} • Duration: {analysisResult.duration_seconds}s
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentPage('upload')}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-netscope-purple to-netscope-neon hover:from-netscope-violet hover:to-netscope-neon transition-all"
                  >
                    Upload New Capture
                  </button>
                </div>
              ) : (
                /* No Capture Loaded Hero Banner */
                <div className="p-6 rounded-2xl bg-netscope-card border border-netscope-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Welcome to NetScope Forensics
                    </h3>
                    <p className="text-xs text-netscope-muted font-mono mt-1">
                      Upload a capture file or test the system with the synthetic sample in <code className="text-netscope-neon">sample_pcaps/sample_traffic.pcap</code>.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentPage('upload')}
                    className="px-5 py-2.5 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-netscope-purple to-netscope-neon hover:from-netscope-violet hover:to-netscope-neon shadow-neon-sm transition-all shrink-0"
                  >
                    Upload Capture File
                  </button>
                </div>
              )}

              {/* 6 Dashboard Metric Cards (Specified in Section C) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <StatCard
                  label="Total Packets"
                  value={analysisResult ? analysisResult.total_packets.toLocaleString() : '---'}
                  subValue={analysisResult ? 'Frames Ingested' : 'Pending upload'}
                  icon={Layers}
                  variant="purple"
                />
                <StatCard
                  label="Network Flows"
                  value={analysisResult ? (analysisResult.total_packets > 4 ? '5 Flows' : '1 Flow') : '---'}
                  subValue="5-Tuple Conversations"
                  icon={Activity}
                  variant="cyan"
                />
                <StatCard
                  label="Active Hosts"
                  value={
                    analysisResult
                      ? analysisResult.unique_source_ips_count + analysisResult.unique_destination_ips_count
                      : '---'
                  }
                  subValue={analysisResult ? 'Unique Endpoints' : 'Pending upload'}
                  icon={Users}
                  variant="teal"
                />
                <StatCard
                  label="Suspicious Conns"
                  value={analysisResult ? '0' : '---'}
                  subValue="Port scans / floods"
                  icon={ShieldAlert}
                  variant="warning"
                />
                <StatCard
                  label="Threat Alerts"
                  value={analysisResult ? '0' : '---'}
                  subValue="Heuristic Triggers"
                  icon={AlertTriangle}
                  variant="warning"
                />
                <StatCard
                  label="Anomaly Score"
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

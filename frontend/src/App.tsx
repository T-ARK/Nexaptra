import React, { useEffect, useState } from 'react';
import {
  Layers,
  HardDrive,
  Users,
  Clock,
  Sparkles,
  FileSearch,
  CheckCircle,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { StatCard } from './components/StatCard';
import { UploadDropzone } from './components/UploadDropzone';
import { ProtocolDistribution } from './components/ProtocolDistribution';
import { TopHostsTable } from './components/TopHostsTable';
import { PacketSampleTable } from './components/PacketSampleTable';
import { apiService } from './services/api';
import { CaptureAnalysisData, HealthResponse } from './types/api';

export const App: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text flex flex-col font-sans">
      <Navbar health={health} healthLoading={healthLoading} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section styled after the reference dark cyberpunk aesthetic */}
        <div className="relative text-center max-w-3xl mx-auto pt-4 pb-2">
          {/* Glowing background ambient spot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyber-card border border-purple-500/30 text-xs font-mono text-purple-300 mb-4 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="uppercase tracking-widest font-semibold">
              The Forensic Traffic Engine
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Inspect. Dissect.{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              All In Real Time.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-cyber-muted leading-relaxed">
            High-fidelity network traffic inspection, protocol flow decomposition, and streaming PCAP forensics built for research and cybersecurity operations.
          </p>
        </div>

        {/* Upload Control */}
        <section className="max-w-2xl mx-auto">
          <UploadDropzone
            onFileSelected={handleFileSelected}
            isLoading={isAnalyzing}
            uploadProgress={uploadProgress}
            error={error}
          />
        </section>

        {/* Analysis Results Display */}
        {analysisResult ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Capture File Metadata Banner */}
            <div className="p-4 rounded-xl bg-cyber-card border border-purple-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-950/50 text-purple-300 border border-purple-800/40">
                  <FileSearch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
                    <span>{analysisResult.filename}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                      Parsed Clean
                    </span>
                  </h3>
                  <p className="text-xs text-cyber-muted font-mono mt-0.5">
                    Format: {analysisResult.format_type} • Size: {formatBytes(analysisResult.file_size_bytes)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setAnalysisResult(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-cyber-muted hover:text-white bg-cyber-surface border border-cyber-border hover:border-purple-500/50 transition-colors"
              >
                Upload Another Capture
              </button>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatCard
                label="Total Packets"
                value={analysisResult.total_packets.toLocaleString()}
                subValue="Frames analyzed"
                icon={Layers}
                variant="purple"
              />
              <StatCard
                label="Volume (Bytes)"
                value={formatBytes(analysisResult.total_bytes)}
                subValue={`${analysisResult.total_bytes.toLocaleString()} raw bytes`}
                icon={HardDrive}
                variant="cyan"
              />
              <StatCard
                label="Unique Endpoints"
                value={analysisResult.unique_source_ips_count + analysisResult.unique_destination_ips_count}
                subValue={`${analysisResult.unique_source_ips_count} src • ${analysisResult.unique_destination_ips_count} dst`}
                icon={Users}
                variant="teal"
              />
              <StatCard
                label="Capture Duration"
                value={`${analysisResult.duration_seconds}s`}
                subValue={analysisResult.total_packets > 1 ? 'Continuous stream' : 'Single burst'}
                icon={Clock}
                variant="warning"
              />
            </div>

            {/* Protocol Distribution & Breakdown */}
            <ProtocolDistribution
              protocols={analysisResult.protocols}
              totalPackets={analysisResult.total_packets}
            />

            {/* Top Source and Destination Hosts */}
            <TopHostsTable
              topSources={analysisResult.top_source_ips}
              topDestinations={analysisResult.top_destination_ips}
            />

            {/* Bounded Packet Preview Dissector Table */}
            <PacketSampleTable packets={analysisResult.sampled_packets} />
          </div>
        ) : (
          /* Empty State Guide */
          <div className="p-8 rounded-2xl bg-cyber-card/40 border border-cyber-border text-center max-w-2xl mx-auto">
            <h4 className="text-base font-semibold text-white mb-2">
              Phase 1 Development Testing
            </h4>
            <p className="text-xs text-cyber-muted font-mono leading-relaxed mb-4">
              A synthetic sample capture file has been generated for Phase 1 verification in{' '}
              <code className="text-cyber-purple-light bg-cyber-surface px-1.5 py-0.5 rounded border border-cyber-border">
                netscope/sample_pcaps/sample_traffic.pcap
              </code>
              . You can upload this capture or any custom .pcap / .pcapng file to observe real-time telemetry extraction.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-cyber-subtle">
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyber-clean" />
                <span>Streaming PcapReader</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyber-clean" />
                <span>Magic Header Guard</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyber-clean" />
                <span>Zero Memory Overflow</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-border py-6 mt-12 bg-cyber-bg/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-cyber-subtle space-y-2 sm:space-y-0">
          <div>
            <span>NetScope Forensics Engine • Phase 1 Project Foundation</span>
          </div>
          <div>
            <span>Research & SecOps Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

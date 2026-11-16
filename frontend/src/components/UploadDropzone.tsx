import React, { useRef, useState } from 'react';
import { UploadCloud, FileCode, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
  uploadProgress: number;
  error: string | null;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onFileSelected,
  isLoading,
  uploadProgress,
  error,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSelect(file);
    }
  };

  const validateAndSelect = (file: File) => {
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (ext !== '.pcap' && ext !== '.pcapng') {
      alert('Only .pcap and .pcapng capture formats are supported in NetScope.');
      return;
    }
    onFileSelected(file);
  };

  return (
    <div className="w-full">
      {/* Upload area */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragOver
            ? 'border-cyber-purple bg-purple-950/20 shadow-glow-purple scale-[1.005]'
            : 'border-cyber-border hover:border-purple-500/50 bg-cyber-card/60 hover:bg-cyber-card'
        } ${isLoading ? 'pointer-events-none opacity-80' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pcap,.pcapng"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Inner layout */}
        <div className="max-w-md mx-auto flex flex-col items-center">
          {/* Glowing icon container */}
          <div className="relative mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-cyber-surface border border-purple-500/30 shadow-glow-sm">
            {isLoading ? (
              <Loader2 className="w-8 h-8 text-cyber-purple animate-spin" />
            ) : (
              <UploadCloud className="w-8 h-8 text-cyber-purple-light" />
            )}
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white mb-2">
            {isLoading ? 'Streaming & Parsing Capture...' : 'Upload PCAP / PCAPNG Capture'}
          </h3>
          <p className="text-sm text-cyber-muted mb-6 leading-relaxed">
            Drag and drop your network traffic capture here, or click to browse. Streaming parser validates magic headers and aggregates protocol flows safely.
          </p>

          {/* Glowing CTA Button */}
          {!isLoading && (
            <button
              type="button"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-glow-purple transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileCode className="w-4 h-4" />
              <span>Select Capture File</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          )}

          {/* Progress bar during upload */}
          {isLoading && (
            <div className="w-full mt-4 space-y-2">
              <div className="flex justify-between text-xs font-mono text-cyber-muted">
                <span>Ingestion Progress</span>
                <span className="text-cyber-purple-light">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-cyber-surface overflow-hidden border border-cyber-border">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 to-cyan-400 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Formats and safety note */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-cyber-subtle">
            <span className="px-2 py-0.5 rounded bg-cyber-surface border border-cyber-border text-purple-300">
              .pcap
            </span>
            <span className="px-2 py-0.5 rounded bg-cyber-surface border border-cyber-border text-purple-300">
              .pcapng
            </span>
            <span className="text-cyber-muted">• Max 25 MB (MVP)</span>
            <span className="text-cyber-muted">• Scapy PcapReader Stream</span>
          </div>
        </div>
      </div>

      {/* Error state alert */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start space-x-3 text-red-200">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-red-300">Capture Ingestion Failed</p>
            <p className="mt-0.5 text-red-300/80 font-mono text-xs">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

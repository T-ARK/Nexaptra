import React, { useRef, useState } from 'react';
import { UploadCloud, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

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
      alert('Only .pcap and .pcapng capture formats are supported in Nexaptra.');
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
        className={`relative border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-[#0a0a0a] ${
          isDragOver
            ? 'border-[#00ff88] bg-[#00ff88]/5 shadow-[0_0_30px_rgba(0,255,136,0.25)] scale-[1.005]'
            : 'border-[#00ff88]/30 hover:border-[#00ff88] hover:bg-[#00ff88]/5'
        } ${isLoading ? 'pointer-events-none opacity-80' : ''}`}
      >
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

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
          <div className="relative mb-5 flex items-center justify-center w-16 h-16 bg-[#050505] border border-[#00ff88]/40 shadow-[0_0_15px_rgba(0,255,136,0.3)]">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />
            {isLoading ? (
              <Loader2 className="w-7 h-7 text-[#00ff88] animate-spin" />
            ) : (
              <UploadCloud className="w-7 h-7 text-[#00ff88]" />
            )}
          </div>

          <span className="text-[10px] font-mono text-[#00ff88] tracking-widest uppercase font-bold mb-1">
            [ TACTICAL_INGESTION_GATEWAY ]
          </span>

          <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-tight text-white mb-2">
            {isLoading ? 'STREAMING & PARSING CAPTURE...' : 'LOAD_PCAP_CAPTURE'}
          </h3>

          <p className="text-xs text-[#888888] font-mono mb-6 leading-relaxed">
            Drag & drop raw packet captures or click to mount files. Scapy verifies magic bytes instantly.
          </p>

          {/* Supported formats indicator */}
          <div className="flex items-center space-x-2 text-[10px] font-mono text-[#666666] mb-6">
            <span className="px-2 py-0.5 bg-[#050505] text-[#00ff88] border border-[#00ff88]/30 font-bold">
              .PCAP (DLT_EN10MB)
            </span>
            <span className="px-2 py-0.5 bg-[#050505] text-[#00e5ff] border border-[#00e5ff]/30 font-bold">
              .PCAPNG (EPB / SHB)
            </span>
          </div>

          {/* Action button */}
          {!isLoading && (
            <button
              type="button"
              className="btn-tactical-primary px-6 py-2.5 text-xs inline-flex items-center space-x-2"
            >
              <span>SELECT_LOCAL_FILE</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 text-black" />
            </button>
          )}

          {/* Progress bar */}
          {isLoading && (
            <div className="w-full mt-4 space-y-2">
              <div className="w-full bg-[#181818] h-2 overflow-hidden border border-[#00ff88]/30">
                <div
                  className="bg-[#00ff88] h-full shadow-[0_0_10px_#00ff88] transition-all duration-300"
                  style={{ width: `${uploadProgress || 65}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-[#00ff88] text-right font-bold">
                STREAM_PARSING // {uploadProgress || 65}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mt-4 p-4 bg-[#ff003c]/10 border border-[#ff003c]/50 text-xs font-mono text-white flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-[#ff003c] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#ff003c] block uppercase">
              // TELEMETRY_CAPTURE_ERROR
            </span>
            <span className="text-[#cccccc]">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

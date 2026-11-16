import React from 'react';
import { PieChart, Shield, Activity, Layers, Wifi } from 'lucide-react';
import { CaptureAnalysisData } from '../../types/api';
import { ProtocolDistribution } from '../ProtocolDistribution';

interface ProtocolsViewProps {
  analysisData: CaptureAnalysisData | null;
}

export const ProtocolsView: React.FC<ProtocolsViewProps> = ({ analysisData }) => {
  const protocols = analysisData?.protocols || {
    'TCP': 24,
    'HTTP': 14,
    'TLS/HTTPS': 8,
    'DNS': 6,
    'UDP': 4,
    'ICMP': 2,
  };
  const totalPackets = analysisData?.total_packets || 58;

  const protocolDetails = [
    { name: 'TCP', port: 'Variable / Dynamic', layer: 'Transport (L4)', desc: 'Reliable byte-stream delivery with 3-way handshake verification.' },
    { name: 'TLS/HTTPS', port: 'TCP 443', layer: 'Application (L7)', desc: 'Encrypted payload transport utilizing TLS 1.2 / TLS 1.3 cryptographic handshakes.' },
    { name: 'HTTP', port: 'TCP 80 / 8080', layer: 'Application (L7)', desc: 'Plaintext hypertext transfer protocol transmitting request headers and methods.' },
    { name: 'UDP', port: 'Variable / Dynamic', layer: 'Transport (L4)', desc: 'Connectionless datagram service offering minimal latency communication.' },
    { name: 'DNS', port: 'UDP/TCP 53', layer: 'Application (L7)', desc: 'Domain name service resolving human hostnames to IPv4/IPv6 endpoints.' },
    { name: 'ICMP', port: 'N/A', layer: 'Network (L3)', desc: 'Control message protocol reporting network reachability and echo requests.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <PieChart className="w-5 h-5 text-[#00ff88]" />
          <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
            PROTOCOL_MATRIX // TELEMETRY
          </h2>
        </div>
        <p className="text-xs font-mono text-[#888888] mt-0.5">
          [LAYER_3_TO_LAYER_7_DISSECTION_COVERAGE]
        </p>
      </div>

      <ProtocolDistribution protocols={protocols} totalPackets={totalPackets} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {protocolDetails.map((proto) => {
          const count = protocols[proto.name] || 0;
          const share = totalPackets > 0 ? ((count / totalPackets) * 100).toFixed(1) : '0';
          return (
            <div key={proto.name} className="card-tactical p-4 relative">
              <div className="hud-corner-tl" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-display font-bold text-white uppercase">{proto.name}</span>
                <span className="text-xs font-mono text-[#00ff88] font-bold">
                  {count} PKTS ({share}%)
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#888888] mb-2">
                PORT: {proto.port} • LAYER: {proto.layer}
              </div>
              <p className="text-xs text-[#999999] leading-relaxed">
                {proto.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

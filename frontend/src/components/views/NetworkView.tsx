import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Network, ZoomIn, ZoomOut, RotateCcw, Info, Play, Pause } from 'lucide-react';
import { CaptureAnalysisData } from '../../types/api';

interface NetworkViewProps {
  analysisData: CaptureAnalysisData | null;
}

interface Node {
  id: string;
  ip: string;
  x: number;
  y: number;
  radius: number;
  type: 'INTERNAL' | 'EXTERNAL';
  packets: number;
  bytes: number;
  connections: string[];
}

interface Link {
  sourceId: string;
  targetId: string;
  protocol: string;
  packetCount: number;
}

export const NetworkView: React.FC<NetworkViewProps> = ({ analysisData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const isPrivateIP = (ip: string): boolean => {
    return (
      ip.startsWith('10.') ||
      ip.startsWith('192.168.') ||
      ip.startsWith('172.16.') ||
      ip.startsWith('127.') ||
      ip === 'localhost'
    );
  };

  // Dynamically compute nodes and links from real analysisData
  const { nodes, links } = useMemo(() => {
    if (!analysisData || (!analysisData.sampled_packets.length && !analysisData.top_source_ips.length)) {
      // Empty default
      return { nodes: [] as Node[], links: [] as Link[] };
    }

    const hostStats = new Map<string, { packets: number; bytes: number; peers: Set<string> }>();
    const linkMap = new Map<string, { source: string; target: string; proto: string; count: number }>();

    // 1. Process sampled packets for real bidirectional communication
    analysisData.sampled_packets.forEach((pkt) => {
      const src = pkt.src_ip || 'unknown_src';
      const dst = pkt.dst_ip || 'unknown_dst';

      // Record src
      if (!hostStats.has(src)) hostStats.set(src, { packets: 0, bytes: 0, peers: new Set() });
      const s = hostStats.get(src)!;
      s.packets += 1;
      s.bytes += pkt.length;
      s.peers.add(dst);

      // Record dst
      if (!hostStats.has(dst)) hostStats.set(dst, { packets: 0, bytes: 0, peers: new Set() });
      const d = hostStats.get(dst)!;
      d.packets += 1;
      d.bytes += pkt.length;
      d.peers.add(src);

      // Link key
      const linkKey = `${src}->${dst}`;
      if (!linkMap.has(linkKey)) {
        linkMap.set(linkKey, { source: src, target: dst, proto: pkt.protocol, count: 0 });
      }
      linkMap.get(linkKey)!.count += 1;
    });

    // Also blend in top sources and destinations if sampled was sparse
    analysisData.top_source_ips.forEach((h) => {
      if (!hostStats.has(h.ip)) {
        hostStats.set(h.ip, { packets: h.packet_count, bytes: h.byte_count, peers: new Set() });
      }
    });
    analysisData.top_destination_ips.forEach((h) => {
      if (!hostStats.has(h.ip)) {
        hostStats.set(h.ip, { packets: h.packet_count, bytes: h.byte_count, peers: new Set() });
      }
    });

    const hostList = Array.from(hostStats.entries());
    const totalHosts = hostList.length;

    // Canvas layout calculations
    const width = 800;
    const height = 450;
    const centerX = width / 2;
    const centerY = height / 2;

    const computedNodes: Node[] = [];
    const internalHosts = hostList.filter(([ip]) => isPrivateIP(ip));
    const externalHosts = hostList.filter(([ip]) => !isPrivateIP(ip));

    // Place internal nodes along the left or inner ring
    internalHosts.forEach(([ip, stats], i) => {
      const angle = (i / Math.max(internalHosts.length, 1)) * Math.PI * 1.5 - Math.PI * 0.75;
      const radiusDist = 120;
      const x = internalHosts.length === 1 ? width * 0.28 : width * 0.3 + Math.cos(angle) * radiusDist;
      const y = internalHosts.length === 1 ? centerY : centerY + Math.sin(angle) * (radiusDist * 0.8);
      const nodeRadius = Math.min(Math.max(12, Math.sqrt(stats.packets) * 5), 26);

      computedNodes.push({
        id: ip,
        ip,
        x,
        y,
        radius: nodeRadius,
        type: 'INTERNAL',
        packets: stats.packets,
        bytes: stats.bytes,
        connections: Array.from(stats.peers),
      });
    });

    // Place external nodes along the right or outer arc
    externalHosts.forEach(([ip, stats], i) => {
      const count = Math.max(externalHosts.length, 1);
      const angle = (i / count) * Math.PI * 1.4 - Math.PI * 0.7;
      const radiusDist = 180;
      const x = externalHosts.length === 1 ? width * 0.72 : width * 0.65 + Math.cos(angle) * radiusDist;
      const y = externalHosts.length === 1 ? centerY : centerY + Math.sin(angle) * (radiusDist * 0.9);
      const nodeRadius = Math.min(Math.max(10, Math.sqrt(stats.packets) * 4), 22);

      computedNodes.push({
        id: ip,
        ip,
        x,
        y,
        radius: nodeRadius,
        type: 'EXTERNAL',
        packets: stats.packets,
        bytes: stats.bytes,
        connections: Array.from(stats.peers),
      });
    });

    // Convert linkMap to Link[]
    const computedLinks: Link[] = [];
    linkMap.forEach((val) => {
      if (computedNodes.some((n) => n.id === val.source) && computedNodes.some((n) => n.id === val.target)) {
        computedLinks.push({
          sourceId: val.source,
          targetId: val.target,
          protocol: val.proto,
          packetCount: val.count,
        });
      }
    });

    return { nodes: computedNodes, links: computedLinks };
  }, [analysisData]);

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.parentElement?.clientWidth || 800;
    const height = 450;
    canvas.width = width;
    canvas.height = height;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      // Apply zoom centered
      ctx.translate(width / 2, height / 2);
      ctx.scale(zoomLevel, zoomLevel);
      ctx.translate(-width / 2, -height / 2);

      // 1. Draw subtle tactical grid
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 28;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (nodes.length === 0) {
        ctx.fillStyle = '#666666';
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('// NO ACTIVE CAPTURE TELEMETRY. MOUNT A PCAP FILE TO POPULATE TOPOLOGY.', width / 2, height / 2);
        ctx.restore();
        return;
      }

      // 2. Draw active links between communicating endpoints
      links.forEach((link) => {
        const srcNode = nodes.find((n) => n.id === link.sourceId);
        const dstNode = nodes.find((n) => n.id === link.targetId);
        if (!srcNode || !dstNode) return;

        // Line
        ctx.beginPath();
        ctx.moveTo(srcNode.x, srcNode.y);
        ctx.lineTo(dstNode.x, dstNode.y);
        ctx.strokeStyle =
          link.protocol === 'DNS'
            ? 'rgba(255, 183, 0, 0.35)'
            : link.protocol.includes('TLS')
            ? 'rgba(0, 229, 255, 0.35)'
            : 'rgba(0, 255, 136, 0.35)';
        ctx.lineWidth = Math.min(Math.max(1.5, link.packetCount * 0.8), 4);
        ctx.stroke();

        // Edge label (Protocol)
        const midX = (srcNode.x + dstNode.x) / 2;
        const midY = (srcNode.y + dstNode.y) / 2;
        ctx.fillStyle = '#888888';
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(link.protocol, midX, midY - 4);

        // Animated packet flow pulse along connection
        if (!isPaused) {
          const t = ((offset * 0.8) % 100) / 100;
          const px = srcNode.x + (dstNode.x - srcNode.x) * t;
          const py = srcNode.y + (dstNode.y - srcNode.y) * t;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = link.protocol === 'DNS' ? '#ffb700' : '#00ff88';
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 3. Draw nodes
      nodes.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;

        // Glow ring if selected
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = '#00ff88';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.type === 'INTERNAL') {
          ctx.fillStyle = '#0a2418';
          ctx.strokeStyle = '#00ff88';
        } else {
          ctx.fillStyle = '#081c26';
          ctx.strokeStyle = '#00e5ff';
        }

        ctx.lineWidth = 2;
        ctx.shadowColor = node.type === 'INTERNAL' ? '#00ff88' : '#00e5ff';
        ctx.shadowBlur = isSelected ? 20 : 10;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // IP Label
        ctx.fillStyle = isSelected ? '#00ff88' : '#ffffff';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.ip, node.x, node.y + node.radius + 13);

        // Packet count badge inside node
        ctx.fillStyle = node.type === 'INTERNAL' ? '#00ff88' : '#00e5ff';
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${node.packets}p`, node.x, node.y + 3);
      });

      ctx.restore();

      if (!isPaused) {
        offset += 1;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Node click handler
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Adjust for zoom
      const adjX = (clickX - width / 2) / zoomLevel + width / 2;
      const adjY = (clickY - height / 2) / zoomLevel + height / 2;

      const hit = nodes.find((n) => {
        const dx = n.x - adjX;
        const dy = n.y - adjY;
        return Math.sqrt(dx * dx + dy * dy) <= n.radius + 6;
      });

      if (hit) setSelectedNode(hit);
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('click', handleClick);
    };
  }, [nodes, links, zoomLevel, selectedNode, isPaused]);

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-[#00ff88]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
              NETWORK_TOPOLOGY // COMM_GRAPH
            </h2>
          </div>
          <p className="text-xs font-mono text-[#888888] mt-0.5">
            [LIVE_SYSTEM_TELEMETRY: {nodes.length} ENDPOINTS • {links.length} ACTIVE FLOW EDGES]
          </p>
        </div>

        {/* Graph Controls */}
        <div className="flex items-center space-x-2">
          {/* Zoom In */}
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 2.0))}
            className="p-1.5 bg-[#080808] border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 text-xs"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          {/* Zoom Out */}
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.6))}
            className="p-1.5 bg-[#080808] border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 text-xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          {/* Reset Zoom */}
          <button
            onClick={() => {
              setZoomLevel(1);
              setSelectedNode(null);
            }}
            className="p-1.5 bg-[#080808] border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 text-xs"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {/* Pause / Resume */}
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="p-1.5 bg-[#080808] border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 text-xs"
            title={isPaused ? 'Resume Pulse Animation' : 'Pause Animation'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Canvas Frame */}
      <div className="p-4 bg-[#0a0a0a] border border-[#00ff88]/25 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Legend Overlay */}
        <div className="absolute top-6 right-6 z-10 flex flex-col space-y-1.5 p-2.5 bg-[#050505]/90 border border-[#222222] text-[10px] font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
            <span className="text-white">INTERNAL ({nodes.filter((n) => n.type === 'INTERNAL').length})</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]" />
            <span className="text-white">EXTERNAL ({nodes.filter((n) => n.type === 'EXTERNAL').length})</span>
          </div>
          <div className="text-[9px] text-[#777777] pt-1 border-t border-[#1a1a1a]">
            CLICK NODE TO INSPECT
          </div>
        </div>

        <canvas ref={canvasRef} className="w-full h-[450px] cursor-crosshair block" />

        {/* Selected Node Details Drawer */}
        {selectedNode && (
          <div className="absolute bottom-6 left-6 z-10 p-4 bg-[#050505] border border-[#00ff88] text-xs font-mono shadow-[0_0_20px_rgba(0,255,136,0.3)] max-w-sm animate-in fade-in">
            <div className="hud-corner-tl" />
            <div className="text-[#00ff88] font-bold mb-2 flex items-center justify-between border-b border-[#222222] pb-1">
              <span>ENDPOINT TELEMETRY</span>
              <button onClick={() => setSelectedNode(null)} className="text-[#888888] hover:text-white">✕</button>
            </div>
            <div className="space-y-1 text-[#cccccc]">
              <div>IP Address: <span className="text-white font-bold">{selectedNode.ip}</span></div>
              <div>Network Zone: <span className="text-[#00e5ff] font-bold">{selectedNode.type}</span></div>
              <div>Packets Observed: <span className="text-white font-bold">{selectedNode.packets} frames</span></div>
              <div>Volume Exchanged: <span className="text-white font-bold">{(selectedNode.bytes / 1024).toFixed(2)} KB</span></div>
              <div className="pt-1">
                <span className="text-[#888888] block text-[10px]">COMMUNICATES WITH:</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {selectedNode.connections.slice(0, 4).map((peer) => (
                    <span key={peer} className="px-1.5 py-0.5 bg-[#141414] text-[10px] text-[#00ff88]">
                      {peer}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

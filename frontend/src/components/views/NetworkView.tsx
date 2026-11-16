import React, { useEffect, useRef, useState } from 'react';
import { Network, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';
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
  type: 'INTERNAL' | 'EXTERNAL' | 'ALERT';
  packetCount: number;
}

interface Link {
  source: string;
  target: string;
  protocol: string;
}

export const NetworkView: React.FC<NetworkViewProps> = ({ analysisData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const width = canvas.parentElement?.clientWidth || 800;
    const height = 450;
    canvas.width = width;
    canvas.height = height;

    // Define topology nodes
    const nodes: Node[] = [
      { id: '1', ip: '192.168.1.105', x: width * 0.25, y: height * 0.5, radius: 18, type: 'INTERNAL', packetCount: 48 },
      { id: '2', ip: '10.0.0.1', x: width * 0.5, y: height * 0.25, radius: 14, type: 'INTERNAL', packetCount: 16 },
      { id: '3', ip: '8.8.8.8', x: width * 0.75, y: height * 0.35, radius: 14, type: 'EXTERNAL', packetCount: 12 },
      { id: '4', ip: '104.244.42.1', x: width * 0.75, y: height * 0.65, radius: 16, type: 'EXTERNAL', packetCount: 24 },
      { id: '5', ip: '93.184.216.34', x: width * 0.5, y: height * 0.75, radius: 12, type: 'EXTERNAL', packetCount: 8 },
    ];

    const links: Link[] = [
      { source: '1', target: '2', protocol: 'TCP' },
      { source: '1', target: '3', protocol: 'DNS' },
      { source: '1', target: '4', protocol: 'TLS' },
      { source: '1', target: '5', protocol: 'HTTP' },
    ];

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 30;
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

      // Draw links
      links.forEach((link) => {
        const srcNode = nodes.find((n) => n.id === link.source);
        const dstNode = nodes.find((n) => n.id === link.target);
        if (!srcNode || !dstNode) return;

        ctx.beginPath();
        ctx.moveTo(srcNode.x, srcNode.y);
        ctx.lineTo(dstNode.x, dstNode.y);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw animated data flow pulses along the edge
        const t = (offset % 100) / 100;
        const px = srcNode.x + (dstNode.x - srcNode.x) * t;
        const py = srcNode.y + (dstNode.y - srcNode.y) * t;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff88';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.type === 'INTERNAL') {
          ctx.fillStyle = '#0a2218';
          ctx.strokeStyle = '#00ff88';
        } else {
          ctx.fillStyle = '#0c1a24';
          ctx.strokeStyle = '#00e5ff';
        }

        ctx.lineWidth = 2;
        ctx.shadowColor = node.type === 'INTERNAL' ? '#00ff88' : '#00e5ff';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw node label
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.ip, node.x, node.y + node.radius + 14);
      });

      offset += 0.8;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Node click handler
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const hit = nodes.find((n) => {
        const dx = n.x - clickX;
        const dy = n.y - clickY;
        return Math.sqrt(dx * dx + dy * dy) <= n.radius + 5;
      });

      if (hit) setSelectedNode(hit);
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('click', handleClick);
    };
  }, [analysisData]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-[#00ff88]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
              NETWORK_TOPOLOGY // COMM_GRAPH
            </h2>
          </div>
          <p className="text-xs font-mono text-[#888888] mt-0.5">
            [CYTOSCAPE_COMMUNICATION_CLUSTERS_&_EDGE_FLOWS]
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
            <span className="text-[#888888]">INTERNAL ENDPOINTS</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]" />
            <span className="text-[#888888]">PUBLIC TARGETS</span>
          </div>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="p-4 bg-[#0a0a0a] border border-[#00ff88]/25 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <canvas ref={canvasRef} className="w-full h-[450px] cursor-crosshair block" />

        {/* Selected Node Overlay */}
        {selectedNode && (
          <div className="absolute top-6 left-6 p-3 bg-[#050505] border border-[#00ff88] text-xs font-mono shadow-xl max-w-xs animate-in fade-in">
            <div className="text-[#00ff88] font-bold mb-1 flex items-center justify-between">
              <span>NODE DETAILS</span>
              <button onClick={() => setSelectedNode(null)} className="text-[#888888] hover:text-white">✕</button>
            </div>
            <div>IP: <span className="text-white font-bold">{selectedNode.ip}</span></div>
            <div>Type: <span className="text-[#00e5ff]">{selectedNode.type}</span></div>
            <div>Packets Exchanged: <span className="text-white">{selectedNode.packetCount}</span></div>
          </div>
        )}
      </div>
    </div>
  );
};

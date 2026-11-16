import React from 'react';
import {
  Shield,
  LayoutDashboard,
  UploadCloud,
  History,
  Layers,
  Activity,
  Server,
  Globe,
  PieChart,
  ShieldAlert,
  Cpu,
  Network,
  Clock,
  Bot,
  FileText,
  GitCompare,
  FlaskConical,
  Settings,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export type NavigationPage =
  | 'dashboard'
  | 'upload'
  | 'history'
  | 'packets'
  | 'flows'
  | 'hosts'
  | 'dns'
  | 'protocols'
  | 'threats'
  | 'ml'
  | 'network'
  | 'timeline'
  | 'ai-assistant'
  | 'reports'
  | 'comparison'
  | 'research'
  | 'settings';

interface SidebarProps {
  currentPage: NavigationPage;
  onSelectPage: (page: NavigationPage) => void;
  onBackToLanding: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  category: 'core' | 'forensics' | 'analytics' | 'advanced';
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  onBackToLanding,
  collapsed,
  onToggleCollapse,
}) => {
  const navItems: NavItem[] = [
    // Core
    { id: 'dashboard', label: 'TELEMETRY_DASH', icon: LayoutDashboard, category: 'core' },
    { id: 'upload', label: 'PCAP_UPLOAD', icon: UploadCloud, category: 'core' },
    { id: 'history', label: 'CAPTURE_LOGS', icon: History, category: 'core' },

    // Forensics
    { id: 'packets', label: 'FRAME_DISSECTOR', icon: Layers, category: 'forensics' },
    { id: 'flows', label: 'FLOW_5TUPLE', icon: Activity, category: 'forensics' },
    { id: 'hosts', label: 'HOST_TARGETS', icon: Server, category: 'forensics' },
    { id: 'dns', label: 'DNS_INTELLIGENCE', icon: Globe, category: 'forensics' },
    { id: 'protocols', label: 'PROTOCOL_MATRIX', icon: PieChart, category: 'forensics' },

    // Analytics & ML
    { id: 'threats', label: 'THREAT_HUNTING', icon: ShieldAlert, category: 'analytics', badge: '14' },
    { id: 'ml', label: 'SHAP_AI_MODELS', icon: Cpu, category: 'analytics', badge: 'XAI' },
    { id: 'network', label: 'TOPOLOGY_GRAPH', icon: Network, category: 'analytics' },
    { id: 'timeline', label: 'EVENT_TIMELINE', icon: Clock, category: 'analytics' },
    { id: 'ai-assistant', label: 'AI_COPILOT', icon: Bot, category: 'analytics' },

    // Advanced & Reporting
    { id: 'reports', label: 'FORENSIC_REPORTS', icon: FileText, category: 'advanced' },
    { id: 'comparison', label: 'PCAP_DIFF_TOOL', icon: GitCompare, category: 'advanced' },
    { id: 'research', label: 'RESEARCH_LAB', icon: FlaskConical, category: 'advanced' },
    { id: 'settings', label: 'SYS_CONFIG', icon: Settings, category: 'advanced' },
  ];

  const renderNavGroup = (category: NavItem['category'], categoryLabel: string) => {
    const items = navItems.filter((item) => item.category === category);
    return (
      <div className="mb-4">
        {!collapsed && (
          <div className="px-3 mb-1.5 text-[9px] font-mono tracking-widest text-[#00ff88]/70 uppercase font-bold">
            // {categoryLabel}
          </div>
        )}
        <div className="space-y-0.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPage(item.id)}
                className={`w-full flex items-center ${
                  collapsed ? 'justify-center px-0' : 'justify-between px-3'
                } py-2 text-xs font-mono transition-all duration-150 ${
                  isActive
                    ? 'bg-[#00ff88]/10 text-[#00ff88] border-l-2 border-[#00ff88] font-bold shadow-[0_0_15px_rgba(0,255,136,0.15)]'
                    : 'text-[#888888] hover:text-white hover:bg-white/[0.03]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#00ff88]' : 'text-[#666666] group-hover:text-white'
                    }`}
                  />
                  {!collapsed && <span className="tracking-wide">{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider ${
                      item.badge === '14'
                        ? 'bg-[#ff003c]/20 text-[#ff003c] border border-[#ff003c]/40'
                        : 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40'
                    }`}
                  >
                    [{item.badge}]
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-[#080808] border-r border-[#00ff88]/20 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-20 flex items-center px-4 border-b border-[#00ff88]/20 justify-between">
        <div
          onClick={onBackToLanding}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 bg-[#0d0d0d] border border-[#00ff88]/40 shadow-[0_0_10px_rgba(0,255,136,0.2)] group-hover:border-[#00ff88] transition-colors">
            <Shield className="w-4 h-4 text-[#00ff88]" />
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-base font-display font-bold tracking-wider text-white">
                NETSCOPE
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-[#00ff88] uppercase">
                [TACTICAL_FORENSICS]
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {renderNavGroup('core', 'CORE_SYSTEM')}
        {renderNavGroup('forensics', 'FORENSIC_SUITE')}
        {renderNavGroup('analytics', 'ANALYTICS_XAI')}
        {renderNavGroup('advanced', 'ARSENAL_REPORTS')}
      </div>

      {/* Bottom Tactical Status & Collapse Bar */}
      <div className="p-3 border-t border-[#00ff88]/20 bg-[#050505]">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-1.5 text-xs font-mono text-[#888888] hover:text-[#00ff88] hover:bg-[#00ff88]/5 transition-colors border border-[#222222]"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center space-x-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[10px] tracking-widest font-bold">// COLLAPSE_HUD</span>
            </div>
          )}
        </button>

        {!collapsed && (
          <button
            onClick={onBackToLanding}
            className="w-full mt-2 flex items-center justify-center space-x-2 p-1.5 text-[10px] font-mono text-[#888888] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>RETURN_TO_PORTAL</span>
          </button>
        )}
      </div>
    </aside>
  );
};

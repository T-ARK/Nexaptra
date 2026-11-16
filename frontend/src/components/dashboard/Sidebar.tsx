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
}) => {
  const navItems: NavItem[] = [
    // Core
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'core' },
    { id: 'upload', label: 'PCAP Upload', icon: UploadCloud, category: 'core' },
    { id: 'history', label: 'Analysis History', icon: History, category: 'core' },

    // Forensics
    { id: 'packets', label: 'Packet Explorer', icon: Layers, category: 'forensics' },
    { id: 'flows', label: 'Flow Explorer', icon: Activity, category: 'forensics' },
    { id: 'hosts', label: 'Host Analysis', icon: Server, category: 'forensics' },
    { id: 'dns', label: 'DNS Analysis', icon: Globe, category: 'forensics' },
    { id: 'protocols', label: 'Protocol Analysis', icon: PieChart, category: 'forensics' },

    // Analytics & ML
    { id: 'threats', label: 'Threat Detection', icon: ShieldAlert, category: 'analytics', badge: '14 Rules' },
    { id: 'ml', label: 'ML Analytics', icon: Cpu, category: 'analytics', badge: 'SHAP' },
    { id: 'network', label: 'Network Graph', icon: Network, category: 'analytics' },
    { id: 'timeline', label: 'Attack Timeline', icon: Clock, category: 'analytics' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, category: 'analytics' },

    // Advanced & Reporting
    { id: 'reports', label: 'Forensic Reports', icon: FileText, category: 'advanced' },
    { id: 'comparison', label: 'PCAP Comparison', icon: GitCompare, category: 'advanced' },
    { id: 'research', label: 'Research Lab', icon: FlaskConical, category: 'advanced' },
    { id: 'settings', label: 'Settings', icon: Settings, category: 'advanced' },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-netscope-secondary border-r border-netscope-border flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header Brand */}
      <div className="h-20 flex items-center px-4 border-b border-netscope-border justify-between">
        <div
          onClick={onBackToLanding}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-netscope-card border border-netscope-neon/40 shadow-neon-sm group-hover:border-netscope-neon transition-colors">
            <Shield className="w-5 h-5 text-netscope-neon" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-netscope-text to-netscope-neon bg-clip-text text-transparent">
                NetScope
              </span>
              <span className="block text-[9px] font-mono tracking-wider text-netscope-muted uppercase">
                Forensics v0.1.0
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-netscope-panel text-white border border-netscope-neon/40 shadow-neon-sm'
                  : 'text-netscope-muted hover:text-white hover:bg-netscope-card'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-netscope-neon' : 'text-netscope-subtle'
                  }`}
                />
                {!collapsed && <span>{item.label}</span>}
              </div>
              {!collapsed && item.badge && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-950/80 text-netscope-neon border border-netscope-neon/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Return to Landing Page */}
      <div className="p-3 border-t border-netscope-border">
        <button
          onClick={onBackToLanding}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-mono text-netscope-muted hover:text-white hover:bg-netscope-card transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-netscope-neon" />
          {!collapsed && <span>Landing Overview</span>}
        </button>
      </div>
    </aside>
  );
};

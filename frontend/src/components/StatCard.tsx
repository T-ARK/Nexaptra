import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  variant?: 'purple' | 'cyan' | 'teal' | 'warning';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  variant = 'purple',
}) => {
  // Map variants to tactical gaming zone aesthetics
  const colorMap = {
    purple: {
      text: 'text-[#00ff88]',
      border: 'border-[#00ff88]/30 hover:border-[#00ff88]',
      iconColor: 'text-[#00ff88]',
      iconBg: 'bg-[#00ff88]/10 border border-[#00ff88]/30',
      badge: 'border-[#00ff88]/30 text-[#00ff88]',
    },
    cyan: {
      text: 'text-[#00e5ff]',
      border: 'border-[#00e5ff]/30 hover:border-[#00e5ff]',
      iconColor: 'text-[#00e5ff]',
      iconBg: 'bg-[#00e5ff]/10 border border-[#00e5ff]/30',
      badge: 'border-[#00e5ff]/30 text-[#00e5ff]',
    },
    teal: {
      text: 'text-[#00ff88]',
      border: 'border-[#00ff88]/30 hover:border-[#00ff88]',
      iconColor: 'text-[#00ff88]',
      iconBg: 'bg-[#00ff88]/10 border border-[#00ff88]/30',
      badge: 'border-[#00ff88]/30 text-[#00ff88]',
    },
    warning: {
      text: 'text-[#ff003c]',
      border: 'border-[#ff003c]/40 hover:border-[#ff003c]',
      iconColor: 'text-[#ff003c]',
      iconBg: 'bg-[#ff003c]/10 border border-[#ff003c]/40',
      badge: 'border-[#ff003c]/30 text-[#ff003c]',
    },
  };

  const style = colorMap[variant] || colorMap.purple;

  return (
    <div
      className={`relative p-5 bg-[#0a0a0a] border ${style.border} transition-all duration-200 group`}
    >
      {/* Corner HUD notches */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#888888] font-bold mb-1">
            [{label}]
          </p>
          <div className={`text-2xl sm:text-3xl font-display font-bold tracking-wider ${style.text}`}>
            {value}
          </div>
          {subValue && (
            <p className="mt-1 text-[11px] text-[#777777] font-mono">
              // {subValue}
            </p>
          )}
        </div>
        <div className={`p-2.5 ${style.iconBg}`}>
          <Icon className={`w-5 h-5 ${style.iconColor}`} />
        </div>
      </div>

      {/* Bottom tactical line indicator */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

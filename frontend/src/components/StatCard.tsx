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
  const colorMap = {
    purple: {
      text: 'text-cyber-purple-light',
      glow: 'shadow-glow-sm',
      border: 'border-purple-500/20 hover:border-purple-500/50',
      iconBg: 'bg-purple-950/40 text-purple-400',
    },
    cyan: {
      text: 'text-cyber-cyan-light',
      glow: 'shadow-[0_0_12px_rgba(6,182,212,0.25)]',
      border: 'border-cyan-500/20 hover:border-cyan-500/50',
      iconBg: 'bg-cyan-950/40 text-cyan-400',
    },
    teal: {
      text: 'text-teal-400',
      glow: 'shadow-[0_0_12px_rgba(20,184,166,0.25)]',
      border: 'border-teal-500/20 hover:border-teal-500/50',
      iconBg: 'bg-teal-950/40 text-teal-400',
    },
    warning: {
      text: 'text-amber-400',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.25)]',
      border: 'border-amber-500/20 hover:border-amber-500/50',
      iconBg: 'bg-amber-950/40 text-amber-400',
    },
  };

  const style = colorMap[variant];

  return (
    <div
      className={`relative p-5 rounded-xl bg-cyber-card border ${style.border} transition-all duration-300 group`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-cyber-muted font-medium mb-1">
            {label}
          </p>
          <div className={`text-3xl font-extrabold tracking-tight font-mono ${style.text}`}>
            {value}
          </div>
          {subValue && (
            <p className="mt-1 text-xs text-cyber-subtle font-mono">
              {subValue}
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${style.iconBg} border border-white/5`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {/* Subtle bottom accent line */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

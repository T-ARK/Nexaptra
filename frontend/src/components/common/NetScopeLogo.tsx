import React from 'react';
import { Shield } from 'lucide-react';

interface NetScopeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const NetScopeLogo: React.FC<NetScopeLogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
}) => {
  const sizeMap = {
    sm: {
      box: 'w-8 h-8',
      shield: 'w-6 h-6',
      img: 'w-5 h-5',
      title: 'text-sm',
      sub: 'text-[7px]',
    },
    md: {
      box: 'w-10 h-10',
      shield: 'w-8 h-8',
      img: 'w-7 h-7',
      title: 'text-lg sm:text-xl',
      sub: 'text-[8px] sm:text-[9px]',
    },
    lg: {
      box: 'w-12 h-12',
      shield: 'w-10 h-10',
      img: 'w-9 h-9',
      title: 'text-2xl',
      sub: 'text-[10px]',
    },
    xl: {
      box: 'w-16 h-16',
      shield: 'w-14 h-14',
      img: 'w-12 h-12',
      title: 'text-3xl',
      sub: 'text-xs',
    },
  };

  const s = sizeMap[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Tactical Box combining Shield + Mascot */}
      <div
        className={`relative flex items-center justify-center ${s.box} bg-[#080808] border border-[#00ff88]/40 shadow-[0_0_15px_rgba(0,255,136,0.3)] shrink-0 group`}
      >
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Shield Frame Backdrop */}
        <Shield className={`${s.shield} text-[#00ff88]/30 absolute inset-0 m-auto transition-transform group-hover:scale-105`} />

        {/* Mascot Centerpiece */}
        <img
          src="/logo-green.png"
          alt="NetScope Shield Emblem"
          className={`${s.img} object-contain relative z-10 drop-shadow-[0_0_8px_rgba(0,255,136,0.85)] filter brightness-110 transition-transform group-hover:scale-110`}
        />
      </div>

      {/* Optional Brand Typography */}
      {showText && (
        <div>
          <span className={`${s.title} font-display font-bold tracking-wider text-white block leading-tight`}>
            NETSCOPE
          </span>
          <span className={`block ${s.sub} font-mono tracking-widest text-[#888888] uppercase mt-0.5`}>
            TACTICAL PCAP FORENSICS
          </span>
        </div>
      )}
    </div>
  );
};

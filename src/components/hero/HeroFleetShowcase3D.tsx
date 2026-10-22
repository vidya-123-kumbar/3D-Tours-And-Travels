import React, { useState, useRef } from 'react';
import { ShieldCheck, Radio, Sparkles, Zap, ChevronRight } from 'lucide-react';

interface HeroFleetShowcase3DProps {
  onOpenQuote: () => void;
}

export const HeroFleetShowcase3D: React.FC<HeroFleetShowcase3DProps> = ({ onOpenQuote }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'fleet' | 'command' | 'ev'>('fleet');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to +10 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16; // -8 to +8 deg
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const previews = {
    fleet: {
      image: '/images/about_fleet.jpg',
      title: 'Executive Corporate Fleet Roster',
      subtitle: '500+ Active Vehicles stationed at Bengaluru Tech Hubs',
      badge: 'Premier Fleet Lineup',
      stat: '500+ Cabs',
    },
    command: {
      image: '/images/operations_center.jpg',
      title: '24/7 Live Telemetry Control Center',
      subtitle: 'Continuous Nyletech satellite tracking & emergency dispatch',
      badge: 'Live Operations',
      stat: '< 3s Latency',
    },
    ev: {
      image: '/images/fleet_ev.jpg',
      title: 'Zero-Emission Green EV Mobility',
      subtitle: 'Sustainable Tata Tigor & Nexon EV executive corporate shuttles',
      badge: 'ESG Champion',
      stat: '100% Electric',
    },
  };

  const current = previews[activeTab];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-4xl mx-auto my-4 perspective-container px-4"
    >
      {/* 3D Tilting Card */}
      <div
        className="relative rounded-2xl overflow-hidden border border-white/90 bg-white/75 backdrop-blur-xl shadow-xl shadow-slate-900/10 transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        }}
      >
        {/* Soft Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#FF7900]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        {/* Top Floating Telemetry Status Bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-700 tracking-wide">
              Live Network Active
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">·</span>
            <span className="text-xs text-slate-600 hidden sm:inline font-medium">
              Bengaluru Tech Corridors
            </span>
          </div>

          {/* Quick Preview Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100/90 backdrop-blur-sm border border-slate-200/80 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('fleet')}
              className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                activeTab === 'fleet'
                  ? 'bg-[#D8B878] text-[#101C2C] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fleet Roster
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('command')}
              className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                activeTab === 'command'
                  ? 'bg-[#D8B878] text-[#101C2C] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Control Room
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ev')}
              className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                activeTab === 'ev'
                  ? 'bg-[#D8B878] text-[#101C2C] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Green EV
            </button>
          </div>
        </div>

        {/* Image Display Area with Smooth Transition */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden group">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="eager"
          />

          {/* Floating 3D Badge 1: Top Left */}
          <div className="absolute top-4 left-4 z-20 animate-float-gentle">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-[#244B70]/30 backdrop-blur-md text-[#101C2C] text-xs font-semibold shadow-md">
              <Radio className="w-3.5 h-3.5 text-[#244B70]" />
              <span>{current.badge}</span>
            </div>
          </div>

          {/* Floating 3D Badge 2: Top Right */}
          <div className="absolute top-4 right-4 z-20 animate-float-reverse">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 backdrop-blur-md text-slate-800 text-xs font-bold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B878]" />
              <span>{current.stat}</span>
            </div>
          </div>

          {/* Bottom Card Content Info with Frosted Glass Overlay */}
          <div className="absolute bottom-3 left-3 right-3 z-20 p-3.5 sm:p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/95 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-[#101C2C] font-display">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-1 max-w-xl">
                {current.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#101C2C] hover:bg-[#244B70] text-[#F8FAFC] text-xs font-bold transition-all shrink-0 shadow-sm group/btn cursor-pointer"
            >
              <span>Instant RFP Quote</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform text-[#D8B878]" />
            </button>
          </div>
        </div>

        {/* Bottom Feature Strip */}
        <div className="relative z-20 grid grid-cols-3 divide-x divide-slate-200/80 bg-white/80 py-2.5 px-3 text-center border-t border-slate-200/80 text-[11px] sm:text-xs text-slate-700 font-medium">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#244B70]" />
            <span>100% Police Verified</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#D8B878]" />
            <span>Nyletech Telematics</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#244B70]" />
            <span>99.8% On-Time SLA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

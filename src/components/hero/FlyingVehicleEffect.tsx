import React, { useState, useEffect, useRef } from 'react';

export const FlyingVehicleEffect: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[560px] lg:max-w-[620px] xl:max-w-[680px] pointer-events-none select-none"
    >
      {/* 3D Floating Vehicle Stage */}
      <div
        className="relative transition-transform duration-500 ease-out flex flex-col items-center"
        style={{
          transform: `perspective(1000px) rotateY(${mouseOffset.x * 0.4}deg) rotateX(${-mouseOffset.y * 0.4}deg) translateY(${mouseOffset.y * 0.5}px)`,
        }}
      >
        {/* Soft Aerodynamic Ambient Glow Behind Vehicle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-2/5 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Floating Vehicle Graphic with Smooth Hover Keyframe */}
        <div className="relative z-10 w-full animate-float-hover">
          <img
            src="/images/corporate_passenger_suv_transparent.png"
            alt="Tours & Travels Luxury Corporate Passenger SUV"
            className="w-full h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(8,12,10,0.65)]"
            loading="eager"
          />

          {/* Dual LED Projector Headlight Beam Overlays */}
          <div
            className="absolute top-[48%] left-[22%] w-24 h-10 bg-gradient-to-r from-sky-200/40 to-transparent blur-md transform -rotate-12 pointer-events-none"
          />
          <div
            className="absolute top-[46%] left-[45%] w-28 h-12 bg-gradient-to-r from-sky-200/40 to-transparent blur-md transform -rotate-6 pointer-events-none"
          />
        </div>

        {/* Soft Ground Atmospheric Shadow Below Hovering Vehicle */}
        <div
          className="w-4/5 h-10 bg-black/50 rounded-full blur-xl transform scale-y-50 mt-[-15px] pointer-events-none transition-all duration-300"
        />

        {/* Subtle Corporate Vehicle Identifier Pill */}
        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] text-slate-300 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900] animate-pulse" />
          <span>Executive Passenger Fleet · Toyota Innova Crysta / Corporate SUV</span>
        </div>
      </div>
    </div>
  );
};

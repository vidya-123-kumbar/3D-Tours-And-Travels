import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { LuxuryVehicle3D } from '../3d/LuxuryVehicle3D';

interface FlyingVehicle3DProps {
  vehicleColor?: string;
}

export const FlyingVehicle3D: React.FC<FlyingVehicle3DProps> = ({
  vehicleColor = '#C7CED6', // Metallic silver default
}) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl lg:max-w-2xl h-[340px] sm:h-[400px] lg:h-[440px] flex items-center justify-center select-none"
    >
      {/* Ambient Aerodynamic Glow Behind Vehicle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5 bg-[#B88E38]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-2/5 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Floating Control Bar */}
      <div className="absolute top-2 right-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border transition-all cursor-pointer ${
            autoRotate
              ? 'bg-[#B88E38] text-white border-[#B88E38] shadow-sm'
              : 'bg-white/90 text-slate-700 border-slate-300 hover:border-[#B88E38]'
          }`}
          title="Toggle 360 Showroom Turntable Rotation"
        >
          {autoRotate ? '360° Rotate ON' : '360° Rotate OFF'}
        </button>

        <button
          type="button"
          onClick={() => setHeadlightsOn(!headlightsOn)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border transition-all cursor-pointer ${
            headlightsOn
              ? 'bg-[#0F172A] text-[#B88E38] border-slate-700 shadow-sm'
              : 'bg-white/90 text-slate-600 border-slate-300 hover:border-[#B88E38]'
          }`}
          title="Toggle LED Headlights Beam"
        >
          {headlightsOn ? 'LED Beam ON' : 'LED Beam OFF'}
        </button>
      </div>

      {/* 3D WebGL Canvas */}
      {hasWebGL ? (
        <Canvas
          shadows
          camera={{ position: [0, 1.1, 5.4], fov: 40 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          {/* Soft Studio Lighting */}
          <ambientLight intensity={1.5} />
          
          {/* Key Light */}
          <directionalLight
            position={[5, 8, 6]}
            intensity={2.4}
            castShadow
            shadow-mapSize={[1024, 1024]}
            color="#FFFFFF"
          />

          {/* Warm Orange Accent Fill Light */}
          <directionalLight position={[-5, 4, 3]} intensity={1.3} color="#F97316" />

          {/* Cool Rim Light */}
          <directionalLight position={[0, 6, -5]} intensity={1.0} color="#C7CED6" />

          <Suspense fallback={null}>
            <LuxuryVehicle3D
              color={vehicleColor}
              headlightsOn={headlightsOn}
              autoRotate={autoRotate}
              mousePosition={mousePos}
            />

            {/* Natural Contact Shadow */}
            <ContactShadows
              position={[0.2, -0.65, 0]}
              opacity={0.48}
              scale={8.5}
              blur={2.2}
              far={3.8}
              color="#000000"
            />
          </Suspense>
        </Canvas>
      ) : (
        /* Fallback Graphic if WebGL is disabled */
        <div className="relative z-10 w-4/5 animate-float-hover">
          <img
            src="/images/corporate_passenger_suv_transparent.png"
            alt="Tours & Travels Luxury Corporate Passenger SUV"
            className="w-full h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
            loading="eager"
          />
        </div>
      )}

      {/* Corporate Identifier Badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101C2C]/80 border border-orange-500/30 backdrop-blur-md text-[11px] text-[#C7CED6]">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span>Cinematic 3D Fleet Visual · Executive Passenger SUV</span>
        </div>
      </div>
    </div>
  );
};

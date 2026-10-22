import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { LuxuryVehicle3D } from './LuxuryVehicle3D';
import { RotateCw, Palette } from 'lucide-react';

interface FloatingVehicleCanvasProps {
  onQuoteClick?: () => void;
}

// Clean Fallback if WebGL is unavailable
const WebGLFallback: React.FC<{ color: string }> = ({ color }) => (
  <div className="relative w-full h-full flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
        🚘
      </div>
      <h4 className="text-lg font-bold text-[#17365D] mb-1">
        Tours &amp; Travels Corporate Fleet
      </h4>
      <p className="text-sm text-slate-500">
        Premium Sedans, SUVs, EVs &amp; Executive Coaches
      </p>
    </div>
  </div>
);

export const FloatingVehicleCanvas: React.FC<FloatingVehicleCanvasProps> = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [orbitActive, setOrbitActive] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Corporate Color Palette (Silver, Pearl White, Slate Grey, Deep Navy)
  const corporateColors = [
    { name: 'Metallic Silver', hex: '#CBD5E1', border: '#94A3B8', label: 'Silver Metallic' },
    { name: 'Pearl White', hex: '#F8FAFC', border: '#CBD5E1', label: 'Pearl White' },
    { name: 'Executive Grey', hex: '#475569', border: '#334155', label: 'Slate Grey' },
    { name: 'Corporate Navy', hex: '#17365D', border: '#0F233D', label: 'Corporate Navy' },
  ];

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
      className="relative w-full h-[400px] sm:h-[460px] lg:h-[520px] flex items-center justify-center select-none"
    >
      {/* 3D WebGL Canvas */}
      {hasWebGL ? (
        <Canvas
          shadows
          camera={{ position: [0, 1.3, 5.8], fov: 42 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          {/* Soft Studio Lighting */}
          <ambientLight intensity={1.4} />
          
          {/* Key Light (Top-Left) */}
          <directionalLight
            position={[5, 8, 6]}
            intensity={2.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
            color="#FFFFFF"
          />

          {/* Soft Fill Light (Right) */}
          <directionalLight position={[-5, 4, 3]} intensity={1.1} color="#F1F5F9" />

          {/* Subtle Rear Rim Light for Edge Definition */}
          <directionalLight position={[0, 5, -5]} intensity={0.7} color="#E2E8F0" />

          <Suspense fallback={null}>
            <LuxuryVehicle3D
              color={corporateColors[colorIndex].hex}
              headlightsOn={true}
              mousePosition={mousePos}
            />

            {/* Realistic Ground Contact Shadow on light background */}
            <ContactShadows
              position={[0.2, -0.65, 0]}
              opacity={0.35}
              scale={8.5}
              blur={2.0}
              far={3.5}
              color="#17365D"
            />

            {/* Optional Orbit Controls if user clicks 360 toggle */}
            {orbitActive && (
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3.5}
                autoRotate={false}
              />
            )}
          </Suspense>
        </Canvas>
      ) : (
        <WebGLFallback color={corporateColors[colorIndex].hex} />
      )}

      {/* Awwwards Architectural Telemetry Overlay (Polestar/Rivian style) */}
      <div className="absolute top-3 left-3 sm:left-4 z-20 pointer-events-none flex flex-col gap-1">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/90 border border-slate-200 text-[10px] font-mono text-[#17365D] tracking-wider uppercase shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B8068]" />
          <span>Telemetrics // Active</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 pl-0.5 hidden sm:inline">
          Model: Executive MPV · 4,735mm
        </span>
      </div>

      <div className="absolute bottom-3 left-3 sm:left-4 z-20 pointer-events-none hidden sm:block">
        <div className="text-[10px] font-mono text-slate-500 bg-white/80 backdrop-blur-xs px-2 py-1 rounded border border-slate-200/80">
          Capacity: 6+1 Captain · RTO Certified
        </div>
      </div>

      {/* Clean Corporate Vehicle Control Bar (Bottom-Right) */}
      <div className="absolute bottom-3 right-3 sm:right-6 z-20 flex items-center gap-2 bg-white/95 border border-slate-200 p-1.5 rounded-lg shadow-sm">
        {/* Color Palette Selector */}
        <div className="flex items-center gap-1.5 px-1.5">
          <Palette className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:block" />
          {corporateColors.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColorIndex(i)}
              title={c.label}
              className={`w-4 h-4 rounded-full transition-all border ${
                colorIndex === i
                  ? 'scale-125 ring-2 ring-[#17365D] ring-offset-1'
                  : 'hover:scale-110 opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: c.hex, borderColor: c.border }}
              aria-label={`Select ${c.name} finish`}
            />
          ))}
        </div>

        <div className="h-4 w-px bg-slate-200" />

        {/* 360 Drag Orbit Toggle */}
        <button
          type="button"
          onClick={() => setOrbitActive(!orbitActive)}
          title={orbitActive ? 'Free 360° View Active' : 'Enable 360° Rotation'}
          className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
            orbitActive
              ? 'bg-[#17365D] text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          aria-label="Toggle 360 drag rotation"
        >
          <RotateCw className="w-3 h-3" />
          <span className="hidden sm:inline">360°</span>
        </button>
      </div>
    </div>
  );
};

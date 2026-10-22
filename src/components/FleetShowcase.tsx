import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FLEET_VEHICLES } from '../data/websiteData';
import { FadeIn, StaggerContainer, StaggerItem } from './common/MotionReveal';
import { 
  ArrowRight, Users, Fuel, Radio, ShieldCheck, Zap, Gauge, 
  Volume2, VolumeX, Play, Navigation, Activity, X, Maximize2, Sparkles
} from 'lucide-react';
import type { FleetCategory, FleetVehicle } from '../types';

interface FleetShowcaseProps {
  onOpenQuote: (vehicleName?: string) => void;
}

// ── Web Audio Engine Sound Generator (Lightweight & Safe) ──
const playVehicleAudio = (frequency: number = 75, isSprint: boolean = false) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = isSprint ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(isSprint ? frequency * 1.6 : frequency * 1.2, ctx.currentTime + 0.35);
    
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch {
    // Audio context may be restricted by autoplay policy before user gesture
  }
};

// ── Moving Vehicle Card Component with Interactive Physics & Road Engine ──
interface MovingCardProps {
  vehicle: FleetVehicle;
  onOpenQuote: (vehicleName?: string) => void;
  onLaunchTestDrive: (vehicle: FleetVehicle) => void;
  soundEnabled: boolean;
}

const MovingVehicleCard: React.FC<MovingCardProps> = ({
  vehicle,
  onOpenQuote,
  onLaunchTestDrive,
  soundEnabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSprint, setIsSprint] = useState(false);
  const [speed, setSpeed] = useState(62);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [manualOffset, setManualOffset] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Speed counter animation when sprinting vs cruising
  useEffect(() => {
    const targetSpeed = isSprint ? 98 : isHovered ? 78 : 62;
    const interval = setInterval(() => {
      setSpeed((prev) => {
        if (prev < targetSpeed) return prev + 2;
        if (prev > targetSpeed) return prev - 2;
        return prev;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isSprint, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsSprint(false);
    setMouseTilt({ x: 0, y: 0 });
  };

  const toggleSprint = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isSprint;
    setIsSprint(nextState);
    if (soundEnabled) {
      playVehicleAudio(vehicle.category === 'ev' ? 120 : 85, nextState);
    }
  };

  const isEV = vehicle.category === 'ev';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => {
        setIsHovered(true);
        if (soundEnabled) playVehicleAudio(isEV ? 90 : 70, false);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group h-full bg-[#0F172A]/95 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-[#FF7A00] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,122,0,0.22)] flex flex-col justify-between shadow-xl"
    >
      <div>
        {/* ── MOVING VEHICLE IMAGE STAGE ── */}
        <div className="relative h-60 w-full overflow-hidden bg-gradient-to-b from-[#080D19] via-[#0C1527] to-[#0A0F1D] select-none">
          
          {/* Animated Road Perspective Surface at Bottom */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-slate-950/80 to-transparent z-10 pointer-events-none">
            {/* Road Edge White Markings */}
            <div className="absolute top-2 inset-x-0 h-[2px] animate-road-white-cruise opacity-60" />
            
            {/* Highway Center Dashed Stripes Scrolling Continuously */}
            <div 
              className={`absolute top-7 inset-x-0 h-[4px] ${
                isSprint ? 'animate-road-sprint' : 'animate-road-cruise'
              }`} 
            />

            {/* Road Asphalt Texture Reflection */}
            <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-slate-900/90 to-transparent" />
          </div>

          {/* Wind Speed Streaks (Simulating High Velocity Cruise) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            <div className="absolute top-1/4 -right-10 w-36 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-wind-streak-1 opacity-70" />
            <div className="absolute top-2/4 -right-20 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-wind-streak-2 opacity-80" />
            <div className="absolute top-3/4 -right-16 w-40 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent animate-wind-streak-3 opacity-75" />
          </div>

          {/* Forward Headlight Beam Cone & Flare */}
          <div 
            className="absolute bottom-6 left-0 w-44 h-24 pointer-events-none z-10 animate-headlight-cone"
            style={{
              background: 'radial-gradient(ellipse at 0% 50%, rgba(255,200,100,0.4) 0%, rgba(255,150,50,0.15) 45%, transparent 75%)',
              filter: 'blur(6px)',
              transformOrigin: '0% 50%',
            }}
          />

          {/* The Driving Vehicle (Continuous Highway Driving Motion) */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out z-20"
            style={{
              transform: `perspective(800px) rotateY(${mouseTilt.x * 6}deg) rotateX(${-mouseTilt.y * 4}deg)`,
            }}
          >
            <div
              className={`w-full h-full relative flex items-center justify-center transition-all duration-500 ease-out ${
                isSprint ? 'animate-suspension-fast' : 'animate-suspension'
              }`}
              style={{
                transform: isSprint 
                  ? 'translateX(24px) scale(1.04)' 
                  : isHovered 
                  ? 'translateX(12px) scale(1.02)' 
                  : 'translateX(0px)',
              }}
            >
              {vehicle.image && (
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover object-center filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                  loading="lazy"
                />
              )}
            </div>
          </div>

          {/* Top Left Category Badge (Exact Match with Screenshot) */}
          <div className="absolute top-3 left-3 z-30">
            <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-md">
              {vehicle.categoryLabel}
            </span>
          </div>

          {/* Top Right Highlight Badge (Exact Match with Screenshot) */}
          {vehicle.badge && (
            <div className="absolute top-3 right-3 z-30">
              <span className="text-xs font-bold text-amber-200 px-3 py-1 rounded-full bg-amber-950/85 backdrop-blur-md border border-amber-500/40 shadow-md">
                {vehicle.badge}
              </span>
            </div>
          )}

          {/* Over Image Bottom-Left Passenger Badge (Exact Match with Screenshot) */}
          <div className="absolute bottom-3 left-3 z-30">
            <span className="text-xs font-medium text-slate-200 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 shadow flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-orange-400" />
              <span>{vehicle.seatingCapacity}</span>
            </span>
          </div>

          {/* Speed Indicator & Sprint Control HUD */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
            {/* Speed Indicator */}
            <div className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono font-bold flex items-center gap-1.5 shadow">
              <span className={`w-2 h-2 rounded-full ${isSprint ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
              <span className="text-white">{speed} km/h</span>
            </div>

            {/* Accelerate / Cruise Interactive Toggle Button */}
            <button
              type="button"
              onClick={toggleSprint}
              title={isSprint ? "Cruising Mode" : "Click to Accelerate & Sprint"}
              className={`p-1.5 rounded-md text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1 shadow-md ${
                isSprint
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/50 scale-105'
                  : 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[10px] uppercase tracking-wide">
                {isSprint ? 'Sprint' : 'Cruise'}
              </span>
            </button>
          </div>

        </div>

        {/* ── VEHICLE CARD BODY (Exact Match with Screenshot) ── */}
        <div className="p-6">
          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#FF7A00] transition-colors mb-2.5">
            {vehicle.name}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {vehicle.description}
          </p>

          {/* 2x2 Specs Grid Container (Exact Match with Screenshot) */}
          <div className="bg-[#0A101D] border border-slate-800/90 rounded-xl p-3.5 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="truncate">{vehicle.seatingCapacity}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              {isEV ? (
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Fuel className="w-4 h-4 text-orange-400 shrink-0" />
              )}
              <span className="truncate">{vehicle.specs.fuel}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Radio className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-emerald-400 font-semibold">GPS Live</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
              <span>RTO Verified</span>
            </div>
          </div>

          {/* Feature Badges Pills (Exact Match with Screenshot) */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {vehicle.features.map((feature) => (
              <span
                key={feature}
                className="inline-block bg-[#162137] text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-700/60"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CARD FOOTER CTA BUTTONS ── */}
      <div className="px-6 pb-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5">
        <button
          type="button"
          onClick={() => onOpenQuote(vehicle.name)}
          className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#FF7A00] hover:bg-[#e06c00] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
        >
          <span>Request Quotation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onLaunchTestDrive(vehicle)}
          className="w-full sm:w-auto py-3 px-3.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          title="Virtual Highway Test Drive"
        >
          <Navigation className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden sm:inline">Drive View</span>
        </button>
      </div>
    </div>
  );
};

// ── VIRTUAL HIGHWAY TEST DRIVE MODAL ──
interface TestDriveModalProps {
  vehicle: FleetVehicle | null;
  onClose: () => void;
  onBookNow: (vehicleName: string) => void;
}

const HighwayTestDriveModal: React.FC<TestDriveModalProps> = ({ vehicle, onClose, onBookNow }) => {
  const [modalSpeed, setModalSpeed] = useState(74);
  const [distance, setDistance] = useState(12.4);
  const [activeLane, setActiveLane] = useState<1 | 2 | 3>(2);

  useEffect(() => {
    if (!vehicle) return;
    const interval = setInterval(() => {
      setDistance((d) => +(d + 0.05).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, [vehicle]);

  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0B1222] border-2 border-[#FF7A00]/50 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0F1A30] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <div className="text-xs uppercase tracking-wider text-orange-400 font-bold">
                Live Highway Simulation & Telemetry
              </div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                {vehicle.name}
              </h4>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highway Driving Canvas */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-gradient-to-b from-[#050914] via-[#091122] to-[#040810] flex flex-col justify-end">
          
          {/* Animated Sky and Distant Skyline */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_20%,rgba(255,122,0,0.15),transparent_70%)]" />

          {/* Wind Streaks */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -right-10 w-60 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-wind-streak-1 opacity-80" />
            <div className="absolute top-2/4 -right-20 w-80 h-[2.5px] bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-wind-streak-2 opacity-90" />
            <div className="absolute top-3/4 -right-16 w-72 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent animate-wind-streak-3 opacity-80" />
          </div>

          {/* 3-Lane Highway Road */}
          <div className="relative w-full h-36 bg-gradient-to-t from-black via-slate-950 to-slate-900 border-t border-slate-700">
            {/* Lane 1 Divider */}
            <div className="absolute top-11 inset-x-0 h-[3px] animate-road-cruise" />
            {/* Lane 2 Divider */}
            <div className="absolute top-23 inset-x-0 h-[3px] animate-road-sprint" />

            {/* The Driving Vehicle in Selected Lane */}
            <div 
              className="absolute transition-all duration-500 ease-out flex items-center justify-center animate-suspension-fast"
              style={{
                left: '28%',
                bottom: activeLane === 1 ? '70px' : activeLane === 2 ? '32px' : '-2px',
                width: '280px',
                height: '110px',
              }}
            >
              {vehicle.image && (
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
                />
              )}
              {/* Headlight Flare */}
              <div 
                className="absolute right-[-40px] top-6 w-52 h-16 pointer-events-none animate-headlight-cone"
                style={{
                  background: 'radial-gradient(ellipse at 0% 50%, rgba(255,220,130,0.6) 0%, rgba(255,140,20,0.2) 50%, transparent 80%)',
                  filter: 'blur(8px)',
                }}
              />
            </div>
          </div>

          {/* Highway HUD Overlay */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
            <div className="bg-black/75 backdrop-blur-md border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">ROUTE</span>
              <span className="text-white font-bold">Electronic City Elevated Expressway</span>
            </div>
            <div className="bg-black/75 backdrop-blur-md border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">TRIP ODOMETER</span>
              <span className="text-amber-400 font-bold">{distance} km</span>
            </div>
          </div>

          {/* Lane Controls & Speed HUD */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <div className="bg-black/80 backdrop-blur-md border border-[#FF7A00] rounded-xl px-4 py-2 text-right">
              <div className="text-[10px] uppercase font-bold text-orange-400">SPEEDOMETER</div>
              <div className="text-2xl font-mono font-black text-white">{modalSpeed} <span className="text-xs font-normal text-slate-400">km/h</span></div>
            </div>
          </div>
        </div>

        {/* Modal Controls Bar */}
        <div className="p-6 bg-[#0B1222] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-2">Switch Lane:</span>
            {[1, 2, 3].map((lane) => (
              <button
                key={lane}
                type="button"
                onClick={() => setActiveLane(lane as 1 | 2 | 3)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLane === lane 
                    ? 'bg-[#FF7A00] text-white shadow-md' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Lane {lane}
              </button>
            ))}

            <span className="text-xs text-slate-400 font-medium ml-4 mr-2">Throttle:</span>
            <button
              type="button"
              onClick={() => setModalSpeed((s) => Math.min(115, s + 10))}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
            >
              + Accelerate
            </button>
            <button
              type="button"
              onClick={() => setModalSpeed((s) => Math.max(45, s - 10))}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              - Brake
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onBookNow(vehicle.name);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer"
          >
            <span>Book This {vehicle.categoryLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

// ── MAIN FLEET SHOWCASE COMPONENT ──
export const FleetShowcase: React.FC<FleetShowcaseProps> = ({ onOpenQuote }) => {
  const [activeCategory, setActiveCategory] = useState<FleetCategory>('all');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [testDriveVehicle, setTestDriveVehicle] = useState<FleetVehicle | null>(null);

  const categories: { key: FleetCategory; label: string }[] = [
    { key: 'all', label: 'All Vehicles' },
    { key: 'ev', label: 'Electric (EV)' },
    { key: 'cng', label: 'CNG' },
    { key: 'sedan', label: 'Sedans' },
    { key: 'suv', label: 'SUVs & MUVs' },
    { key: 'tempo', label: 'Tempo Travellers' },
    { key: 'coach', label: 'Luxury Coaches' },
    { key: 'bus', label: 'Buses' },
  ];

  const filteredVehicles = activeCategory === 'all'
    ? FLEET_VEHICLES
    : FLEET_VEHICLES.filter((v) => v.category === activeCategory);

  return (
    <section id="fleet" className="py-24 bg-[#0A0F1D] text-white border-b border-slate-800/80 overflow-hidden relative">
      
      {/* Background Ambient Glows & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-500/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-orange-400 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span>Pvt. Ltd. · Est. 2016 · ISO 9001:2015 Certified Fleet</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Modern <span className="text-[#FF7A00]">Fleet Showcase</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mx-auto">
            500+ well-maintained, GPS-enabled, RTO-compliant vehicles for every corporate requirement — from zero-emission electric sedans to high-capacity staff coaches.
          </p>
        </FadeIn>

        {/* Master Control Bar: Filter Tabs + Sound FX Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-2 border-b border-slate-800/60">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#FF7A00] text-white border border-[#FF7A00] shadow-md shadow-orange-500/30 font-bold'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-700/70 hover:border-[#FF7A00] hover:text-[#FF7A00]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sound & Interactive Drive Controls */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                soundEnabled 
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' 
                  : 'bg-slate-800/60 text-slate-400 border border-slate-700/60 hover:text-white'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'Engine Audio Active' : 'Sound FX Muted'}</span>
            </button>
          </div>

        </div>

        {/* Fleet Grid with Moving Vehicle Cards */}
        <StaggerContainer
          staggerChildren={0.07}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14"
        >
          {filteredVehicles.map((vehicle) => (
            <StaggerItem
              key={vehicle.id}
              direction="up"
              className="h-full"
            >
              <MovingVehicleCard
                vehicle={vehicle}
                onOpenQuote={onOpenQuote}
                onLaunchTestDrive={(v) => setTestDriveVehicle(v)}
                soundEnabled={soundEnabled}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA Banner */}
        <FadeIn className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-8 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl">
            <div className="text-left">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">Custom Fleet Sizing</div>
              <div className="text-sm text-slate-300">Need 20+ dedicated cabs or cross-city shuttle bus routes?</div>
            </div>
            <button
              type="button"
              onClick={() => onOpenQuote('Custom Corporate Fleet Agreement')}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#FF7A00] hover:bg-[#e06c00] transition-all duration-300 cursor-pointer shadow-lg shadow-orange-500/25 flex items-center gap-2 shrink-0"
            >
              <span>🚗 Discuss Enterprise Fleet Contract</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </FadeIn>

      </div>

      {/* Virtual Highway Test Drive Modal */}
      <HighwayTestDriveModal
        vehicle={testDriveVehicle}
        onClose={() => setTestDriveVehicle(null)}
        onBookNow={onOpenQuote}
      />

    </section>
  );
};

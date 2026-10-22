import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Award, Sparkles, Car } from 'lucide-react';
import { FlyingVehicle3D } from './hero/FlyingVehicle3D';

interface HeroSectionProps {
  onOpenQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuote }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [show3DStudio, setShow3DStudio] = useState(false);

  // Moving background images: cars with fleet owners and operations workers
  const heroSlides = [
    {
      image: '/images/about_fleet.jpg',
      tag: 'Executive Fleet & Chauffeur Team',
    },
    {
      image: '/images/operations_center.jpg',
      tag: '24/7 Operations & Control Room Staff',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-0 overflow-hidden bg-[#0D0D1A]">
      {/* 1. Moving Background Image Carousel with Ken Burns scale effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{ opacity: 0.45, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url('${heroSlides[activeSlide].image}')`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* 2. Reference Cinematic Overlays & Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background: 'linear-gradient(135deg, rgba(13,13,26,0.85) 0%, rgba(26,26,46,0.78) 45%, rgba(20,92,46,0.65) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-1 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />


      {/* 4. Hero Content Stage */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col items-center justify-center py-10 lg:py-16">
        {/* Floating Badge with Blinking Dot */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[rgba(30,138,68,0.22)] border border-[rgba(30,138,68,0.5)] text-[#FFB25C] text-xs font-semibold tracking-wider mb-6 backdrop-blur-md animate-fade-in shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#FFB25C] animate-blink" />
          <span>🏆 ISO 9001:2015 Certified · MSME Registered</span>
        </div>

        {/* Animated Brand Name with heroColorPulse keyframe */}
        <div className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-2 animate-hero-pulse">
          Tours &amp; Travels
        </div>

        {/* Reference Display Headline */}
        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight mb-6 drop-shadow-md">
          Driven by <em className="text-[#FFB25C] not-italic relative inline-block">
            Reliability
            <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF7A00] to-transparent" />
          </em><br className="hidden sm:inline" /> and Innovation
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base lg:text-lg text-[#DCDCDC]/90 font-light leading-relaxed max-w-2xl mb-8 drop-shadow">
          Karnataka's most trusted corporate transportation company. Delivering safe, punctual, and GPS-powered mobility solutions for enterprises across Bengaluru and beyond. Powered by Nyletech &amp; Technology Partners.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={onOpenQuote}
            className="btn-primary text-sm font-semibold tracking-wide cursor-pointer"
          >
            <span>🚀 Request a Quote</span>
          </button>

          <a
            href="#services"
            className="btn-outline text-sm font-semibold tracking-wide cursor-pointer"
          >
            <span>Explore Services</span>
          </a>

          <button
            type="button"
            onClick={() => setShow3DStudio(!show3DStudio)}
            className="px-5 py-3 rounded-full text-xs font-semibold tracking-wide border border-white/20 bg-black/40 text-white/90 hover:text-white hover:bg-black/60 transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
          >
            <Car className="w-3.5 h-3.5 text-[#FFB25C]" />
            <span>{show3DStudio ? 'Hide 3D View' : 'Interactive 3D Stage'}</span>
          </button>
        </div>

        {/* Interactive 3D Turntable Toggle Drawer */}
        <AnimatePresence>
          {show3DStudio && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg mt-4 mb-4"
            >
              <div className="rounded-2xl bg-[#1A1A2E]/90 border border-white/20 p-4 shadow-2xl backdrop-blur-xl">
                <FlyingVehicle3D vehicleColor="#FF7A00" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Scroll Hint */}
        <div className="flex flex-col items-center gap-1.5 text-white/50 text-[11px] font-mono tracking-widest mt-4">
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-scroll-line" />
          <span>SCROLL</span>
        </div>
      </div>

      {/* 5. Reference Bottom Stats Bar */}
      <div className="relative z-10 w-full bg-black/60 backdrop-blur-xl border-t border-white/10 mt-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="py-5 px-6 sm:px-10 text-center flex-1 min-w-[140px]">
            <div className="font-serif text-3xl sm:text-4xl font-black text-[#FFB25C] leading-none mb-1">
              500+
            </div>
            <div className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#C8C8C8] uppercase">
              Fleet Vehicles
            </div>
          </div>

          <div className="py-5 px-6 sm:px-10 text-center flex-1 min-w-[140px]">
            <div className="font-serif text-3xl sm:text-4xl font-black text-[#FFB25C] leading-none mb-1">
              10+
            </div>
            <div className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#C8C8C8] uppercase">
              Corporate Clients
            </div>
          </div>

          <div className="py-5 px-6 sm:px-10 text-center flex-1 min-w-[140px]">
            <div className="font-serif text-3xl sm:text-4xl font-black text-[#FFB25C] leading-none mb-1">
              15+
            </div>
            <div className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#C8C8C8] uppercase">
              Years of Service
            </div>
          </div>

          <div className="py-5 px-6 sm:px-10 text-center flex-1 min-w-[140px]">
            <div className="font-serif text-3xl sm:text-4xl font-black text-[#FFB25C] leading-none mb-1">
              24/7
            </div>
            <div className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#C8C8C8] uppercase">
              Operations Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

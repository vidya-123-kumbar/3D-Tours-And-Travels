import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './common/MotionReveal';

interface WhyChooseUsProps {
  onOpenQuote: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenQuote }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax translation tied to user scrolling
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-60px', '60px']);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative py-28 overflow-hidden bg-[#0D0D1A] text-white"
    >
      {/* ── Continuous Moving & Parallax Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1.05, 1.18, 1.08, 1.2, 1.05],
            x: ['0%', '-3%', '2%', '-2%', '0%'],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute -inset-16 bg-cover bg-center will-change-transform opacity-40"
          style={{
            y: parallaxY,
            backgroundImage: `url('/images/bengaluru_highway_interchange.jpg')`,
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Reference Cinematic Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background: 'linear-gradient(100deg, rgba(13,13,26,0.94) 0%, rgba(26,26,46,0.85) 50%, rgba(20,92,46,0.72) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(255,122,0,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline, Pillars & CTAs */}
          <FadeIn direction="left" className="lg:col-span-7">
            <div className="section-tag-dark">Why Choose Us</div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight mb-4">
              The Standard Others <em className="text-[#FFB25C] not-italic">Aspire To</em>
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8">
              Two decades of excellence, 500+ vehicles, and a relentless commitment to safety have made <span className="svt-brand font-normal text-white">Tours &amp; Travels</span> the benchmark for corporate transport in Karnataka.
            </p>

            {/* 4 Pillars Grid with Interactive Hover */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/[0.08] backdrop-blur-md border border-white/12 rounded-xl p-5 hover:bg-emerald-900/35 hover:border-emerald-500/50 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden shadow-lg">
                <div className="text-2xl mb-2 text-[#FFB25C] group-hover:scale-110 transition-transform">🛡️</div>
                <h4 className="font-bold text-white text-sm mb-1.5 group-hover:text-[#FFB25C] transition-colors">
                  Zero-Compromise Safety
                </h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  Police-verified drivers, CCTV-equipped vehicles, SOS alerts, and 24/7 monitoring for every trip.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF7A00] to-[#FFB25C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>

              <div className="bg-white/[0.08] backdrop-blur-md border border-white/12 rounded-xl p-5 hover:bg-emerald-900/35 hover:border-emerald-500/50 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden shadow-lg">
                <div className="text-2xl mb-2 text-[#FFB25C] group-hover:scale-110 transition-transform">⏱️</div>
                <h4 className="font-bold text-white text-sm mb-1.5 group-hover:text-[#FFB25C] transition-colors">
                  Punctuality Guaranteed
                </h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  GPS-optimised routes and automated scheduling ensure on-time arrivals — every single day.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF7A00] to-[#FFB25C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>

              <div className="bg-white/[0.08] backdrop-blur-md border border-white/12 rounded-xl p-5 hover:bg-emerald-900/35 hover:border-emerald-500/50 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden shadow-lg">
                <div className="text-2xl mb-2 text-[#FFB25C] group-hover:scale-110 transition-transform">🛰️</div>
                <h4 className="font-bold text-white text-sm mb-1.5 group-hover:text-[#FFB25C] transition-colors">
                  Live GPS Tracking
                </h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  Real-time vehicle visibility powered by Nyletech's advanced tracking platform — for you and your employees.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF7A00] to-[#FFB25C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>

              <div className="bg-white/[0.08] backdrop-blur-md border border-white/12 rounded-xl p-5 hover:bg-emerald-900/35 hover:border-emerald-500/50 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden shadow-lg">
                <div className="text-2xl mb-2 text-[#FFB25C] group-hover:scale-110 transition-transform">📋</div>
                <h4 className="font-bold text-white text-sm mb-1.5 group-hover:text-[#FFB25C] transition-colors">
                  End-to-End Compliance
                </h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  ISO 9001:2015 certified, MSME registered, fully RTO and GST compliant — no paperwork headaches.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF7A00] to-[#FFB25C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={onOpenQuote}
                className="btn-primary text-xs font-bold cursor-pointer"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a href="#services" className="btn-outline text-xs font-bold cursor-pointer">
                Explore Services
              </a>
            </div>
          </FadeIn>

          {/* Right Column: 4 Big Stat Blocks */}
          <FadeIn direction="right" className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[rgba(30,138,68,0.18)] backdrop-blur-md border border-[rgba(30,138,68,0.4)] rounded-2xl p-6 text-center hover:bg-[rgba(30,138,68,0.28)] hover:scale-102 hover:shadow-xl transition-all duration-300">
              <span className="block font-serif text-4xl sm:text-5xl font-black text-[#FFB25C] leading-none mb-2">500+</span>
              <span className="text-xs font-medium text-[#C8C8C8] tracking-wider uppercase">GPS-Enabled Vehicles in Active Fleet</span>
            </div>

            <div className="bg-[rgba(30,138,68,0.18)] backdrop-blur-md border border-[rgba(30,138,68,0.4)] rounded-2xl p-6 text-center hover:bg-[rgba(30,138,68,0.28)] hover:scale-102 hover:shadow-xl transition-all duration-300">
              <span className="block font-serif text-4xl sm:text-5xl font-black text-[#FFB25C] leading-none mb-2">15+</span>
              <span className="text-xs font-medium text-[#C8C8C8] tracking-wider uppercase">Years Serving Karnataka's Top Enterprises</span>
            </div>

            <div className="bg-[rgba(30,138,68,0.18)] backdrop-blur-md border border-[rgba(30,138,68,0.4)] rounded-2xl p-6 text-center hover:bg-[rgba(30,138,68,0.28)] hover:scale-102 hover:shadow-xl transition-all duration-300">
              <span className="block font-serif text-4xl sm:text-5xl font-black text-[#FFB25C] leading-none mb-2">10+</span>
              <span className="text-xs font-medium text-[#C8C8C8] tracking-wider uppercase">Marquee Corporate Clients — IT, BPO, Education</span>
            </div>

            <div className="bg-[rgba(30,138,68,0.18)] backdrop-blur-md border border-[rgba(30,138,68,0.4)] rounded-2xl p-6 text-center hover:bg-[rgba(30,138,68,0.28)] hover:scale-102 hover:shadow-xl transition-all duration-300">
              <span className="block font-serif text-4xl sm:text-5xl font-black text-[#FFB25C] leading-none mb-2">24/7</span>
              <span className="text-xs font-medium text-[#C8C8C8] tracking-wider uppercase">Control Room &amp; Emergency Response Operations</span>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

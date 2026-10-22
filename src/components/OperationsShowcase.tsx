import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Activity, Radio, ShieldCheck } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './common/MotionReveal';

interface OperationsShowcaseProps {
  onOpenQuote?: () => void;
}

export const OperationsShowcase: React.FC<OperationsShowcaseProps> = ({ onOpenQuote }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Scroll parallax progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Vertical Parallax Translation tied directly to page scroll
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-70px', '70px']);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseOffset({ x: x * 15, y: y * 10 });
  };

  const opsCards = [
    {
      icon: '📡',
      title: 'Live Tracking',
      desc: "Every vehicle's location is streamed live to our control room and client dashboards around the clock.",
      num: '500+',
    },
    {
      icon: '🚦',
      title: 'Daily Trips Managed',
      desc: 'Our automated rostering engine plans, assigns, and dispatches hundreds of trips without manual intervention.',
      num: '1,000+',
    },
    {
      icon: '👨‍✈️',
      title: 'Verified Drivers',
      desc: 'Every driver on our roster is police-verified, medically fit, and trained in defensive driving and passenger safety.',
      num: '600+',
    },
    {
      icon: '🆘',
      title: 'Response Time',
      desc: 'Our 24/7 control room acknowledges SOS alerts and emergency situations within minutes — not hours.',
      num: '< 3 min',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="operations-showcase" 
      className="relative min-h-[620px] py-28 px-4 sm:px-6 lg:px-12 flex items-center overflow-hidden bg-[#0D1322] text-white select-none"
    >
      {/* ── Continuous Moving & Parallax Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1.06, 1.18, 1.1, 1.2, 1.06],
            x: ['-2%', '3%', '-1%', '2%', '-2%'],
            y: ['-1%', '2%', '-2%', '1%', '-1%'],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute -inset-24 bg-cover bg-center will-change-transform"
          style={{
            y: parallaxY,
            x: mouseOffset.x,
            backgroundImage: `url('/images/service_gps.jpg')`,
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Cinematic Dark Gradient Overlays to preserve high contrast */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background: 'linear-gradient(110deg, rgba(13,19,34,0.92) 0%, rgba(20,29,51,0.82) 45%, rgba(13,19,34,0.88) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(255,122,0,0.14) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-orange-400 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span>OPERATIONS IN ACTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-serif">
            Precision at Every <em className="text-[#FF7A00] not-italic">Mile</em>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Our operations never sleep. From the first pickup at dawn to the last drop-off at midnight, every vehicle is tracked, every driver is monitored, and every client is supported — all in real time.
          </p>
        </FadeIn>

        {/* 4 Operations Glassmorphic Cards (Exact Match with Screenshot) */}
        <StaggerContainer staggerChildren={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {opsCards.map((card, idx) => (
            <StaggerItem key={idx} direction="up" className="h-full">
              <div className="h-full p-7 rounded-2xl bg-[#111A2E]/80 backdrop-blur-xl border border-white/15 hover:border-[#FF7A00] hover:bg-[#FF7A00]/15 hover:-translate-y-2 transition-all duration-300 group shadow-2xl flex flex-col justify-between text-center relative overflow-hidden">
                {/* Subtle Card Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/25 transition-all pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-4xl mb-4 block drop-shadow group-hover:scale-115 transition-transform">{card.icon}</span>
                  <h4 className="font-serif text-white font-bold text-lg mb-2 group-hover:text-[#FF7A00] transition-colors">{card.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{card.desc}</p>
                </div>
                <div className="relative z-10 pt-3 border-t border-white/10">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#FF7A00] block tracking-tight">{card.num}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom Badges & CTA */}
        <FadeIn className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/15">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/85 border border-white/15 text-xs text-slate-200 font-medium shadow">
            <span>🛰️ Powered by</span>
            <span className="text-[#FF7A00] font-bold">Nyletech GPS</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/85 border border-white/15 text-xs text-slate-200 font-medium shadow">
            <span>⚙️ Managed by</span>
            <span className="text-[#FF7A00] font-bold">Technology Partners</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/85 border border-white/15 text-xs text-slate-200 font-medium shadow">
            <span>📅</span>
            <span className="text-[#FF7A00] font-bold">15+ Years</span>
            <span>of Operational Excellence</span>
          </div>

          <a
            href="#contact"
            onClick={onOpenQuote}
            className="btn-primary ml-auto text-xs font-bold px-7 py-3 rounded-full cursor-pointer shadow-lg shadow-orange-500/25"
          >
            <span>Talk to Our Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
};

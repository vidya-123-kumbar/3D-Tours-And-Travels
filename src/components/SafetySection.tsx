import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from './common/MotionReveal';

export const SafetySection: React.FC = () => {
  const trainingCards = [
    {
      title: '🚗 Driver Training Programs',
      desc: 'Comprehensive training covering defensive driving, road safety, first aid, and passenger handling.',
      points: [
        'Defensive driving certification',
        'Night driving & fatigue management',
        'Emergency response training',
        'Periodic refresher programs',
      ],
    },
    {
      title: '🛡️ Safety Standards',
      desc: 'All vehicles equipped with safety systems and all drivers background-verified for complete peace of mind.',
      points: [
        'Police verification for every driver',
        'Regular vehicle fitness inspections',
        'CCTV cameras in all vehicles',
        'Women escort support for night shifts',
      ],
    },
    {
      title: '📋 Compliance Management',
      desc: 'End-to-end regulatory compliance handling — from RTO permits to vehicle insurance renewals.',
      points: [
        'RTO permit renewal tracking',
        'Motor insurance compliance',
        'PUC & fitness certificate management',
        'Driver license verification system',
      ],
    },
    {
      title: '👥 Staff Development',
      desc: 'Our operations and support staff are trained for efficient fleet coordination and client communication.',
      points: [
        'Customer service excellence',
        'Technology platform training',
        'Crisis management protocols',
        'Quality audit processes',
      ],
    },
  ];

  return (
    <section id="training" className="relative py-24 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-tag inline-block mb-3">Training &amp; Compliance</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-serif">
            Safety <em className="text-[#FFB25C] not-italic">First, Always</em>
          </h2>
          <p className="text-base sm:text-lg text-[#C8C8C8] leading-relaxed">
            Our drivers and operations team undergo rigorous, structured training to ensure every passenger reaches safely, every time.
          </p>
        </FadeIn>

        {/* 2x2 Training Grid */}
        <StaggerContainer staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingCards.map((card, idx) => (
            <StaggerItem key={idx} direction="up" className="h-full">
              <div className="h-full p-8 rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/10 hover:border-[#FF7A00]/50 hover:bg-[#FF7A00]/10 hover:translate-x-1.5 transition-all duration-300 shadow-xl flex flex-col justify-between group">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 font-serif flex items-center gap-2 group-hover:text-[#FFB25C] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#C8C8C8] leading-relaxed mb-6">
                    {card.desc}
                  </p>
                  <ul className="space-y-2.5">
                    {card.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs sm:text-sm text-[#D5D5D5] flex items-center gap-2">
                        <span className="text-[#FFB25C] font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};

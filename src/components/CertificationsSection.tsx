import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from './common/MotionReveal';

interface CertificationsSectionProps {
  onOpenQuote?: () => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onOpenQuote }) => {
  const certifications = [
    {
      icon: '🏅',
      title: 'ISO 9001:2015',
      desc: 'Quality Management System certified for consistent, world-class service delivery standards.',
      tag: '✓ Internationally Verified',
    },
    {
      icon: '📜',
      title: 'GST Certificate',
      desc: 'Fully GST registered and compliant — valid invoices and proper input tax credit for all clients.',
      tag: '✓ Government Registered',
    },
    {
      icon: '🏭',
      title: 'MSME Certificate',
      desc: 'Registered Micro, Small & Medium Enterprise under the Government of India framework.',
      tag: '✓ MSME Registered',
    },
    {
      icon: '📑',
      title: 'Certificate of Incorporation',
      desc: 'Incorporated under the Companies Act and registered with MCA, Government of India.',
      tag: '✓ MCA Registered',
    },
  ];

  return (
    <section id="certifications" className="relative py-24 bg-gradient-to-br from-[#F6F8FB] via-[#EEF3F8] to-[#FFF4F5] text-[#1A1A2E] overflow-hidden border-b border-gray-200">
      {/* Radial soft background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag inline-block mb-3">Certifications</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] tracking-tight mb-4 font-serif">
            Our <em className="text-[#FF7A00] not-italic">Credentials</em>
          </h2>
          <p className="text-base sm:text-lg text-[#444444] leading-relaxed">
            Legally compliant, industry-certified, and recognized by government regulatory bodies.
          </p>
        </FadeIn>

        {/* 4 Cards Grid */}
        <StaggerContainer staggerChildren={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <StaggerItem key={idx} direction="up" className="h-full">
              <div 
                onClick={onOpenQuote}
                className="h-full bg-white rounded-2xl p-8 text-center transition-all duration-300 border-2 border-[#F0EFEC] hover:border-[#FF7A00] hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/15 cursor-pointer flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-5 text-3xl group-hover:scale-110 group-hover:bg-[#FF7A00] group-hover:text-white transition-all duration-300">
                    <span>{cert.icon}</span>
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-base mb-2 font-serif group-hover:text-[#FF7A00] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed mb-4">
                    {cert.desc}
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-700 text-[11px] font-bold">
                    {cert.tag}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};

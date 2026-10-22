import React from 'react';
import { ArrowRight, Phone, Award } from 'lucide-react';
import { COMPANY_INFO } from '../data/websiteData';
import { FadeIn } from './common/MotionReveal';

interface LeadershipSectionProps {
  onOpenQuote: () => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="director" className="relative py-24 bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0D0D1A] text-white overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-tag inline-block mb-3">Leadership</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-serif">
            Meet Our <em className="text-[#FFB25C] not-italic">Director</em>
          </h2>
          <p className="text-base sm:text-lg text-[#C8C8C8] leading-relaxed max-w-2xl mx-auto">
            The visionary behind <span className="svt-brand font-semibold">Tours &amp; Travels</span> — Karnataka's most trusted corporate transport company.
          </p>
        </FadeIn>

        {/* Director Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group max-w-sm w-full">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl shadow-black/60 bg-[#0B0F19]">
                <img
                  src="/images/director_portrait.jpg"
                  alt="Mr. P. N. Divakar Naidu — Director, Tours & Travels"
                  className="w-full aspect-[3/4] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden aspect-[3/4] w-full bg-gradient-to-br from-[#FF7A00] to-[#1A1A2E] flex-col items-center justify-center text-center p-6">
                  <span className="text-6xl font-black text-white font-serif mb-2">DN</span>
                  <span className="text-lg font-bold text-white">Mr. P. N. Divakar Naidu</span>
                  <span className="text-xs text-[#FFB25C] mt-1">Founder &amp; Director</span>
                </div>
              </div>

              {/* Floating Director Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7A00] to-[#CC5F00] text-white px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-xl shadow-orange-500/25 border border-white/20 tracking-wide flex items-center gap-1.5">
                <span>👤</span>
                <span>Mr. P. N. Divakar Naidu · Director</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Quotes */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-serif mb-1">
              Mr. P. N. Divakar Naidu
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#FFB25C] tracking-wider uppercase mb-5">
              Director — <span className="svt-brand font-semibold">Tours &amp; Travels Pvt. Ltd.</span>
            </p>

            <div className="w-14 h-1 bg-gradient-to-r from-[#FF7A00] to-[#FF9B3D] rounded mb-6" />

            {/* Blockquote with crimson left border */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border-l-4 border-[#FF7A00] border-y border-r border-white/10 mb-6">
              <p className="text-base sm:text-lg text-white/95 italic font-serif leading-relaxed">
                "Mr. P. N. Divakar Naidu, Director of <span className="svt-brand not-italic font-bold">Tours and Travels Pvt. Ltd.</span>, is a visionary leader with a deep-rooted passion for the transportation industry."
              </p>
            </div>

            <p className="text-sm text-[#C8C8C8] leading-relaxed mb-4">
              Beginning his journey from the ground level, he has gained hands-on experience in every aspect of operations, steadily growing through dedication, innovation, and a commitment to excellence. His step-by-step rise reflects not only his strong work ethic but also his ability to inspire teams, adapt to changing industry needs, and drive sustainable growth.
            </p>

            <p className="text-sm text-[#C8C8C8] leading-relaxed mb-6">
              Today, as a dynamic and forward-thinking young leader, he continues to steer <span className="svt-brand font-semibold">Tours &amp; Travels</span> towards new horizons with integrity, customer focus, and a future-ready mindset.
            </p>

            {/* Summary Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-orange-500/10 border border-orange-500/25 text-xs sm:text-sm text-gray-300 italic leading-relaxed mb-8">
              "Mr. P. N. Divakar Naidu, Director of <strong className="text-white font-semibold"><span className="svt-brand not-italic">Tours and Travels Pvt. Ltd.</span></strong>, is a visionary young leader who rose from ground-level operations to leading the company with innovation, integrity, and a customer-first approach."
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenQuote}
                className="btn-primary cursor-pointer text-sm"
              >
                <span>Connect with Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#fleet"
                className="btn-outline text-sm"
              >
                <span>View Fleet</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.contacts.primaryPhone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs hover:border-orange-500/40 hover:text-white transition-all ml-auto"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>{COMPANY_INFO.contacts.primaryPhone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

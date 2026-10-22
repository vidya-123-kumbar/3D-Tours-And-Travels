import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from './common/MotionReveal';

export const ClientsSection: React.FC = () => {
  const clients = [
    { name: '[24]7.ai', icon: '🤖', bgClass: 'bg-[#1a1a1a] text-white border-[#333333]' },
    { name: 'Pearl Global', icon: '🌿', bgClass: 'bg-[#f0fff4] text-[#166534] border-[#c6f6d5]' },
    { name: 'AECOM', icon: '🏗️', bgClass: 'bg-[#003087] text-white border-[#003087]' },
    { name: 'PragmaEdge', icon: '⚡', bgClass: 'bg-white text-[#e53e3e] border-gray-200 shadow-sm' },
    { name: 'commure', icon: '⚕️', bgClass: 'bg-[#e0f7fa] text-[#00838f] border-[#b2ebf2]' },
    { name: 'kwalee™', icon: '🎮', bgClass: 'bg-[#fbbf24] text-white border-[#f59e0b]' },
    { name: 'AON', icon: '🛡️', bgClass: 'bg-[#cc0000] text-white border-[#cc0000]' },
    { name: 'Nurture International School', icon: '🎓', bgClass: 'bg-[#fff7ed] text-[#9a3412] border-[#fed7aa]' },
    { name: 'VR Builders & Developers', icon: '🏢', bgClass: 'bg-[#1e3a5f] text-white border-[#1e3a5f]' },
    { name: 'Nyletech', icon: '🛰️', bgClass: 'bg-[#1a1a2e] text-white border-[#1a1a2e]' },
  ];

  const testimonials = [
    {
      stars: '★★★★★',
      quote: "Tours & Travels has been our employee transport partner for years. Their GPS-enabled fleet, trained drivers, and responsive support team have made our HR team's job significantly easier and more confident.",
      author: 'Admin Manager',
      company: '[24]7.ai Bengaluru',
      initials: 'AK',
    },
    {
      stars: '★★★★★',
      quote: "The Nyletech-powered GPS tracking gives us real-time peace of mind for all our employees. T&T's punctuality and communication are unmatched among transport vendors we've worked with.",
      author: 'Transport Head',
      company: 'AECOM India',
      initials: 'SM',
    },
    {
      stars: '★★★★★',
      quote: "Their event transport coordination for our annual conference was absolutely flawless — multiple pickup points, on-time arrivals, and professional drivers throughout. Highly recommended.",
      author: 'Transport Head',
      company: 'AON',
      initials: 'RP',
    },
  ];

  return (
    <section id="clients" className="relative py-24 bg-white text-[#1A1A2E] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-tag inline-block mb-3">Our Clientele</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] tracking-tight mb-4 font-serif">
            Trusted by <em className="text-[#FF7A00] not-italic">Industry Leaders</em>
          </h2>
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            Proudly serving India's most respected companies across tech, finance, construction, education, and healthcare sectors.
          </p>
        </FadeIn>

        {/* 10 Clients Grid */}
        <StaggerContainer staggerChildren={0.05} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {clients.map((client, idx) => (
            <StaggerItem key={idx} direction="scale" className="h-full">
              <div className={`h-full p-5 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-[#FF7A00] hover:shadow-xl cursor-default ${client.bgClass}`}>
                <span className="text-2xl mb-2">{client.icon}</span>
                <span className="font-bold text-sm tracking-wide font-sans">{client.name}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Testimonials Sub-Header */}
        <FadeIn className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A2E] font-serif">
            What Our <em className="text-[#FF7A00] not-italic">Clients Say</em>
          </h2>
        </FadeIn>

        {/* 3 Testimonials Grid */}
        <StaggerContainer staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <StaggerItem key={idx} direction="up" className="h-full">
              <div className="h-full bg-[#F8F7F4] rounded-2xl p-7 border-2 border-transparent hover:border-orange-500/30 hover:-translate-y-1.5 transition-all duration-300 shadow-sm flex flex-col justify-between group">
                <div>
                  <div className="font-serif text-5xl text-[#FF7A00] opacity-25 -mb-4 select-none">"</div>
                  <div className="text-amber-500 text-sm tracking-widest mb-3">{t.stars}</div>
                  <p className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-6 font-normal">
                    {t.quote}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#CC5F00] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#1A1A2E]">{t.author}</div>
                    <div className="text-[11px] text-[#777777]">{t.company}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};

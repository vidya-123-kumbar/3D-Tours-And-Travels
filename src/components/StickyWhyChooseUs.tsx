import React, { useEffect, useRef, useState } from 'react';

export const StickyWhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const cards = [
    {
      number: '01 / 07',
      icon: '👷',
      title: 'Trained & Compliant Staff',
      desc: 'Our professionally trained team undergoes regular POSH compliance and safety awareness programs. Every driver is police-verified, POSH-trained, and briefed on emergency response protocols — ensuring passenger safety is never an afterthought.',
      tag: '✓ POSH Certified',
    },
    {
      number: '02 / 07',
      icon: '🧾',
      title: 'Unified Billing',
      desc: 'Our integrated software generates a single, consolidated invoice covering both transport and technology services. No more juggling between multiple vendors — one clean invoice, one point of contact, complete transparency.',
      tag: '✓ GST Compliant',
    },
    {
      number: '03 / 07',
      icon: '🛡️',
      title: 'Safe & Secure Travel',
      desc: 'Physical SOS buttons in every vehicle combined with app-based alerts provide immediate emergency response around the clock. Our 24/7 control room monitors every trip in real-time, ensuring your employees always travel in safety.',
      tag: '✓ SOS Enabled',
    },
    {
      number: '04 / 07',
      icon: '🎯',
      title: 'On-Route Assistance',
      desc: 'Real-time support is available every minute of every journey. From navigation assistance to breakdown support and emergency response — our operations team is always reachable via in-vehicle SOS buttons and dedicated helplines.',
      tag: '✓ 24/7 Available',
    },
    {
      number: '05 / 07',
      icon: '📍',
      title: 'Convenient Locations',
      desc: 'We offer multiple strategically planned pickup and drop-off points, making commutes more accessible and practical for your entire workforce. Smart route optimisation reduces travel time without compromising comfort.',
      tag: '✓ GPS Optimised Routes',
    },
    {
      number: '06 / 07',
      icon: '🚘',
      title: 'Fleet Hygiene & Inspection',
      desc: 'All vehicles undergo mandatory pre-trip inspections, scheduled maintenance, and thorough sanitization. Our ISO 9001:2015 quality processes ensure every car in our fleet meets the highest standards of cleanliness and roadworthiness.',
      tag: '✓ ISO 9001:2015',
    },
    {
      number: '07 / 07',
      icon: '⚖️',
      title: 'Statutory Compliance',
      desc: 'Every aspect of our operation is fully compliant with government and transport safety regulations. RTO-certified vehicles, MSME registered, GST compliant, and backed by comprehensive insurance — zero risk, complete peace of mind.',
      tag: '✓ Fully Compliant',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const secH = section.offsetHeight;
      const viewH = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = Math.max(1, secH - viewH);
      const progress = Math.min(1, Math.max(0, scrolled / maxScroll));

      setScrollProgress(progress);

      // Determine active card by center of screen
      const cardElements = section.querySelectorAll('.sticky-feature-card');
      const center = viewH * 0.45;
      let bestIndex = 0;
      let bestDist = Infinity;

      cardElements.forEach((c, idx) => {
        const r = c.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const dist = Math.abs(mid - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = idx;
        }
      });

      setActiveCardIndex(bestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sticky-why"
      className="relative text-white overflow-visible"
      style={{
        background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 60%, #1e0a10 100%)',
        padding: 0,
      }}
    >
      {/* Background Architectural Grid Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(30,138,68,0.15) 0%, transparent 70%), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.03) 40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start overflow-visible">
        
        {/* Left Sticky Column */}
        <div className="w-full md:w-[46%] md:sticky md:top-0 md:h-screen flex flex-col justify-center px-6 sm:px-10 py-16 md:py-20 relative border-b md:border-b-0 md:border-r border-white/10 shrink-0">
          
          {/* Glowing Vertical Car Track */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#FF7A00] to-transparent shadow-[0_0_12px_#FF7A00]" />

          {/* Top-View Car moving along track */}
          <div
            className="hidden md:block absolute right-[-52px] pointer-events-none z-20 transition-all duration-75"
            style={{
              top: `${8 + scrollProgress * 76}%`,
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))',
            }}
          >
            {/* Top View Vehicle Graphic */}
            <svg width="104" height="150" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer Car Body (Corporate Sedan/SUV Top View) */}
              <rect x="22" y="10" width="56" height="128" rx="20" fill="#FF7A00" stroke="#FFB25C" strokeWidth="2.5" />
              {/* Windshield */}
              <path d="M28 42 C28 32, 72 32, 72 42 L68 56 C68 56, 32 56, 32 56 Z" fill="#1A1A2E" stroke="#FFB25C" strokeWidth="1.5" />
              {/* Roof */}
              <rect x="30" y="56" width="40" height="42" rx="4" fill="#E06900" />
              {/* Rear Window */}
              <path d="M31 100 L69 100 L67 112 C67 116, 33 116, 33 112 Z" fill="#1A1A2E" stroke="#FFB25C" strokeWidth="1.5" />
              {/* Side Mirrors */}
              <rect x="15" y="44" width="7" height="12" rx="3" fill="#CC5F00" />
              <rect x="78" y="44" width="7" height="12" rx="3" fill="#CC5F00" />
              {/* Headlights Beam Glow */}
              <polygon points="26,10 8,0 38,0" fill="rgba(255,255,255,0.4)" />
              <polygon points="74,10 62,0 92,0" fill="rgba(255,255,255,0.4)" />
              {/* Wheels */}
              <rect x="18" y="24" width="6" height="18" rx="2" fill="#111" />
              <rect x="76" y="24" width="6" height="18" rx="2" fill="#111" />
              <rect x="18" y="102" width="6" height="18" rx="2" fill="#111" />
              <rect x="76" y="102" width="6" height="18" rx="2" fill="#111" />
            </svg>
          </div>

          {/* Section Tag with Blinking Dot */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(30,138,68,0.22)] border border-[rgba(30,138,68,0.55)] text-[#FFB25C] text-xs font-bold uppercase tracking-widest mb-4 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#FF8A3D] animate-blink" />
            <span>Why Choose Us</span>
          </div>

          {/* Display Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            100+ Companies<br />
            <em className="text-[#FFB25C] not-italic">Count On Us</em>
          </h2>

          <p className="text-sm text-white/75 leading-relaxed mb-8 max-w-sm">
            From Bangalore and Beyond: <span className="svt-brand font-normal text-white">Tours &amp; Travels</span> — one ride at a time.
          </p>

          {/* Stat Row */}
          <div className="flex gap-3 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex-1 text-center hover:bg-emerald-900/30 transition-all">
              <strong className="block font-serif text-xl sm:text-2xl font-black text-[#FFB25C] mb-1">500+</strong>
              <span className="text-[11px] text-[#C8C8C8] leading-tight block">GPS-Enabled<br />Vehicles</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex-1 text-center hover:bg-emerald-900/30 transition-all">
              <strong className="block font-serif text-xl sm:text-2xl font-black text-[#FFB25C] mb-1">15+</strong>
              <span className="text-[11px] text-[#C8C8C8] leading-tight block">Years of<br />Excellence</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex-1 text-center hover:bg-emerald-900/30 transition-all">
              <strong className="block font-serif text-xl sm:text-2xl font-black text-[#FFB25C] mb-1">24/7</strong>
              <span className="text-[11px] text-[#C8C8C8] leading-tight block">Control Room<br />Support</span>
            </div>
          </div>

          {/* Dynamic Scroll Progress Bar */}
          <div className="mt-2">
            <div className="text-[11px] font-mono tracking-wider uppercase text-white/40 mb-2">
              Scroll to explore features
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1E8A44] to-[#FFB25C] transition-all duration-150"
                style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }}
              />
            </div>
          </div>

        </div>

        {/* Right Scrolling Cards Column */}
        <div className="w-full md:w-[54%] px-6 sm:px-12 py-12 md:py-24 flex flex-col gap-6">
          {cards.map((card, idx) => {
            const isActive = activeCardIndex === idx;
            return (
              <div
                key={card.number}
                className={`sticky-feature-card rounded-2xl p-7 sm:p-8 transition-all duration-400 relative overflow-hidden border ${
                  isActive
                    ? 'bg-[rgba(30,138,68,0.18)] border-[#FF7A00] shadow-[0_20px_50px_rgba(255,122,0,0.2)] -translate-y-1 scale-[1.01]'
                    : 'bg-white/4 border-white/8 hover:border-white/20'
                }`}
              >
                {/* Top highlight line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF7A00] via-[#FFB25C] to-[#FF7A00] transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />

                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[rgba(30,138,68,0.35)] border border-[#FF7A00]'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-[#FFB25C] tracking-wider mb-1">
                      {card.number}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                      {card.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4">
                  {card.desc}
                </p>

                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-[rgba(255,178,92,0.12)] text-[#FFB25C] border border-[rgba(255,178,92,0.25)]">
                  {card.tag}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

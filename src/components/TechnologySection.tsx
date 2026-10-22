import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const TechnologySection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number>(7);

  const techItems = [
    {
      icon: '📡',
      title: 'GPS Live Tracking',
      desc: 'Real-time vehicle location with geofencing alerts and live trip monitoring.',
      image: '/images/tech_gps.jpg',
    },
    {
      icon: '🗺️',
      title: 'Intelligent Routing',
      desc: 'AI-powered dynamic route optimization to reduce costs and improve punctuality.',
      image: '/images/tech_routing.jpg',
    },
    {
      icon: '📋',
      title: 'Automated Rostering',
      desc: 'Smart shift-based scheduling with automatic driver and vehicle assignment.',
      image: '/images/tech_rostering.jpg',
    },
    {
      icon: '💳',
      title: 'Automated Billing',
      desc: 'Transparent, accurate billing with mileage calculation and detailed reports.',
      image: '/images/tech_billing.jpg',
    },
    {
      icon: '📱',
      title: 'Driver Mobile App',
      desc: 'Trip acceptance, navigation, attendance, and communication — all in one app.',
      image: '/images/tech_driver.jpg',
    },
    {
      icon: '👩‍💻',
      title: 'Employee Mobile App',
      desc: 'Cab booking, live tracking, ETA alerts, and trip history for employees.',
      image: '/images/service_ets.jpg',
    },
    {
      icon: '🆘',
      title: 'SOS & Emergency',
      desc: 'One-tap SOS button, 24/7 emergency response and police coordination.',
      image: '/images/service_gps.jpg',
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      desc: 'Corporate admin view with trip logs, cost reports, and fleet utilization data.',
      image: '/images/service_delegation.jpg',
    },
  ];

  return (
    <>
      {/* ── 1. TECH PARTNERS SECTION (#tech-partners) ── */}
      <section id="tech-partners" className="relative py-20 bg-[#1A1A2E] text-white border-b border-white/10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-tag inline-block mb-3">GPS Partner</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-serif">
              Powered by <em className="text-[#FFB25C] not-italic">Industry-Leading</em> Technology
            </h2>
            <p className="text-base text-[#C8C8C8] leading-relaxed max-w-2xl mx-auto mb-10">
              <span className="svt-brand font-semibold">Tours &amp; Travels</span> transport operations are supported by Nyletech GPS tracking for precise visibility, safer trips, and dependable real-time monitoring.
            </p>

            {/* Single Feature Card: Nyletech */}
            <motion.div 
              className="max-w-lg mx-auto"
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-2xl p-10 text-center relative overflow-hidden group hover:border-[#FF7A00]/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-400">
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">🛰️</span>
                <span className="inline-block bg-[#FF7A00] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-sm">
                  GPS &amp; TRACKING PARTNER
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mb-3">
                  Nyletech
                </h3>
                <p className="text-sm text-[#C8C8C8] leading-relaxed mb-6">
                  Real-time GPS tracking, live vehicle visibility, route monitoring, and instant safety alerts for every corporate trip.
                </p>
                <div className="flex items-center justify-center gap-6 text-xs text-gray-400 font-mono pt-4 border-t border-white/10">
                  <span>✓ 24/7 Telemetry</span>
                  <span>✓ Real-time Geofencing</span>
                  <span>✓ Instant SOS</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SMART TECHNOLOGY SECTION (#technology) ── */}
      <section id="technology" className="relative py-24 bg-[#F8F7F4] text-[#1A1A2E] border-b border-gray-200 overflow-hidden">
        
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-orange-100 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header with Smooth Slide-In Entrance Animation */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="section-tag inline-block mb-3">Technology &amp; Safety</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] tracking-tight mb-4 font-serif">
                Powered by <em className="text-[#FF7A00] not-italic">Smart Technology</em>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#555555] leading-relaxed"
            >
              Our integrated transport management platform — built on Nyletech and Technology Partners — ensures every trip is tracked, monitored, and optimized in real time.
            </motion.p>
          </div>

          {/* 8 Cards Grid (Compact & Perfectly Proportioned) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {techItems.map((item, idx) => {
              const isSelected = selectedCard === idx;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2, ease: 'easeOut' },
                  }}
                  onClick={() => setSelectedCard(idx)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl p-2 sm:p-2.5 flex items-center justify-center select-none h-56 sm:h-60 ${
                    isSelected ? 'ring-2 ring-[#FF7A00]' : ''
                  }`}
                >
                  {/* Outer Full-Bleed Photograph with Smooth Hover Zoom */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Vignette on Photo for Depth */}
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors pointer-events-none" />

                  {/* Inner Floating White Glass Card (Exact Match with Reference Screenshot) */}
                  <div
                    className={`relative z-10 w-full h-full rounded-xl p-3.5 sm:p-4 backdrop-blur-md flex flex-col items-center justify-center text-center transition-all duration-300 shadow-md ${
                      isSelected
                        ? 'bg-white/96 border-2 border-[#FF7A00] shadow-[0_8px_20px_rgba(255,122,0,0.2)]'
                        : 'bg-white/92 hover:bg-white/96 border border-white/80 group-hover:border-[#FF7A00]/50'
                    }`}
                  >
                    {/* Colorful Icon with Subtle Hover Bounce */}
                    <div className="text-2xl sm:text-3xl mb-1.5 block transform group-hover:scale-115 transition-transform duration-300">
                      {item.icon}
                    </div>

                    {/* Card Title */}
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#1A1A2E] mb-1.5 group-hover:text-[#FF7A00] transition-colors leading-tight">
                      {item.title}
                    </h4>

                    {/* Card Description */}
                    <p className="text-[11px] sm:text-xs text-[#555555] leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    {/* Bottom Indicator Bar */}
                    <div className="mt-2 flex items-center justify-center">
                      <div
                        className={`h-0.5 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'w-12 bg-[#FF7A00]'
                            : 'w-0 group-hover:w-10 bg-[#FF7A00]'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

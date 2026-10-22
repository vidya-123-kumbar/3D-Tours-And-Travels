import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../data/websiteData';
import { ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onOpenQuote: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="services" className="py-24 bg-white text-[#1A1A1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="section-tag inline-block mb-3">Our Services</div>
          <h2 className="section-title">
            Complete <em>Transport Solutions</em>
          </h2>
          <p className="section-sub mx-auto">
            A sophisticated, innovative, robust, and comprehensive platform for managing, streamlining, and automating all your employee transport management operations.
          </p>
        </motion.div>

        {/* 6 Services Grid with Cascading Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 48, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.28, ease: 'easeOut' },
              }}
              className="group bg-[#F8F7F4] rounded-2xl overflow-hidden border-2 border-[#F0EFEC] hover:border-[#FF7A00] transition-colors duration-300 hover:shadow-[0_25px_60px_rgba(255,122,0,0.22)] flex flex-col justify-between"
            >
              <div>
                {/* Image Header with smooth zoom */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Top Badge: Metric Stat */}
                  {service.stat && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1A1A2E]/90 text-[#FFB25C] border border-white/15 backdrop-blur-md shadow-md">
                        {service.stat} {service.statLabel}
                      </span>
                    </div>
                  )}

                  {/* Floating Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#FF7A00] flex items-center justify-center font-bold text-xl shadow-lg group-hover:bg-[#FF7A00] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {service.id.includes('corporate') ? '🏢' :
                       service.id.includes('employee') ? '👥' :
                       service.id.includes('event') ? '📅' :
                       service.id.includes('fleet') ? '⚙️' :
                       service.id.includes('gps') ? '📡' : '🕒'}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl font-bold text-[#1A1A2E] mb-3 group-hover:text-[#FF7A00] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-5">
                    {service.fullDesc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#666666]">
                        <span className="text-[#FF7A00] font-bold mt-0.5">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button with interactive hover slide */}
              <div className="px-6 pb-6 pt-0">
                <button
                  type="button"
                  onClick={() => onOpenQuote(service.title)}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-[#1A1A2E] bg-white border border-[#E0E0E0] group-hover:bg-[#FF7A00] group-hover:border-[#FF7A00] group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

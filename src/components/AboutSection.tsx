import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, HeartHandshake, ShieldCheck } from 'lucide-react';

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuote }) => {
  const valueCards = [
    {
      icon: Target,
      title: 'Mission',
      desc: 'Deliver safe, punctual, and dignified transportation for every commuter, every day.',
    },
    {
      icon: Compass,
      title: 'Vision',
      desc: "To be South India's most technology-driven employee transportation company.",
    },
    {
      icon: HeartHandshake,
      title: 'Values',
      desc: 'Reliability, Safety, Transparency, Innovation, and Customer Centricity.',
    },
    {
      icon: ShieldCheck,
      title: 'Compliance',
      desc: '100% RTO compliant, police-verified drivers, and fitness-certified fleet.',
    },
  ];

  const stats = [
    { num: '500+', label: 'Vehicles' },
    { num: '10+', label: 'Clients' },
    { num: 'MSME', label: 'Registered' },
    { num: 'GST', label: 'Compliant' },
  ];

  return (
    <section id="about" className="py-24 bg-[#F8F7F4] text-[#1A1A1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Signature 2016 Year Card with Animated Slide-In */}
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div
              className="relative rounded-3xl p-8 sm:p-12 text-center text-white overflow-hidden shadow-2xl transition-transform duration-500 hover:shadow-[0_20px_50px_rgba(255,122,0,0.18)]"
              style={{ background: 'linear-gradient(145deg, #1A1A2E, #16213E)' }}
            >
              {/* Decorative background glows */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#FF7A00]/10 rounded-full pointer-events-none blur-2xl" />
              <div className="absolute -top-8 -left-8 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />

              {/* Floating ISO 9001:2015 Badge with float animation */}
              <div className="absolute top-6 right-6 p-3 px-4 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FFB25C] text-white text-xs font-bold leading-tight shadow-xl text-center animate-float z-10">
                <div>ISO 9001:2015</div>
                <div>CERTIFIED ✓</div>
                <div className="text-[10px] font-normal opacity-90">Quality Assured</div>
              </div>

              {/* Establishment Year with Subtle Scale */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-6xl sm:text-7xl font-black text-[#FFB25C] leading-none mb-1"
              >
                2016
              </motion.div>
              <div className="text-xs font-semibold tracking-wider text-[#C8C8C8] uppercase mb-4">
                Year of Establishment
              </div>

              <div className="w-16 h-0.5 bg-[#FF7A00] mx-auto rounded-full mb-4" />

              <p className="text-sm text-white/80 leading-relaxed mb-6">
                Karnataka's Premium<br />Corporate Transport Partner
              </p>

              {/* 4 Inner Stats with Stagger Animation */}
              <div className="grid grid-cols-2 gap-3.5">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.35 + idx * 0.1 }}
                    className="bg-white/7 border border-white/10 rounded-xl p-3.5 hover:bg-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all duration-300"
                  >
                    <strong className="block font-serif text-2xl font-bold text-[#FFB25C]">{stat.num}</strong>
                    <span className="text-xs text-[#C8C8C8]">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: About Content & Value Cards with Animated Slide-In */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="section-tag">About Us</div>
            <h2 className="section-title">
              Karnataka's <em>Most Trusted</em> Transport Partner
            </h2>

            <p className="text-sm sm:text-base text-[#444444] leading-relaxed mb-4">
              <span className="svt-brand font-semibold">Tours &amp; Travels Pvt. Ltd.</span> is a leading corporate transportation enterprise headquartered in Bengaluru. With over two decades of excellence, we specialize in providing seamless, safe, and technology-enabled transport solutions for India's top enterprises.
            </p>

            <p className="text-sm sm:text-base text-[#444444] leading-relaxed mb-8">
              Our commitment to punctuality, passenger safety, and driver discipline — backed by our technology partnerships with <strong>Nyletech</strong> and <strong>Technology Partners</strong> — makes <span className="svt-brand font-semibold">Tours &amp; Travels</span> the preferred transport vendor for IT companies, BPOs, hospitals, schools, and large enterprise campuses across Karnataka.
            </p>

            {/* 4 Value Cards with Staggered Entrance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {valueCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="bg-white p-5 rounded-xl border-l-4 border-[#FF7A00] shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="font-bold text-[#1A1A2E] text-sm mb-1.5 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#FF7A00]" />
                      <span>{card.title}</span>
                    </h4>
                    <p className="text-xs text-[#555555] leading-relaxed">
                      {card.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a href="#director" className="btn-primary text-xs font-bold">
                Meet Our Director
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full text-xs font-bold border-2 border-gray-300 text-[#1A1A2E] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-colors"
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

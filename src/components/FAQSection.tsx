import React, { useState } from 'react';
import { FadeIn } from './common/MotionReveal';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What areas do you serve in Bengaluru?',
      a: "We serve all major IT corridors in Bengaluru including Whitefield, Electronic City, Marathahalli, Bellandur, Sarjapur Road, Koramangala, and the Outer Ring Road tech parks. We're also based in Hosakote Taluk and serve surrounding areas.",
    },
    {
      q: 'Do you provide dedicated vehicles for companies?',
      a: 'Yes, we offer both dedicated (exclusive fleet for one client) and shared fleet models. Our account managers recommend the best model based on your headcount, shift patterns, and budget.',
    },
    {
      q: 'How is driver safety verified?',
      a: 'All drivers undergo police verification, medical fitness check, driving license validation, and background check before onboarding. They also receive periodic safety and soft-skills training throughout their tenure.',
    },
    {
      q: 'What technology solutions come with your transport service?',
      a: 'We provide GPS live tracking via Nyletech, employee and driver mobile apps, automated billing reports, rostering software by Technology Partners, and a corporate admin dashboard — all included in enterprise contracts.',
    },
    {
      q: "Do you handle night shifts and women's safety requirements?",
      a: 'Absolutely. We have dedicated protocols for night cabs including mandatory escort/guard for women employees, real-time monitoring, and a 24/7 emergency helpline. All night vehicles are fitted with CCTV cameras.',
    },
    {
      q: 'How do I get a quote for my company?',
      a: 'Call us at +91 9742588995 or +91 9535229994, email sales@toursandtravels.com, or click the "Get Quote" button on this page. Our team responds within 2 business hours with a customized proposal.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 bg-[#F8F7F4] text-[#1A1A2E] border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-tag inline-block mb-3">FAQ</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] tracking-tight mb-4 font-serif">
            Frequently Asked <em className="text-[#FF7A00] not-italic">Questions</em>
          </h2>
        </FadeIn>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden shadow-sm ${
                  isOpen ? 'border-[#FF7A00] shadow-md shadow-orange-500/10' : 'border-[#F0EFEC] hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`font-semibold text-sm sm:text-base font-sans transition-colors ${
                    isOpen ? 'text-[#FF7A00]' : 'text-[#1A1A2E]'
                  }`}>
                    {faq.q}
                  </span>
                  
                  {/* Rotating plus icon */}
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-base shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#FF7A00] text-white rotate-45'
                        : 'bg-[#F0EFEC] text-[#555555]'
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#444444] leading-relaxed border-t border-gray-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

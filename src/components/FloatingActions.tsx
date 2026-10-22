import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/websiteData';

export const FloatingActions: React.FC = () => {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackTop(true);
      } else {
        setShowBackTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Back to top button */}
      {showBackTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#111827] text-slate-300 hover:text-orange-400 flex items-center justify-center border border-white/15 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
          aria-label="Scroll back to top"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Direct Call Button (Corporate Orange Gradient) */}
      <a
        href={`tel:${COMPANY_INFO.contacts.primaryPhone}`}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white flex items-center justify-center shadow-xl shadow-orange-500/25 hover:brightness-110 hover:scale-105 active:scale-95 transition-all border border-orange-400/50"
        aria-label="Call 24/7 Dispatch Desk"
        title="Call 24/7 Desk"
      >
        <Phone className="w-5 h-5 text-white" />
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.contacts.whatsapp}?text=${encodeURIComponent('Hi Tours & Travels, I am reaching out to discuss corporate employee transport.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-white relative group"
        aria-label="Chat on WhatsApp"
        title="Chat with Tours & Travels on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>
    </div>
  );
};

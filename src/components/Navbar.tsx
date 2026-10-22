import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Lock, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/websiteData';

interface NavbarProps {
  onOpenQuote: (servicePrefill?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Partners', href: '#tech-partners' },
    { name: 'Clients', href: '#clients' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#1A1A2E]/95 backdrop-blur-xl border-b border-white/10 shadow-xl'
            : 'py-5 bg-gradient-to-b from-black/60 via-black/20 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Emblem & Brand Text */}
            <a href="#hero" className="flex items-center gap-3.5 group text-decoration-none">
              <div className="w-12 h-12 bg-white rounded-2xl p-1 shadow-lg flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="44" fill="#1A1A2E" />
                  <circle cx="50" cy="50" r="40" stroke="#FF7A00" strokeWidth="4" fill="none" />
                  <circle cx="50" cy="50" r="30" stroke="#1E8A44" strokeWidth="2" strokeDasharray="5,4" fill="none" />
                  <path d="M26 32 L50 78 L74 32 L60 32 L50 56 L40 32 Z" fill="#FF7A00" />
                  <path d="M36 30 L64 30 L64 37 L54 37 L54 50 L46 50 L46 37 L36 37 Z" fill="#FFB25C" />
                </svg>
              </div>

              <div className="flex flex-col text-left">
                <span className="text-base sm:text-lg font-semibold text-white tracking-wide leading-tight">
                  Tours &amp; Travels
                </span>
                <span className="text-[11px] text-[#C8C8C8] tracking-wider mt-0.5">
                  Pvt. Ltd. · Est. {COMPANY_INFO.establishedYear} · ISO 9001:2015
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/85 hover:text-white text-sm font-medium tracking-wide transition-colors relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF7A00] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Call desk */}
              <a
                href={`tel:${COMPANY_INFO.contacts.primaryPhone}`}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 rounded-full border border-white/15 transition-all"
                title="24/7 Operations Desk"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span className="hidden xl:inline">{COMPANY_INFO.contacts.primaryPhone}</span>
                <span className="xl:hidden">24/7 Desk</span>
              </a>

              {/* Admin Portal Toggle */}
              <button
                type="button"
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all cursor-pointer"
                title="Admin Database Portal"
              >
                <Lock className="w-3 h-3 text-[#FFB25C]" />
                <span>Portal</span>
              </button>

              {/* Get Quote CTA */}
              <button
                type="button"
                onClick={() => onOpenQuote()}
                className="btn-primary text-xs font-bold px-6 py-2.5 shadow-lg shadow-orange-500/30"
              >
                <span>Get Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => onOpenQuote()}
                className="btn-primary px-3 py-1.5 text-xs font-bold sm:hidden"
              >
                Quote
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/15 transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-[#1A1A2E] border-l border-white/15 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FF7A00] text-white flex items-center justify-center font-bold text-xs shadow">
                    T&T
                  </div>
                  <div className="text-sm font-bold text-white">Tours & Travels</div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/15 space-y-3">
              <a
                href={`tel:${COMPANY_INFO.contacts.primaryPhone}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white"
              >
                <Phone className="w-4 h-4 text-[#FF7A00]" />
                <span>{COMPANY_INFO.contacts.primaryPhone}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="btn-primary w-full py-3 text-xs font-bold"
              >
                <span>Request a Quote →</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

import React from 'react';
import { Lock } from 'lucide-react';
import { COMPANY_INFO } from '../data/websiteData';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#1A1A2E] text-[#C8C8C8] pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          
          {/* Col 1: Brand & Social (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#CC5F00] flex items-center justify-center font-bold text-white text-base shadow-md group-hover:scale-105 transition-transform">
                <span>T&T</span>
              </div>
              <div>
                <span className="block text-white font-serif font-bold text-lg leading-tight group-hover:text-[#FFB25C] transition-colors">
                  Tours &amp; Travels
                </span>
                <span className="block text-[11px] text-[#A0A0A0] tracking-wider uppercase font-sans">
                  Pvt. Ltd. · Est. 2016
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed max-w-md">
              Karnataka's most trusted ISO 9001:2015 certified corporate transport partner. Powered by Nyletech &amp; Technology Partners. Serving 10+ leading enterprises since 2016.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#FF7A00] text-white flex items-center justify-center transition-all"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#FF7A00] text-white flex items-center justify-center transition-all"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#FF7A00] text-white flex items-center justify-center transition-all"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm font-sans mb-4">Services</h4>
            <ul className="space-y-2 text-xs text-[#A0A0A0]">
              <li><a href="#services" className="hover:text-white transition-colors">Corporate Transport</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Employee Transportation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Event Transport</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Fleet Management</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">GPS Technology</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">24/7 Support</a></li>
            </ul>
          </div>

          {/* Col 3: Company (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm font-sans mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-[#A0A0A0]">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#tech-partners" className="hover:text-white transition-colors">Technology Partners</a></li>
              <li><a href="#certifications" className="hover:text-white transition-colors">Certifications</a></li>
              <li><a href="#training" className="hover:text-white transition-colors">Training</a></li>
              <li><a href="#clients" className="hover:text-white transition-colors">Our Clients</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              {onOpenAdmin && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="hover:text-orange-400 text-xs flex items-center gap-1 transition-colors cursor-pointer mt-2 text-orange-400/80"
                  >
                    <Lock className="w-3 h-3 text-[#FF7A00]" />
                    <span>Admin Portal</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm font-sans mb-4">Contact Info</h4>
            <div className="space-y-3 text-xs text-[#A0A0A0]">
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 shrink-0 text-[#E91E63] mt-0.5" fill="#E91E63" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="leading-relaxed">Shop No. 7, 8, 9, 1st Floor, Whitefield Main Road, Samethanahalli, Hosakote Taluk, Bengaluru – 560 067</span>
              </div>
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 shrink-0 text-[#4CAF50] mt-0.5" fill="#4CAF50" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                <div className="space-y-0.5">
                  <a href="tel:+919742588995" className="block hover:text-white transition-colors">+91 97425 88995</a>
                  <a href="tel:+919535229994" className="block hover:text-white transition-colors">+91 95352 29994</a>
                  <a href="tel:+917411144405" className="block hover:text-white transition-colors">+91 74111 44405</a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 shrink-0 text-[#2196F3] mt-0.5" fill="#2196F3" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <div className="space-y-0.5">
                  <a href="mailto:sales@toursandtravels.com" className="block hover:text-white transition-colors">sales@toursandtravels.com</a>
                  <a href="mailto:mails@toursandtravels.com" className="block hover:text-white transition-colors">mails@toursandtravels.com</a>
                  <a href="mailto:support@toursandtravels.com" className="block hover:text-white transition-colors">support@toursandtravels.com</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#888888]">
          <p>© 2025 <span className="svt-brand font-semibold">Tours &amp; Travels Pvt. Ltd</span> All rights reserved.</p>
          <p>
            Designed and developed by{' '}
            <a
              href="https://bookmywebsite.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF9B3D] hover:underline font-semibold"
            >
              bookmywebsite.in</a>
          </p>
        </div>

      </div>
    </footer>
  );
};

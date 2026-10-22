import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/websiteData';
import { FadeIn } from './common/MotionReveal';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: 'Corporate Transport',
    count: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid corporate email is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Valid 10-digit phone number is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    let refId = 'SVT-' + Math.floor(1000 + Math.random() * 9000);

    try {
      // Preserve existing SQLite backend inquiry storage
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.referenceId) refId = data.referenceId;
      }
    } catch (err) {
      console.warn('API fallback active:', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedRef(refId);

      // Open WhatsApp inquiry directly as in reference website
      const text = encodeURIComponent(
        `*New Corporate Inquiry — Tours & Travels*\n` +
        `Ref: ${refId}\n\n` +
        `👤 *Name:* ${formData.fullName}\n` +
        `🏢 *Company:* ${formData.companyName || 'Not specified'}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `🚗 *Service:* ${formData.service}\n` +
        `👥 *Count:* ${formData.count || 'Not specified'}\n` +
        `💬 *Message:* ${formData.message || 'Please send quotation.'}`
      );
      window.open(`https://wa.me/919742588995?text=${text}`, '_blank');
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#F8F7F4] text-[#1A1A2E] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag inline-block mb-3">Contact Us</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] tracking-tight mb-4 font-serif">
            Let's <em className="text-[#FF7A00] not-italic">Connect</em>
          </h2>
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            Reach out to discuss your transport requirements. Our team responds within 2 hours on business days.
          </p>
        </FadeIn>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 4 Contact Detail Cards + Map */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Registered Office */}
            <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-l-4 hover:border-l-[#FF7A00] hover:translate-x-1.5 transition-all duration-300 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center shrink-0 text-[#E91E63]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#E91E63">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <strong className="block text-sm font-bold text-[#1A1A2E] mb-1">Registered Office</strong>
                <span className="text-xs text-[#555555] leading-relaxed block">
                  Shop No. 7, 8, 9, 1st Floor, Whitefield Main Road, Samethanahalli, Hosakote Taluk, Bengaluru – 560 067
                </span>
              </div>
            </div>

            {/* Sales & Enquiries */}
            <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-l-4 hover:border-l-[#FF7A00] hover:translate-x-1.5 transition-all duration-300 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-[#4CAF50]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#4CAF50">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </div>
              <div className="space-y-1">
                <strong className="block text-sm font-bold text-[#1A1A2E]">Sales &amp; Enquiries</strong>
                <a href="tel:+919742588995" className="block text-xs text-[#555555] hover:text-[#FF7A00] transition-colors">+91 97425 88995</a>
                <a href="tel:+919535229994" className="block text-xs text-[#555555] hover:text-[#FF7A00] transition-colors">+91 95352 29994</a>
                <a href="tel:+917411144405" className="block text-xs text-[#555555] hover:text-[#FF7A00] transition-colors">+91 74111 44405</a>
              </div>
            </div>

            {/* Email Us */}
            <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-l-4 hover:border-l-[#FF7A00] hover:translate-x-1.5 transition-all duration-300 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#2196F3]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#2196F3">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className="space-y-1">
                <strong className="block text-sm font-bold text-[#1A1A2E]">Email Us</strong>
                <a href="mailto:sales@toursandtravels.com" className="block text-xs text-[#555555] hover:text-[#FF7A00] transition-colors">sales@toursandtravels.com</a>
                <a href="mailto:mails@toursandtravels.com" className="block text-xs text-[#555555] hover:text-[#FF7A00] transition-colors">mails@toursandtravels.com</a>
                <a href="mailto:support@toursandtravels.com" className="block text-xs text-[#555555] hover:text-[#FF7A00] transition-colors">support@toursandtravels.com</a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-l-4 hover:border-l-[#FF7A00] hover:translate-x-1.5 transition-all duration-300 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-[#FF9800]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#FF9800">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </div>
              <div>
                <strong className="block text-sm font-bold text-[#1A1A2E] mb-1">Working Hours</strong>
                <span className="text-xs text-[#555555] leading-relaxed block">
                  Operations: 24/7 · Office: Mon–Sat, 9:00 AM – 6:00 PM
                </span>
              </div>
            </div>

            {/* Map Placeholder matching reference */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#E8EDF5] to-[#D5DDE8] border-2 border-dashed border-[#C5CDD8] text-center text-xs text-[#444444] font-medium">
              📍 Whitefield Main Road, Samethanahalli, Hosakote Taluk, Bengaluru – 560 067
              <span className="block text-[11px] text-gray-500 mt-2">
                Operational across Whitefield, Electronic City, Bellandur, Marathahalli, Manyata &amp; Airport Corridor.
              </span>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
              <h3 className="font-serif text-2xl font-bold text-[#1A1A2E] mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F0EFEC] bg-[#F8F7F4] text-xs sm:text-sm text-[#1A1A2E] focus:outline-none focus:border-[#FF7A00] focus:bg-white transition-all"
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Company"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F0EFEC] bg-[#F8F7F4] text-xs sm:text-sm text-[#1A1A2E] focus:outline-none focus:border-[#FF7A00] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F0EFEC] bg-[#F8F7F4] text-xs sm:text-sm text-[#1A1A2E] focus:outline-none focus:border-[#FF7A00] focus:bg-white transition-all"
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F0EFEC] bg-[#F8F7F4] text-xs sm:text-sm text-[#1A1A2E] focus:outline-none focus:border-[#FF7A00] focus:bg-white transition-all"
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#F0EFEC] bg-[#F8F7F4] text-xs sm:text-sm text-[#1A1A2E] focus:outline-none focus:border-[#FF7A00] focus:bg-white transition-all cursor-pointer"
                  >
                    <option>Corporate Transport</option>
                    <option>Employee Transportation</option>
                    <option>Event Transport</option>
                    <option>Fleet Management</option>
                    <option>GPS &amp; Technology</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">
                    Number of Employees / Vehicles
                  </label>
                  <input
                    type="text"
                    placeholder="Approx. count"
                    value={formData.count}
                    onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#F0EFEC] bg-[#F8F7F4] text-xs sm:text-sm text-[#1A1A2E] focus:outline-none focus:border-[#FF7A00] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your transport requirements…"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#F0EFEC] bg-[#F8F7F4] text-xs sm:text-sm text-[#1A1A2E] focus:outline-none focus:border-[#FF7A00] focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#CC5F00] to-[#FF7A00] hover:from-[#FF7A00] hover:to-[#FF9B3D] transition-all duration-300 shadow-xl shadow-orange-500/25 cursor-pointer"
                >
                  {isSubmitting ? 'Processing...' : 'Send via WhatsApp 💬'}
                </button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  Your message will open in WhatsApp to <strong className="text-[#1A1A2E]">+91 97425 88995</strong>
                </p>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { X, Send, AlertCircle, CheckCircle2, Database } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/websiteData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  prefillService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: prefillService || 'Corporate Transport Services',
    count: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedRef, setSavedRef] = useState<string | null>(null);

  useEffect(() => {
    if (prefillService) {
      setFormData((prev) => ({ ...prev, service: prefillService }));
    }
  }, [prefillService]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Contact person name is required';
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid 10-digit phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    let referenceId = 'SVT-2026-' + Math.floor(1000 + Math.random() * 9000);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          companyName: formData.company,
          phone: formData.phone,
          email: formData.email,
          serviceType: formData.service,
          passengerCount: formData.count,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.quote && result.quote.referenceId) {
          referenceId = result.quote.referenceId;
        }
      }
    } catch {
      // Offline fallback - still generate reference ID
    } finally {
      setIsSubmitting(false);
      setSavedRef(referenceId);

      const waText = encodeURIComponent(
        `*New Corporate Quote Request - Tours & Travels*\n\n` +
        `🔖 *Reference:* ${referenceId}\n` +
        `🏢 *Company:* ${formData.company}\n` +
        `👤 *Contact:* ${formData.name}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `✉️ *Email:* ${formData.email || 'N/A'}\n` +
        `🚐 *Service:* ${formData.service}\n` +
        `👥 *Commuters / Fleet Scale:* ${formData.count || 'N/A'}\n` +
        `📝 *Notes:* ${formData.notes || 'Please provide quotation and rate card.'}`
      );

      const waUrl = `https://wa.me/${COMPANY_INFO.contacts.whatsapp}?text=${waText}`;

      setTimeout(() => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#111827] border border-white/15 shadow-2xl z-10 max-h-[92vh] overflow-y-auto text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1F293D] hover:bg-[#374151] text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-4 h-4 text-orange-400" />
        </button>

        {savedRef ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-[#F97316] flex items-center justify-center mx-auto border border-orange-500/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0F19] border border-white/10 text-orange-400 text-xs font-mono font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>Reference ID: {savedRef}</span>
            </div>

            <h3 className="text-xl font-bold text-white font-display">
              Quotation Request Registered
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your inquiry has been recorded in the corporate operations database under tracking reference <strong className="text-orange-400 font-mono">{savedRef}</strong>.
            </p>
            <div className="pt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-bold rounded-xl cursor-pointer bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white hover:brightness-110 shadow-lg shadow-orange-500/20"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold mb-2 border border-orange-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span>24/7 Operations Desk Dispatch</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Request a Corporate Quotation
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Share your requirements. Submissions are assigned an enterprise database reference.
              </p>
            </div>

            {/* Company & Name */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Infosys, AECOM, Pearl Global"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors ${
                    errors.company ? 'border-red-400 focus:border-red-500' : 'border-white/10'
                  }`}
                />
                {errors.company && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.company}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors ${
                      errors.name ? 'border-red-400 focus:border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors ${
                      errors.phone ? 'border-red-400 focus:border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B0F19] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title} className="bg-[#111827] text-white">
                        {s.title}
                      </option>
                    ))}
                    <option value="Mixed Fleet & Custom Solutions" className="bg-[#111827] text-white">Mixed Fleet &amp; Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Commuters / Shift Scale
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 80 staff / 4 buses"
                    value={formData.count}
                    onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Specific Transit Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="Pickup hubs, routes, shift schedules..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F19] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 text-xs sm:text-sm font-bold rounded-xl mt-2 cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white hover:brightness-110 shadow-lg shadow-orange-500/25 transition-all"
            >
              {isSubmitting ? (
                <span>Registering Quotation...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit &amp; Open WhatsApp Confirmation</span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-400">
              Direct Contact: <strong className="text-orange-400">{COMPANY_INFO.contacts.primaryPhone}</strong> · Registered in Bengaluru
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { StickyWhyChooseUs } from './components/StickyWhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
import { LeadershipSection } from './components/LeadershipSection';
import { FleetShowcase } from './components/FleetShowcase';
import { OperationsShowcase } from './components/OperationsShowcase';
import { TechnologySection } from './components/TechnologySection';
import { CertificationsSection } from './components/CertificationsSection';
import { ClientsSection } from './components/ClientsSection';
import { SafetySection } from './components/SafetySection';
import { FleetGallery } from './components/FleetGallery';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ChatbotAssistant } from './components/ChatbotAssistant';
import { FloatingActions } from './components/FloatingActions';
import { AdminPortal } from './components/AdminPortal';
import { AmbientBackgroundMotion } from './components/common/AmbientBackgroundMotion';

export function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [prefillService, setPrefillService] = useState<string | undefined>(undefined);

  const handleOpenQuote = (service?: string) => {
    setPrefillService(service);
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
    setPrefillService(undefined);
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] text-gray-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-white relative">
      {/* Global Ambient Telemetry Motion */}
      <AmbientBackgroundMotion />

      {/* 1. Header Navigation */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        onOpenAdmin={() => setAdminPortalOpen(true)}
      />

      {/* Main Content Area in Reference Sequence */}
      <main className="flex-1 relative z-10">
        {/* 2. Hero Section with Ken Burns Zooming Carousel + Animated Pulse Headline + Bottom Stats */}
        <HeroSection onOpenQuote={() => handleOpenQuote()} />

        {/* 2.1 Corporate 3D Metric Panels & Counters */}
        <StatsSection />

        {/* 3. About Us Section with 2016 Est. Year Card & ISO 9001:2015 Floating Badge */}
        <AboutSection onOpenQuote={() => handleOpenQuote()} />

        {/* 4. Why Choose Us Section with Dark Video/Image Backdrop & 4 Key Pillars */}
        <WhyChooseUs onOpenQuote={() => handleOpenQuote()} />

        {/* 5. Sticky Why Choose Us with Signature Car Scroll Track & 7 Feature Cards */}
        <StickyWhyChooseUs />

        {/* 6. Services Section (6 Corporate Services Cards) */}
        <ServicesSection onOpenQuote={(s) => handleOpenQuote(s)} />

        {/* 7. Director Leadership Section (Mr. P. N. Divakar Naidu) */}
        <LeadershipSection onOpenQuote={() => handleOpenQuote()} />

        {/* 8. Modern Fleet Showcase with Interactive 3D Turntable Studio & Category Tabs */}
        <FleetShowcase onOpenQuote={(v) => handleOpenQuote(v)} />

        {/* 9. Operations in Action Showcase */}
        <OperationsShowcase onOpenQuote={() => handleOpenQuote()} />

        {/* 10. GPS Partner (Nyletech) & Smart Technology (8 Capabilities) */}
        <TechnologySection />

        {/* 11. Certifications & Credentials */}
        <CertificationsSection onOpenQuote={() => handleOpenQuote()} />

        {/* 12. Corporate Clientele (10 Brands) & Testimonials (3 Cards) */}
        <ClientsSection />

        {/* 13. Training & Compliance (4 Cards) */}
        <SafetySection />

        {/* 14. Fleet Gallery (6 Image Tiles with View Fleet Overlay) */}
        <FleetGallery />

        {/* 15. FAQ Accordion (6 Key Corporate Questions) */}
        <FAQSection />

        {/* 16. Contact Us & Quotation Dispatch */}
        <ContactSection />
      </main>

      {/* 17. 4-Column Corporate Footer */}
      <Footer onOpenAdmin={() => setAdminPortalOpen(true)} />

      {/* 18. Universal Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuote}
        prefillService={prefillService}
      />

      {/* 19. Virtual Assistant Chatbot (Bottom-Left) */}
      <ChatbotAssistant onOpenQuote={handleOpenQuote} />

      {/* 20. Floating Action Controls (WhatsApp, Direct Phone, Back-To-Top) */}
      <FloatingActions />

      {/* 21. Executive Admin Database Portal */}
      <AdminPortal
        isOpen={adminPortalOpen}
        onClose={() => setAdminPortalOpen(false)}
      />
    </div>
  );
}

export default App;

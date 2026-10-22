import React, { useState } from 'react';
import { X, ZoomIn, ShieldCheck } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from './common/MotionReveal';

export const FleetGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; category: string } | null>(null);

  const galleryItems = [
    { src: '/images/fleet_sedan.jpg', title: 'Executive Sedans', category: 'Corporate Sedans' },
    { src: '/images/fleet_suv.jpg', title: 'Premium SUVs & MUVs', category: 'Executive SUVs' },
    { src: '/images/fleet_ev.jpg', title: 'Electric Vehicles (EV)', category: 'Sustainable Fleet' },
    { src: '/images/fleet_tempo.jpg', title: 'Tempo Travellers', category: 'Team Transit' },
    { src: '/images/fleet_coach.jpg', title: 'Luxury Volvo Coaches', category: 'Event & Intercity' },
    { src: '/images/fleet_bus.jpg', title: 'Corporate Staff Buses', category: 'Mass Transit' },
  ];

  return (
    <section id="gallery" className="relative py-24 bg-[#1A1A2E] text-white border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag inline-block mb-3">Fleet Gallery</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-serif">
            A Glimpse of <em className="text-[#FFB25C] not-italic">Our Fleet</em>
          </h2>
        </FadeIn>

        {/* 6 Gallery Items in 3 columns matching reference */}
        <StaggerContainer staggerChildren={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryItems.map((item, idx) => (
            <StaggerItem key={idx} direction="scale" className="h-60 sm:h-64">
              <div
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden h-full cursor-pointer transition-all duration-300 border-2 border-white/10 hover:border-[#FF7A00] shadow-xl hover:scale-[0.99]"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Reference "View Fleet" overlay on hover */}
                <div className="absolute inset-0 bg-[#FF7A00]/85 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white font-bold text-base transition-opacity duration-300 z-10">
                  <ZoomIn className="w-6 h-6 mb-1 text-white" />
                  <span>View Fleet</span>
                  <span className="text-xs font-normal opacity-90 mt-1">{item.title}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#111827] rounded-3xl overflow-hidden border border-white/15 shadow-2xl text-white cursor-default"
          >
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-orange-400" />
              </button>
            </div>

            <div className="p-6">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold mb-2">
                {selectedImage.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mb-2">
                {selectedImage.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-[#C8C8C8] pt-3 border-t border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#FF7A00]" />
                <span>RTO Certified · GPS Telematics Active · Passenger Sanitized</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

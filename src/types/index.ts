export type FleetCategory = 'all' | 'ev' | 'cng' | 'sedan' | 'suv' | 'tempo' | 'coach' | 'bus';

export interface FleetVehicle {
  id: string;
  name: string;
  category: FleetCategory;
  categoryLabel: string;
  description: string;
  seatingCapacity: string;
  features: string[];
  specs: {
    fuel: string;
    transmission?: string;
    safety: string;
    tracking: string;
  };
  recommendedFor: string;
  badge?: string;
  accentColor?: string;
  image?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  features: string[];
  idealFor: string;
  stat?: string;
  statLabel?: string;
  image?: string;
}

export interface GalleryItem {
  title: string;
  category: string;
  desc: string;
  image: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface ClientPartner {
  name: string;
  category: string;
  accent: string;
  tagline?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

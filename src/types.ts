export interface NavItem {
  name: string;
  href: string;
}

export interface FarmStat {
  value: string;
  label: string;
  subtext: string;
}

export interface ProduceItem {
  id: string;
  name: string;
  category: 'vegetables' | 'grains' | 'oils' | 'fruits';
  price: string;
  unit: string;
  description: string;
  harvestSeason: string;
  nutritionalHighlight: string;
  inStock: boolean;
  image: string;
  tag: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  duration: string;
}

export interface PremiumPlan {
  id: string;
  title: string;
  cadence: string;
  bestFor: string;
  price: string;
  frequency: string;
  includes: string[];
  exclusiveBonus: string;
  featured: boolean;
  image: string;
  badge: string;
}

export interface FarmTourPackage {
  id: string;
  title: string;
  duration: string;
  bestFor: string;
  price: string;
  includes: string[];
  featured: boolean;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  verifiedPurchase: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ThreeDShowcaseItem {
  id: string;
  title: string;
  tag: string;
  depth: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
}

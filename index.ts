export type NailShape = 'almond' | 'coffin' | 'stiletto' | 'square-soft';
export type NailLength = 'corta' | 'media' | 'larga' | 'extra-larga';
export type NailSize = 'XS' | 'S' | 'M' | 'L' | 'custom';
export type TopCoatFinish = 'Brillo Cristal' | 'Mate Seda' | 'Chrome Velvet' | 'Espejo Glossy';
export type AdhesiveType = 'Jelly Tabs (3-5 días)' | 'Pegamento Médico (+3 semanas)';
export type Currency = 'MXN' | 'EUR' | 'USD';

export interface CustomMeasurements {
  thumb: number;
  index: number;
  middle: number;
  ring: number;
  pinky: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number; // in EUR
  originalPrice?: number;
  category: 'sutil' | 'lujo' | 'audaz' | 'bespoke';
  style: 'minimalista' | 'elegante' | 'tierno' | 'artistico' | 'llamativo' | 'personalizado';
  tag?: string;
  tagType?: 'primary' | 'secondary' | 'museum' | 'bestseller';
  shape: NailShape;
  shapeName: string;
  length: NailLength;
  lengthMm: number;
  description: string;
  longDescription?: string;
  artisanName?: string;
  artisanHours?: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: {
    url: string;
    label: string;
    alt: string;
    description: string;
  }[];
  macroImage?: string;
  features: string[];
  reusableTimes?: number;
}

export interface CartItem {
  id: string; // cart item unique ID
  productId: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  shape: string;
  length: string;
  size: NailSize;
  sizeSpecs: string;
  customMeasurements?: CustomMeasurements;
  finish: TopCoatFinish;
  adhesive: AdhesiveType;
  image: string;
  specialNotes?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  initials: string;
  avatarBg: string;
  rating: number;
  date: string;
  comment: string;
  image?: string;
  verified: boolean;
  productName: string;
}

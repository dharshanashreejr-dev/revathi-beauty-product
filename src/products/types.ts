export type CategoryKey = 'face' | 'wellness products' | 'body';

export type ArtType =
  | 'dropper' | 'jar' | 'tube' | 'pump' | 'stick'
  | 'spray' | 'bottle' | 'compact' | 'palette' | 'lipstick' | 'gloss' | 'candle' | 'box';

export interface Colour { name: string; hex: string }

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: CategoryKey;
  subcategory: string;
  art: ArtType;
  price: number;
  mrp: number;
  stock: number;
  colours: Colour[];
  sizes: string[];
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  details: string[];
  material: string;
  weight: string;
}

export interface CartItem { key: string; product: Product; colour: Colour; size: string; qty: number }
export interface Address { name: string; email: string; phone: string; line1: string; line2: string; city: string; state: string; pin: string; method: 'standard' | 'express' }
export interface Order { id: string; items: CartItem[]; address: Address; pay: string; subtotal: number; shipping: number; fee: number; total: number; date: string; eta: string }

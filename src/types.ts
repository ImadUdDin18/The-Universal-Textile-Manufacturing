export type FabricCategory =
  | 'Cotton'
  | 'Linen'
  | 'Silk'
  | 'Polyester'
  | 'Uniform Fabric'
  | 'Custom Prints'
  | 'Wool Blend'
  | 'Jacquard';

export type ViewPage =
  | 'home'
  | 'catalog'
  | 'categories'
  | 'b2b'
  | 'about'
  | 'contact'
  | 'track'
  | 'track-order'
  | 'admin';

export type Language = 'en' | 'ms' | 'ur';

export type CurrencyCode = 'MYR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'SGD';

export interface FabricColor {
  name: string;
  hex: string;
  image?: string;
}

export interface FabricProduct {
  id: string;
  name: string;
  nameMs?: string;
  nameUr?: string;
  slug: string;
  category: FabricCategory;
  gsm: number; // Grams per square meter
  widthInch: number; // e.g. 58"
  widthCm: number; // e.g. 147cm
  composition: string;
  weave: string;
  pricePerMeterMYR: number;
  samplePriceMYR: number;
  moqMeters: number; // Minimum order quantity in meters
  stockMeters: number;
  colors: FabricColor[];
  images: string[];
  description: string;
  descriptionMs?: string;
  descriptionUr?: string;
  features: string[];
  useCases: string[];
  certifications: string[];
  leadTimeDays: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isEcoFriendly?: boolean;
  isFactoryDirect?: boolean;
  yarnCount?: string;
  shrinkage?: string;
}

export interface CartItem {
  id: string;
  product: FabricProduct;
  selectedColor: FabricColor;
  meters: number;
  isSampleSwatch: boolean;
  customNotes?: string;
  unitPriceMYR: number;
  subtotalMYR: number;
}

export interface QuoteRequest {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  fabricId: string;
  fabricName: string;
  quantityMeters: number;
  targetGsm?: number;
  customPantone?: string;
  useCase: string;
  targetDate: string;
  notes: string;
  status: 'Pending' | 'Reviewing' | 'Quoted' | 'Approved';
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  companyName?: string;
  email: string;
  phone: string;
  country: string;
  state?: string;
  city: string;
  address: string;
  postalCode: string;
  items: CartItem[];
  totalAmountMYR: number;
  currency: CurrencyCode;
  currencyAmount: number;
  paymentMethod: 'Stripe' | 'PayPal' | 'FPX (Malaysia Bank Transfer)' | 'Direct Bank Wire (T/T)' | 'Cash on Showroom Pickup';
  paymentStatus: 'Paid' | 'Processing' | 'Pending Wire Approval';
  shippingMethod: 'Express Air Freight' | 'Standard Sea Freight' | 'Malaysia Domestic GDEX/Lalamove' | 'Showroom Collection (Menara City One)';
  createdAt: string;
  trackingNumber: string;
}

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  rateToMYR: number; // 1 USD = ~4.45 MYR
  flag: string;
}

export interface Review {
  id: string;
  author: string;
  company: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  fabricPurchased: string;
}

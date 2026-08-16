import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CartItem,
  CurrencyCode,
  FabricCategory,
  FabricColor,
  FabricProduct,
  Language,
  Order,
  QuoteRequest,
  ViewPage,
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { CURRENCY_RATES, TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface FilterState {
  category: FabricCategory | 'All';
  searchQuery: string;
  selectedColorHex: string | null;
  minGsm: number;
  maxGsm: number;
  minPrice: number;
  maxPrice: number;
  useCase: string | null;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'gsm-desc';
}

interface ShopContextType {
  // Navigation & View
  currentView: ViewPage;
  setCurrentView: (view: ViewPage) => void;

  // Language & Currency
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  t: typeof TRANSLATIONS['en'];
  formatPrice: (amountMYR: number) => string;
  convertPrice: (amountMYR: number) => number;

  // Products
  products: FabricProduct[];
  setProducts: React.Dispatch<React.SetStateAction<FabricProduct[]>>;
  selectedProduct: FabricProduct | null;
  setSelectedProduct: (prod: FabricProduct | null) => void;
  quickViewProduct: FabricProduct | null;
  setQuickViewProduct: (prod: FabricProduct | null) => void;

  // Filtering
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: FabricProduct[];

  // Cart
  cart: CartItem[];
  addToCart: (product: FabricProduct, color: FabricColor, meters: number, isSampleSwatch?: boolean, notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemMeters: (itemId: string, meters: number) => void;
  clearCart: () => void;
  cartTotalMYR: number;
  cartItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Checkout
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  processOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'currencyAmount'>) => Promise<Order>;

  // Quotes & B2B
  quotes: QuoteRequest[];
  submitQuoteRequest: (quote: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>) => Promise<QuoteRequest>;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
  isRfqModalOpen: boolean;
  setIsRfqModalOpen: (open: boolean) => void;
  rfqTargetProduct: FabricProduct | null;
  setRfqTargetProduct: (prod: FabricProduct | null) => void;

  // Orders
  orders: Order[];

  // GSM Calculator Modal
  isGsmCalcOpen: boolean;
  setIsGsmCalcOpen: (open: boolean) => void;

  // Toasts
  toasts: Toast[];
  addToast: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'RFQ-8941',
    companyName: 'AeroLuxe Airlines Uniforms',
    contactPerson: 'Capt. Zulkifli Rahman',
    email: 'zulkifli@aeroluxe.com.my',
    phone: '+60 12-334 8899',
    country: 'Malaysia (KLIA Sepang)',
    fabricId: 'fab-uniform-004',
    fabricName: 'ProGuard Heavy-Duty Anti-Microbial Uniform Twill',
    quantityMeters: 4500,
    targetGsm: 245,
    customPantone: 'Pantone 19-4024 TCX (Dress Navy)',
    useCase: 'Pilot & Cabin Crew Uniforms 2026 Fleet Refresh',
    targetDate: '2026-09-15',
    notes: 'Require Teflon stain repellant coating and flame retardant certification.',
    status: 'Quoted',
    createdAt: '2026-08-12T09:45:00.000Z',
  },
  {
    id: 'RFQ-8942',
    companyName: 'Maison Éthique Couture',
    contactPerson: 'Elise Laurent',
    email: 'e.laurent@maisonethique.fr',
    phone: '+33 6 45 29 11 00',
    country: 'France',
    fabricId: 'fab-linen-003',
    fabricName: 'Normandy Pure French Flax Heritage Linen',
    quantityMeters: 1800,
    targetGsm: 185,
    customPantone: 'Natural Sand Flax',
    useCase: 'Spring Summer Resort Wear Capsule',
    targetDate: '2026-10-01',
    notes: 'Please quote CIF Le Havre air freight in European Flax certified rolls.',
    status: 'Reviewing',
    createdAt: '2026-08-15T14:20:00.000Z',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'UTM-ORD-7721',
    customerName: 'Datin Seri Rozita Halim',
    companyName: 'Rozita Bridal Atelier',
    email: 'rozita@atelier.my',
    phone: '+60 17-889 4432',
    country: 'Malaysia',
    state: 'Kuala Lumpur',
    city: 'Bukit Damansara',
    address: '14 Jalan Setiabistari 2',
    postalCode: '50490',
    items: [
      {
        id: 'ci-1',
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        meters: 25,
        isSampleSwatch: false,
        unitPriceMYR: 168,
        subtotalMYR: 4200,
      },
      {
        id: 'ci-2',
        product: INITIAL_PRODUCTS[5],
        selectedColor: INITIAL_PRODUCTS[5].colors[0],
        meters: 15,
        isSampleSwatch: false,
        unitPriceMYR: 195,
        subtotalMYR: 2925,
      },
    ],
    totalAmountMYR: 7125,
    currency: 'MYR',
    currencyAmount: 7125,
    paymentMethod: 'FPX (Malaysia Bank Transfer)',
    paymentStatus: 'Paid',
    shippingMethod: 'Showroom Collection (Menara City One)',
    createdAt: '2026-08-14T11:30:00.000Z',
    trackingNumber: 'UTM-PICKUP-KL-0091',
  },
];

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  searchQuery: '',
  selectedColorHex: null,
  minGsm: 0,
  maxGsm: 500,
  minPrice: 0,
  maxPrice: 300,
  useCase: null,
  sortBy: 'popular',
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewPage>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('MYR');

  // Load Products
  const [products, setProducts] = useState<FabricProduct[]>(() => {
    try {
      const saved = localStorage.getItem('utm_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Selected & Quick View
  const [selectedProduct, setSelectedProduct] = useState<FabricProduct | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<FabricProduct | null>(null);

  // Filters
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('utm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Quotes
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem('utm_quotes');
      return saved ? JSON.parse(saved) : INITIAL_QUOTES;
    } catch {
      return INITIAL_QUOTES;
    }
  });
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [rfqTargetProduct, setRfqTargetProduct] = useState<FabricProduct | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('utm_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // GSM Calc Modal
  const [isGsmCalcOpen, setIsGsmCalcOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('utm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('utm_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('utm_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('utm_orders', JSON.stringify(orders));
  }, [orders]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const convertPrice = (amountMYR: number): number => {
    const rate = CURRENCY_RATES[currency]?.rateToMYR || 1;
    return amountMYR * rate;
  };

  const formatPrice = (amountMYR: number): string => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.MYR;
    const converted = amountMYR * rateInfo.rateToMYR;
    if (currency === 'PKR') {
      return `${rateInfo.symbol} ${Math.round(converted).toLocaleString()}`;
    }
    return `${rateInfo.symbol} ${converted.toFixed(2)}`;
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (filters.category !== 'All' && p.category !== filters.category) return false;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q) || (p.nameMs && p.nameMs.toLowerCase().includes(q));
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchComp = p.composition.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchUse = p.useCases.some((u) => u.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchComp && !matchCategory && !matchUse) return false;
    }
    if (filters.selectedColorHex) {
      const hasColor = p.colors.some((c) => c.hex.toLowerCase() === filters.selectedColorHex?.toLowerCase());
      if (!hasColor) return false;
    }
    if (p.gsm < filters.minGsm || p.gsm > filters.maxGsm) return false;
    if (p.pricePerMeterMYR < filters.minPrice || p.pricePerMeterMYR > filters.maxPrice) return false;
    if (filters.useCase && !p.useCases.includes(filters.useCase)) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.pricePerMeterMYR - b.pricePerMeterMYR;
    if (filters.sortBy === 'price-desc') return b.pricePerMeterMYR - a.pricePerMeterMYR;
    if (filters.sortBy === 'gsm-desc') return b.gsm - a.gsm;
    return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
  });

  // Cart operations
  const addToCart = (
    product: FabricProduct,
    color: FabricColor,
    meters: number,
    isSampleSwatch = false,
    notes = ''
  ) => {
    const unitPrice = isSampleSwatch ? product.samplePriceMYR : product.pricePerMeterMYR;
    // Apply Tiered bulk discounts if full meters
    let finalUnitPrice = unitPrice;
    if (!isSampleSwatch) {
      if (meters >= 500) {
        finalUnitPrice = unitPrice * 0.75; // 25% discount
      } else if (meters >= 100) {
        finalUnitPrice = unitPrice * 0.90; // 10% discount
      }
    }

    const subtotal = finalUnitPrice * (isSampleSwatch ? 1 : meters);
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor.name === color.name &&
        item.isSampleSwatch === isSampleSwatch
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      const prev = updated[existingIndex];
      const newMeters = isSampleSwatch ? prev.meters : prev.meters + meters;
      const newSubtotal = finalUnitPrice * (isSampleSwatch ? 1 : newMeters);
      updated[existingIndex] = {
        ...prev,
        meters: newMeters,
        subtotalMYR: newSubtotal,
      };
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: 'cart-' + Math.random().toString(36).substr(2, 9),
        product,
        selectedColor: color,
        meters: isSampleSwatch ? 1 : meters,
        isSampleSwatch,
        customNotes: notes,
        unitPriceMYR: finalUnitPrice,
        subtotalMYR: subtotal,
      };
      setCart((prev) => [...prev, newItem]);
    }

    addToast(
      'success',
      isSampleSwatch ? 'Sample Swatch Added' : 'Fabric Added to Bag',
      `${product.name} (${color.name}) • ${isSampleSwatch ? 'Sample Kit' : `${meters} meters`}`
    );
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    addToast('info', 'Item Removed', 'Fabric was removed from your bag.');
  };

  const updateCartItemMeters = (itemId: string, meters: number) => {
    if (meters <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          if (item.isSampleSwatch) return item;
          let unitPrice = item.product.pricePerMeterMYR;
          if (meters >= 500) unitPrice *= 0.75;
          else if (meters >= 100) unitPrice *= 0.90;
          return {
            ...item,
            meters,
            unitPriceMYR: unitPrice,
            subtotalMYR: unitPrice * meters,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalMYR = cart.reduce((sum, item) => sum + item.subtotalMYR, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + (item.isSampleSwatch ? 1 : item.meters), 0);

  // Submit Quote Request
  const submitQuoteRequest = async (
    quoteData: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>
  ): Promise<QuoteRequest> => {
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: 'RFQ-' + Math.floor(1000 + Math.random() * 9000),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setQuotes((prev) => [newQuote, ...prev]);

    // Trigger celebration
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F3E5AB', '#FFFFFF', '#0B0C10'],
    });

    addToast(
      'success',
      'Quote Request Transmitted',
      `RFQ ${newQuote.id} registered for ${quoteData.companyName}. Our KL Mill director will respond within 2 hours.`
    );

    return newQuote;
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
    addToast('info', 'RFQ Updated', `Status of ${id} changed to ${status}`);
  };

  // Process Order
  const processOrder = async (
    orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'currencyAmount'>
  ): Promise<Order> => {
    const rate = CURRENCY_RATES[currency]?.rateToMYR || 1;
    const newOrder: Order = {
      ...orderData,
      id: 'UTM-ORD-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      trackingNumber:
        orderData.shippingMethod.includes('Showroom')
          ? 'UTM-SHOWROOM-KL-' + Math.floor(100 + Math.random() * 900)
          : 'GDEX-MY-' + Math.floor(10000000 + Math.random() * 90000000),
      currencyAmount: orderData.totalAmountMYR * rate,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#F3E5AB', '#D4AF37', '#101014'],
    });

    addToast(
      'success',
      'Order Placed Successfully!',
      `Order ${newOrder.id} confirmed. Dispatch from Menara City One, KL underway.`
    );

    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        formatPrice,
        convertPrice,
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        filters,
        setFilters,
        resetFilters,
        filteredProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemMeters,
        clearCart,
        cartTotalMYR,
        cartItemsCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        processOrder,
        quotes,
        submitQuoteRequest,
        updateQuoteStatus,
        isRfqModalOpen,
        setIsRfqModalOpen,
        rfqTargetProduct,
        setRfqTargetProduct,
        orders,
        isGsmCalcOpen,
        setIsGsmCalcOpen,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

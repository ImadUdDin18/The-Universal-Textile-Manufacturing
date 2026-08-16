import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/products';
import { useShop } from '../context/ShopContext';
import { FabricCategory, ViewPage } from '../types';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Star,
  ShieldCheck,
  Send,
  MessageCircle,
  Clock,
  Sparkles,
  Truck,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setFilters, setIsRfqModalOpen, setIsGsmCalcOpen, addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    addToast(
      'success',
      'VIP Swatch Kit Registered!',
      `Complimentary fabric swatches will be dispatched to ${newsletterEmail}.`
    );
    setNewsletterEmail('');
  };

  const navigateTo = (view: ViewPage) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filterCategoryAndNavigate = (cat: FabricCategory) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-[#262626] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Newsletter & Swatch Banner */}
        <div className="p-8 rounded-3xl bg-[#141414] border border-[#262626] mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2 font-luxury">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Atelier Swatch Ring</span>
            </div>
            <h3 className="text-2xl font-luxury font-bold text-white mb-2">
              Request Your 2026 Textile Lookbook & Sample Swatches
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              Delivered directly to your design studio or production atelier in Malaysia or worldwide.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
            <input
              type="email"
              required
              placeholder="Enter your corporate email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-[#0A0A0A] border border-[#262626] rounded-xl px-4 py-3 text-xs text-white placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Get Swatches</span>
              <Send className="w-3.5 h-3.5 fill-black" />
            </button>
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#262626]">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#996515] p-0.5 shadow-lg shadow-[#D4AF37]/20 flex-shrink-0">
                <div className="w-full h-full bg-[#0A0A0A] rounded-[10px] flex items-center justify-center">
                  <span className="font-luxury font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFF] text-base">
                    UT
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-luxury font-extrabold text-sm tracking-wider text-white">
                  {COMPANY_INFO.name}
                </h4>
                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest font-sans">
                  Mill Direct Textile Manufacturing • Est. {COMPANY_INFO.establishedYear}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-sm">
              Premier textile manufacturing, wholesale and retail of luxury silks, Egyptian cottons, linens, and technical institutional uniform fabrics. Supplying fashion houses and procurement entities across 38+ countries.
            </p>

            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-[#141414] border border-[#262626] text-xs">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                ))}
              </div>
              <span className="font-bold text-white">5.0 Star Rating</span>
              <span className="text-[#71717A]">• Google Verified Business</span>
            </div>
          </div>

          {/* Col 3: Navigation Pages */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider font-luxury text-[11px] text-[#D4AF37]">
              Explore Pages
            </h5>
            <ul className="space-y-2 text-[#9CA3AF]">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Product Catalog (Full Archive)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  8 Fabric Categories & Weaves
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('b2b')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  B2B Wholesale & Mill Contracts
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Our Mill Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Book Showroom Visit
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('track-order')}
                  className="hover:text-white transition-colors cursor-pointer text-[#38BDF8] flex items-center gap-1.5"
                >
                  <Truck className="w-3 h-3" />
                  <span>Track Fabric Shipment</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Tools */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider font-luxury text-[11px] text-[#D4AF37]">
              B2B Services & Tools
            </h5>
            <ul className="space-y-2 text-[#9CA3AF]">
              <li>
                <button
                  onClick={() => setIsRfqModalOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Request Bulk Wholesale RFQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsGsmCalcOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  GSM & Freight Weight Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Admin Inventory & Dispatch Portal
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Universal%20Textile%2C%20I%20would%20like%20to%20order%20a%20sample%20swatch%20kit.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  WhatsApp Direct Swatch Request
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Contact */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider font-luxury text-[11px] text-[#D4AF37]">
              Headquarters & Showroom
            </h5>
            <div className="space-y-2.5 text-[#9CA3AF]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.location.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#EAB308] flex-shrink-0" />
                <span>{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <div>
            © 2026 {COMPANY_INFO.name} (Reg No: {COMPANY_INFO.registrationNo}). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Kuala Lumpur, Malaysia</span>
            <span>•</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Universal%20Textile`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct Line</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

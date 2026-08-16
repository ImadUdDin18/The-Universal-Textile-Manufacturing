import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COMPANY_INFO } from '../data/products';
import { CURRENCY_RATES } from '../data/translations';
import { CurrencyCode, Language, ViewPage } from '../types';
import {
  Phone,
  MapPin,
  ShoppingBag,
  Search,
  SlidersHorizontal,
  Calculator,
  FileText,
  Building2,
  ShieldCheck,
  Globe2,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Layers,
  Truck,
  Info,
  Layers3,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    language,
    setLanguage,
    currency,
    setCurrency,
    t,
    cartItemsCount,
    setIsCartOpen,
    setIsRfqModalOpen,
    setIsGsmCalcOpen,
    filters,
    setFilters,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewPage) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262626]">
      {/* Top Banner Bar */}
      <div className="bg-[#050505] border-b border-[#1F1F1F] text-xs text-[#9CA3AF] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Location & Quick Contact */}
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="flex items-center gap-1.5 text-[#E0AA3E] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[#D1D1D8]">
                {COMPANY_INFO.location.building}, {COMPANY_INFO.location.city}, Malaysia
              </span>
            </span>
            <span className="hidden sm:inline text-[#333333]">|</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%2C%20I%20am%20inquiring%20about%20fabric%20wholesale%20from%20The%20Universal%20Textile%20SDN%20BHD`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp: {COMPANY_INFO.phone}</span>
            </a>
            <span className="hidden lg:inline text-[#333333]">|</span>
            <span className="hidden lg:flex items-center gap-1 text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse"></span>
              {COMPANY_INFO.warehouseStock}
            </span>
          </div>

          {/* Currency & Language Selectors */}
          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-[#141414] border border-[#262626] rounded-md px-2 py-0.5">
              <span className="text-[#9CA3AF] text-[11px]">Curr:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-[#F3F4F6] text-xs font-semibold focus:outline-none cursor-pointer"
                aria-label="Select Currency"
              >
                {Object.values(CURRENCY_RATES).map((curr) => (
                  <option key={curr.code} value={curr.code} className="bg-[#141414] text-white">
                    {curr.flag} {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-[#141414] border border-[#262626] rounded-md px-2 py-0.5">
              <Globe2 className="w-3 h-3 text-[#D4AF37]" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-[#F3F4F6] text-xs font-medium focus:outline-none cursor-pointer"
                aria-label="Select Language"
              >
                <option value="en" className="bg-[#141414] text-white">English (EN)</option>
                <option value="ms" className="bg-[#141414] text-white">Bahasa Melayu (MY)</option>
                <option value="ur" className="bg-[#141414] text-white">اردو (UR)</option>
              </select>
            </div>

            {/* GSM Calculator Tool Button */}
            <button
              onClick={() => setIsGsmCalcOpen(true)}
              className="hidden sm:flex items-center gap-1 text-[#D4AF37] hover:text-white bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-md px-2.5 py-0.5 text-xs transition-all cursor-pointer"
              title="Calculate Fabric Weight & Freight"
            >
              <Calculator className="w-3 h-3" />
              <span>GSM Tool</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none flex-shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#AA820A] to-[#141414] p-[1px] shadow-lg shadow-[#D4AF37]/10">
            <div className="w-full h-full bg-[#0A0A0A] rounded-[10px] flex items-center justify-center">
              <span className="font-luxury font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white group-hover:scale-105 transition-transform">
                UTM
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-luxury text-sm sm:text-base font-bold tracking-wider text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
              THE UNIVERSAL TEXTILE
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#9CA3AF] font-medium">
              Manufacturing Sdn Bhd • Menara City One
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (All 6-7 Pages) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              currentView === 'home'
                ? 'bg-[#D4AF37] text-black font-bold shadow-md shadow-[#D4AF37]/20'
                : 'text-[#D1D1D8] hover:text-white hover:bg-[#141414]'
            }`}
          >
            {t.nav.home}
          </button>

          <button
            onClick={() => handleNavClick('catalog')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              currentView === 'catalog'
                ? 'bg-[#D4AF37] text-black font-bold shadow-md shadow-[#D4AF37]/20'
                : 'text-[#D1D1D8] hover:text-white hover:bg-[#141414]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.nav.catalog}</span>
          </button>

          <button
            onClick={() => handleNavClick('categories')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              currentView === 'categories'
                ? 'bg-[#D4AF37] text-black font-bold shadow-md shadow-[#D4AF37]/20'
                : 'text-[#D1D1D8] hover:text-white hover:bg-[#141414]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.nav.categories}</span>
          </button>

          <button
            onClick={() => handleNavClick('b2b')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              currentView === 'b2b'
                ? 'bg-[#D4AF37] text-black font-bold shadow-md shadow-[#D4AF37]/20'
                : 'text-[#D1D1D8] hover:text-white hover:bg-[#141414]'
            }`}
          >
            <span>{t.nav.b2bWholesale}</span>
            <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold px-1 rounded border border-[#D4AF37]/40">
              Bulk
            </span>
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              currentView === 'about'
                ? 'bg-[#D4AF37] text-black font-bold shadow-md shadow-[#D4AF37]/20'
                : 'text-[#D1D1D8] hover:text-white hover:bg-[#141414]'
            }`}
          >
            {t.nav.aboutUs}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              currentView === 'contact'
                ? 'bg-[#D4AF37] text-black font-bold shadow-md shadow-[#D4AF37]/20'
                : 'text-[#D1D1D8] hover:text-white hover:bg-[#141414]'
            }`}
          >
            {t.nav.contact}
          </button>

          <button
            onClick={() => handleNavClick('track-order')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              currentView === 'track-order' || currentView === 'track'
                ? 'bg-[#38BDF8] text-black font-bold shadow-md'
                : 'text-[#38BDF8] hover:bg-[#38BDF8]/10'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{t.nav.trackOrder}</span>
          </button>

          <button
            onClick={() => handleNavClick('admin')}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
              currentView === 'admin'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/15'
                : 'border-[#262626] text-[#9CA3AF] bg-[#141414] hover:text-white'
            }`}
            title="Admin Inventory Management"
          >
            <SlidersHorizontal className="w-3 h-3 text-[#D4AF37]" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Right Search, RFQ & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <div className="relative hidden sm:block">
            <div className="flex items-center bg-[#141414] border border-[#262626] focus-within:border-[#D4AF37] rounded-full px-3 py-1.5 transition-all w-36 md:w-44 lg:w-52">
              <Search className="w-3.5 h-3.5 text-[#9CA3AF] mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder={t.filter.search}
                value={filters.searchQuery}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
                  if (currentView !== 'catalog') setCurrentView('catalog');
                }}
                className="bg-transparent text-xs text-white placeholder-[#71717A] focus:outline-none w-full"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                  className="text-gray-400 hover:text-white text-xs ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Request Quote Pill */}
          <button
            onClick={() => setIsRfqModalOpen(true)}
            className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] via-[#E8C55E] to-[#AA820A] text-black font-luxury font-bold text-xs px-3.5 py-2 rounded-xl shadow-md shadow-[#D4AF37]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>{t.nav.requestQuote}</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all cursor-pointer"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-black text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-scale">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#C5C5D2] hover:text-white cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D0D] border-b border-[#262626] px-5 py-4 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder={t.filter.search}
              value={filters.searchQuery}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
                if (currentView !== 'catalog') setCurrentView('catalog');
              }}
              className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#262626]">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] text-left text-xs font-semibold text-white hover:bg-[#1C1C1C]"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.nav.home}</span>
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] text-left text-xs font-semibold text-white hover:bg-[#1C1C1C]"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.nav.catalog}</span>
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] text-left text-xs font-semibold text-white hover:bg-[#1C1C1C]"
            >
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.nav.categories}</span>
            </button>
            <button
              onClick={() => handleNavClick('b2b')}
              className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] text-left text-xs font-semibold text-white hover:bg-[#1C1C1C]"
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.nav.b2bWholesale}</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] text-left text-xs font-semibold text-white hover:bg-[#1C1C1C]"
            >
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.nav.aboutUs}</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] text-left text-xs font-semibold text-white hover:bg-[#1C1C1C]"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.nav.contact}</span>
            </button>
            <button
              onClick={() => handleNavClick('track-order')}
              className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] text-left text-xs font-semibold text-[#38BDF8] hover:bg-[#1C1C1C]"
            >
              <Truck className="w-4 h-4 text-[#38BDF8]" />
              <span>{t.nav.trackOrder}</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] text-left text-xs font-semibold text-gray-300 hover:bg-[#1C1C1C]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.nav.admin}</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsRfqModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{t.nav.requestQuote}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { useShop } from '../context/ShopContext';
import { COMPANY_INFO } from '../data/products';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Globe2,
  Package,
  Layers,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Play,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, setCurrentView, setIsRfqModalOpen, setIsGsmCalcOpen } = useShop();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Luxury Ambient Glows & Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#D4AF37]/15 via-[#AA820A]/5 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#D4AF37]/8 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 fabric-grid-pattern opacity-40"></div>
      </div>

      {/* Decorative Fabric Background Visual with subtle dark vignette */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Silk Texture"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
        {/* Premium Location & Year Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414]/90 border border-[#D4AF37]/40 backdrop-blur-md shadow-lg shadow-[#D4AF37]/10 mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#E0AA3E] uppercase font-luxury">
            {t.hero.badge}
          </span>
          <span className="text-white/30 text-xs">|</span>
          <div className="flex items-center gap-1 text-[#FFD700] text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
            <span>5.0 Star Mill</span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-luxury font-extrabold tracking-tight text-white max-w-5xl leading-[1.1] mb-6 drop-shadow-2xl">
          <span className="block text-white/95">{t.hero.titleLine1}</span>
          <span className="block text-gold-gradient italic">{t.hero.titleLine2}</span>
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="max-w-3xl text-sm sm:text-base md:text-lg text-[#9CA3AF] font-light leading-relaxed mb-10 px-2">
          {t.hero.subtitle}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mb-16">
          <button
            onClick={() => {
              setCurrentView('catalog');
              window.scrollTo({ top: 600, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-sm tracking-wider uppercase shadow-xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{t.hero.ctaCatalog}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setIsRfqModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#141414]/90 hover:bg-[#1C1C1C] text-white border border-[#D4AF37]/50 hover:border-[#D4AF37] font-semibold text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.hero.ctaQuote}</span>
          </button>
        </div>

        {/* Live Mill Telemetry Stats Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-5xl">
          {/* Stat 1: Ready Stock */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141414]/80 border border-[#262626] backdrop-blur-md flex flex-col items-center text-center group hover:border-[#D4AF37]/60 transition-colors shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-2.5 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-luxury font-bold text-white mb-0.5">
              500,000+
            </div>
            <div className="text-[11px] sm:text-xs text-[#9CA3AF] font-medium leading-tight">
              {t.hero.statMeters}
            </div>
          </div>

          {/* Stat 2: Rating */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141414]/80 border border-[#262626] backdrop-blur-md flex flex-col items-center text-center group hover:border-[#D4AF37]/60 transition-colors shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] mb-2.5 group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 fill-[#FFD700]" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-luxury font-bold text-gold-gradient mb-0.5">
              5.0 / 5.0
            </div>
            <div className="text-[11px] sm:text-xs text-[#9CA3AF] font-medium leading-tight">
              {t.hero.statRating}
            </div>
          </div>

          {/* Stat 3: Global Exports */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141414]/80 border border-[#262626] backdrop-blur-md flex flex-col items-center text-center group hover:border-[#D4AF37]/60 transition-colors shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-2.5 group-hover:scale-110 transition-transform">
              <Globe2 className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-luxury font-bold text-white mb-0.5">
              38+ Nations
            </div>
            <div className="text-[11px] sm:text-xs text-[#9CA3AF] font-medium leading-tight">
              {t.hero.statExport}
            </div>
          </div>

          {/* Stat 4: KL HQ */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141414]/80 border border-[#262626] backdrop-blur-md flex flex-col items-center text-center group hover:border-[#D4AF37]/60 transition-colors shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center text-[#00E676] mb-2.5 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-luxury font-bold text-white mb-0.5">
              Menara City One
            </div>
            <div className="text-[11px] sm:text-xs text-[#9CA3AF] font-medium leading-tight">
              Jalan Munshi Abdullah, KL
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#9CA3AF] font-medium border-t border-[#262626] pt-6">
          <span className="flex items-center gap-1.5 text-white/90">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Low MOQ Sample Swatches (RM 20)</span>
          </span>
          <span className="flex items-center gap-1.5 text-white/90">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>OEKO-TEX Standard 100 Lab Certified</span>
          </span>
          <span className="flex items-center gap-1.5 text-white/90">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Direct Mill Prices (No Agency Markups)</span>
          </span>
          <span className="flex items-center gap-1.5 text-white/90">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Same-Day Showroom Pickup in KL</span>
          </span>
        </div>
      </div>
    </section>
  );
};

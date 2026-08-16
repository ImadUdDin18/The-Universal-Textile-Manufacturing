import React from 'react';
import { useShop } from '../context/ShopContext';
import { HeroSection } from '../components/HeroSection';
import { TrustBadges } from '../components/TrustBadges';
import { ProductCard } from '../components/ProductCard';
import { FactoryShowroom } from '../components/FactoryShowroom';
import { CertificationsSection } from '../components/CertificationsSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { CATEGORY_INFO, COMPANY_INFO } from '../data/products';
import { FabricCategory } from '../types';
import {
  Sparkles,
  ArrowRight,
  Package,
  Layers,
  Building2,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Mail,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, setCurrentView, setFilters, setIsRfqModalOpen, setIsGsmCalcOpen, addToast } = useShop();

  const bestsellers = products.filter((p) => p.isBestseller || p.isNewArrival).slice(0, 8);

  const handleCategoryClick = (categoryName: string) => {
    setFilters((prev) => ({ ...prev, category: categoryName as FabricCategory }));
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('email') as HTMLInputElement;
    if (input && input.value) {
      addToast('success', 'VIP Trade Club Joined', `Welcome! We sent an exclusive RM 50 swatch voucher to ${input.value}`);
      input.value = '';
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Badges & Capability */}
      <TrustBadges />

      {/* 3. Browse by Fabric Categories (Visual Interactive Grid) */}
      <section className="py-16 sm:py-20 bg-[#0A0A0A] border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2 font-luxury">
                <Layers className="w-3.5 h-3.5" />
                <span>Textile Archives</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-luxury font-bold text-white tracking-wide">
                Explore Fabrics by Category
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
                Direct mill supply for shirting, haute couture bridal, uniforms, and technical outerwear.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentView('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors group"
            >
              <span>View All 8 Categories & Weave Specs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(CATEGORY_INFO).map(([categoryName, info]) => {
              const productCount = products.filter((p) => p.category === categoryName).length;
              return (
                <div
                  key={categoryName}
                  onClick={() => handleCategoryClick(categoryName)}
                  className="group relative rounded-2xl overflow-hidden bg-[#141414] border border-[#262626] hover:border-[#D4AF37] transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/10 flex flex-col justify-between"
                >
                  <div className="h-36 sm:h-44 w-full overflow-hidden relative">
                    <img
                      src={info.bannerImage}
                      alt={categoryName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                    <span className="absolute top-3 right-3 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#333333] text-[10px] font-bold text-[#D4AF37] px-2 py-0.5 rounded-md">
                      {info.gsmRange}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-luxury font-bold text-sm sm:text-base text-white group-hover:text-[#D4AF37] transition-colors">
                          {categoryName}
                        </h3>
                        <span className="text-[11px] font-semibold text-[#9CA3AF]">
                          {productCount} fabrics
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9CA3AF] line-clamp-2 leading-relaxed">
                        {info.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#262626] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                      <span>Shop Category</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Curated Bestseller Showcase */}
      <section className="py-16 sm:py-20 bg-[#0F0F0F] border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2 font-luxury">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Mill Bestsellers</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-luxury font-bold text-white tracking-wide">
                Premier Textile Selections
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
                Highest repeat-order fabrics among bespoke ateliers, uniform tenders, and fashion labels.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#242424] border border-[#333333] text-xs font-bold text-white flex items-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Browse All {products.length} Products</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Custom Digital Printing & B2B Spotlight Banner */}
      <section className="py-16 bg-[#0A0A0A] border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1A170F] via-[#141414] to-[#0D0D0D] border border-[#D4AF37]/30 p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider font-luxury">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>2400 DPI Japanese Kyocera Print Facility</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-luxury font-bold text-white leading-tight">
                  Custom Digital Printing & Bespoke Fabric Weaving
                </h3>
                <p className="text-xs sm:text-sm text-[#D1D1D8] leading-relaxed">
                  Bring your custom patterns, corporate brand motifs, or Malaysian heritage batik to life with Swiss CIBA reactive dyes. Fast 3-day turnaround, zero color bleeding, and free lab strike-off approval on wholesale orders.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#0A0A0A]/60 border border-[#2B2B2B]">
                    <div className="text-base font-bold text-[#D4AF37]">2400 DPI</div>
                    <div className="text-[11px] text-[#9CA3AF]">Ultra HD Resolution</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0A0A]/60 border border-[#2B2B2B]">
                    <div className="text-base font-bold text-[#00E676]">3-Day Rapid</div>
                    <div className="text-[11px] text-[#9CA3AF]">Sampling Turnaround</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0A0A]/60 border border-[#2B2B2B]">
                    <div className="text-base font-bold text-[#38BDF8]">50+ Washes</div>
                    <div className="text-[11px] text-[#9CA3AF]">Zero Color Fading</div>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsRfqModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                  >
                    Request Custom Print Quote
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('b2b');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-3 rounded-xl bg-[#1C1C1C] hover:bg-[#282828] border border-[#333333] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-[#D4AF37]" />
                    <span>View B2B Pricing Tiers</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl aspect-video sm:aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
                    alt="Custom Digital Printing"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Certifications & Lab Standards */}
      <CertificationsSection />

      {/* 7. Factory Showroom & Menara City One Section */}
      <FactoryShowroom />

      {/* 8. 5.0 Star Client Reviews */}
      <ReviewsSection />

      {/* 9. VIP Trade Club / Newsletter Banner */}
      <section className="py-16 bg-[#080808] border-t border-[#262626]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider font-luxury">
            <Mail className="w-3.5 h-3.5" />
            <span>VIP Trade Atelier Club</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-luxury font-bold text-white">
            Join 5,000+ Fashion Designers & Apparel Buyers
          </h2>

          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            Receive seasonal swatch kit drops, private container clearance allocations, and industry trend forecasts directly from our textile engineers.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex items-center gap-2">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your corporate email..."
              className="flex-1 bg-[#141414] border border-[#262626] focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white placeholder-[#71717A] focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-md"
            >
              Subscribe
            </button>
          </form>

          <p className="text-[11px] text-[#71717A]">
            No spam. Unsubscribe anytime. Verified trade account benefits applied instantly.
          </p>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORY_INFO } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FabricCategory } from '../types';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Package,
  FileText,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { products, setCurrentView, setFilters, addToCart, formatPrice } = useShop();
  const [activeCategory, setActiveCategory] = useState<FabricCategory>('Silk');

  const selectedCategoryInfo = CATEGORY_INFO[activeCategory];
  const categoryProducts = products.filter((p) => p.category === activeCategory);

  const handleOrderCategoryBox = (cat: FabricCategory) => {
    const info = CATEGORY_INFO[cat];
    const firstProduct = categoryProducts[0];
    if (firstProduct) {
      addToCart(
        {
          ...firstProduct,
          name: `${cat} Master Swatch Kit Box (10+ Swatches + Color Ring)`,
          pricePerMeterMYR: info.sampleBoxPrice,
        },
        firstProduct.colors[0],
        1,
        true,
        `Complete ${cat} fabric swatch kit box`
      );
    }
  };

  const handleExploreInCatalog = (cat: FabricCategory) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-10 sm:py-16 bg-[#0A0A0A] min-h-screen text-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider font-luxury">
            <Layers className="w-3.5 h-3.5" />
            <span>Fabric Archetypes & Technical Library</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-luxury font-bold text-white tracking-wide">
            Textile Categories & Weaves Guide
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
            Engineered at our Kuala Lumpur facility to international luxury specifications. Learn about fiber compositions, weight classes (GSM), weave structures, and typical garment use-cases.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {Object.keys(CATEGORY_INFO).map((catName) => {
            const isSelected = activeCategory === catName;
            return (
              <button
                key={catName}
                onClick={() => setActiveCategory(catName as FabricCategory)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4AF37] text-black font-bold shadow-lg shadow-[#D4AF37]/20 scale-105'
                    : 'bg-[#141414] hover:bg-[#1F1F1F] border border-[#262626] text-[#D1D1D8] hover:text-white'
                }`}
              >
                {catName}
              </button>
            );
          })}
        </div>

        {/* Active Category Spotlight Hero Box */}
        {selectedCategoryInfo && (
          <div className="rounded-3xl overflow-hidden bg-[#141414] border border-[#2B2B2B] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Details */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider font-luxury">
                      {activeCategory} Architecture
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      Weight: <strong className="text-white">{selectedCategoryInfo.gsmRange}</strong>
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-luxury font-bold text-white">
                    {selectedCategoryInfo.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#D1D1D8] leading-relaxed">
                    {selectedCategoryInfo.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                      Key Textile Attributes:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {selectedCategoryInfo.highlightFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Use-Cases */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                      Ideal Target Applications:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategoryInfo.topUseCases.map((uc, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-[#1F1F1F] border border-[#333333] text-[11px] text-[#D1D1D8]"
                        >
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#262626] flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => handleOrderCategoryBox(activeCategory)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                  >
                    Order {activeCategory} Swatch Box ({formatPrice(selectedCategoryInfo.sampleBoxPrice)})
                  </button>
                  <button
                    onClick={() => handleExploreInCatalog(activeCategory)}
                    className="px-5 py-3 rounded-xl bg-[#1C1C1C] hover:bg-[#282828] border border-[#333333] text-xs font-semibold text-white flex items-center gap-2 transition-colors"
                  >
                    <span>View All {categoryProducts.length} {activeCategory} Fabrics</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>

              {/* Right Visual Image */}
              <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px]">
                <img
                  src={selectedCategoryInfo.bannerImage}
                  alt={activeCategory}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#333333] px-3 py-1.5 rounded-xl text-right">
                  <div className="text-[10px] text-[#9CA3AF] uppercase">Physical Swatches</div>
                  <div className="text-xs font-bold text-[#D4AF37]">Available for Rapid Dispatch</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Products under this category */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#262626] pb-4">
            <div>
              <h3 className="text-xl font-luxury font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Fabrics in {activeCategory} Archive</span>
              </h3>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                Ready stock available at Menara City One, Kuala Lumpur.
              </p>
            </div>

            <button
              onClick={() => handleExploreInCatalog(activeCategory)}
              className="text-xs font-semibold text-[#D4AF37] hover:underline"
            >
              Filter in Catalog &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* All 8 Categories Matrix Overview Table */}
        <div className="p-8 rounded-3xl bg-[#141414] border border-[#262626] space-y-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-luxury font-bold text-white">
              Complete Textile Specifications Matrix
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              Technical comparison across our eight primary mill categories for apparel manufacturers and tenders.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#D1D1D8]">
              <thead className="bg-[#1A1A1A] text-[11px] uppercase tracking-wider text-[#9CA3AF] border-b border-[#262626]">
                <tr>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Weight Range</th>
                  <th className="py-3 px-4">Core Compositions</th>
                  <th className="py-3 px-4">Key Certifications</th>
                  <th className="py-3 px-4">Sample Box</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626]">
                {Object.entries(CATEGORY_INFO).map(([catName, info]) => (
                  <tr
                    key={catName}
                    className="hover:bg-[#1C1C1C] transition-colors cursor-pointer"
                    onClick={() => setActiveCategory(catName as FabricCategory)}
                  >
                    <td className="py-3 px-4 font-luxury font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span>{catName}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">{info.gsmRange}</td>
                    <td className="py-3 px-4 text-[#9CA3AF] max-w-xs truncate">
                      {info.description}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#1F1F1F] text-[10px] text-[#38BDF8] border border-[#2B2B2B]">
                        OEKO-TEX / ISO 9001
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#D4AF37]">
                      {formatPrice(info.sampleBoxPrice)}
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleExploreInCatalog(catName as FabricCategory)}
                        className="px-3 py-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#D4AF37] hover:text-black text-white font-semibold text-[11px] transition-colors"
                      >
                        Shop {catName}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

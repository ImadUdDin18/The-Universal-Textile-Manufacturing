import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FabricFilters } from '../components/FabricFilters';
import { ProductCard } from '../components/ProductCard';
import { FabricCategory } from '../types';
import {
  Sparkles,
  Layers,
  FileText,
  Package,
  LayoutGrid,
  List,
  ArrowUpDown,
  Search,
  Filter,
  CheckCircle2,
  Phone,
  MessageCircle,
} from 'lucide-react';

const CATEGORIES: Array<FabricCategory | 'All'> = [
  'All',
  'Silk',
  'Cotton',
  'Linen',
  'Uniform Fabric',
  'Custom Prints',
  'Jacquard',
  'Wool Blend',
  'Polyester',
];

export const CatalogPage: React.FC = () => {
  const {
    products,
    filteredProducts,
    filters,
    setFilters,
    setIsGsmCalcOpen,
    setIsRfqModalOpen,
    setSelectedProduct,
    addToCart,
    formatPrice,
    t,
  } = useShop();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleCategorySelect = (cat: FabricCategory | 'All') => {
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  return (
    <div className="py-10 sm:py-16 bg-[#0A0A0A] min-h-screen text-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#262626]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2 font-luxury">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mill-Direct Luxury Archive • Menara City One, KL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-luxury font-bold text-white tracking-wide">
              Complete Fabric Catalog
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1 max-w-2xl">
              Browse our inventory of 500,000+ meters in stock in Kuala Lumpur. All fabrics are available by the meter, sample swatch, or container wholesale lot.
            </p>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsGsmCalcOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              <span>GSM & Freight Tool</span>
            </button>
            <button
              onClick={() => setIsRfqModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/15 flex items-center gap-1.5 hover:scale-105 transition-all"
            >
              <FileText className="w-4 h-4 fill-black" />
              <span>Bulk RFQ (50m+)</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Pill Selector with Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? products.length
                : products.filter((p) => p.category === cat).length;
            const isSelected = filters.category === cat;

            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 font-bold'
                    : 'bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] text-[#D1D1D8] hover:text-white'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-black/20 text-black font-bold'
                      : 'bg-[#262626] text-[#9CA3AF]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Toolbar (GSM, Color, Price, Sort) */}
        <FabricFilters />

        {/* Results Bar & View Toggle */}
        <div className="flex items-center justify-between gap-4 py-2 text-xs text-[#9CA3AF] border-b border-[#1F1F1F]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">{filteredProducts.length}</span>
            <span>fabrics found</span>
            {filters.category !== 'All' && (
              <span className="text-[#D4AF37]">in {filters.category}</span>
            )}
            {filters.searchQuery && (
              <span>matching &quot;{filters.searchQuery}&quot;</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[#71717A]">View:</span>
            <div className="flex items-center bg-[#141414] border border-[#262626] rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#D4AF37] text-black'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#D4AF37] text-black'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
                title="List / Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid / List Display */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 rounded-3xl bg-[#141414] border border-[#262626] text-center space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-[#1C1C1C] border border-[#333333] flex items-center justify-center mx-auto text-[#71717A]">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No Matching Fabrics Found</h3>
            <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
              Try adjusting your GSM weight range, category, or search keywords to explore our other collections.
            </p>
            <button
              onClick={() =>
                setFilters({
                  category: 'All',
                  searchQuery: '',
                  selectedColorHex: null,
                  minGsm: 0,
                  maxGsm: 500,
                  minPrice: 0,
                  maxPrice: 300,
                  useCase: null,
                  sortBy: 'popular',
                })
              }
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* List / Wholesale Table View */
          <div className="bg-[#141414] rounded-2xl border border-[#262626] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#D1D1D8]">
                <thead className="bg-[#1A1A1A] text-[11px] uppercase tracking-wider text-[#9CA3AF] border-b border-[#262626]">
                  <tr>
                    <th className="py-3 px-4">Fabric</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">GSM</th>
                    <th className="py-3 px-4">Width</th>
                    <th className="py-3 px-4">Composition</th>
                    <th className="py-3 px-4">Ready Stock</th>
                    <th className="py-3 px-4">Price / Meter</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626]">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-[#1C1C1C] transition-colors cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-[#333333]"
                          />
                          <div>
                            <div className="font-luxury font-bold text-white text-xs hover:text-[#D4AF37]">
                              {product.name}
                            </div>
                            <div className="text-[10px] text-[#71717A]">
                              MOQ: {product.moqMeters}m • {product.colors.length} Colorways
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#1C1C1C] border border-[#2B2B2B] text-[10px] font-semibold text-[#D4AF37]">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">{product.gsm} GSM</td>
                      <td className="py-3 px-4">{product.widthInch}&quot; ({product.widthCm}cm)</td>
                      <td className="py-3 px-4 text-[#9CA3AF] max-w-xs truncate">
                        {product.composition}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[#00E676] font-semibold">
                          {product.stockMeters.toLocaleString()}m
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">
                          {formatPrice(product.pricePerMeterMYR)}
                        </div>
                        <div className="text-[10px] text-[#71717A]">
                          Swatch: {formatPrice(product.samplePriceMYR)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => addToCart(product, product.colors[0], 1, true)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#282828] border border-[#333333] text-[11px] font-semibold text-[#D4AF37]"
                            title="Order physical sample swatch"
                          >
                            Sample
                          </button>
                          <button
                            onClick={() => addToCart(product, product.colors[0], product.moqMeters, false)}
                            className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-[11px]"
                          >
                            Add {product.moqMeters}m
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Custom Weaving & Direct Mill Inquiries Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border border-[#2B2B2B] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-luxury font-bold text-lg text-white">
              Need a Custom Pantone Dye, Specific Yarn Count, or 10,000m+ Container Lot?
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              Our master weavers in Menara City One, Kuala Lumpur handle direct mill contracts, custom technical finishes, and tender procurement.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsRfqModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-md"
            >
              Submit Custom RFQ
            </button>
            <a
              href="https://wa.me/60162492162?text=Hello%2C%20I%20am%20inquiring%20about%20a%20custom%20fabric%20order%20from%20The%20Universal%20Textile."
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#1E3A2B] hover:bg-[#254A37] text-[#25D366] border border-[#25D366]/40 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useShop } from '../context/ShopContext';
import { FabricCategory } from '../types';
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  Filter,
  Layers,
  Sparkles,
  Palette,
  Check,
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

const SWATCH_COLORS = [
  { name: 'Gold / Champagne', hex: '#D4AF37' },
  { name: 'Crisp White / Ecru', hex: '#FFFFFF' },
  { name: 'Midnight Onyx / Black', hex: '#111215' },
  { name: 'Corporate Navy', hex: '#0A192F' },
  { name: 'Emerald / Olive', hex: '#097969' },
  { name: 'Burgundy / Crimson', hex: '#800020' },
  { name: 'Flax / Camel Tan', hex: '#D2B48C' },
  { name: 'Sky / Royal Blue', hex: '#0F52BA' },
];

const USE_CASES = [
  'Haute Couture',
  'Executive Shirting',
  'Baju Melayu/Kurung',
  'Aviation Pilot & Crew Uniforms',
  'Designer Fashion Collections',
  'Tropical Resort Wear',
  'Royal Ceremonial Attire',
  'Outdoor Adventure & Rain Jackets',
];

export const FabricFilters: React.FC = () => {
  const { filters, setFilters, resetFilters, t, filteredProducts, products } = useShop();

  const activeCategory = filters.category;

  const handleCategoryClick = (cat: FabricCategory | 'All') => {
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  const handleColorClick = (hex: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedColorHex: prev.selectedColorHex === hex ? null : hex,
    }));
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.searchQuery !== '' ||
    filters.selectedColorHex !== null ||
    filters.minGsm > 0 ||
    filters.maxGsm < 500 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 300 ||
    filters.useCase !== null;

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl p-5 sm:p-6 mb-8 shadow-xl">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat;
          const count = cat === 'All' ? products.length : products.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black shadow-lg shadow-[#D4AF37]/20 font-bold scale-102'
                  : 'bg-[#1C1C1C] text-[#9CA3AF] hover:text-white hover:bg-[#262626] border border-[#262626]'
              }`}
            >
              <span>{cat === 'All' ? t.filter.all : cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black/20 text-black font-extrabold' : 'bg-[#262626] text-[#71717A]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-2 border-t border-[#262626]">
        {/* Filter 1: GSM Range */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#9CA3AF] font-medium flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.filter.gsmWeight}</span>
            </span>
            <span className="text-[#D4AF37] font-mono font-bold">
              {filters.minGsm} - {filters.maxGsm} GSM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={500}
              step={10}
              value={filters.maxGsm}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxGsm: Number(e.target.value) }))}
              className="w-full accent-[#D4AF37] bg-[#262626] h-1.5 rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#71717A] mt-1">
            <span>Light (50)</span>
            <span>Mid (200)</span>
            <span>Heavy (450+)</span>
          </div>
        </div>

        {/* Filter 2: Color Palette Swatches */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#9CA3AF] font-medium flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.filter.color}</span>
            </span>
            {filters.selectedColorHex && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, selectedColorHex: null }))}
                className="text-[11px] text-[#D4AF37] hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {SWATCH_COLORS.map((c) => {
              const isSelected = filters.selectedColorHex?.toLowerCase() === c.hex.toLowerCase();
              return (
                <button
                  key={c.hex}
                  onClick={() => handleColorClick(c.hex)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#D4AF37] scale-110 ring-2 ring-[#D4AF37] shadow-lg'
                      : 'border-[#262626] hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-3 h-3 mx-auto ${
                        c.hex === '#FFFFFF' || c.hex === '#F3E5AB' ? 'text-black' : 'text-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter 3: Intended Use-Case Dropdown */}
        <div>
          <div className="text-xs text-[#9CA3AF] font-medium mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.filter.useCase}</span>
          </div>
          <select
            value={filters.useCase || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                useCase: e.target.value ? e.target.value : null,
              }))
            }
            className="w-full bg-[#1C1C1C] border border-[#262626] text-xs text-white rounded-lg px-3 py-2 focus:border-[#D4AF37] focus:outline-none cursor-pointer"
          >
            <option value="">All Applications & Garments</option>
            {USE_CASES.map((uc) => (
              <option key={uc} value={uc} className="bg-[#141414] text-white">
                {uc}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 4: Sort Dropdown & Reset */}
        <div>
          <div className="text-xs text-[#9CA3AF] font-medium mb-2 flex items-center justify-between">
            <span>{t.filter.sortBy}</span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[#D4AF37] hover:text-white flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.filter.reset}</span>
              </button>
            )}
          </div>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sortBy: e.target.value as typeof filters.sortBy,
              }))
            }
            className="w-full bg-[#1C1C1C] border border-[#262626] text-xs text-white rounded-lg px-3 py-2 focus:border-[#D4AF37] focus:outline-none cursor-pointer font-medium"
          >
            <option value="popular">{t.filter.sortPopular}</option>
            <option value="price-asc">{t.filter.sortPriceLow}</option>
            <option value="price-desc">{t.filter.sortPriceHigh}</option>
            <option value="gsm-desc">{t.filter.sortGsmHigh}</option>
          </select>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs text-[#9CA3AF]">
        <div>
          {t.filter.showingResults}: <strong className="text-white font-mono">{filteredProducts.length}</strong> fabrics
        </div>
        {hasActiveFilters && (
          <span className="text-[11px] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
            Active Filter Applied
          </span>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { FabricProduct, FabricColor } from '../types';
import { useShop } from '../context/ShopContext';
import {
  Eye,
  ShoppingBag,
  Sparkles,
  Layers,
  Check,
  Star,
  ShieldCheck,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface ProductCardProps {
  product: FabricProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    t,
    language,
    formatPrice,
    addToCart,
    setQuickViewProduct,
    setSelectedProduct,
    setIsRfqModalOpen,
    setRfqTargetProduct,
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<FabricColor>(product.colors[0] || { name: 'Standard', hex: '#D4AF37' });
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const displayName = language === 'ms' && product.nameMs ? product.nameMs : language === 'ur' && product.nameUr ? product.nameUr : product.name;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Adds MOQ meters to cart
    addToCart(product, selectedColor, product.moqMeters, false);
  };

  const handleOrderSwatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1, true);
  };

  const handleOpenRfq = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRfqTargetProduct(product);
    setIsRfqModalOpen(true);
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello The Universal Textile! I am interested in ordering/quoting for "${product.name}" (${selectedColor.name}, ${product.gsm} GSM). Please share roll availability and B2B pricing.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setActiveImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIndex(0);
      }}
      className="group relative bg-[#141414] border border-[#262626] hover:border-[#D4AF37]/80 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/15 cursor-pointer"
    >
      {/* Top Image Box */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#0A0A0A]">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md bg-[#0A0A0A]/90 border border-[#333333] text-white text-[11px] font-bold tracking-wider uppercase font-luxury flex items-center gap-1 shadow-md backdrop-blur-sm">
            <Layers className="w-3 h-3 text-[#D4AF37]" />
            <span>{product.gsm} GSM</span>
          </span>

          {product.isBestseller && (
            <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-black text-[10px] font-extrabold uppercase tracking-wider shadow-md">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-md bg-[#00E676] text-black text-[10px] font-extrabold uppercase tracking-wider shadow-md">
              New Batch 2026
            </span>
          )}
        </div>

        {/* Category & Width Tag */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 rounded-md bg-[#0A0A0A]/85 border border-[#333333] text-[#D1D1D8] text-[10px] font-semibold backdrop-blur-sm">
            {product.category} • {product.widthInch}"
          </span>
        </div>

        {/* Quick View Button on Image Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-xl hover:bg-[#D4AF37] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.productCard.viewDetails}</span>
          </button>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Stock Counter */}
          <div className="flex items-center justify-between text-xs text-[#8E8E9F] mb-1.5">
            <div className="flex items-center gap-1 text-[#FFD700]">
              <Star className="w-3.5 h-3.5 fill-[#FFD700]" />
              <span className="font-bold text-white text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-[#7A7A8A]">({product.reviewCount})</span>
            </div>
            <span className="text-[11px] text-[#00E676] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]"></span>
              {product.stockMeters.toLocaleString()}m in KL
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-1">
            {displayName}
          </h3>

          {/* Material & Weave Brief */}
          <p className="text-xs text-[#9E9EB0] line-clamp-1 mb-3">
            {product.composition} • {product.weave}
          </p>

          {/* Color Swatch Dots */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-[#808092] font-medium">
                Colorway: <strong className="text-white">{selectedColor.name}</strong>
              </span>
              <span className="text-[10px] text-[#6A6A7A]">({product.colors.length} shades)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.colors.slice(0, 6).map((color, i) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(color);
                    }}
                    title={color.name}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] scale-110 ring-2 ring-[#D4AF37]/50 shadow-md'
                        : 'border-[#444455] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name}`}
                  >
                    {isSelected && (
                      <Check
                        className={`w-3 h-3 mx-auto ${
                          color.hex === '#FFFFFF' || color.hex === '#FAF0E6' || color.hex === '#F3E5AB'
                            ? 'text-black'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
              {product.colors.length > 6 && (
                <span className="text-[10px] text-[#A0A0B0] font-semibold pl-1">
                  +{product.colors.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-[#262626]">
          {/* Price & MOQ display */}
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-lg sm:text-xl font-luxury font-extrabold text-gold-gradient leading-none">
                {formatPrice(product.pricePerMeterMYR)}
              </div>
              <span className="text-[11px] text-[#9CA3AF]">/{t.productCard.perMeter}</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-[#D1D1D8] bg-[#1C1C1C] px-2 py-0.5 rounded border border-[#2B2B2B]">
                MOQ: {product.moqMeters}m
              </span>
            </div>
          </div>

          {/* Action Button Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Order Sample Swatch Button */}
            <button
              onClick={handleOrderSwatch}
              className="py-2 px-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#333333] hover:border-[#D4AF37] text-white text-[11px] font-semibold transition-all flex items-center justify-center gap-1 text-center"
              title="Order physical fabric swatch sample kit"
            >
              <span>Sample (RM 20)</span>
            </button>

            {/* Add to Bag (MOQ meters) */}
            <button
              onClick={handleQuickAdd}
              className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38B1C] hover:from-[#E5C358] hover:to-[#C99E25] text-black text-[11px] font-bold transition-all shadow-md flex items-center justify-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5 fill-black" />
              <span>{product.moqMeters}m Bag</span>
            </button>
          </div>

          {/* B2B Quote / WhatsApp Link */}
          <div className="mt-2 flex items-center justify-between text-[11px] text-[#9CA3AF] pt-1">
            <button
              onClick={handleOpenRfq}
              className="hover:text-[#D4AF37] font-medium flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>B2B Quote (&gt;500m)</span>
            </button>

            <button
              onClick={handleWhatsAppInquiry}
              className="hover:text-[#00E676] font-medium flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#00E676]" />
              <span>WhatsApp Inquiry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

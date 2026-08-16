import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FabricColor, FabricProduct } from '../types';
import { COMPANY_INFO } from '../data/products';
import {
  X,
  Star,
  Check,
  ShoppingBag,
  Sparkles,
  Layers,
  ShieldCheck,
  Truck,
  Download,
  MessageCircle,
  Clock,
  Ruler,
  Info,
  CheckCircle2,
  FileCheck,
  Award,
  ChevronRight,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    t,
    language,
    setIsRfqModalOpen,
    setRfqTargetProduct,
    addToast,
  } = useShop();

  const product = selectedProduct || quickViewProduct;

  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<FabricColor>(
    product.colors[0] || { name: 'Standard Gold', hex: '#D4AF37' }
  );
  const [meters, setMeters] = useState<number>(product.moqMeters);
  const [isSampleMode, setIsSampleMode] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  const displayName =
    language === 'ms' && product.nameMs
      ? product.nameMs
      : language === 'ur' && product.nameUr
      ? product.nameUr
      : product.name;

  const displayDesc =
    language === 'ms' && product.descriptionMs
      ? product.descriptionMs
      : language === 'ur' && product.descriptionUr
      ? product.descriptionUr
      : product.description;

  const handleClose = () => {
    setSelectedProduct(null);
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, meters, isSampleMode, customNotes);
    handleClose();
  };

  const handleOpenRfq = () => {
    setRfqTargetProduct(product);
    setIsRfqModalOpen(true);
    handleClose();
  };

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hello The Universal Textile Sdn Bhd! I am looking to purchase/quote for:\n- Fabric: ${product.name}\n- Shade: ${selectedColor.name}\n- Meters: ${isSampleMode ? 'Sample Swatch Kit' : `${meters} meters`}\n- GSM: ${product.gsm} GSM\nPlease advise bulk pricing and delivery from Menara City One, KL.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const handleDownloadDatasheet = () => {
    addToast(
      'success',
      'Technical Datasheet Generated',
      `TDS-${product.slug.toUpperCase()}-2026.pdf prepared with OEKO-TEX & lab tensile test reports.`
    );
  };

  // Bulk discount calculation
  let discountPercent = 0;
  if (!isSampleMode) {
    if (meters >= 500) discountPercent = 25;
    else if (meters >= 100) discountPercent = 10;
  }

  const baseUnitPrice = isSampleMode ? product.samplePriceMYR : product.pricePerMeterMYR;
  const effectiveUnitPrice = baseUnitPrice * (1 - discountPercent / 100);
  const subtotal = effectiveUnitPrice * (isSampleMode ? 1 : meters);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#111111] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#141414]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase font-luxury">
              {product.category} Textiles
            </span>
            <span className="text-[#404050]">•</span>
            <span className="text-xs text-[#9CA3AF]">ID: {product.id}</span>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#1C1C1C] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Image Gallery & Macro Zoom (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Main Active Image with Zoom Frame */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#262626] bg-[#0A0A0A] group">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-[#262626] flex items-center gap-1 font-luxury">
                    <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{product.gsm} GSM</span>
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[#D4AF37] text-[11px] font-semibold border border-[#D4AF37]/40">
                  Ready in KL Showroom
                </div>
              </div>

              {/* Thumbnails list */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImage === i
                          ? 'border-[#D4AF37] scale-105 shadow-md shadow-[#D4AF37]/20'
                          : 'border-[#262626] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantee Box */}
              <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] space-y-2.5 text-xs text-[#9CA3AF]">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#00E676]" />
                  <span>The Universal Textile Guarantee</span>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span>{t.detail.deliveryMalaysia}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                  <span>{t.detail.internationalShipping}</span>
                </div>
              </div>

              {/* TDS Download button */}
              <button
                onClick={handleDownloadDatasheet}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#262626] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.detail.downloadTechSheet}</span>
              </button>
            </div>

            {/* Right Column: Specifications, Color, Meters & Ordering (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Title & Reviews */}
                <div className="flex items-center gap-2 text-xs text-[#D4AF37] mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="font-bold text-white text-xs">{product.rating.toFixed(1)}</span>
                  <span className="text-[#71717A]">({product.reviewCount} Verified Mill Reviews)</span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-luxury font-bold text-white mb-2 leading-tight">
                  {displayName}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl sm:text-3xl font-luxury font-extrabold text-gold-gradient">
                    {formatPrice(effectiveUnitPrice)}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">
                    {isSampleMode ? 'per physical swatch kit' : `/${t.productCard.perMeter}`}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold bg-[#00E676] text-black px-2 py-0.5 rounded-full">
                      {discountPercent}% Bulk Saving Applied
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-6">
                  {displayDesc}
                </p>

                {/* Color Swatch Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span>{t.detail.selectColor}:</span>
                      <span className="text-[#D4AF37] font-bold">{selectedColor.name}</span>
                    </label>
                    <span className="text-[11px] text-[#71717A]">{product.colors.length} options</span>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {product.colors.map((color, idx) => {
                      const isSelected = selectedColor.name === color.name;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(color)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white ring-1 ring-[#D4AF37] font-semibold'
                              : 'border-[#262626] bg-[#141414] text-[#9CA3AF] hover:border-gray-500'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/40"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                          {isSelected && <Check className="w-3 h-3 text-[#D4AF37]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Order Type Toggle: Full Meters vs Sample Swatch */}
                <div className="mb-6 p-4 rounded-2xl bg-[#141414] border border-[#262626]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Order Format
                    </span>
                    <span className="text-[11px] text-[#D4AF37]">
                      MOQ: {product.moqMeters} meters
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => setIsSampleMode(false)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        !isSampleMode
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white shadow-md'
                          : 'border-[#262626] bg-[#1C1C1C] text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold mb-0.5">Bolts / Continuous Roll</div>
                      <div className="text-[11px] text-[#71717A]">
                        Cut to custom length (min {product.moqMeters}m)
                      </div>
                    </button>

                    <button
                      onClick={() => setIsSampleMode(true)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSampleMode
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white shadow-md'
                          : 'border-[#262626] bg-[#1C1C1C] text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold mb-0.5">Physical Swatch Kit (RM 20)</div>
                      <div className="text-[11px] text-[#71717A]">
                        10x15cm fabric card + all color ring
                      </div>
                    </button>
                  </div>

                  {/* Meter Stepper (Only if not sample mode) */}
                  {!isSampleMode && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-white font-medium">{t.detail.quantityMeters}</span>
                        <span className="text-[#9CA3AF]">Ready stock: {product.stockMeters.toLocaleString()}m</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[#0A0A0A] border border-[#262626] rounded-xl overflow-hidden">
                          <button
                            onClick={() => setMeters((prev) => Math.max(product.moqMeters, prev - 5))}
                            className="px-3.5 py-2 text-white hover:bg-[#1C1C1C] font-bold text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min={product.moqMeters}
                            max={product.stockMeters}
                            value={meters}
                            onChange={(e) => setMeters(Math.max(product.moqMeters, Number(e.target.value)))}
                            className="w-20 bg-transparent text-center text-sm font-bold text-white focus:outline-none"
                          />
                          <button
                            onClick={() => setMeters((prev) => prev + 5)}
                            className="px-3.5 py-2 text-white hover:bg-[#1C1C1C] font-bold text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Quick Presets */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {[50, 100, 500, 1000].map((preset) => (
                            <button
                              key={preset}
                              onClick={() => setMeters(preset)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                                meters === preset
                                  ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
                                  : 'border-[#262626] bg-[#1C1C1C] text-[#9CA3AF] hover:text-white'
                              }`}
                            >
                              +{preset}m
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Bulk Tier Notification */}
                      <div className="mt-3 text-[11px] text-[#D4AF37] bg-[#D4AF37]/10 p-2.5 rounded-lg border border-[#D4AF37]/30 flex items-center gap-2">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <span>{t.detail.bulkDiscountNotice}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Technical Specifications Matrix */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">
                    {t.detail.specs}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#141414] border border-[#262626]">
                      <div className="text-[10px] text-[#71717A] uppercase">{t.detail.composition}</div>
                      <div className="font-semibold text-white mt-0.5">{product.composition}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#141414] border border-[#262626]">
                      <div className="text-[10px] text-[#71717A] uppercase">{t.detail.weave}</div>
                      <div className="font-semibold text-white mt-0.5">{product.weave}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#141414] border border-[#262626]">
                      <div className="text-[10px] text-[#71717A] uppercase">{t.detail.width}</div>
                      <div className="font-semibold text-white mt-0.5">{product.widthInch}" ({product.widthCm}cm)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#141414] border border-[#262626]">
                      <div className="text-[10px] text-[#71717A] uppercase">{t.detail.gsm}</div>
                      <div className="font-semibold text-[#D4AF37] mt-0.5">{product.gsm} GSM Weight</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#141414] border border-[#262626]">
                      <div className="text-[10px] text-[#71717A] uppercase">{t.detail.yarnCount}</div>
                      <div className="font-semibold text-white mt-0.5">{product.yarnCount || 'Standard Mill Spun'}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#141414] border border-[#262626]">
                      <div className="text-[10px] text-[#71717A] uppercase">{t.detail.shrinkage}</div>
                      <div className="font-semibold text-[#00E676] mt-0.5">{product.shrinkage || '< 1.5% Pre-shrunk'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Bottom CTA Actions */}
              <div className="pt-4 border-t border-[#262626] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#9CA3AF]">Total Subtotal:</span>
                    <div className="text-xl font-luxury font-bold text-white">
                      {formatPrice(subtotal)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleWhatsAppConsult}
                      className="p-3 rounded-xl bg-[#1E3A2B] hover:bg-[#254A37] text-[#25D366] border border-[#25D366]/40 transition-colors cursor-pointer"
                      title="Direct WhatsApp Consultation"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleOpenRfq}
                      className="px-4 py-3 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] text-white border border-[#262626] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {t.productCard.requestBulkQuote}
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#D4AF37]/20 hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 fill-black" />
                      <span>{isSampleMode ? 'Add Sample Swatch' : t.productCard.addToCart}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

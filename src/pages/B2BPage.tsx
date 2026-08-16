import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COMPANY_INFO } from '../data/products';
import {
  Building2,
  Sparkles,
  Layers,
  ShieldCheck,
  Calculator,
  FileText,
  MessageCircle,
  Phone,
  CheckCircle2,
  Package,
  Globe2,
  Truck,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';

export const B2BPage: React.FC = () => {
  const { products, setIsRfqModalOpen, formatPrice, convertPrice, currency } = useShop();

  // Calculator State
  const [selectedFabricId, setSelectedFabricId] = useState<string>(products[0]?.id || '');
  const [meterInput, setMeterInput] = useState<number>(500);

  const selectedProduct = products.find((p) => p.id === selectedFabricId) || products[0];

  // Calculate Tiered Discount
  let discountPercent = 0;
  let tierName = 'Atelier Tier (Standard)';
  if (meterInput >= 2000) {
    discountPercent = 30;
    tierName = 'Mill Container Lot Tier (-30%)';
  } else if (meterInput >= 500) {
    discountPercent = 20;
    tierName = 'Factory Contract Tier (-20%)';
  } else if (meterInput >= 50) {
    discountPercent = 10;
    tierName = 'Roll Wholesale Tier (-10%)';
  }

  const basePricePerMeter = selectedProduct ? selectedProduct.pricePerMeterMYR : 100;
  const discountedPricePerMeterMYR = basePricePerMeter * (1 - discountPercent / 100);
  const totalMYR = discountedPricePerMeterMYR * meterInput;
  const totalSavingsMYR = basePricePerMeter * meterInput - totalMYR;

  // Weight & roll estimates
  const fabricGsm = selectedProduct ? selectedProduct.gsm : 200;
  const widthM = selectedProduct ? selectedProduct.widthCm / 100 : 1.45;
  const estimatedWeightKg = ((meterInput * widthM * fabricGsm) / 1000).toFixed(1);
  const rollCount = Math.ceil(meterInput / 50);

  return (
    <div className="py-10 sm:py-16 bg-[#0A0A0A] min-h-screen text-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider font-luxury">
            <Building2 className="w-3.5 h-3.5" />
            <span>Institutional, Corporate & Fashion Procurement</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-luxury font-bold text-white tracking-wide">
            Direct Mill Weaving & Bulk Supply
          </h1>

          <p className="text-xs sm:text-base text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            Supplying garment manufacturers, hotel chains, government uniform tenders, and international fashion brands from 500 meters to 50,000+ meter ocean container lots directly from Menara City One, Kuala Lumpur.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsRfqModalOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#D4AF37]/20 hover:scale-105 transition-all cursor-pointer"
            >
              Open Instant B2B RFQ Form
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20B2B%20wholesale%20order%20with%20The%20Universal%20Textile%20SDN%20BHD.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#1E3A2B] hover:bg-[#254A37] text-[#25D366] border border-[#25D366]/40 font-semibold text-xs flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Mill Director</span>
            </a>
          </div>
        </div>

        {/* Tiered Discount Schedule Cards */}
        <div className="p-8 rounded-3xl bg-[#141414] border border-[#262626] shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-luxury font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#D4AF37]" />
                <span>Wholesale Tiered Discount Schedule</span>
              </h3>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Discounts automatically applied based on total meterage per colorway or production order.
              </p>
            </div>
            <span className="text-xs text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/30 px-3 py-1 rounded-full font-semibold">
              Ready Stock Dispatch: 24 - 48 Hours
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2B2B2B] text-center space-y-2">
              <span className="text-[11px] font-bold text-[#9CA3AF] uppercase">Atelier Tier</span>
              <div className="text-xl font-bold text-white">10 – 49 Meters</div>
              <div className="text-xs font-semibold text-[#D4AF37]">Standard Catalog Price</div>
              <p className="text-[11px] text-[#71717A]">Cut length, same-day dispatch from KL</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2B2B2B] text-center space-y-2">
              <span className="text-[11px] font-bold text-[#38BDF8] uppercase">Roll Wholesale Tier</span>
              <div className="text-xl font-bold text-white">50 – 499 Meters</div>
              <div className="text-xs font-bold text-[#00E676]">10% Off Base Rate</div>
              <p className="text-[11px] text-[#71717A]">Full rolls (50m each), free Malaysia shipping</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2B2B2B] text-center space-y-2">
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase">Factory Contract Tier</span>
              <div className="text-xl font-bold text-white">500 – 1,999 Meters</div>
              <div className="text-xs font-bold text-[#00E676]">20% Off Base Rate</div>
              <p className="text-[11px] text-[#71717A]">Custom Pantone lab dip & roll labeling</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2B2B2B] text-center space-y-2">
              <span className="text-[11px] font-bold text-[#FFD700] uppercase">Mill Container Lot</span>
              <div className="text-xl font-bold text-white">2,000+ Meters</div>
              <div className="text-xs font-bold text-[#FFD700]">30% Off + Custom Milling</div>
              <p className="text-[11px] text-[#71717A]">Dedicated loom allocation, CIF port delivery</p>
            </div>
          </div>
        </div>

        {/* Interactive B2B Volume Calculator */}
        <div className="rounded-3xl bg-[#141414] border border-[#2B2B2B] p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-luxury font-bold text-white">
                Live Wholesale Cost & Volume Estimator
              </h2>
              <p className="text-xs text-[#9CA3AF]">
                Select any fabric in our archive to simulate instant container pricing, rolls, weight, and volume discounts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-2">
                  Select Fabric Specification:
                </label>
                <select
                  value={selectedFabricId}
                  onChange={(e) => setSelectedFabricId(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#141414] text-white">
                      {p.name} ({p.category} • {p.gsm} GSM • {formatPrice(p.pricePerMeterMYR)}/m)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <label className="font-bold uppercase tracking-wider text-[#9CA3AF]">
                    Required Quantity (Meters):
                  </label>
                  <span className="font-bold text-[#D4AF37] text-sm">
                    {meterInput.toLocaleString()} Meters
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={5000}
                  step={10}
                  value={meterInput}
                  onChange={(e) => setMeterInput(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] h-2 bg-[#262626] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#71717A] mt-1">
                  <span>10m (Sample)</span>
                  <span>500m (Contract)</span>
                  <span>2,000m (Container)</span>
                  <span>5,000m+ (Mill Lot)</span>
                </div>
              </div>

              {/* Quick Meter Quick-Buttons */}
              <div className="flex flex-wrap gap-2">
                {[50, 200, 500, 1000, 2500, 5000].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMeterInput(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      meterInput === m
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : 'bg-[#1F1F1F] text-[#9CA3AF] hover:text-white border border-[#2B2B2B]'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                <span className="text-xs text-[#9CA3AF]">Applied Pricing Tier:</span>
                <span className="text-xs font-bold text-[#D4AF37]">{tierName}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[11px] text-[#71717A]">Base Rate:</div>
                  <div className="text-sm font-semibold text-gray-400 line-through">
                    {formatPrice(basePricePerMeter)}/m
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#00E676]">Wholesale Rate:</div>
                  <div className="text-lg font-bold text-[#00E676]">
                    {formatPrice(discountedPricePerMeterMYR)}/m
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-[#1F1F1F]">
                <div>
                  <div className="text-[11px] text-[#9CA3AF]">Estimated Roll Count:</div>
                  <div className="text-sm font-bold text-white">{rollCount} Industrial Rolls (~50m)</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#9CA3AF]">Estimated Net Weight:</div>
                  <div className="text-sm font-bold text-white">~{estimatedWeightKg} kg</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141414] border border-[#2B2B2B] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9CA3AF]">Estimated Order Total ({currency}):</span>
                  <span className="text-xl font-luxury font-bold text-[#D4AF37]">
                    {formatPrice(totalMYR)}
                  </span>
                </div>
                {totalSavingsMYR > 0 && (
                  <div className="flex items-center justify-between text-[11px] text-[#00E676]">
                    <span>Volume Discount Savings:</span>
                    <span>- {formatPrice(totalSavingsMYR)} ({discountPercent}% OFF)</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsRfqModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] transition-all cursor-pointer text-center"
              >
                Submit RFQ For This Volume
              </button>
            </div>
          </div>
        </div>

        {/* Manufacturing Capabilities Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-luxury font-bold text-white">
              Bespoke Textile Milling Capabilities
            </h2>
            <p className="text-xs text-[#9CA3AF]">
              Precision weaving, high-definition printing, and technical chemical enhancements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-3 text-xs">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Custom Reactive & Digital Print</h4>
              <p className="text-[#9CA3AF] leading-relaxed">
                Print your original artwork or bespoke Malaysian batik motifs at 2400 DPI with Swiss CIBA reactive dyes, ensuring 4-5 fastness rating against washing and sunlight.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-3 text-xs">
              <div className="w-10 h-10 rounded-xl bg-[#00E676]/15 flex items-center justify-center text-[#00E676]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Technical Finishes & Treatments</h4>
              <p className="text-[#9CA3AF] leading-relaxed">
                Options include Flame Retardant BS5852, Teflon™ anti-oil/water stain repellant, HydroShield antimicrobial, and Easy-Care non-iron resin stabilization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-3 text-xs">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 flex items-center justify-center text-[#38BDF8]">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Global Export Documentation</h4>
              <p className="text-[#9CA3AF] leading-relaxed">
                Full Certificate of Origin (Form D, Form E, GSP Form A), SGS pre-shipment inspection, and standardized bill of lading for rapid customs clearance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

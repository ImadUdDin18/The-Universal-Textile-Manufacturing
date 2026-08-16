import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Calculator,
  Layers,
  Scale,
  Plane,
  Ship,
  Sparkles,
  Info,
} from 'lucide-react';

export const GsmCalculatorModal: React.FC = () => {
  const { isGsmCalcOpen, setIsGsmCalcOpen } = useShop();

  const [gsm, setGsm] = useState<number>(220);
  const [widthInch, setWidthInch] = useState<number>(58);
  const [meters, setMeters] = useState<number>(500);

  if (!isGsmCalcOpen) return null;

  // Formula:
  // Width in meters = widthInch * 0.0254
  // Area (m2) = widthMeters * meters
  // Total weight (grams) = Area * GSM
  // Total weight (kg) = Total weight / 1000
  const widthMeters = widthInch * 0.0254;
  const areaSqMeters = widthMeters * meters;
  const totalWeightKg = (areaSqMeters * gsm) / 1000;
  const totalWeightLbs = totalWeightKg * 2.20462;
  const standardRollsCount = Math.ceil(meters / 50); // ~50m per roll

  // Estimated Air cargo (~RM 25/kg) and Sea Freight
  const estimatedAirFreightMYR = totalWeightKg * 28;
  const estimatedSeaFreightMYR = Math.max(180, (totalWeightKg / 1000) * 450);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#111111] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#0A0A0A]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-luxury font-bold text-white tracking-wide">
                Textile Density & Freight Estimator
              </h3>
              <p className="text-[11px] text-[#9CA3AF]">GSM to Total Weight & Roll Volume Calculation</p>
            </div>
          </div>

          <button
            onClick={() => setIsGsmCalcOpen(false)}
            className="w-8 h-8 rounded-full bg-[#1C1C1C] text-gray-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-white font-semibold mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Fabric GSM (g/m²)</span>
              </label>
              <input
                type="number"
                min={20}
                max={900}
                value={gsm}
                onChange={(e) => setGsm(Number(e.target.value))}
                className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white font-mono font-bold focus:border-[#D4AF37] focus:outline-none"
              />
              <span className="text-[10px] text-[#71717A]">e.g. 145 Silk, 220 Cotton, 380 Wool</span>
            </div>

            <div>
              <label className="block text-white font-semibold mb-1.5">
                Fabric Width (Inches)
              </label>
              <input
                type="number"
                min={30}
                max={120}
                value={widthInch}
                onChange={(e) => setWidthInch(Number(e.target.value))}
                className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white font-mono font-bold focus:border-[#D4AF37] focus:outline-none"
              />
              <span className="text-[10px] text-[#71717A]">Standard: 54", 58", 60"</span>
            </div>

            <div>
              <label className="block text-white font-semibold mb-1.5">
                Total Length (Meters)
              </label>
              <input
                type="number"
                min={1}
                step={50}
                value={meters}
                onChange={(e) => setMeters(Number(e.target.value))}
                className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white font-mono font-bold focus:border-[#D4AF37] focus:outline-none"
              />
              <span className="text-[10px] text-[#71717A]">Order meterage</span>
            </div>
          </div>

          {/* Results Display Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626]">
              <div className="text-[11px] text-[#9CA3AF]">Calculated Area</div>
              <div className="text-lg font-luxury font-bold text-white mt-1">
                {Math.round(areaSqMeters)} m²
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626]">
              <div className="text-[11px] text-[#9CA3AF]">Total Net Weight</div>
              <div className="text-lg font-luxury font-bold text-gold-gradient mt-1">
                {totalWeightKg.toFixed(1)} kg
              </div>
              <div className="text-[10px] text-[#71717A]">({totalWeightLbs.toFixed(1)} lbs)</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626]">
              <div className="text-[11px] text-[#9CA3AF]">Standard Rolls</div>
              <div className="text-lg font-luxury font-bold text-white mt-1">
                ~{standardRollsCount} Rolls
              </div>
              <div className="text-[10px] text-[#71717A]">(@ 50m / roll)</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626]">
              <div className="text-[11px] text-[#9CA3AF]">Density Class</div>
              <div className="text-xs font-bold text-[#00E676] mt-2">
                {gsm < 150 ? 'Lightweight Sheer' : gsm <= 250 ? 'Mid-Weight Structured' : 'Heavyweight Suiting'}
              </div>
            </div>
          </div>

          {/* Freight Estimation Guidance */}
          <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] space-y-2.5 text-xs text-[#9CA3AF]">
            <div className="text-white font-semibold flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#D4AF37]" />
              <span>Estimated International Dispatch Matrix from Port Klang / KLIA:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626] flex items-center gap-3">
                <Plane className="w-5 h-5 text-[#38BDF8]" />
                <div>
                  <div className="font-semibold text-white">Express Air Cargo (3-5 Days)</div>
                  <div className="text-[11px] text-[#9CA3AF]">Est: ~RM {Math.round(estimatedAirFreightMYR).toLocaleString()} (DHL/FedEx)</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626] flex items-center gap-3">
                <Ship className="w-5 h-5 text-[#00E676]" />
                <div>
                  <div className="font-semibold text-white">Ocean Sea Freight (LCL/FCL)</div>
                  <div className="text-[11px] text-[#9CA3AF]">Est: ~RM {Math.round(estimatedSeaFreightMYR).toLocaleString()} (Port Klang Dispatch)</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsGsmCalcOpen(false)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg"
          >
            Apply & Return to Products
          </button>
        </div>
      </div>
    </div>
  );
};

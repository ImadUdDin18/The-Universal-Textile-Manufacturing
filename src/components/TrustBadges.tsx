import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  Building2,
  Star,
  ShieldCheck,
  Plane,
  Coins,
  Scissors,
  CheckCircle2,
  Award,
} from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const { t } = useShop();

  const trustItems = [
    {
      icon: <Building2 className="w-6 h-6 text-[#D4AF37]" />,
      title: t.trust.madeInMalaysia,
      desc: t.trust.madeInMalaysiaDesc,
      badge: 'KL HQ & SHOWROOM',
    },
    {
      icon: <Star className="w-6 h-6 text-[#FFD700] fill-[#FFD700]" />,
      title: t.trust.rating5,
      desc: t.trust.rating5Desc,
      badge: '5.0 GOOGLE REVIEWS',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#00E676]" />,
      title: t.trust.oekoCert,
      desc: t.trust.oekoCertDesc,
      badge: 'ZERO TOXIC AZO DYES',
    },
    {
      icon: <Plane className="w-6 h-6 text-[#38BDF8]" />,
      title: t.trust.worldwideShipping,
      desc: t.trust.worldwideShippingDesc,
      badge: 'EXPRESS CARGO 48H',
    },
    {
      icon: <Coins className="w-6 h-6 text-[#EAB308]" />,
      title: t.trust.factoryDirect,
      desc: t.trust.factoryDirectDesc,
      badge: 'DIRECT MILL RATES',
    },
    {
      icon: <Scissors className="w-6 h-6 text-[#EC4899]" />,
      title: 'Low MOQ & Swatch Kits',
      desc: 'Order physical 10x15cm sample swatches or small trial bolts starting at only 5 meters for emerging fashion designers.',
      badge: 'SAMPLE KITS RM20',
    },
  ];

  return (
    <section className="py-16 bg-[#0A0A0A] border-y border-[#262626] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3 font-luxury">
            <Award className="w-3.5 h-3.5" />
            <span>Why Leading Designers & Factories Trust UTM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-luxury font-bold text-white mb-3">
            Setting the Benchmark for Asian Textile Manufacturing
          </h2>
          <p className="text-sm text-[#9CA3AF]">
            Over 18 years of continuous precision weaving, bespoke digital printing, and direct B2B fulfillment from Kuala Lumpur, Malaysia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#D4AF37]/60 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1C1C1C] border border-[#262626] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#1C1C1C] text-[#D4AF37] border border-[#262626]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#262626] flex items-center gap-1.5 text-xs text-[#D4AF37] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

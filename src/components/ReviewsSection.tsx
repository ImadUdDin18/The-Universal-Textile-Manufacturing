import React from 'react';
import { REVIEWS } from '../data/products';
import {
  Star,
  Quote,
  CheckCircle2,
  MapPin,
  Building2,
  Sparkles,
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4 font-luxury">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
            <span>5.0 Star Verified Client Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-luxury font-bold text-white mb-4">
            Trusted by Royal Couturiers & Global Manufacturers
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            Read authentic feedback from bridal designers in Kuala Lumpur, Gulf apparel houses, and international procurement directors.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#262626] hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                    <span className="font-bold text-white text-xs ml-1">5.0</span>
                  </div>
                  <span className="text-xs text-[#71717A]">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Purchased Fabric */}
              <div className="pt-4 border-t border-[#262626] flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" title="Verified Wholesale Buyer" />
                  </div>
                  <div className="text-xs text-[#D4AF37] font-medium">{rev.company}</div>
                  <div className="text-[11px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#9CA3AF]" />
                    <span>{rev.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#71717A] block uppercase">Procured Fabric:</span>
                  <span className="text-xs font-semibold text-white bg-[#1C1C1C] px-2.5 py-1 rounded-md border border-[#262626]">
                    {rev.fabricPurchased}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

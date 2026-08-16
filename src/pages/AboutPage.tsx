import React from 'react';
import { useShop } from '../context/ShopContext';
import { COMPANY_INFO } from '../data/products';
import { FactoryShowroom } from '../components/FactoryShowroom';
import { CertificationsSection } from '../components/CertificationsSection';
import {
  Building2,
  Sparkles,
  ShieldCheck,
  Award,
  Globe2,
  CheckCircle2,
  Users,
  Layers,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView, setIsRfqModalOpen } = useShop();

  return (
    <div className="py-10 sm:py-16 bg-[#0A0A0A] min-h-screen text-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider font-luxury">
            <Building2 className="w-3.5 h-3.5" />
            <span>ESTABLISHED 2008 • MENARA CITY ONE, KUALA LUMPUR</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-luxury font-bold text-white tracking-wide">
            Our Mill Heritage & Craftsmanship
          </h1>

          <p className="text-xs sm:text-base text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            The Universal Textile Manufacturing Sdn Bhd is Southeast Asia&apos;s premier textile producer, supplying world-class fabrics from Menara City One, Kuala Lumpur to over 38 countries worldwide.
          </p>
        </div>

        {/* Heritage Story Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#D1D1D8] leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-luxury font-bold text-white">
              Two Decades of Pure Textile Excellence
            </h2>
            <p>
              Founded in 2008 in Kuala Lumpur, The Universal Textile Manufacturing Sdn Bhd was established with a singular vision: to bridge the gap between traditional heritage weaving and ultra-modern precision textile engineering.
            </p>
            <p>
              From our landmark headquarters and showroom at <strong className="text-white">Menara City One, Jalan Munshi Abdullah, Kuala Lumpur</strong>, we operate cutting-edge high-speed electronic jacquard looms, continuous reactive digital print lines, and a massive 500,000+ meter ready-stock inventory hub.
            </p>
            <p>
              Whether weaving royal silk brocades for Malaysian royalty, delivering anti-microbial uniform twills for national aviation carriers, or exporting organic cottons to Parisian ateliers, we uphold zero compromise on quality.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#2B2B2B]">
                <div className="text-xl font-bold text-[#D4AF37]">500k+ m</div>
                <div className="text-[11px] text-[#9CA3AF]">Ready Stock in KL</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#2B2B2B]">
                <div className="text-xl font-bold text-[#00E676]">38 Nations</div>
                <div className="text-[11px] text-[#9CA3AF]">Global Export Reach</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#2B2B2B]">
                <div className="text-xl font-bold text-[#38BDF8]">5.0 Stars</div>
                <div className="text-[11px] text-[#9CA3AF]">Google Verified Rating</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
                alt="Universal Textile Showroom KL"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Factory Infrastructure Highlights */}
        <div className="p-8 rounded-3xl bg-[#141414] border border-[#262626] space-y-6 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-2xl font-luxury font-bold text-white">
              Advanced Machinery & Precision Looms
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              State-of-the-art European & Japanese technology ensuring microscopic weave consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2B2B2B] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">Swiss Sulzer Looms</h4>
              <p className="text-[#9CA3AF]">
                High-speed projectile and air-jet weaving for tight, flawless thread densities.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2B2B2B] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#00E676]/15 flex items-center justify-center text-[#00E676]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">Kyocera 2400 DPI</h4>
              <p className="text-[#9CA3AF]">
                Japanese industrial continuous jetting printheads for photorealistic resolution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2B2B2B] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/15 flex items-center justify-center text-[#38BDF8]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">Italian Santex Finishing</h4>
              <p className="text-[#9CA3AF]">
                Tensionless relaxation dryers and decatizing autoclaves for zero shrinkage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2B2B2B] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFD700]/15 flex items-center justify-center text-[#FFD700]">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">Automated QC Tables</h4>
              <p className="text-[#9CA3AF]">
                4-Point System optical sensor inspection on 100% of finished fabric bolts.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <CertificationsSection />

        {/* Factory Showroom Component */}
        <FactoryShowroom />

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1A1A1A] via-[#141414] to-[#1A1A1A] border border-[#D4AF37]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-luxury font-bold text-white">
              Schedule an In-Person VIP Visit at Menara City One, Kuala Lumpur
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              Browse over 2,000 physical swatch hangers and consult directly with our Textile Engineering team.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => {
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-md"
            >
              Book Showroom Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

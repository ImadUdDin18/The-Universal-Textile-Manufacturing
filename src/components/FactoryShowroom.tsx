import React from 'react';
import { COMPANY_INFO } from '../data/products';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';

export const FactoryShowroom: React.FC = () => {
  const handleBookVisit = () => {
    const text = encodeURIComponent(
      `Hello The Universal Textile! I would like to schedule a showroom viewing appointment at Menara City One, Jalan Munshi Abdullah, Kuala Lumpur to inspect fabric swatches and discuss bulk supply.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4 font-luxury">
            <Building2 className="w-3.5 h-3.5" />
            <span>Kuala Lumpur Headquarters & Warehouse</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-luxury font-bold text-white mb-4">
            Visit Our Menara City One Showroom
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            Experience our comprehensive bolt archives in person. Over 500,000 meters of raw silk, Egyptian Giza cotton, French linen, and technical textiles available for immediate cutting and dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location Info & Machinery Tour (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Showroom Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#262626] space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase font-luxury">
                  Official Registered Facility
                </span>
                <h3 className="text-xl sm:text-2xl font-luxury font-bold text-white mt-1">
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-xs text-[#71717A] mt-0.5">
                  Registration No: {COMPANY_INFO.registrationNo} • Est. {COMPANY_INFO.establishedYear}
                </p>
              </div>

              {/* Coordinates List */}
              <div className="space-y-4 text-xs sm:text-sm text-[#E5E7EB]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1C1C1C] border border-[#262626] flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Showroom & Warehouse Address</div>
                    <div className="text-[#9CA3AF] text-xs mt-0.5">
                      {COMPANY_INFO.location.fullAddress}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1C1C1C] border border-[#262626] flex items-center justify-center text-[#25D366] flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Direct Line & WhatsApp</div>
                    <div className="text-[#9CA3AF] text-xs mt-0.5">
                      {COMPANY_INFO.phone} (Senior Mill Specialists On Duty)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1C1C1C] border border-[#262626] flex items-center justify-center text-[#38BDF8] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Official Mill Inquiries</div>
                    <div className="text-[#9CA3AF] text-xs mt-0.5">
                      {COMPANY_INFO.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1C1C1C] border border-[#262626] flex items-center justify-center text-[#EAB308] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Operating Hours</div>
                    <div className="text-[#9CA3AF] text-xs mt-0.5">
                      {COMPANY_INFO.hours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleBookVisit}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-transform"
                >
                  <Calendar className="w-4 h-4 fill-black" />
                  <span>Book VIP Viewing Session</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20consult%20The%20Universal%20Textile%20SDN%20BHD`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1E3A2B] hover:bg-[#254A37] text-[#25D366] border border-[#25D366]/40 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Mill Infrastructure Capabilities */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] text-xs">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <span>Sulzer Projectile Looms</span>
                </div>
                <p className="text-[#9CA3AF]">
                  Swiss high-speed weaving looms ensuring ultra-dense yarn compaction and zero weave skew.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] text-xs">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>2400 DPI Kyocera Print</span>
                </div>
                <p className="text-[#9CA3AF]">
                  Japanese continuous jetting reactive digital print line for custom batik, florals, and couture patterns.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps & Showroom Visuals (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Interactive Map Embed */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#262626] shadow-2xl bg-[#141414]">
              <iframe
                title="The Universal Textile Manufacturing Sdn Bhd Location"
                src="https://maps.google.com/maps?q=Menara%20City%20One,%20Jalan%20Munshi%20Abdullah,%20Kuala%20Lumpur,%20Malaysia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-[#262626] text-xs pointer-events-none">
                <div className="font-bold text-[#D4AF37] font-luxury">Menara City One, Plaza</div>
                <div className="text-[#9CA3AF] text-[11px]">Jalan Munshi Abdullah, 50100 KL</div>
              </div>
            </div>

            {/* Warehouse Photos Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#262626] group">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                  alt="Textile Rolls Warehouse"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white">KL Stock Bolt Archive</span>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#262626] group">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
                  alt="Inspection & Quality Control Table"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white">Fabric Inspection & Light Tables</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

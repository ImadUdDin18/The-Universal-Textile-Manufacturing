import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COMPANY_INFO } from '../data/products';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Calendar,
  Send,
  CheckCircle2,
  Building2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useShop();

  // Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [fabricInterests, setFabricInterests] = useState<string[]>(['Mulberry Silk', 'Corporate Uniforms']);
  const [isBooked, setIsBooked] = useState(false);

  // Message Form State
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');

  const toggleInterest = (interest: string) => {
    setFabricInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) {
      addToast('warning', 'Incomplete Form', 'Please fill in your name, phone number, and preferred date.');
      return;
    }
    setIsBooked(true);
    addToast(
      'success',
      'VIP Appointment Confirmed',
      `Your showroom session on ${bookingDate} at ${bookingTime} is confirmed. A textile consultant will welcome you at Menara City One.`
    );
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgName || !msgEmail || !msgBody) {
      addToast('warning', 'Incomplete Message', 'Please provide your name, email, and inquiry details.');
      return;
    }
    addToast(
      'success',
      'Inquiry Dispatched',
      'Thank you! Your message has been sent to our Kuala Lumpur sales desk. We will respond within 2 hours.'
    );
    setMsgName('');
    setMsgEmail('');
    setMsgSubject('');
    setMsgBody('');
  };

  return (
    <div className="py-10 sm:py-16 bg-[#0A0A0A] min-h-screen text-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider font-luxury">
            <Building2 className="w-3.5 h-3.5" />
            <span>GLOBAL HEADQUARTERS & SHOWROOM • KUALA LUMPUR</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-luxury font-bold text-white tracking-wide">
            Contact & VIP Visit Booking
          </h1>

          <p className="text-xs sm:text-base text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            Visit our state-of-the-art fabric gallery at Menara City One, Kuala Lumpur, or connect with our international sales and tender procurement specialists.
          </p>
        </div>

        {/* Quick Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* 1. Location */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Menara City One, KL</h3>
              <p className="text-[#9CA3AF] mt-1 leading-relaxed">
                Plaza, Jalan Munshi Abdullah, 50100 Kuala Lumpur, Malaysia
              </p>
            </div>
          </div>

          {/* 2. Direct Line & WhatsApp */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Direct WhatsApp / Phone</h3>
              <p className="text-white font-semibold mt-1">{COMPANY_INFO.phone}</p>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Universal%20Textile%20SDN%20BHD`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline text-[11px] font-semibold inline-block mt-0.5"
              >
                Open WhatsApp Chat &rarr;
              </a>
            </div>
          </div>

          {/* 3. Corporate Email */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 flex items-center justify-center text-[#38BDF8]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Corporate Inquiries</h3>
              <p className="text-white font-semibold mt-1 truncate">{COMPANY_INFO.email}</p>
              <p className="text-[11px] text-[#9CA3AF]">Response time: &lt; 2 Hours</p>
            </div>
          </div>

          {/* 4. Business Hours */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#AA820A]/15 flex items-center justify-center text-[#D4AF37]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Operating Hours</h3>
              <p className="text-[#D1D1D8] mt-1">Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-[11px] text-[#71717A]">Timezone: MYT (UTC+8)</p>
            </div>
          </div>
        </div>

        {/* Two Forms Grid: 1. VIP Showroom Appointment, 2. Direct Inquiry Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Book Showroom VIP Appointment */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#141414] border border-[#D4AF37]/30 shadow-2xl space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider font-luxury">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Mill Consultation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-luxury font-bold text-white">
                Book a VIP Showroom Visit at Menara City One
              </h2>
              <p className="text-xs text-[#9CA3AF]">
                Schedule a dedicated session with our Senior Textile Specialist to inspect 2,000+ fabric bolts and examine custom lab dips.
              </p>
            </div>

            {isBooked ? (
              <div className="p-6 rounded-2xl bg-[#0D2818] border border-[#25D366]/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto text-[#25D366]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Showroom Appointment Confirmed!</h3>
                <p className="text-xs text-[#C5E1D4]">
                  We look forward to hosting you at Menara City One on <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong>.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi%2C%20I%20have%20booked%20a%20showroom%20appointment%20for%20${bookingName}%20on%20${bookingDate}%20at%20${bookingTime}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-black font-bold text-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Booking to WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9CA3AF] font-bold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="e.g. Dato' Faridah / Chloe Dupont"
                      className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-white placeholder-[#71717A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#9CA3AF] font-bold mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="+60 16-XXX XXXX"
                      className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-white placeholder-[#71717A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9CA3AF] font-bold mb-1">Corporate Email</label>
                    <input
                      type="email"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      placeholder="corporate@brand.com"
                      className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-white placeholder-[#71717A] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#9CA3AF] font-bold mb-1">Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9CA3AF] font-bold mb-1">Time Slot *</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:30 PM">05:30 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Fabric Interest Chips */}
                <div>
                  <label className="block text-[#9CA3AF] font-bold mb-2">
                    Fabrics You Wish to Inspect:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Mulberry Silk',
                      'Egyptian Cotton',
                      'French Linen',
                      'Corporate Uniforms',
                      'Custom Digital Print',
                      'Songket Jacquard',
                      'Super 150s Wool',
                      'Technical Waterproof',
                    ].map((interest) => {
                      const active = fabricInterests.includes(interest);
                      return (
                        <button
                          type="button"
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            active
                              ? 'bg-[#D4AF37] text-black font-bold'
                              : 'bg-[#1A1A1A] text-[#9CA3AF] hover:text-white border border-[#2B2B2B]'
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Confirm Showroom VIP Appointment
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Inquiry Form & Quick Message */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#141414] border border-[#262626] shadow-2xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-luxury font-bold text-white">
                Send Direct Inquiry
              </h2>
              <p className="text-xs text-[#9CA3AF]">
                Have a technical question about yarn counts, MOQ, or international shipping?
              </p>
            </div>

            <form onSubmit={handleMessageSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#9CA3AF] font-bold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={msgName}
                  onChange={(e) => setMsgName(e.target.value)}
                  placeholder="John Doe / Aminah"
                  className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-white placeholder-[#71717A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9CA3AF] font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={msgEmail}
                  onChange={(e) => setMsgEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-white placeholder-[#71717A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9CA3AF] font-bold mb-1">Subject</label>
                <input
                  type="text"
                  value={msgSubject}
                  onChange={(e) => setMsgSubject(e.target.value)}
                  placeholder="e.g. Export to UAE / Custom Dye Question"
                  className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-white placeholder-[#71717A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9CA3AF] font-bold mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={msgBody}
                  onChange={(e) => setMsgBody(e.target.value)}
                  placeholder="Describe your requirements, volume, or specifications..."
                  className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl p-3 text-white placeholder-[#71717A] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#333333] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Send Message to Mill Team</span>
              </button>
            </form>
          </div>
        </div>

        {/* Interactive Google Map & Transit Guidance */}
        <div className="p-8 rounded-3xl bg-[#141414] border border-[#262626] space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-luxury font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <span>Menara City One, Kuala Lumpur Location & Access</span>
              </h3>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                Conveniently situated in central Kuala Lumpur with direct transit and parking.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Menara+City+One+Kuala+Lumpur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#282828] border border-[#333333] text-xs font-semibold text-[#D4AF37] transition-colors"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-[#2B2B2B] h-80">
              <iframe
                title="Universal Textile Menara City One Map"
                src={COMPANY_INFO.location.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="lg:col-span-4 space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] space-y-2">
                <h4 className="font-bold text-white text-sm">🚆 LRT & MRT Access</h4>
                <p className="text-[#9CA3AF]">
                  • <strong>Masjid Jamek Station (LRT):</strong> 5-minute walk.<br />
                  • <strong>Dang Wangi Station (LRT Kelana Jaya Line):</strong> 7-minute walk.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] space-y-2">
                <h4 className="font-bold text-white text-sm">🚗 Driving & Parking</h4>
                <p className="text-[#9CA3AF]">
                  Basement visitor parking available at Menara City One with dedicated textile loading bay for bulk bolt pickups.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] space-y-2">
                <h4 className="font-bold text-white text-sm">✈️ From KLIA Airport</h4>
                <p className="text-[#9CA3AF]">
                  45 minutes via KLIA Ekspres + LRT or direct taxi via MEX Highway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

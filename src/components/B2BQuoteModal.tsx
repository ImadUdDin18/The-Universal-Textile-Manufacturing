import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COMPANY_INFO } from '../data/products';
import {
  X,
  Sparkles,
  Building2,
  Phone,
  Mail,
  Globe2,
  Calendar,
  Layers,
  FileText,
  MessageCircle,
  CheckCircle2,
  Send,
} from 'lucide-react';

export const B2BQuoteModal: React.FC = () => {
  const {
    isRfqModalOpen,
    setIsRfqModalOpen,
    rfqTargetProduct,
    setRfqTargetProduct,
    products,
    submitQuoteRequest,
    t,
  } = useShop();

  if (!isRfqModalOpen) return null;

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Malaysia');
  const [selectedFabricId, setSelectedFabricId] = useState(
    rfqTargetProduct?.id || products[0]?.id || ''
  );
  const [quantityMeters, setQuantityMeters] = useState(1000);
  const [customPantone, setCustomPantone] = useState('');
  const [useCase, setUseCase] = useState('Corporate Uniforms / Couture Line');
  const [targetDate, setTargetDate] = useState('2026-10-15');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  const activeFabric = products.find((p) => p.id === selectedFabricId) || products[0];

  const handleClose = () => {
    setIsRfqModalOpen(false);
    setRfqTargetProduct(null);
    setSubmittedQuoteId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const quote = await submitQuoteRequest({
        companyName,
        contactPerson,
        email,
        phone,
        country,
        fabricId: activeFabric.id,
        fabricName: activeFabric.name,
        quantityMeters,
        targetGsm: activeFabric.gsm,
        customPantone,
        useCase,
        targetDate,
        notes,
      });
      setSubmittedQuoteId(quote.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `*B2B WHOLESALE RFQ - THE UNIVERSAL TEXTILE SDN BHD*\n\n` +
      `*RFQ ID:* ${submittedQuoteId || 'NEW-INQUIRY'}\n` +
      `*Company:* ${companyName}\n` +
      `*Contact:* ${contactPerson} (${email})\n` +
      `*Phone:* ${phone}\n` +
      `*Destination:* ${country}\n` +
      `*Fabric:* ${activeFabric.name} (${activeFabric.gsm} GSM)\n` +
      `*Quantity:* ${quantityMeters.toLocaleString()} Meters\n` +
      `*Pantone / Color:* ${customPantone || 'Mill Standard'}\n` +
      `*Application:* ${useCase}\n` +
      `*Target Delivery:* ${targetDate}\n` +
      `*Special Notes:* ${notes || 'None'}\n\n` +
      `Please provide container / air freight quotation from Menara City One, Kuala Lumpur.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#111111] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#141414]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-luxury font-bold text-white tracking-wide">
                B2B Bulk Wholesale & Milling RFQ
              </h3>
              <p className="text-[11px] text-[#9CA3AF]">Direct Factory Quotation • Menara City One, KL</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#1C1C1C] text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {submittedQuoteId ? (
            /* Success State */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#00E676]/15 border border-[#00E676]/30 text-[#00E676] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-luxury font-bold text-white mb-2">
                  Quotation Transmitted Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
                  {t.b2b.successMsg}
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Quotation Ref:</span>
                  <span className="font-mono font-bold text-[#D4AF37]">{submittedQuoteId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Fabric Requested:</span>
                  <span className="font-semibold text-white">{activeFabric.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Volume:</span>
                  <span className="font-semibold text-white">{quantityMeters.toLocaleString()} Meters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Destination:</span>
                  <span className="font-semibold text-white">{country}</span>
                </div>
              </div>

              {/* Instant WhatsApp Connect */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Direct to Mill Director WhatsApp</span>
                </button>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1C1C1C] text-white font-semibold text-xs hover:bg-[#262626] transition-colors cursor-pointer"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] text-xs text-[#9CA3AF] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-white">Mill-Direct Container & Air Freight Quotes:</span>
                  <p className="text-[11px] text-[#9CA3AF]">
                    Supplying 50m to 50,000m bolts with custom Pantone lab dips and complete CO export documentation.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    {t.b2b.companyName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Tailors LLC / AirAsia Uniform Dept"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    {t.b2b.contactName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. Imad / Datin Faridah"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    {t.b2b.email} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    {t.b2b.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+60 16-249 2162 / +971 50..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    {t.b2b.country} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Malaysia, UAE, France, Pakistan, USA"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    {t.b2b.fabricSelect} *
                  </label>
                  <select
                    value={selectedFabricId}
                    onChange={(e) => setSelectedFabricId(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#141414]">
                        {p.name} ({p.gsm} GSM) - RM {p.pricePerMeterMYR}/m
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    {t.b2b.metersRequired} *
                  </label>
                  <input
                    type="number"
                    min={50}
                    step={50}
                    required
                    value={quantityMeters}
                    onChange={(e) => setQuantityMeters(Number(e.target.value))}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    {t.b2b.customColorOrPantone}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pantone 19-4024 TCX / Custom Sample Swatch"
                    value={customPantone}
                    onChange={(e) => setCustomPantone(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    {t.b2b.intendedUse}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hotel Bedding / Airline Staff Uniforms / Bridal"
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    {t.b2b.timeline} *
                  </label>
                  <input
                    type="date"
                    required
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  {t.b2b.notes}
                </label>
                <textarea
                  rows={3}
                  placeholder="Special finishes: Flame Retardant BS5852, Teflon stain repellent, custom roll labels, FOB Port Klang / CIF destination..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1E3A2B] hover:bg-[#254A37] text-[#25D366] border border-[#25D366]/40 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+60 16-249 2162)</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 fill-black" />
                  <span>{isSubmitting ? 'Transmitting...' : t.b2b.submitBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

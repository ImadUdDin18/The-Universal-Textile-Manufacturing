import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { COMPANY_INFO } from '../data/products';
import {
  X,
  CreditCard,
  ShieldCheck,
  Building2,
  Lock,
  Truck,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Sparkles,
  QrCode,
  Landmark,
} from 'lucide-react';

const MALAYSIA_STATES = [
  'Kuala Lumpur (Wilayah Persekutuan)',
  'Selangor',
  'Penang (Pulau Pinang)',
  'Johor',
  'Perak',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Kedah',
  'Kelantan',
  'Terengganu',
  'Sabah',
  'Sarawak',
  'Putrajaya',
  'Labuan',
  'Perlis',
];

const POPULAR_COUNTRIES = [
  'Malaysia',
  'Singapore',
  'United Arab Emirates',
  'Saudi Arabia',
  'United Kingdom',
  'United States',
  'Pakistan',
  'France',
  'Australia',
  'Indonesia',
  'Germany',
  'Qatar',
];

const MALAYSIAN_BANKS = [
  { name: 'Maybank (Maybank2u)', code: 'MBB', logo: '🟡' },
  { name: 'CIMB Bank (CIMB Clicks)', code: 'CIMB', logo: '🔴' },
  { name: 'Public Bank', code: 'PBB', logo: '🔴' },
  { name: 'RHB Bank (RHB Now)', code: 'RHB', logo: '🔵' },
  { name: 'Hong Leong Bank (Connect)', code: 'HLB', logo: '🔵' },
  { name: 'AmBank (AmOnline)', code: 'AMB', logo: '🔴' },
  { name: 'Bank Islam', code: 'BIMB', logo: '🟢' },
];

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotalMYR,
    currency,
    formatPrice,
    processOrder,
  } = useShop();

  if (!isCheckoutOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');

  // Customer Form
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Malaysia');
  const [state, setState] = useState('Kuala Lumpur (Wilayah Persekutuan)');
  const [city, setCity] = useState('Kuala Lumpur');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('50100');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<Order['shippingMethod']>(
    'Malaysia Domestic GDEX/Lalamove'
  );

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('Stripe');
  const [selectedBank, setSelectedBank] = useState('Maybank (Maybank2u)');

  // Credit Card Form
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Calculate Shipping fee
  let shippingCostMYR = 0;
  if (shippingMethod === 'Express Air Freight') {
    shippingCostMYR = 150;
  } else if (shippingMethod === 'Standard Sea Freight') {
    shippingCostMYR = 80;
  } else if (shippingMethod === 'Malaysia Domestic GDEX/Lalamove') {
    shippingCostMYR = cartTotalMYR > 500 ? 0 : 25;
  } else if (shippingMethod === 'Showroom Collection (Menara City One)') {
    shippingCostMYR = 0;
  }

  const finalTotalMYR = cartTotalMYR + shippingCostMYR;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
    setCompletedOrder(null);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompletePayment = async () => {
    setIsProcessing(true);
    try {
      const order = await processOrder({
        customerName,
        companyName,
        email,
        phone,
        country,
        state,
        city,
        address,
        postalCode,
        items: cart,
        totalAmountMYR: finalTotalMYR,
        currency,
        paymentMethod,
        paymentStatus: paymentMethod === 'Direct Bank Wire (T/T)' ? 'Pending Wire Approval' : 'Paid',
        shippingMethod,
      });
      setCompletedOrder(order);
      setStep('success');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#111111] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#0A0A0A]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-luxury font-bold text-white tracking-wide">
                Universal Textile • Secure Checkout
              </h3>
              <p className="text-[11px] text-[#9CA3AF]">256-Bit SSL Encrypted Payment Gateway</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#1C1C1C] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {step === 'success' && completedOrder ? (
            /* Order Completed Celebration Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#00E676]/15 border border-[#00E676]/30 text-[#00E676] flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] font-luxury">
                  ORDER CONFIRMED & DISPATCH PREPARED
                </span>
                <h2 className="text-2xl sm:text-3xl font-luxury font-bold text-white mt-1 mb-2">
                  Thank You, {completedOrder.customerName}!
                </h2>
                <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-lg mx-auto">
                  Your fabric order has been logged at our Menara City One, Kuala Lumpur fulfillment center. A formal tax invoice and dispatch receipt has been emailed to <strong className="text-white">{completedOrder.email}</strong>.
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] max-w-lg mx-auto text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-[#262626] pb-2">
                  <span className="text-[#9CA3AF]">Order Reference:</span>
                  <span className="font-mono font-bold text-[#D4AF37]">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-[#262626] pb-2">
                  <span className="text-[#9CA3AF]">Tracking Number:</span>
                  <span className="font-mono font-semibold text-[#00E676]">{completedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b border-[#262626] pb-2">
                  <span className="text-[#9CA3AF]">Shipping Route:</span>
                  <span className="font-medium text-white">{completedOrder.shippingMethod}</span>
                </div>
                <div className="flex justify-between border-b border-[#262626] pb-2">
                  <span className="text-[#9CA3AF]">Payment Method:</span>
                  <span className="font-medium text-white">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-white">Total Paid:</span>
                  <span className="text-gold-gradient font-luxury font-extrabold">
                    {formatPrice(completedOrder.totalAmountMYR)}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {step === 'details' ? (
                  <form onSubmit={handleDetailsSubmit} className="space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-luxury flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      <span>1. Customer & Delivery Address</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[#9CA3AF] font-medium mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Datin Faridah / James Wilson"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9CA3AF] font-medium mb-1">Company / Brand Name</label>
                        <input
                          type="text"
                          placeholder="Optional for B2B"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9CA3AF] font-medium mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="client@couture.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9CA3AF] font-medium mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+60 16-249 2162"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9CA3AF] font-medium mb-1">Country *</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                        >
                          {POPULAR_COUNTRIES.map((c) => (
                            <option key={c} value={c} className="bg-[#141414]">
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      {country === 'Malaysia' ? (
                        <div>
                          <label className="block text-[#9CA3AF] font-medium mb-1">State / Wilayah *</label>
                          <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                          >
                            {MALAYSIA_STATES.map((s) => (
                              <option key={s} value={s} className="bg-[#141414]">
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-[#9CA3AF] font-medium mb-1">Province / State *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dubai / London / Île-de-France"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                          />
                        </div>
                      )}

                      <div className="sm:col-span-2">
                        <label className="block text-[#9CA3AF] font-medium mb-1">Street Address *</label>
                        <input
                          type="text"
                          required
                          placeholder="Building, Street, Suite / Atelier No."
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9CA3AF] font-medium mb-1">City *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kuala Lumpur / Petaling Jaya"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[#9CA3AF] font-medium mb-1">Postal Code *</label>
                        <input
                          type="text"
                          required
                          placeholder="50100"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    {/* Shipping Method Selector */}
                    <div className="pt-3 border-t border-[#262626]">
                      <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-luxury flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#D4AF37]" />
                        <span>Shipping & Fulfillment Channel</span>
                      </label>

                      <div className="space-y-2 text-xs">
                        <label
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            shippingMethod === 'Malaysia Domestic GDEX/Lalamove'
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                              : 'border-[#262626] bg-[#141414] text-[#9CA3AF]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === 'Malaysia Domestic GDEX/Lalamove'}
                              onChange={() => setShippingMethod('Malaysia Domestic GDEX/Lalamove')}
                              className="accent-[#D4AF37]"
                            />
                            <div>
                              <div className="font-semibold text-white">Malaysia Domestic Express (GDEX / Lalamove)</div>
                              <div className="text-[11px] text-[#9CA3AF]">1-2 business days across Peninsular & East Malaysia</div>
                            </div>
                          </div>
                          <span className="font-bold text-[#00E676]">
                            {cartTotalMYR > 500 ? 'FREE (Orders >RM500)' : 'RM 25.00'}
                          </span>
                        </label>

                        <label
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            shippingMethod === 'Showroom Collection (Menara City One)'
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                              : 'border-[#262626] bg-[#141414] text-[#9CA3AF]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === 'Showroom Collection (Menara City One)'}
                              onChange={() => setShippingMethod('Showroom Collection (Menara City One)')}
                              className="accent-[#D4AF37]"
                            />
                            <div>
                              <div className="font-semibold text-white">Self Pickup at Menara City One Showroom (KL)</div>
                              <div className="text-[11px] text-[#9CA3AF]">Same day collection during business hours</div>
                            </div>
                          </div>
                          <span className="font-bold text-[#00E676]">FREE</span>
                        </label>

                        <label
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            shippingMethod === 'Express Air Freight'
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                              : 'border-[#262626] bg-[#141414] text-[#9CA3AF]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === 'Express Air Freight'}
                              onChange={() => setShippingMethod('Express Air Freight')}
                              className="accent-[#D4AF37]"
                            />
                            <div>
                              <div className="font-semibold text-white">International Express Air Cargo (DHL / FedEx)</div>
                              <div className="text-[11px] text-[#9CA3AF]">3-5 days delivery worldwide with customs paperwork</div>
                            </div>
                          </div>
                          <span className="font-bold text-[#D4AF37]">RM 150.00</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-transform cursor-pointer"
                    >
                      Continue to Payment Method
                    </button>
                  </form>
                ) : (
                  /* Step 2: Payment Gateways */
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-luxury flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                        <span>2. Select Payment Gateway</span>
                      </h4>
                      <button
                        onClick={() => setStep('details')}
                        className="text-xs text-[#D4AF37] hover:underline"
                      >
                        Edit Details
                      </button>
                    </div>

                    {/* Payment Gateways Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <button
                        onClick={() => setPaymentMethod('Stripe')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          paymentMethod === 'Stripe'
                            ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white font-bold'
                            : 'border-[#262626] bg-[#141414] text-[#9CA3AF]'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                        <span>Stripe / Card</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('FPX (Malaysia Bank Transfer)')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          paymentMethod === 'FPX (Malaysia Bank Transfer)'
                            ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white font-bold'
                            : 'border-[#262626] bg-[#141414] text-[#9CA3AF]'
                        }`}
                      >
                        <Landmark className="w-5 h-5 text-[#00E676]" />
                        <span>FPX / DuitNow</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('PayPal')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          paymentMethod === 'PayPal'
                            ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white font-bold'
                            : 'border-[#262626] bg-[#141414] text-[#9CA3AF]'
                        }`}
                      >
                        <span className="font-serif italic font-bold text-[#38BDF8] text-base">P</span>
                        <span>PayPal Express</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('Direct Bank Wire (T/T)')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          paymentMethod === 'Direct Bank Wire (T/T)'
                            ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white font-bold'
                            : 'border-[#262626] bg-[#141414] text-[#9CA3AF]'
                        }`}
                      >
                        <Building2 className="w-5 h-5 text-[#EAB308]" />
                        <span>Direct Wire (T/T)</span>
                      </button>
                    </div>

                    {/* Payment Form Details */}
                    {paymentMethod === 'Stripe' && (
                      <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] space-y-3 text-xs">
                        <div className="flex items-center justify-between text-[#9CA3AF]">
                          <span className="font-semibold text-white">Credit / Debit Card (Stripe Secured)</span>
                          <span>Visa • Mastercard • Amex</span>
                        </div>

                        <div>
                          <label className="block text-[#9CA3AF] mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl px-3 py-2 text-white font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[#9CA3AF] mb-1">Expiration</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl px-3 py-2 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[#9CA3AF] mb-1">CVC / CVV</label>
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl px-3 py-2 text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'FPX (Malaysia Bank Transfer)' && (
                      <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">Select Malaysian Bank (FPX / DuitNow)</span>
                          <span className="text-[11px] text-[#00E676] font-bold">Instant Verification</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {MALAYSIAN_BANKS.map((b) => (
                            <button
                              key={b.code}
                              onClick={() => setSelectedBank(b.name)}
                              className={`p-2.5 rounded-xl border text-left flex items-center justify-between ${
                                selectedBank === b.name
                                  ? 'border-[#00E676] bg-[#00E676]/10 text-white font-bold'
                                  : 'border-[#262626] bg-[#0A0A0A] text-[#9CA3AF]'
                              }`}
                            >
                              <span>{b.logo} {b.name}</span>
                              {selectedBank === b.name && <CheckCircle2 className="w-4 h-4 text-[#00E676]" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'PayPal' && (
                      <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] text-center space-y-2 text-xs">
                        <div className="text-white font-semibold">PayPal Express Checkout</div>
                        <p className="text-[#9CA3AF]">
                          You will be redirected to PayPal's encrypted authorization portal to complete your transaction in {currency}.
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'Direct Bank Wire (T/T)' && (
                      <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] space-y-2.5 text-xs text-[#9CA3AF]">
                        <div className="font-bold text-white text-sm">Maybank Malaysia Corporate Account</div>
                        <div className="space-y-1">
                          <div><strong>Beneficiary:</strong> THE UNIVERSAL TEXTILE MANUFACTURING SDN BHD</div>
                          <div><strong>Account No:</strong> 5140 1209 8839 (Maybank Islamic)</div>
                          <div><strong>SWIFT Code:</strong> MBBEMYKL</div>
                          <div><strong>Bank Address:</strong> Menara Maybank, 100 Jalan Tun Perak, 50050 Kuala Lumpur</div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleCompletePayment}
                      disabled={isProcessing}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-sm uppercase tracking-wider shadow-xl shadow-[#D4AF37]/25 hover:scale-102 transition-transform flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4 fill-black" />
                      <span>
                        {isProcessing
                          ? 'Authorizing Secure Transaction...'
                          : `Authorize & Pay ${formatPrice(finalTotalMYR)}`}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Order Items Summary (5 Cols) */}
              <div className="lg:col-span-5 bg-[#141414] border border-[#262626] rounded-2xl p-5 flex flex-col justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider font-luxury mb-4 border-b border-[#262626] pb-2">
                    Order Summary ({cart.length} Fabrics)
                  </h4>

                  <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-black border border-[#262626]"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-white line-clamp-1">{item.product.name}</div>
                          <div className="text-[11px] text-[#9CA3AF]">
                            {item.isSampleSwatch ? 'Sample Kit' : `${item.meters}m`} • {item.selectedColor.name}
                          </div>
                        </div>
                        <div className="text-right font-mono font-bold text-white">
                          {formatPrice(item.subtotalMYR)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="mt-4 pt-3 border-t border-[#262626] space-y-1.5 text-[#9CA3AF]">
                    <div className="flex justify-between">
                      <span>Fabric Subtotal</span>
                      <span className="text-white font-mono">{formatPrice(cartTotalMYR)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping ({shippingMethod.split(' ')[0]})</span>
                      <span className="text-white font-mono">
                        {shippingCostMYR === 0 ? 'FREE' : formatPrice(shippingCostMYR)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Malaysian SST & Export Duty</span>
                      <span className="text-[#00E676]">0% Exempt</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#262626] mt-4">
                  <div className="flex justify-between items-baseline text-sm font-bold text-white mb-2">
                    <span>Grand Total:</span>
                    <span className="text-xl font-luxury font-extrabold text-gold-gradient">
                      {formatPrice(finalTotalMYR)}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#71717A] text-center">
                    Authorized directly by The Universal Textile Manufacturing Sdn Bhd (KL)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

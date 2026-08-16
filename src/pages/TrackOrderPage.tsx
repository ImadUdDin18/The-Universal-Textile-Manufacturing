import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COMPANY_INFO } from '../data/products';
import {
  Package,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  FileText,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Layers,
} from 'lucide-react';

interface MockTrackResult {
  orderId: string;
  customerName: string;
  destination: string;
  items: string;
  meters: number;
  courier: string;
  awbNumber: string;
  currentStatus: string;
  estimatedDelivery: string;
  timeline: Array<{
    title: string;
    description: string;
    date: string;
    status: 'completed' | 'current' | 'upcoming';
  }>;
}

const SAMPLE_ORDERS: Record<string, MockTrackResult> = {
  'UTM-89214': {
    orderId: 'UTM-89214',
    customerName: 'Atelier Faridah Couture',
    destination: 'Bangsar, Kuala Lumpur, Malaysia',
    items: 'Royal Mulberry Silk Charmeuse 22 Momme (Champagne Gold)',
    meters: 35,
    courier: 'DHL Express Malaysia (Same-Day Direct)',
    awbNumber: 'MY-DHL-992014881',
    currentStatus: 'Out for Delivery by Courier',
    estimatedDelivery: 'Today by 4:00 PM MYT',
    timeline: [
      {
        title: 'Order Confirmed & Payment Verified',
        description: 'Payment authorized via FPX Online Banking.',
        date: 'Today, 08:30 AM',
        status: 'completed',
      },
      {
        title: 'Bolt Cutting & 4-Point Optical QC Passed',
        description: '35 meters inspected for zero slubs or snags at Menara City One floor 3.',
        date: 'Today, 09:45 AM',
        status: 'completed',
      },
      {
        title: 'Dispatched from Menara City One KL Hub',
        description: 'Handed over to DHL Express priority textile courier.',
        date: 'Today, 11:15 AM',
        status: 'completed',
      },
      {
        title: 'Out for Courier Delivery',
        description: 'Courier driver in transit to Bangsar commercial atelier.',
        date: 'Today, 01:20 PM',
        status: 'current',
      },
      {
        title: 'Delivered & Signature Secured',
        description: 'Recipient confirmation and digital packing slip archive.',
        date: 'Expected today',
        status: 'upcoming',
      },
    ],
  },
  'UTM-KL-4091': {
    orderId: 'UTM-KL-4091',
    customerName: 'Sovereign Aviation Uniform Procurement',
    destination: 'Changi International Airport, Singapore',
    items: 'ProGuard™ Anti-Microbial Uniform Twill (Navy & Sky Blue)',
    meters: 1200,
    courier: 'FedEx International Priority Cargo',
    awbNumber: 'FDX-SG-55019284',
    currentStatus: 'Customs Clearance Completed (Tuas Checkpoint)',
    estimatedDelivery: 'Tomorrow by 11:00 AM SGT',
    timeline: [
      {
        title: 'Wholesale Mill Contract Confirmed',
        description: 'Form D ASEAN Preferential Tariff Certificate generated.',
        date: 'Yesterday, 10:00 AM',
        status: 'completed',
      },
      {
        title: '24 Rolls Packed in Moisture-Barrier Film',
        description: 'SGS Pre-shipment batch inspection certificate attached.',
        date: 'Yesterday, 03:00 PM',
        status: 'completed',
      },
      {
        title: 'Cross-Border Transit from Kuala Lumpur',
        description: 'Bonded temperature-controlled truck dispatched to Singapore border.',
        date: 'Today, 04:00 AM',
        status: 'completed',
      },
      {
        title: 'Customs Clearance Approved (Singapore)',
        description: 'Import GST verified and priority distribution line assigned.',
        date: 'Today, 10:30 AM',
        status: 'current',
      },
      {
        title: 'Delivery to Airline Hangar 4',
        description: 'Direct dock receiving and meter audit.',
        date: 'Tomorrow, 11:00 AM',
        status: 'upcoming',
      },
    ],
  },
};

export const TrackOrderPage: React.FC = () => {
  const { addToast } = useShop();
  const [searchCode, setSearchCode] = useState('UTM-89214');
  const [activeResult, setActiveResult] = useState<MockTrackResult | null>(SAMPLE_ORDERS['UTM-89214']);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = searchCode.trim().toUpperCase();
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      if (SAMPLE_ORDERS[cleanCode]) {
        setActiveResult(SAMPLE_ORDERS[cleanCode]);
        addToast('success', 'Order Located', `Tracking data for ${cleanCode} updated.`);
      } else {
        // Generate custom dynamic result for any ID
        const generatedResult: MockTrackResult = {
          orderId: cleanCode,
          customerName: 'Valued Textile Client',
          destination: 'Malaysia / International Dispatch',
          items: 'Curated Textile Selection & Swatch Package',
          meters: 50,
          courier: 'DHL Express Malaysia',
          awbNumber: `AWB-${Math.floor(100000000 + Math.random() * 900000000)}`,
          currentStatus: 'Processed at Menara City One Logistics Desk',
          estimatedDelivery: 'Within 2 business days',
          timeline: [
            {
              title: 'Order Confirmed',
              description: 'Textile order received and queued for cutting.',
              date: 'Recorded',
              status: 'completed',
            },
            {
              title: 'Loom & Optical Inspection',
              description: 'Bolt quality verified against ISO 9001 specs.',
              date: 'In Progress',
              status: 'current',
            },
            {
              title: 'Dispatch & Courier Handover',
              description: 'Direct shipment from Menara City One, Kuala Lumpur.',
              date: 'Scheduled',
              status: 'upcoming',
            },
          ],
        };
        setActiveResult(generatedResult);
        addToast('info', 'Active Order Found', `Tracking live progress for ${cleanCode}`);
      }
    }, 400);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#0A0A0A] min-h-screen text-[#F3F4F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider font-luxury">
            <Truck className="w-3.5 h-3.5" />
            <span>REAL-TIME FABRIC DISPATCH & CONTAINER TELEMETRY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-luxury font-bold text-white tracking-wide">
            Track Fabric Shipment
          </h1>

          <p className="text-xs sm:text-base text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            Enter your Universal Textile order reference, AWB number, or ocean container Bill of Lading to monitor real-time cutting, QC, and dispatch status.
          </p>
        </div>

        {/* Search Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#262626] shadow-2xl space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#71717A] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter Order ID (e.g. UTM-89214, UTM-KL-4091, AWB-XXX)..."
                className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#D4AF37] rounded-xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-[#71717A] focus:outline-none uppercase font-mono tracking-wider"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              {isSearching ? 'Tracking...' : 'Track Shipment'}
            </button>
          </form>

          {/* Sample quick buttons */}
          <div className="flex items-center gap-2 text-xs flex-wrap pt-1">
            <span className="text-[#71717A]">Quick demo trackings:</span>
            <button
              type="button"
              onClick={() => {
                setSearchCode('UTM-89214');
                setActiveResult(SAMPLE_ORDERS['UTM-89214']);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#1C1C1C] hover:bg-[#252525] border border-[#333333] text-[11px] text-[#D4AF37] font-mono"
            >
              UTM-89214 (KL Silk Courier)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchCode('UTM-KL-4091');
                setActiveResult(SAMPLE_ORDERS['UTM-KL-4091']);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#1C1C1C] hover:bg-[#252525] border border-[#333333] text-[11px] text-[#38BDF8] font-mono"
            >
              UTM-KL-4091 (1,200m Uniform Export)
            </button>
          </div>
        </div>

        {/* Tracking Details View */}
        {activeResult && (
          <div className="rounded-3xl bg-[#141414] border border-[#2B2B2B] overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8">
            {/* Header banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold">
                    {activeResult.orderId}
                  </span>
                  <span className="text-xs text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/30 font-semibold">
                    {activeResult.currentStatus}
                  </span>
                </div>
                <h3 className="text-lg font-luxury font-bold text-white mt-2">
                  {activeResult.items} ({activeResult.meters} Meters)
                </h3>
                <p className="text-xs text-[#9CA3AF]">
                  Recipient: <strong className="text-white">{activeResult.customerName}</strong> • {activeResult.destination}
                </p>
              </div>

              <div className="text-left sm:text-right space-y-0.5">
                <div className="text-[11px] text-[#71717A]">Estimated Arrival:</div>
                <div className="text-sm font-bold text-[#D4AF37]">{activeResult.estimatedDelivery}</div>
                <div className="text-[10px] text-[#9CA3AF] font-mono">{activeResult.awbNumber}</div>
              </div>
            </div>

            {/* Courier info strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B]">
                <div className="text-[11px] text-[#71717A]">Fulfillment Origin</div>
                <div className="font-semibold text-white mt-0.5">Menara City One, Kuala Lumpur</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B]">
                <div className="text-[11px] text-[#71717A]">Logistics Partner</div>
                <div className="font-semibold text-white mt-0.5">{activeResult.courier}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B]">
                <div className="text-[11px] text-[#71717A]">QC Assurance</div>
                <div className="font-semibold text-[#00E676] mt-0.5">4-Point Optical Passed</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                Shipment Progression Timeline:
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#262626]">
                {activeResult.timeline.map((step, idx) => {
                  const isDone = step.status === 'completed';
                  const isCurrent = step.status === 'current';

                  return (
                    <div key={idx} className="relative group">
                      {/* Indicator dot */}
                      <span
                        className={`absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center border ${
                          isDone
                            ? 'bg-[#00E676] border-[#00E676]'
                            : isCurrent
                            ? 'bg-[#D4AF37] border-[#D4AF37] ring-4 ring-[#D4AF37]/20 animate-pulse'
                            : 'bg-[#1F1F1F] border-[#333333]'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-3 h-3 text-black stroke-[3]" />}
                      </span>

                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <h5
                            className={`font-bold ${
                              isCurrent
                                ? 'text-[#D4AF37]'
                                : isDone
                                ? 'text-white'
                                : 'text-[#71717A]'
                            }`}
                          >
                            {step.title}
                          </h5>
                          <span className="text-[10px] text-[#71717A]">{step.date}</span>
                        </div>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Support Hotline */}
            <div className="pt-4 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#9CA3AF]">
                Need immediate delivery re-routing or customs document copies?
              </span>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%2C%20I%20am%20inquiring%20about%20my%20shipment%20${activeResult.orderId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#1E3A2B] hover:bg-[#254A37] text-[#25D366] border border-[#25D366]/40 font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Contact Dispatch Hotline</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

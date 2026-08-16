import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FabricCategory, FabricProduct } from '../types';
import { COMPANY_INFO } from '../data/products';
import {
  SlidersHorizontal,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Package,
  FileText,
  DollarSign,
  TrendingUp,
  MessageCircle,
  Download,
  Search,
  Layers,
  Sparkles,
  RefreshCw,
  Eye,
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    products,
    setProducts,
    quotes,
    updateQuoteStatus,
    orders,
    formatPrice,
    addToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'products' | 'quotes' | 'orders'>('products');
  const [searchQuery, setSearchQuery] = useState('');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<FabricProduct | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  // New Product Form State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<FabricCategory>('Cotton');
  const [newGsm, setNewGsm] = useState<number>(200);
  const [newWidthInch, setNewWidthInch] = useState<number>(58);
  const [newPrice, setNewPrice] = useState<number>(75);
  const [newSamplePrice, setNewSamplePrice] = useState<number>(18);
  const [newMoq, setNewMoq] = useState<number>(10);
  const [newStock, setNewStock] = useState<number>(5000);
  const [newComposition, setNewComposition] = useState('100% Combed Compact Cotton');
  const [newWeave, setNewWeave] = useState('Plain Weave');
  const [newDescription, setNewDescription] = useState('High-density premium fabric manufactured in Kuala Lumpur.');
  const [newImageUrl, setNewImageUrl] = useState(
    'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80'
  );

  // Stats
  const totalRevenueMYR = orders.reduce((sum, o) => sum + o.totalAmountMYR, 0);
  const totalMetersInStock = products.reduce((sum, p) => sum + p.stockMeters, 0);
  const pendingQuotesCount = quotes.filter((q) => q.status === 'Pending' || q.status === 'Reviewing').length;

  const handleUpdateProductPriceStock = (id: string, price: number, stock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, pricePerMeterMYR: price, stockMeters: stock } : p))
    );
    addToast('success', 'Product Updated', `Price and stock adjustments saved for ${id}.`);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to remove this fabric from catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      addToast('info', 'Product Removed', `Fabric ID ${id} deleted.`);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: FabricProduct = {
      id: 'fab-custom-' + Math.floor(100 + Math.random() * 900),
      name: newName,
      slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newCategory,
      gsm: newGsm,
      widthInch: newWidthInch,
      widthCm: Math.round(newWidthInch * 2.54),
      composition: newComposition,
      weave: newWeave,
      pricePerMeterMYR: newPrice,
      samplePriceMYR: newSamplePrice,
      moqMeters: newMoq,
      stockMeters: newStock,
      colors: [
        { name: 'Imperial Gold', hex: '#D4AF37' },
        { name: 'Pure White', hex: '#FFFFFF' },
        { name: 'Midnight Onyx', hex: '#111111' },
      ],
      images: [newImageUrl],
      description: newDescription,
      features: ['100% Quality Inspected', 'OEKO-TEX Standard Available', 'Mill Direct Pricing'],
      useCases: ['Fashion Tailoring', 'Custom Garments', 'Luxury Linens'],
      certifications: ['OEKO-TEX Standard 100', 'ISO 9001:2015'],
      leadTimeDays: 2,
      rating: 5.0,
      reviewCount: 1,
      isFactoryDirect: true,
    };

    setProducts((prev) => [newProd, ...prev]);
    setIsNewProductModalOpen(false);
    addToast('success', 'Fabric Added to Mill Inventory', `${newProd.name} published.`);
  };

  const handleDownloadInvoice = (orderId: string) => {
    addToast('success', 'Invoice PDF Generated', `Tax-Invoice-${orderId}.pdf downloaded for accounting.`);
  };

  const handleWhatsAppReplyQuote = (q: typeof quotes[0]) => {
    const text = encodeURIComponent(
      `Hello ${q.contactPerson} (${q.companyName})! This is the Mill Management from The Universal Textile Sdn Bhd (Menara City One, KL). Regarding your inquiry ${q.id} for ${q.quantityMeters}m of "${q.fabricName}", we are pleased to confirm ready stock and offer our container bulk rate. Let's finalize your proforma invoice.`
    );
    window.open(`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 sm:py-16 bg-[#0A0A0A] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#262626] mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2 font-luxury">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Mill Management & Inventory Controller</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-luxury font-bold text-white">
              The Universal Textile • Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              Kuala Lumpur Warehouse Control • B2B RFQs • Real-Time Pricing
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNewProductModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 fill-black" />
              <span>Add New Fabric</span>
            </button>
          </div>
        </div>

        {/* Executive KPI Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
            <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-2">
              <span>Total Store Revenue</span>
              <DollarSign className="w-4 h-4 text-[#00E676]" />
            </div>
            <div className="text-xl sm:text-2xl font-luxury font-bold text-white">
              {formatPrice(totalRevenueMYR)}
            </div>
            <span className="text-[11px] text-[#00E676] flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
            <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-2">
              <span>Ready Stock in KL</span>
              <Package className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-xl sm:text-2xl font-luxury font-bold text-gold-gradient">
              {totalMetersInStock.toLocaleString()} m
            </div>
            <span className="text-[11px] text-[#9CA3AF] mt-1 block">
              Across {products.length} catalog fabrics
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
            <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-2">
              <span>Pending B2B RFQs</span>
              <FileText className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div className="text-xl sm:text-2xl font-luxury font-bold text-white">
              {pendingQuotesCount} Active
            </div>
            <span className="text-[11px] text-[#38BDF8] mt-1 block">
              Direct WhatsApp sync enabled
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626]">
            <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-2">
              <span>Total Orders</span>
              <Sparkles className="w-4 h-4 text-[#EAB308]" />
            </div>
            <div className="text-xl sm:text-2xl font-luxury font-bold text-white">
              {orders.length} Dispatched
            </div>
            <span className="text-[11px] text-[#9CA3AF] mt-1 block">
              100% On-time delivery SLA
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-3 border-b border-[#262626] pb-4 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'bg-[#141414] text-[#9CA3AF] hover:text-white border border-[#262626]'
            }`}
          >
            Manage Fabric Catalog ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'quotes'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'bg-[#141414] text-[#9CA3AF] hover:text-white border border-[#262626]'
            }`}
          >
            <span>B2B Wholesale RFQs ({quotes.length})</span>
            {pendingQuotesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'bg-[#141414] text-[#9CA3AF] hover:text-white border border-[#262626]'
            }`}
          >
            Customer Orders & Logistics ({orders.length})
          </button>
        </div>

        {/* TAB 1: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#262626] rounded-xl px-3 py-2 text-xs w-full max-w-sm">
                <Search className="w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Filter inventory by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white focus:outline-none w-full"
                />
              </div>

              <span className="text-xs text-[#9CA3AF]">
                Showing <strong>{products.length}</strong> active fabrics in Kuala Lumpur warehouse
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#262626] bg-[#141414]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1C1C1C] border-b border-[#262626] text-[#9CA3AF] uppercase tracking-wider font-luxury">
                  <tr>
                    <th className="p-4">Fabric</th>
                    <th className="p-4">Category / GSM</th>
                    <th className="p-4">Price / Meter (MYR)</th>
                    <th className="p-4">MOQ</th>
                    <th className="p-4">Ready Stock (KL)</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626]">
                  {products
                    .filter(
                      (p) =>
                        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-[#1C1C1C] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-12 h-12 rounded-lg object-cover bg-black border border-[#262626]"
                            />
                            <div>
                              <div className="font-bold text-white text-sm">{p.name}</div>
                              <div className="text-[11px] text-[#9CA3AF]">{p.composition}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="font-semibold text-[#E5E7EB]">{p.category}</span>
                          <span className="block text-[11px] text-[#D4AF37] font-mono font-bold">
                            {p.gsm} GSM • {p.widthInch}"
                          </span>
                        </td>

                        <td className="p-4">
                          <input
                            type="number"
                            step={0.5}
                            value={p.pricePerMeterMYR}
                            onChange={(e) =>
                              handleUpdateProductPriceStock(p.id, Number(e.target.value), p.stockMeters)
                            }
                            className="w-24 bg-[#0A0A0A] border border-[#262626] rounded-lg px-2.5 py-1 text-white font-mono font-bold text-xs"
                          />
                        </td>

                        <td className="p-4 font-mono font-semibold text-white">
                          {p.moqMeters} m
                        </td>

                        <td className="p-4">
                          <input
                            type="number"
                            step={100}
                            value={p.stockMeters}
                            onChange={(e) =>
                              handleUpdateProductPriceStock(
                                p.id,
                                p.pricePerMeterMYR,
                                Number(e.target.value)
                              )
                            }
                            className="w-28 bg-[#0A0A0A] border border-[#262626] rounded-lg px-2.5 py-1 text-[#00E676] font-mono font-bold text-xs"
                          />
                        </td>

                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-2 rounded-lg bg-[#261517] hover:bg-[#381B20] text-red-400 transition-colors cursor-pointer"
                            title="Delete fabric from catalog"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: B2B RFQs PIPELINE */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {quotes.map((q) => (
                <div
                  key={q.id}
                  className="p-6 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#D4AF37]/50 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-xs text-[#D4AF37] px-2.5 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                        {q.id}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          q.status === 'Approved'
                            ? 'bg-[#00E676]/15 text-[#00E676]'
                            : q.status === 'Quoted'
                            ? 'bg-[#38BDF8]/15 text-[#38BDF8]'
                            : 'bg-[#FFB800]/15 text-[#FFB800]'
                        }`}
                      >
                        ● {q.status}
                      </span>
                      <span className="text-xs text-[#71717A]">{new Date(q.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h4 className="text-base font-bold text-white">
                      {q.companyName} <span className="text-[#9CA3AF] font-normal text-xs">({q.contactPerson})</span>
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#9CA3AF] pt-1">
                      <div>
                        <span className="block text-[#71717A] text-[10px] uppercase">Fabric</span>
                        <strong className="text-white">{q.fabricName}</strong>
                      </div>
                      <div>
                        <span className="block text-[#71717A] text-[10px] uppercase">Quantity</span>
                        <strong className="text-white font-mono">{q.quantityMeters.toLocaleString()} Meters</strong>
                      </div>
                      <div>
                        <span className="block text-[#71717A] text-[10px] uppercase">Destination</span>
                        <strong className="text-white">{q.country}</strong>
                      </div>
                      <div>
                        <span className="block text-[#71717A] text-[10px] uppercase">Target Date</span>
                        <strong className="text-white">{q.targetDate}</strong>
                      </div>
                    </div>

                    {q.notes && (
                      <p className="text-xs text-[#D1D5DB] bg-[#0A0A0A] p-2.5 rounded-xl border border-[#262626] mt-2">
                        <strong>Requirements:</strong> {q.notes}
                      </p>
                    )}
                  </div>

                  {/* Quote Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleWhatsAppReplyQuote(q)}
                      className="px-4 py-2.5 rounded-xl bg-[#1E3A2B] hover:bg-[#284E39] text-[#00E676] border border-[#00E676]/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Direct Reply</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <select
                        value={q.status}
                        onChange={(e) => updateQuoteStatus(q.id, e.target.value as typeof q.status)}
                        className="bg-[#0A0A0A] border border-[#262626] rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Approved">Approved</option>
                      </select>

                      <button
                        onClick={() => handleDownloadInvoice(q.id)}
                        className="p-2 rounded-xl bg-[#0A0A0A] hover:bg-[#1C1C1C] text-[#D4AF37] border border-[#262626] cursor-pointer"
                        title="Download Proforma Quote PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS & LOGISTICS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-2xl border border-[#262626] bg-[#141414]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1C1C1C] border-b border-[#262626] text-[#9CA3AF] uppercase tracking-wider font-luxury">
                  <tr>
                    <th className="p-4">Order Ref</th>
                    <th className="p-4">Customer & Destination</th>
                    <th className="p-4">Fabrics Ordered</th>
                    <th className="p-4">Payment & Total</th>
                    <th className="p-4">Shipping Channel</th>
                    <th className="p-4 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#1C1C1C] transition-colors">
                      <td className="p-4">
                        <div className="font-mono font-bold text-white text-xs">{o.id}</div>
                        <div className="text-[10px] text-[#71717A] font-mono">{o.trackingNumber}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-white">{o.customerName}</div>
                        <div className="text-[11px] text-[#9CA3AF]">
                          {o.city}, {o.state ? `${o.state}, ` : ''}{o.country}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-1">
                          {o.items.map((it, idx) => (
                            <div key={idx} className="text-[11px] text-[#D1D5DB]">
                              • {it.product.name} ({it.isSampleSwatch ? 'Sample Kit' : `${it.meters}m`})
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-luxury font-bold text-gold-gradient text-sm">
                          {formatPrice(o.totalAmountMYR)}
                        </div>
                        <div className="text-[10px] text-[#00E676] font-semibold">{o.paymentMethod}</div>
                      </td>

                      <td className="p-4">
                        <span className="text-[11px] text-white font-medium bg-[#1C1C1C] px-2.5 py-1 rounded border border-[#262626]">
                          {o.shippingMethod}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDownloadInvoice(o.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#0A0A0A] hover:bg-[#1C1C1C] border border-[#262626] text-[#D4AF37] font-semibold flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW FABRIC PRODUCT */}
        {isNewProductModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-[#111111] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#262626] mb-6">
                <h3 className="text-lg font-luxury font-bold text-white">
                  Add New Fabric to Mill Catalog
                </h3>
                <button
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#1C1C1C] text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9CA3AF] font-semibold mb-1">Fabric Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Organza Silk"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9CA3AF] font-semibold mb-1">Category *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as FabricCategory)}
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="Silk">Silk</option>
                      <option value="Cotton">Cotton</option>
                      <option value="Linen">Linen</option>
                      <option value="Uniform Fabric">Uniform Fabric</option>
                      <option value="Custom Prints">Custom Prints</option>
                      <option value="Jacquard">Jacquard</option>
                      <option value="Wool Blend">Wool Blend</option>
                      <option value="Polyester">Polyester</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#9CA3AF] font-semibold mb-1">Fabric Weight (GSM) *</label>
                    <input
                      type="number"
                      required
                      value={newGsm}
                      onChange={(e) => setNewGsm(Number(e.target.value))}
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9CA3AF] font-semibold mb-1">Fabric Width (Inches) *</label>
                    <input
                      type="number"
                      required
                      value={newWidthInch}
                      onChange={(e) => setNewWidthInch(Number(e.target.value))}
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9CA3AF] font-semibold mb-1">Price per Meter (MYR) *</label>
                    <input
                      type="number"
                      step={0.5}
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9CA3AF] font-semibold mb-1">Ready Stock Meters (KL) *</label>
                    <input
                      type="number"
                      required
                      value={newStock}
                      onChange={(e) => setNewStock(Number(e.target.value))}
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#9CA3AF] font-semibold mb-1">Composition *</label>
                    <input
                      type="text"
                      required
                      value={newComposition}
                      onChange={(e) => setNewComposition(e.target.value)}
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#9CA3AF] font-semibold mb-1">Photo URL *</label>
                    <input
                      type="url"
                      required
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewProductModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#1C1C1C] text-white font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold font-luxury uppercase tracking-wider cursor-pointer"
                  >
                    Publish to Storefront
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Scissors,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartItemMeters,
    clearCart,
    cartTotalMYR,
    formatPrice,
    setIsCheckoutOpen,
    t,
  } = useShop();

  if (!isCartOpen) return null;

  const freeShippingThresholdMYR = 500;
  const progressPercent = Math.min(100, (cartTotalMYR / freeShippingThresholdMYR) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdMYR - cartTotalMYR);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101010] border-l border-[#262626] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#0A0A0A]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-luxury text-sm font-bold text-white tracking-wide">
                  {t.cart.title}
                </h3>
                <span className="text-[11px] text-[#9CA3AF]">
                  {cart.length} unique items in bag
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-[#1C1C1C] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator for Malaysia */}
          <div className="px-5 py-3 bg-[#141414] border-b border-[#262626] text-xs">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-[#9CA3AF] flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-[#D4AF37]">{formatPrice(remainingForFreeShipping)}</strong> for Free Malaysia Delivery
                  </span>
                ) : (
                  <span className="text-[#00E676] font-semibold">
                    ✓ Complimentary Express Delivery Unlocked!
                  </span>
                )}
              </span>
              <span className="font-mono font-bold text-[#D4AF37]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#262626] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#00E676] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center mx-auto text-[#71717A]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {t.cart.emptyTitle}
                  </h4>
                  <p className="text-xs text-[#9CA3AF] max-w-xs mx-auto">
                    {t.cart.emptyDesc}
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold hover:bg-[#D4AF37]/10 transition-colors"
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-[#141414] border border-[#262626] flex gap-3.5 relative group hover:border-[#D4AF37]/40 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-xl overflow-hidden bg-[#0A0A0A] flex-shrink-0 border border-[#262626]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#71717A] hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Swatch or Color */}
                      <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF] mt-0.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/30 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                        <span>•</span>
                        <span>{item.product.gsm} GSM</span>
                      </div>

                      {item.isSampleSwatch && (
                        <span className="inline-block mt-1 text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.2 rounded border border-[#D4AF37]/30">
                          {t.cart.swatchLabel}
                        </span>
                      )}
                    </div>

                    {/* Quantity and Subtotal */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#262626]">
                      {item.isSampleSwatch ? (
                        <span className="text-[11px] text-[#9CA3AF]">1 Swatch Kit</span>
                      ) : (
                        <div className="flex items-center bg-[#0A0A0A] border border-[#262626] rounded-lg overflow-hidden text-xs">
                          <button
                            onClick={() => updateCartItemMeters(item.id, item.meters - 5)}
                            className="px-2 py-0.5 text-white hover:bg-[#1C1C1C]"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono font-bold text-white">
                            {item.meters}m
                          </span>
                          <button
                            onClick={() => updateCartItemMeters(item.id, item.meters + 5)}
                            className="px-2 py-0.5 text-white hover:bg-[#1C1C1C]"
                          >
                            +
                          </button>
                        </div>
                      )}

                      <div className="text-right">
                        <div className="text-xs font-luxury font-bold text-gold-gradient">
                          {formatPrice(item.subtotalMYR)}
                        </div>
                        <div className="text-[10px] text-[#71717A]">
                          {formatPrice(item.unitPriceMYR)}/{item.isSampleSwatch ? 'kit' : 'm'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#262626] bg-[#0A0A0A] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#9CA3AF]">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-semibold text-white">{formatPrice(cartTotalMYR)}</span>
                </div>
                <div className="flex justify-between text-[#9CA3AF]">
                  <span>Tax & Export Handling</span>
                  <span className="text-[#00E676] font-semibold">Included (0% SST)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#262626]">
                  <span>Total Amount</span>
                  <span className="text-lg font-luxury font-extrabold text-gold-gradient">
                    {formatPrice(cartTotalMYR)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA820A] text-black font-luxury font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#D4AF37]/20 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.cart.checkoutBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-[#71717A] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E676]" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

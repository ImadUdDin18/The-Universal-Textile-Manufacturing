import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto p-4 rounded-2xl bg-[#141414]/95 border border-[#262626] shadow-2xl backdrop-blur-md flex items-start gap-3 text-xs text-white animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#00E676]" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-[#EF4444]" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#38BDF8]" />}
          </div>

          <div className="flex-1">
            <div className="font-bold text-white text-xs">{toast.title}</div>
            <div className="text-[11px] text-[#9CA3AF] mt-0.5 leading-relaxed">{toast.message}</div>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#71717A] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

// src/components/cart/CartToast.jsx
// Minimal, production-ready bottom toast notification for cart actions
import React from "react";
import { X, Check } from "lucide-react";
import { useCart } from "../../hooks/useCart";

export default function CartToast() {
  const { toastMessage, dismissToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 text-white text-xs sm:text-sm font-medium rounded-xl shadow-xl border border-slate-800 animate-[fadeIn_0.2s_ease-out] select-none"
    >
      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
      </div>
      <span>{toastMessage}</span>
      <button
        type="button"
        onClick={dismissToast}
        className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded-md hover:bg-slate-800"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

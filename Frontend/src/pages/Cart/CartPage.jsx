// src/pages/Cart/CartPage.jsx
// Dedicated standalone Cart & Enquiry Page for Evershine Prefab Solutions
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  AlertCircle,
  Loader2,
  Check,
  Send,
  ShoppingBag,
  Info,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const {
    cartItems,
    cartCount,
    loading,
    updatingItemIds,
    deletingItemIds,
    error,
    fetchCartItems,
    updateQuantity,
    updateAttribute,
    deleteItem,
    selectedItemIds,
    toggleSelectItem,
    selectAll,
    deselectAll,
    sendWhatsAppEnquiry,
    maxLimit,
  } = useCart();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const selectedCount = selectedItemIds.size;
  const isAllSelected = cartItems.length > 0 && selectedCount === cartItems.length;
  const isAtLimit = cartItems.length >= maxLimit;

  if (!isAuthenticated) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign in to View Your Cart</h2>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            Your cart is securely stored with your Evershine account. Please sign in to view and enquire about products.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-primary text-white text-base font-semibold rounded-xl hover:bg-secondary transition shadow-sm"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 pt-[80px] sm:pt-[95px] md:pt-[110px] lg:pt-[130px] pb-16 font-sans bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                to="/products"
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Product Enquiry Cart</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Select items to send an inquiry directly via WhatsApp ({cartCount} of {maxLimit} items)
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={sendWhatsAppEnquiry}
              disabled={selectedCount === 0}
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>Enquire on WhatsApp ({selectedCount})</span>
            </button>
          )}
        </div>

        {/* Limit Warning */}
        {isAtLimit && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              Maximum cart limit of <strong>{maxLimit} products</strong> reached. Remove an item to add other products.
            </span>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-3 bg-white rounded-2xl border border-slate-200">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm font-medium">Loading your cart...</span>
          </div>
        ) : error ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-800">{error}</p>
            <button
              type="button"
              onClick={fetchCartItems}
              className="mt-4 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-secondary transition"
            >
              Retry
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
            <p className="text-sm text-slate-500 max-w-md mt-2 mb-6">
              You haven't added any prefab or steel products yet. You can add up to {maxLimit} items to your cart for direct enquiry.
            </p>
            <Link
              to="/products"
              className="py-3 px-8 bg-primary hover:bg-secondary text-white font-semibold text-base rounded-xl transition shadow-sm"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Multi-select Header */}
            <div className="flex items-center justify-between px-2 text-xs text-slate-500">
              <span>{selectedCount} of {cartItems.length} products selected</span>
              <button
                type="button"
                onClick={isAllSelected ? deselectAll : selectAll}
                className="font-semibold text-primary hover:underline cursor-pointer"
              >
                {isAllSelected ? "Deselect All" : "Select All"}
              </button>
            </div>

            {/* List */}
            {cartItems.map((item) => {
              const isSelected = selectedItemIds.has(item.id);
              const isUpdating = updatingItemIds.has(item.id);
              const isDeleting = deletingItemIds.has(item.id);
              const existingAttrs = Array.isArray(item.existingAttributes) ? item.existingAttributes : [];
              const selectedMap = {};
              if (Array.isArray(item.selectedAttributes)) {
                item.selectedAttributes.forEach((attr) => {
                  if (attr?.label) selectedMap[attr.label] = attr.value;
                });
              }

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border p-5 transition-all ${
                    isSelected ? "border-primary ring-1 ring-primary/20 shadow-sm" : "border-slate-200"
                  } ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Left: Checkbox + Image + Title */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => toggleSelectItem(item.id)}
                        disabled={isUpdating || isDeleting}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0 disabled:opacity-40 ${
                          isSelected ? "bg-primary border-primary text-white" : "border-slate-300 hover:border-primary bg-white"
                        }`}
                        aria-label="Select product for enquiry"
                      >
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div className="w-18 h-18 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        {item.productImageUrl ? (
                          <img
                            src={item.productImageUrl}
                            alt={item.productName || "Product"}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <ShoppingBag className="w-6 h-6 text-slate-300" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/products/${item.productSlug}`}
                          className="text-base font-bold text-slate-900 hover:text-primary transition-colors block truncate"
                        >
                          {item.productName || item.productSlug}
                        </Link>
                      </div>
                    </div>

                    {/* Right: Quantity + Delete */}
                    <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                      <div className="flex items-center gap-2 border border-slate-200 rounded-xl bg-slate-50 p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          disabled={(item.quantity || 1) <= 1 || isUpdating || isDeleting}
                          className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-slate-800 flex items-center justify-center">
                          {isUpdating ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                          ) : (
                            item.quantity || 1
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          disabled={isUpdating || isDeleting}
                          className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        disabled={isDeleting || isUpdating}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Remove product"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-5 h-5 animate-spin text-rose-500" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Attributes */}
                  {existingAttrs.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {existingAttrs.map((attr, aIdx) => {
                          const label = attr.label || `Attribute ${aIdx + 1}`;
                          const unit = attr.unit ? ` (${attr.unit})` : "";
                          const val = selectedMap[label] || "";
                          const values = Array.isArray(attr.values) ? attr.values : [];
                          const isCustom = Boolean(attr.customInput);

                          return (
                            <div key={label} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <span className="text-xs font-semibold text-slate-600 block mb-1">
                                {label} {unit}
                              </span>
                              {values.length > 0 && !isCustom ? (
                                <select
                                  value={val}
                                  disabled={isUpdating || isDeleting}
                                  onChange={(e) => updateAttribute(item.id, label, e.target.value)}
                                  className="w-full text-xs py-1.5 px-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:border-primary font-medium disabled:opacity-50"
                                >
                                  <option value="" disabled>Select {label}</option>
                                  {values.map((v) => (
                                    <option key={v} value={v}>{v} {attr.unit || ""}</option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  value={val}
                                  disabled={isUpdating || isDeleting}
                                  placeholder={attr.min != null && attr.max != null ? `${attr.min} - ${attr.max}` : "Value"}
                                  onChange={(e) => updateAttribute(item.id, label, e.target.value)}
                                  className="w-full text-xs py-1.5 px-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:border-primary font-medium disabled:opacity-50"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

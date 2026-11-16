// src/components/cart/CartDrawer.jsx
// Production Cart Drawer & Enquiry Component for Evershine Prefab Solutions
import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  Trash2,
  Plus,
  Minus,
  AlertCircle,
  Loader2,
  Check,
  Send,
  ShoppingBag,
  Info,
} from "lucide-react";
import { useCart } from "../../hooks/useCart";

export default function CartDrawer() {
  const {
    cartItems,
    cartCount,
    loading,
    updatingItemIds,
    deletingItemIds,
    error,
    isCartOpen,
    closeCart,
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

  if (!isCartOpen) return null;

  const selectedCount = selectedItemIds.size;
  const isAllSelected = cartItems.length > 0 && selectedCount === cartItems.length;
  const isAtLimit = cartItems.length >= maxLimit;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-[popIn_0.2s_ease-out]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Product Enquiry Cart
                </h2>
                <p className="text-xs text-slate-500">
                  {cartCount} of {maxLimit} products added
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Limit Notice (when 5 items) */}
          {isAtLimit && (
            <div className="px-4 py-2.5 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center gap-2 shrink-0">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Maximum cart limit of <strong>{maxLimit} products</strong> reached. Remove an item to add a new one.
              </span>
            </div>
          )}

          {/* Selection Bar (when cart has items) */}
          {cartItems.length > 0 && !loading && (
            <div className="px-4 sm:px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 shrink-0">
              <span className="font-medium">
                {selectedCount} of {cartItems.length} selected for enquiry
              </span>
              <button
                type="button"
                onClick={isAllSelected ? deselectAll : selectAll}
                className="font-semibold text-primary hover:text-secondary underline cursor-pointer"
              >
                {isAllSelected ? "Deselect All" : "Select All"}
              </button>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center text-slate-500 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-sm font-medium">Fetching cart items...</span>
              </div>
            ) : error ? (
              <div className="py-12 px-4 text-center">
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">{error}</p>
                <button
                  type="button"
                  onClick={fetchCartItems}
                  className="mt-4 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-secondary transition cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your Cart is Empty</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xs mt-1.5 mb-6 leading-relaxed">
                  Browse our industrial steel and prefab products and add up to {maxLimit} items to your enquiry.
                </p>
                <Link
                  to="/products"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center py-2.5 px-6 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-secondary transition shadow-sm cursor-pointer"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              cartItems.map((item) => {
                const isSelected = selectedItemIds.has(item.id);
                const isUpdating = updatingItemIds.has(item.id);
                const isDeleting = deletingItemIds.has(item.id);
                const existingAttrs = Array.isArray(item.existingAttributes)
                  ? item.existingAttributes
                  : [];

                // Resolve selected value map
                const selectedMap = {};
                if (Array.isArray(item.selectedAttributes)) {
                  item.selectedAttributes.forEach((attr) => {
                    if (attr?.label) selectedMap[attr.label] = attr.value;
                  });
                }

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-200 p-3.5 sm:p-4 bg-white ${
                      isSelected
                        ? "border-primary shadow-sm ring-1 ring-primary/20"
                        : "border-slate-200 hover:border-slate-300"
                    } ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    {/* Top Row: Checkbox + Product Image + Info + Delete */}
                    <div className="flex items-start gap-3">
                      {/* Enquiry Selection Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleSelectItem(item.id)}
                        disabled={isUpdating || isDeleting}
                        className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer shrink-0 disabled:opacity-40 ${
                          isSelected
                            ? "bg-primary border-primary text-white"
                            : "border-slate-300 hover:border-primary bg-white"
                        }`}
                        aria-label={isSelected ? "Deselect for enquiry" : "Select for enquiry"}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        {item.productImageUrl ? (
                          <img
                            src={item.productImageUrl}
                            alt={item.productName || "Product"}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <ShoppingBag className="w-6 h-6 text-slate-300" />
                        )}
                      </div>

                      {/* Product Title & Link */}
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/products/${item.productSlug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold text-slate-900 hover:text-primary transition-colors line-clamp-1 block"
                          title={item.productName}
                        >
                          {item.productName || item.productSlug}
                        </Link>

                        {/* Quick Quantity Counter */}
                        <div className="mt-2.5 flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-medium">Qty:</span>
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              disabled={(item.quantity || 1) <= 1 || isUpdating || isDeleting}
                              className="p-1 sm:p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-slate-800 flex items-center justify-center">
                              {isUpdating ? (
                                <Loader2 className="w-3 h-3 animate-spin text-primary" />
                              ) : (
                                item.quantity || 1
                              )}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              disabled={isUpdating || isDeleting}
                              className="p-1 sm:p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove / Delete Button */}
                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        disabled={isDeleting || isUpdating}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Remove product from cart"
                        aria-label="Remove product"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Dynamic Attributes Section */}
                    {existingAttrs.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                          Specification Attributes
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {existingAttrs.map((attr, attrIdx) => {
                            const label = attr.label || `Attr ${attrIdx + 1}`;
                            const unit = attr.unit ? ` (${attr.unit})` : "";
                            const currentValue = selectedMap[label] || "";
                            const values = Array.isArray(attr.values) ? attr.values : [];
                            const allowCustom = Boolean(attr.customInput);

                            return (
                              <div key={label || attrIdx} className="bg-slate-50/70 p-2 rounded-lg border border-slate-100">
                                <label className="block text-[11px] font-medium text-slate-600 mb-1 truncate">
                                  {label}
                                  {unit}
                                </label>

                                {values.length > 0 && !allowCustom ? (
                                  /* Predefined Options Dropdown */
                                  <select
                                    value={currentValue}
                                    disabled={isUpdating || isDeleting}
                                    onChange={(e) => updateAttribute(item.id, label, e.target.value)}
                                    className="w-full text-xs py-1.5 px-2 bg-white border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:border-primary cursor-pointer font-medium disabled:opacity-50"
                                  >
                                    <option value="" disabled>
                                      Select {label}
                                    </option>
                                    {values.map((val) => (
                                      <option key={val} value={val}>
                                        {val} {attr.unit || ""}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  /* Custom Input or Hybrid Dropdown */
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="text"
                                      value={currentValue}
                                      disabled={isUpdating || isDeleting}
                                      placeholder={
                                        attr.min != null && attr.max != null
                                          ? `${attr.min} - ${attr.max}`
                                          : `Enter ${label.toLowerCase()}`
                                      }
                                      onChange={(e) => updateAttribute(item.id, label, e.target.value)}
                                      className="w-full text-xs py-1.5 px-2 bg-white border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:border-primary font-medium disabled:opacity-50"
                                    />
                                    {values.length > 0 && (
                                      <select
                                        value=""
                                        disabled={isUpdating || isDeleting}
                                        onChange={(e) => {
                                          if (e.target.value) {
                                            updateAttribute(item.id, label, e.target.value);
                                          }
                                        }}
                                        className="text-xs py-1.5 px-1 bg-white border border-slate-200 rounded-md text-slate-600 focus:outline-none cursor-pointer shrink-0 disabled:opacity-50"
                                        title="Pick from standard presets"
                                      >
                                        <option value="">Preset</option>
                                        {values.map((val) => (
                                          <option key={val} value={val}>
                                            {val}
                                          </option>
                                        ))}
                                      </select>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Actions */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white shrink-0 space-y-3">
              {/* WhatsApp Enquiry Button */}
              <button
                type="button"
                onClick={sendWhatsAppEnquiry}
                disabled={selectedCount === 0}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>
                  {selectedCount === 0
                    ? "Select products to enquire"
                    : `Enquire on WhatsApp (${selectedCount} product${selectedCount > 1 ? "s" : ""})`}
                </span>
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Direct inquiry to: +91 9860118911</span>
                <Link
                  to="/products"
                  onClick={closeCart}
                  className="font-medium text-primary hover:underline"
                >
                  Add more products
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

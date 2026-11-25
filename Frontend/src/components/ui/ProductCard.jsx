import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Ruler,
  Maximize2,
  ArrowUpRight,
} from "lucide-react";

export default function ProductCard({
  product,
  brandName = "",
  nameMap = null,
  to = null,
  onClick = null,
  onPurchase = null,
  actionButton = null,
  isAdmin = false,
  className = "",
}) {
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const resolvedIsAdmin = Boolean(isAdmin || actionButton);

  const status = String(
    product.productStatus || product.status || ""
  ).toUpperCase();

  const isUnavailable =
    status === "UNAVAILABLE" || product.available === false;

  const brand =
    brandName ||
    (nameMap && product.brandId && nameMap.get(product.brandId)) ||
    product.brandName ||
    product.brand ||
    "";

  const image = product.imageUrl || product.img;

  const rawAttributes = Array.isArray(product.attributes)
    ? product.attributes
    : Array.isArray(product.fullAttributeResponseDtos)
    ? product.fullAttributeResponseDtos
    : [];

  const attributes = rawAttributes
    .filter(
      (attr) =>
        attr &&
        attr.label &&
        attr.min != null &&
        attr.min !== "" &&
        attr.max != null &&
        attr.max !== ""
    )
    .slice(0, 3);

  const icons = [Ruler, Maximize2, Package];

  const destination =
    !isUnavailable || resolvedIsAdmin
      ? to ||
        (!actionButton && product.slug
          ? `/products/${product.slug}`
          : null)
      : null;

  const handlePurchase = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isUnavailable && !resolvedIsAdmin) return;

    if (onPurchase) onPurchase(product);
    else if (onClick) onClick(product);
  };

  const content = (
    <article
      className={`group relative flex h-[380px] sm:h-[415px] lg:h-[425px] w-full max-w-[340px] sm:max-w-[310px] lg:max-w-[320px] mx-auto flex-col overflow-hidden rounded-xl sm:rounded-2xl bg-white text-neutral-800 transition-all duration-200 border border-[#004060]/15 ${className}`}
      onClick={(e) => {
        if (isUnavailable && !resolvedIsAdmin) {
          e.preventDefault();
          return;
        }

        if (onClick && !destination) onClick(product);
      }}
    >
      {/* IMAGE SECTION */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-slate-50/50">
        {image && !imgError ? (
          <img
            src={image}
            alt={product.title || "Steel product"}
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 h-full w-full object-contain object-center p-3 sm:p-4 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-neutral-400">
            <Package size={32} strokeWidth={1.3} />
            <span className="text-[11px] sm:text-xs">No image</span>
          </div>
        )}

        {/* TOP BADGES - ONLY BRAND (AND UNAVAILABLE IF APPLICABLE) */}
        <div className="absolute left-2.5 right-2.5 top-2.5 z-10 flex items-start justify-between gap-1.5">
          {brand ? (
            <span className="max-w-[85%] truncate rounded-md border border-neutral-200/90 bg-white/95 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-neutral-800 backdrop-blur-sm">
              {brand}
            </span>
          ) : (
            <span />
          )}

          {isUnavailable && (
            <span className="rounded-md bg-red-600 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-white">
              Unavailable
            </span>
          )}
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="relative z-10 flex shrink-0 flex-col gap-2 sm:gap-2.5 bg-white p-3 sm:p-3.5 border-t border-slate-100/90">
        {/* PRODUCT NAME - FIXED 2-LINE HEIGHT TO PREVENT UNEVEN ALIGNMENT */}
        <h3
          className="h-9 sm:h-10 line-clamp-2 text-[13px] sm:text-[14.5px] font-bold leading-snug text-neutral-900 group-hover:text-[#004060] transition-colors"
          title={product.title || "Untitled product"}
        >
          {product.title || "Untitled product"}
        </h3>

        {/* ATTRIBUTES - FULLY VISIBLE, CLEAN TYPOGRAPHY, NO AWKWARD TRUNCATION */}
        <div className="flex h-[74px] sm:h-[82px] flex-col justify-center gap-1">
          {[0, 1, 2].map((slotIndex) => {
            const attr = attributes[slotIndex];
            const Icon = icons[slotIndex];

            if (!attr) {
              return (
                <div
                  key={`empty-${slotIndex}`}
                  className="h-[22px] sm:h-[25px] shrink-0"
                  aria-hidden="true"
                />
              );
            }

            return (
              <div
                key={attr.id || `${attr.label}-${slotIndex}`}
                className="flex h-[22px] sm:h-[25px] shrink-0 items-center justify-between gap-2 text-xs sm:text-[13px] leading-tight"
              >
                <div className="flex items-center gap-1.5 shrink-0">
                  <Icon
                    size={14}
                    strokeWidth={1.8}
                    className="shrink-0 text-slate-400"
                  />
                  <span className="font-medium text-slate-600 whitespace-nowrap">
                    {attr.label}
                  </span>
                </div>

                <span className="font-bold text-slate-900 text-right whitespace-nowrap ml-auto">
                  {`${attr.min} - ${attr.max}${attr.unit ? ` ${attr.unit}` : ""}`}
                </span>
              </div>
            );
          })}
        </div>

        {/* ACTION BUTTON */}
        {actionButton ? (
          <div
            className="flex flex-wrap items-center gap-1.5 pt-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            {actionButton}
          </div>
        ) : (
          <button
            type="button"
            disabled={isUnavailable}
            onClick={handlePurchase}
            className="flex h-8 sm:h-9 w-full items-center justify-between rounded-xl bg-[#004060] hover:bg-[#002f48] active:scale-[0.99] text-white px-3 sm:px-3.5 text-xs sm:text-[13px] font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer shadow-xs mt-0.5"
          >
            <span className="text-white font-medium">
              {isUnavailable ? "Unavailable" : "View Product"}
            </span>

            {!isUnavailable && <ArrowUpRight size={14} className="shrink-0 text-white" />}
          </button>
        )}
      </div>
    </article>
  );

  if (destination && !isUnavailable) {
    return (
      <Link
        to={destination}
        className="block h-full w-full text-inherit no-underline"
      >
        {content}
      </Link>
    );
  }

  return content;
}

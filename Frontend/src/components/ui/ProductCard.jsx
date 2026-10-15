// src/components/ui/ProductCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Truck } from "lucide-react";

export default function ProductCard({
  product,
  brandName = "",
  categoryName = "",
  nameMap = null,
  to = null,
  onClick = null,
  actionButton = null,
  className = "",
}) {
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const resolvedBrand =
    brandName ||
    (nameMap && product.brandId && nameMap.get(product.brandId)) ||
    product.brand ||
    product.brandName ||
    "—";

  const rawAttributes = Array.isArray(product.attributes)
    ? product.attributes
    : Array.isArray(product.fullAttributeResponseDtos)
    ? product.fullAttributeResponseDtos
    : product.specs && typeof product.specs === "object"
    ? Object.entries(product.specs).map(([key, val]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
        values: [String(val)],
      }))
    : [];

  const attributes = rawAttributes.filter((attr) => {
    if (!attr || !attr.label) return false;
    const hasMin = attr.min != null && attr.min !== "";
    const hasMax = attr.max != null && attr.max !== "";
    const hasValues = Array.isArray(attr.values) && attr.values.length > 0;
    const hasValue = attr.value != null && attr.value !== "";
    return hasMin || hasMax || hasValues || hasValue;
  });

  const getAttributeValue = (attr) => {
    const hasMin = attr.min != null && attr.min !== "";
    const hasMax = attr.max != null && attr.max !== "";

    if (hasMin && hasMax) {
      return `${attr.min} - ${attr.max} ${attr.unit || ""}`.trim();
    }

    if (hasMin || hasMax) {
      return `${hasMin ? attr.min : attr.max} ${attr.unit || ""}`.trim();
    }

    if (Array.isArray(attr.values) && attr.values.length) {
      return `${attr.values.join(", ")} ${attr.unit || ""}`.trim();
    }

    if (attr.value) {
      return `${attr.value} ${attr.unit || ""}`.trim();
    }

    return "—";
  };

  const displayImage = product.imageUrl || product.img;
  const destination = to || (!actionButton && product.slug ? `/products/${product.slug}` : null);

  const cardContent = (
    <article
      onClick={!destination ? onClick : undefined}
      className={`group flex h-full min-w-0 flex-col overflow-hidden
        rounded-[18px] border border-[#e2e2e2] bg-white
        transition-colors duration-200 hover:border-[#c8c8c8]
        ${destination || onClick ? "cursor-pointer" : ""}
        ${className}`}
    >
      {/* Product image */}
      <div className="flex h-[190px] shrink-0 items-center justify-center overflow-hidden bg-white px-5 pt-3">
        {!imgError && displayImage ? (
          <img
            src={displayImage}
            alt={product.title || "Product"}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-contain transition-transform
              duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Package size={42} strokeWidth={1.2} />
            <span className="text-xs">No image available</span>
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col px-[15px] pb-3">
        <h3 className="mb-1 line-clamp-2 min-h-[48px] text-[17px]
          font-normal leading-[25px] tracking-[-0.3px] text-[#111111]">
          {product.title || "Untitled product"}
        </h3>

        <p className="mb-3 text-[14px] leading-5 text-[#777777]">
          Brand: {resolvedBrand}
        </p>

        {attributes.length > 0 && (
          <div className="mt-auto space-y-2 pb-1">
            {attributes.slice(0, 4).map((attr, index) => (
              <div
                key={attr.id || `${attr.label}-${index}`}
                className="flex flex-wrap items-baseline gap-x-2
                  text-[14px] leading-5 text-[#171717]"
              >
                <span className="font-medium text-[#111111]">
                  {attr.label}:
                </span>
                <span className="text-slate-600">{getAttributeValue(attr)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action button (Only rendered if actionButton is provided, e.g. in Admin) */}
      {actionButton && (
        <div
          className="flex min-h-[50px] shrink-0 items-center border-t border-[#e2e2e2] bg-[#f5f6fa] px-[15px]"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          {actionButton}
        </div>
      )}

      {/* Delivery footer */}
      <div className="flex min-h-[48px] shrink-0 items-center gap-3 border-t border-[#e2e2e2] bg-[#f5f6fa] px-[15px] text-[14px] text-[#222222]">
        <Truck size={18} strokeWidth={1.5} className="shrink-0 text-[#004060]" />
        <span>
          {product.deliveryText || product.delivery || "Delivery in 2 - 5 days"}
        </span>
      </div>
    </article>
  );

  if (destination) {
    return (
      <Link to={destination} className="block h-full focus:outline-none select-none text-inherit no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

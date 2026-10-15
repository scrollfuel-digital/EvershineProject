import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchProductBySlug } from "../../services/productService";
import { useDataProcess } from "../../services/dataProccess";

export default function ProductDetails() {
  const { slug } = useParams();
  const { nameMap } = useDataProcess();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [quantity, setQuantity] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [openMobileTabs, setOpenMobileTabs] = useState({ 0: true });

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      setError("");
      setProduct(null);
      setSelectedAttributes({});
      setQuantity("");
      setActiveTab(0);
      setOpenMobileTabs({ 0: true });

      try {
        const data = await fetchProductBySlug(slug, controller.signal);
        setProduct(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || "Unable to load product. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [slug]);

  const attributes = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.fullAttributeResponseDtos) && product.fullAttributeResponseDtos.length > 0) {
      return product.fullAttributeResponseDtos;
    }
    if (Array.isArray(product.attributes) && product.attributes.length > 0) {
      return product.attributes;
    }
    return [];
  }, [product]);

  const properties = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.propertyRequestDtoList)) {
      return product.propertyRequestDtoList;
    }
    return [];
  }, [product]);

  const resolvedBrand = useMemo(() => {
    if (!product) return "—";
    return (
      (nameMap && product.brandId && nameMap.get(product.brandId)) ||
      product.brand ||
      product.brandName ||
      product.title?.split(" ")[0] ||
      "—"
    );
  }, [product, nameMap]);

  const resolvedCategory = useMemo(() => {
    if (!product) return "";
    return (
      (nameMap && product.categoryId && nameMap.get(product.categoryId)) ||
      product.category ||
      product.categoryName ||
      ""
    );
  }, [product, nameMap]);

  const resetSelection = () => setSelectedAttributes({});

  const selectAttribute = (label, value) => {
    setSelectedAttributes((previous) => ({
      ...previous,
      [label]: value,
    }));
  };

  const toggleMobileTab = (index) => {
    setOpenMobileTabs((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  const safeTab = Math.min(activeTab, Math.max(0, properties.length - 1));
  const activeProperty = properties[safeTab];
  const tableEntries = activeProperty?.tableOfContent
    ? Object.entries(activeProperty.tableOfContent)
    : [];

  if (loading) {
    return (
      <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 pt-[80px] sm:pt-[95px] md:pt-[110px] lg:pt-[148px] pb-12 font-sans">
        <div className="mx-auto w-full max-w-7xl animate-pulse space-y-6">
          <div className="h-4 w-64 rounded bg-gray-200" />
          <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[240px_minmax(0,1fr)_340px] xl:grid-cols-[280px_minmax(0,1fr)_360px]">
            <div className="h-64 rounded-2xl bg-gray-100" />
            <div className="space-y-4">
              <div className="h-7 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-100" />
              <div className="h-32 rounded-xl bg-gray-100" />
              <div className="h-10 w-48 rounded bg-gray-100" />
            </div>
            <div className="h-64 rounded-2xl bg-gray-100" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 pt-[80px] sm:pt-[95px] md:pt-[110px] lg:pt-[148px] pb-16 text-center font-sans">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-xl font-semibold text-gray-900">
            {error || "Product not found"}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please check the product URL and try again.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-block text-sm font-medium text-blue-700 hover:underline"
          >
            ← Back to All Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 pt-[80px] sm:pt-[95px] md:pt-[110px] lg:pt-[148px] pb-12 font-sans">
      <div className="mx-auto w-full max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
          <Link to="/" className="hover:text-blue-700 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <Link to="/products" className="hover:text-blue-700 transition-colors">
            All products
          </Link>
          {resolvedCategory && (
            <>
              <span className="text-gray-400">›</span>
              <span className="text-gray-600">{resolvedCategory}</span>
            </>
          )}
          <span className="text-gray-400">›</span>
          <span className="font-medium text-gray-800 line-clamp-1 max-w-xs sm:max-w-md">
            {product.title}
          </span>
        </nav>

        {/* Main Product Section: 3-column on Desktop, stacked on Mobile */}
        <section className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[240px_minmax(0,1fr)_340px] xl:grid-cols-[280px_minmax(0,1fr)_360px]">
          {/* Product image (left) */}
          <div className="flex items-center justify-center p-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="max-h-64 w-full max-w-[250px] object-contain"
              loading="eager"
            />
          </div>

          {/* Product details & attribute selectors (center, left-aligned text) */}
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold leading-snug text-gray-900">
              {product.title}
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Brand: <span className="font-semibold text-gray-900">{resolvedBrand}</span>
            </p>

            {/* Attributes Container */}
            {attributes.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                    Select attributes
                  </h2>

                  {Object.keys(selectedAttributes).length > 0 && (
                    <button
                      type="button"
                      onClick={resetSelection}
                      className="shrink-0 text-xs font-medium text-blue-700 hover:text-blue-900 cursor-pointer transition-colors"
                    >
                      ↻ Reset selection
                    </button>
                  )}
                </div>

                <div className="space-y-6 py-4">
                  {attributes.map((attribute, index) => {
                    const isFirst = index === 0;
                    const isDisabled =
                      isFirst
                        ? false
                        : !attributes
                            .slice(0, index)
                            .every((previous) => selectedAttributes[previous.label]);

                    const values = Array.isArray(attribute.values) ? attribute.values : [];
                    const prevAttr = attributes[index - 1];

                    return (
                      <div key={attribute.label || index}>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="text-xs sm:text-sm font-medium text-gray-900">
                            {attribute.label}
                            {attribute.unit ? ` (${attribute.unit})` : ""}
                          </h3>

                          {isDisabled && prevAttr && (
                            <span className="text-xs text-orange-600">
                              Select {prevAttr.label.toLowerCase()} first
                            </span>
                          )}
                        </div>

                        {values.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {values.map((value) => {
                              const selected = selectedAttributes[attribute.label] === value;

                              return (
                                <button
                                  key={value}
                                  type="button"
                                  disabled={isDisabled}
                                  onClick={() => selectAttribute(attribute.label, value)}
                                  className={`min-w-[50px] sm:min-w-[54px] rounded-lg border px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition cursor-pointer select-none ${
                                    selected
                                      ? "border-blue-700 bg-blue-50 font-semibold text-blue-800 shadow-2xs"
                                      : "border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-slate-50"
                                  } disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400`}
                                >
                                  {value}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {(attribute.min != null || attribute.max != null) && (
                          <p className="mt-1.5 text-xs text-gray-400">
                            Range: {attribute.min ?? "—"}–{attribute.max ?? "—"}{" "}
                            {attribute.unit || ""}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-4 max-w-xs">
              <label
                htmlFor="product-quantity"
                className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-800"
              >
                Specify quantity (in MT)
              </label>
              <input
                id="product-quantity"
                type="number"
                min="0.01"
                step="any"
                placeholder="e.g. 5"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          {/* Right Aside: Cart CTA & Promotional Banner (right) */}
          <aside className="space-y-4 lg:sticky lg:top-[144px]">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-2xs">
              <div className="rounded-xl bg-indigo-50/70 border border-indigo-100 px-3 py-3 text-xs sm:text-sm text-gray-800">
                To add to cart and submit requirements{" "}
                <Link to="/contact" className="font-semibold text-blue-700 hover:underline">
                  Contact Sales
                </Link>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-[#004060] bg-white px-4 py-2.5 text-sm font-semibold text-[#004060] hover:bg-blue-50 transition cursor-pointer shadow-2xs"
              >
                Add to cart
              </button>
            </div>

            {/* Promotional Banner */}
            <div className="relative flex min-h-36 items-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 p-5 text-white shadow-md">
              <div className="relative z-10 max-w-[80%]">
                <p className="text-[9px] font-bold uppercase tracking-wider text-blue-100">
                  Promotional offer
                </p>
                <h2 className="mt-2 text-lg sm:text-xl font-bold leading-tight">
                  Scale your business with better credit options
                </h2>
                <Link
                  to="/contact"
                  className="mt-3 inline-block rounded-full border border-white/60 bg-white/10 backdrop-blur-xs px-3 py-1 text-[10px] font-semibold hover:bg-white hover:text-blue-900 transition"
                >
                  Explore offers
                </Link>
              </div>
              <div className="absolute -bottom-5 -right-2 text-7xl font-bold opacity-15 select-none pointer-events-none">
                ₹
              </div>
            </div>
          </aside>
        </section>

        {/* Overview Section */}
        {product.overviewHtml && (
          <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-2xs">
            <div
              className="product-overview overflow-x-auto"
              dangerouslySetInnerHTML={{
                __html: product.overviewHtml ?? "",
              }}
            />
          </section>
        )}

        {/* Product Property Tabs (Desktop) & Accordions (Mobile) */}
        {properties.length > 0 && (
          <section className="mt-8">
            {/* Desktop View: Styled precisely like Image 1 */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs">
              <div
                role="tablist"
                aria-label="Product properties"
                className="flex w-full items-center border-b border-gray-200 bg-white"
              >
                {properties.map((property, index) => {
                  const isActive = safeTab === index;
                  return (
                    <button
                      key={property.heading || index}
                      id={`property-tab-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="property-panel"
                      onClick={() => setActiveTab(index)}
                      className={`flex-1 py-3.5 px-4 text-sm font-semibold transition cursor-pointer text-center ${
                        isActive
                          ? `text-blue-700 border-b-2 border-b-blue-700 -mb-px bg-white ${
                              index > 0 ? "border-l border-gray-200" : ""
                            } ${index < properties.length - 1 ? "border-r border-gray-200" : ""}`
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50/50"
                      }`}
                    >
                      {property.heading}
                    </button>
                  );
                })}
              </div>

              <div
                id="property-panel"
                role="tabpanel"
                aria-labelledby={`property-tab-${safeTab}`}
                className="w-full overflow-x-auto"
              >
                {tableEntries.length > 0 ? (
                  <table className="w-full border-collapse text-sm">
                    <tbody>
                      {tableEntries.map(([label, value]) => (
                        <tr
                          key={label}
                          className="border-b border-gray-100 last:border-b-0 hover:bg-slate-50/40 transition"
                        >
                          <th className="w-1/2 border-r border-gray-200 px-6 py-3.5 text-center font-normal text-gray-900">
                            {label}
                          </th>
                          <td className="w-1/2 px-6 py-3.5 text-center font-normal text-gray-700">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-8 text-center text-sm text-gray-500">
                    No properties specified for this section.
                  </div>
                )}
              </div>
            </div>

            {/* Mobile View: Collapsible Accordion styled precisely like Image 2 */}
            <div className="block md:hidden space-y-3">
              {properties.map((property, index) => {
                const isOpen = Boolean(openMobileTabs[index]);
                const entries = property.tableOfContent
                  ? Object.entries(property.tableOfContent)
                  : [];

                return (
                  <div
                    key={property.heading || index}
                    className="rounded-xl border border-gray-100 bg-[#F8FAFC] p-4 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileTab(index)}
                      className="flex w-full items-center justify-between text-left cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-semibold text-gray-900">
                        {property.heading}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-gray-500 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="mt-3.5 space-y-2.5">
                        {entries.length > 0 ? (
                          entries.map(([label, value]) => (
                            <div
                              key={label}
                              className="grid grid-cols-2 gap-3 text-xs sm:text-sm"
                            >
                              <span className="font-medium text-gray-900">
                                {label}
                              </span>
                              <span className="text-gray-700">{value}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-400">
                            No properties specified for this section.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

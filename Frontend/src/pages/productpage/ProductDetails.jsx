import { useEffect, useState, useMemo } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Loader2, AlertCircle, ShoppingBag, Check, ChevronDown, ChevronUp } from "lucide-react";
import { fetchProductBySlug, fetchActiveProducts } from "../../services/productService";
import { useDataProcess } from "../../services/dataProccess";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import ProductCard from "../../components/ui/ProductCard";

function parseAttributes(data) {
  if (!data) return [];
  if (Array.isArray(data.fullAttributeResponseDtos) && data.fullAttributeResponseDtos.length > 0) {
    return data.fullAttributeResponseDtos;
  }
  if (Array.isArray(data.attributes) && data.attributes.length > 0) {
    return data.attributes;
  }
  return [];
}

function buildInitialAttributeState(rawAttributes) {
  const initialAttrs = {};
  const initialCustomMode = {};

  rawAttributes.forEach((attr) => {
    const rawValues = Array.isArray(attr.values) ? attr.values : [];
    const presetValues = rawValues.filter(
      (v) =>
        v != null &&
        String(v).trim() !== "" &&
        String(v).trim().toLowerCase() !== String(attr.label).trim().toLowerCase()
    );

    if (presetValues.length > 0) {
      initialAttrs[attr.label] = String(presetValues[0]);
      initialCustomMode[attr.label] = false;
    } else if (attr.customInput) {
      initialAttrs[attr.label] = attr.min != null ? String(attr.min) : "";
      initialCustomMode[attr.label] = true;
    } else if (attr.min != null) {
      initialAttrs[attr.label] = String(attr.min);
      initialCustomMode[attr.label] = false;
    } else {
      initialAttrs[attr.label] = "";
      initialCustomMode[attr.label] = false;
    }
  });

  return { initialAttrs, initialCustomMode };
}

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { nameMap } = useDataProcess();
  const { isAuthenticated } = useAuth();
  const { addItemToCart, cartCount, maxLimit } = useCart();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [customMode, setCustomMode] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [currentPropertyHeading, setCurrentPropertyHeading] = useState("");
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartFeedback, setCartFeedback] = useState(null);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Load active products once for similar/related products lookup
  useEffect(() => {
    let isMounted = true;
    fetchActiveProducts().then((data) => {
      if (isMounted && Array.isArray(data)) {
        setAllProducts(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      setError("");
      setProduct(null);
      setSelectedAttributes({});
      setCustomMode({});
      setQuantity(1);
      setCartFeedback(null);
      setIsOverviewExpanded(false);
      setCurrentPropertyHeading("");

      try {
        const data = await fetchProductBySlug(slug, controller.signal);
        setProduct(data);
        if (data) {
          const mainImg =
            data.imageUrl ||
            data.image ||
            (Array.isArray(data.images) && data.images[0]) ||
            "";
          setActiveImage(mainImg);

          const attrs = parseAttributes(data);
          const { initialAttrs, initialCustomMode } = buildInitialAttributeState(attrs);
          setSelectedAttributes(initialAttrs);
          setCustomMode(initialCustomMode);
        }
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

  // Extract real technical attributes from API
  const attributes = useMemo(() => parseAttributes(product), [product]);

  // Extract real property tables from API
  const properties = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.propertyRequestDtoList) && product.propertyRequestDtoList.length > 0) {
      return product.propertyRequestDtoList;
    }
    if (Array.isArray(product.propertyTables) && product.propertyTables.length > 0) {
      return product.propertyTables;
    }
    return [];
  }, [product]);

  // Active property table for the Specifications section
  const activeProperty = useMemo(() => {
    if (!properties.length) return null;
    return properties.find((p) => p.heading === currentPropertyHeading) || properties[0];
  }, [properties, currentPropertyHeading]);

  // Extract gallery images
  const imageList = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) return product.images;
    if (Array.isArray(product.imageUrls) && product.imageUrls.length > 0) return product.imageUrls;
    if (product.imageUrl) return [product.imageUrl];
    if (product.image) return [product.image];
    return [];
  }, [product]);

  // Resolved taxonomy names via dataProcess nameMap
  const resolvedBrand = useMemo(() => {
    if (!product) return "";
    const b =
      (nameMap && product.brandId && nameMap.get(product.brandId)) ||
      product.brand ||
      product.brandName ||
      "";
    return b && b !== "—" ? b : "";
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

  const resolvedSubcategory = useMemo(() => {
    if (!product) return "";
    return (
      (nameMap && product.categoryTypeId && nameMap.get(product.categoryTypeId)) ||
      product.categoryType ||
      product.subcategory ||
      product.subCategoryName ||
      ""
    );
  }, [product, nameMap]);

  const resolvedGrade = useMemo(() => {
    if (!product) return "";
    return (
      (nameMap && product.gradeId && nameMap.get(product.gradeId)) ||
      product.grade ||
      product.gradeName ||
      ""
    );
  }, [product, nameMap]);

  // Related / Similar products matched by categoryVariantId, categoryTypeId, or categoryId
  const relatedProducts = useMemo(() => {
    if (!product || !allProducts.length) return [];

    const currentId = product.id || product._id;
    const currentSlug = product.slug;

    // Filter out current active product
    const otherProducts = allProducts.filter(
      (p) => (p.id || p._id) !== currentId && p.slug !== currentSlug
    );

    // 1. Same categoryVariantId
    if (product.categoryVariantId) {
      const variantMatches = otherProducts.filter(
        (p) => p.categoryVariantId === product.categoryVariantId
      );
      if (variantMatches.length >= 4) return variantMatches.slice(0, 4);
    }

    // 2. Same categoryTypeId (subcategory)
    if (product.categoryTypeId) {
      const typeMatches = otherProducts.filter(
        (p) => p.categoryTypeId === product.categoryTypeId
      );
      if (typeMatches.length >= 4) return typeMatches.slice(0, 4);
      if (typeMatches.length > 0) {
        const catMatches = otherProducts.filter(
          (p) => p.categoryId === product.categoryId && p.categoryTypeId !== product.categoryTypeId
        );
        return [...typeMatches, ...catMatches].slice(0, 4);
      }
    }

    // 3. Same categoryId
    if (product.categoryId) {
      const catMatches = otherProducts.filter(
        (p) => p.categoryId === product.categoryId
      );
      if (catMatches.length > 0) return catMatches.slice(0, 4);
    }

    return otherProducts.slice(0, 4);
  }, [product, allProducts]);

  const handleAttributeChange = (label, val) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [label]: val,
    }));
  };

  const handleAddToCart = async () => {
    setCartFeedback(null);

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: location,
          message: "Please sign in to add products to your cart.",
        },
      });
      return;
    }

    if (cartCount >= maxLimit) {
      setCartFeedback({
        type: "limit",
        message: `Maximum cart limit reached (${maxLimit} products). Please remove an existing item before adding a new one.`,
      });
      return;
    }

    // Validate attributes
    if (attributes.length > 0) {
      const missing = attributes.find((attr) => {
        const val = selectedAttributes[attr.label];
        return val === undefined || val === null || String(val).trim() === "";
      });

      if (missing) {
        setCartFeedback({
          type: "error",
          message: `Please specify ${missing.label} before adding to cart.`,
        });
        return;
      }

      // Check min/max bounds for numerical attributes
      for (const attr of attributes) {
        const valStr = String(selectedAttributes[attr.label]).trim();
        const valNum = Number(valStr);
        if (!isNaN(valNum) && valStr !== "") {
          if (attr.min != null && attr.min !== "" && valNum < Number(attr.min)) {
            setCartFeedback({
              type: "error",
              message: `${attr.label} must be at least ${attr.min} ${attr.unit || ""}.`,
            });
            return;
          }
          if (attr.max != null && attr.max !== "" && valNum > Number(attr.max)) {
            setCartFeedback({
              type: "error",
              message: `${attr.label} must be at most ${attr.max} ${attr.unit || ""}.`,
            });
            return;
          }
        }
      }
    }

    const qty = Math.max(1, Number(quantity) || 1);

    const selectedCartAttributes = attributes.map((attr) => ({
      label: attr.label,
      unit: attr.unit || "",
      value: String(selectedAttributes[attr.label] || ""),
    }));

    setAddingToCart(true);
    try {
      await addItemToCart({
        productSlug: product.slug,
        quantity: qty,
        selectedCartAttributes,
      });

      setCartFeedback({
        type: "success",
        message: "Product added to cart successfully!",
      });
    } catch (err) {
      setCartFeedback({
        type: err.isLimitError ? "limit" : "error",
        message: err.message || "Failed to add product to cart.",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleContactSupplier = () => {
    const specs = Object.entries(selectedAttributes)
      .filter(([, v]) => Boolean(v))
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");

    const quoteMsg = `Hello Evershine, I am interested in ${product?.title || "Product"}${
      specs ? ` with specifications: ${specs}` : ""
    }${quantity ? `, Quantity: ${quantity}` : ""}.`;

    const whatsappUrl = `https://wa.me/919860118911?text=${encodeURIComponent(quoteMsg)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] pt-[85px] sm:pt-[100px] md:pt-[115px] lg:pt-[135px] pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 font-sans">
        <div className="max-w-[1440px] mx-auto animate-pulse space-y-6">
          <div className="h-5 w-64 bg-slate-200 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_330px] gap-6 items-start">
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] gap-6">
                <div className="h-64 bg-slate-100 rounded-lg" />
                <div className="space-y-4">
                  <div className="h-5 w-28 bg-slate-200 rounded" />
                  <div className="h-8 w-3/4 bg-slate-200 rounded" />
                  <div className="h-20 w-full bg-slate-100 rounded" />
                  <div className="h-10 w-48 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-56 bg-white rounded-xl border border-slate-200/80 p-6" />
            </div>
            <div className="space-y-4">
              <div className="h-56 bg-slate-200 rounded-xl" />
              <div className="h-32 bg-white rounded-xl border border-slate-200/80" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] pt-[85px] sm:pt-[100px] md:pt-[115px] lg:pt-[135px] pb-16 px-4 sm:px-6 lg:px-8 font-sans text-center">
        <div className="max-w-xl mx-auto py-16 bg-white border border-[#e5eaf2] rounded-xl shadow-xs p-8">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {error || "Product Not Found"}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            The product you are looking for might have been moved or is currently unavailable.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block px-6 py-3 rounded-lg bg-[#004060] text-white text-sm sm:text-base font-bold hover:bg-[#003048] transition shadow-xs"
          >
            ← Back to All Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900 font-sans pt-[85px] sm:pt-[100px] md:pt-[115px] lg:pt-[135px] pb-16 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 mb-6 text-sm text-slate-500">
          <Link to="/" className="text-[#004060] hover:underline font-medium">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link to="/products" className="text-[#004060] hover:underline font-medium">
            Products
          </Link>
          {resolvedCategory && (
            <>
              <span className="text-slate-400">/</span>
              <Link
                to={`/category/${product.categoryId || encodeURIComponent(resolvedCategory)}`}
                className="text-[#004060] hover:underline font-medium"
              >
                {resolvedCategory}
              </Link>
            </>
          )}
          {resolvedSubcategory && (
            <>
              <span className="text-slate-400">/</span>
              <span className="text-slate-700 font-medium">{resolvedSubcategory}</span>
            </>
          )}
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
            {product.title}
          </span>
        </nav>

        {/* Main Product Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_330px] gap-6 items-start">
          {/* Left Column: Product Information & Configuration */}
          <div className="min-w-0 space-y-6">
            {/* Product Intro: Gallery + Summary */}
            <div className="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-8 p-6 sm:p-7 bg-white border border-[#e5eaf2] rounded-xl shadow-xs">
              {/* Image Gallery */}
              <div className="flex flex-col">
                <div className="relative h-[250px] sm:h-[280px] flex items-center justify-center bg-[#f0f3fa] rounded-xl p-4 border border-[#e2e8f1] overflow-hidden">
                  {/* Brand name badge over image */}
                  {resolvedBrand && (
                    <span className="absolute top-3 left-3 z-10 px-3.5 py-1.5 bg-white text-[#004060] rounded-md text-xs font-bold shadow-xs border border-slate-200">
                      {resolvedBrand}
                    </span>
                  )}
                  <img
                    src={activeImage || product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>

                {imageList.length > 1 && (
                  <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                    {imageList.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`w-[70px] h-[60px] p-1.5 bg-white rounded-lg border transition cursor-pointer shrink-0 ${
                          activeImage === img
                            ? "border-[#004060] ring-2 ring-[#004060]/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`View ${idx + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Summary */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Grade shown in place over product name (fallback to category if no grade) */}
                  {resolvedGrade ? (
                    <span className="text-[#004060] text-sm font-bold uppercase tracking-wider block">
                      Grade: {resolvedGrade}
                    </span>
                  ) : resolvedCategory ? (
                    <span className="text-[#004060] text-sm font-bold uppercase tracking-wider block">
                      {resolvedCategory}
                    </span>
                  ) : null}

                  <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    {product.title}
                  </h1>

                  {/* Product Overview: Clamped with "... More" / "Show Less" toggle */}
                  {product.overviewHtml ? (
                    <div className="mt-3">
                      <div className="relative">
                        <div
                          className={`product-overview text-base leading-relaxed text-slate-700 transition-all ${
                            !isOverviewExpanded ? "max-h-[145px] sm:max-h-[155px] overflow-hidden" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: product.overviewHtml }}
                        />
                        {!isOverviewExpanded && (
                          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsOverviewExpanded((prev) => !prev)}
                        className="mt-1.5 text-sm font-bold text-[#004060] hover:underline cursor-pointer inline-flex items-center gap-1"
                      >
                        {isOverviewExpanded ? "Show Less ↑" : "... More ↓"}
                      </button>
                    </div>
                  ) : product.description ? (
                    <div className="mt-3">
                      <p
                        className={`text-base text-slate-600 leading-relaxed max-w-2xl ${
                          !isOverviewExpanded ? "line-clamp-5" : ""
                        }`}
                      >
                        {product.description}
                      </p>
                      {product.description.length > 220 && (
                        <button
                          type="button"
                          onClick={() => setIsOverviewExpanded((prev) => !prev)}
                          className="mt-1.5 text-sm font-bold text-[#004060] hover:underline cursor-pointer inline-flex items-center gap-1"
                        >
                          {isOverviewExpanded ? "Show Less ↑" : "... More ↓"}
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Product Configuration Card */}
            {attributes.length > 0 && (
              <section className="p-6 sm:p-7 bg-white border border-[#e5eaf2] rounded-xl shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div>
                    <span className="block text-xs font-bold tracking-wider text-[#004060] uppercase mb-1">
                      CUSTOMIZE YOUR ORDER
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Product Configuration
                    </h2>
                  </div>
                  <span className="text-sm text-slate-500 hidden sm:inline font-medium">
                    Select your requirements
                  </span>
                </div>

                {/* Attributes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {attributes.map((attr, index) => {
                    const rawValues = Array.isArray(attr.values) ? attr.values : [];
                    const presetValues = rawValues.filter(
                      (v) =>
                        v != null &&
                        String(v).trim() !== "" &&
                        String(v).trim().toLowerCase() !== String(attr.label).trim().toLowerCase()
                    );
                    const isCustom = Boolean(attr.customInput);
                    const hasMinMax = attr.min != null || attr.max != null;
                    const isDirectCustomInput = isCustom && presetValues.length === 0;
                    const isSelectWithCustomOption = isCustom && presetValues.length > 0;

                    const currentValue = selectedAttributes[attr.label] || "";
                    const isCustomModeActive =
                      customMode[attr.label] ||
                      (isSelectWithCustomOption && currentValue && !presetValues.includes(currentValue));

                    return (
                      <div key={attr.label || index} className="min-w-0">
                        <label className="block text-sm font-semibold text-slate-800 mb-2">
                          {attr.label}
                          {attr.unit && !attr.label.includes(attr.unit) ? ` (${attr.unit})` : ""}
                        </label>

                        {isDirectCustomInput || isCustomModeActive ? (
                          <div>
                            <div className="relative">
                              <input
                                type="number"
                                step="any"
                                min={attr.min ?? undefined}
                                max={attr.max ?? undefined}
                                value={currentValue}
                                onChange={(e) => handleAttributeChange(attr.label, e.target.value)}
                                placeholder={
                                  attr.min && attr.max
                                    ? `${attr.min} - ${attr.max} ${attr.unit || ""}`
                                    : attr.min
                                    ? `Min ${attr.min} ${attr.unit || ""}`
                                    : attr.max
                                    ? `Max ${attr.max} ${attr.unit || ""}`
                                    : `Enter ${attr.label}`
                                }
                                className="w-full py-2.5 px-3.5 border border-slate-300 rounded-lg bg-white text-slate-900 text-sm sm:text-base focus:border-[#004060] focus:ring-2 focus:ring-[#004060]/10 outline-none transition"
                              />
                              {attr.unit && (
                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                                  {attr.unit}
                                </span>
                              )}
                            </div>

                            {isSelectWithCustomOption && (
                              <button
                                type="button"
                                onClick={() => {
                                  setCustomMode((prev) => ({ ...prev, [attr.label]: false }));
                                  handleAttributeChange(attr.label, presetValues[0] || "");
                                }}
                                className="mt-1.5 text-xs font-medium text-[#004060] hover:underline cursor-pointer"
                              >
                                ← Choose from presets
                              </button>
                            )}
                          </div>
                        ) : (
                          <div>
                            <select
                              value={currentValue}
                              onChange={(e) => {
                                if (e.target.value === "__CUSTOM__") {
                                  setCustomMode((prev) => ({ ...prev, [attr.label]: true }));
                                  handleAttributeChange(attr.label, "");
                                } else {
                                  handleAttributeChange(attr.label, e.target.value);
                                }
                              }}
                              className="w-full py-2.5 px-3.5 border border-slate-300 rounded-lg bg-[#f9fbfe] text-slate-900 text-sm sm:text-base focus:border-[#004060] focus:ring-2 focus:ring-[#004060]/10 outline-none transition cursor-pointer"
                            >
                              <option value="">Select {attr.label}</option>
                              {/* Highlighted Custom option comes FIRST if customInput is true */}
                              {isSelectWithCustomOption && (
                                <option
                                  value="__CUSTOM__"
                                  className="font-bold text-[#004060] bg-blue-50 py-1"
                                >
                                  ★ Custom Value (Enter Your Own)
                                </option>
                              )}
                              {presetValues.map((val) => (
                                <option key={val} value={val}>
                                  {val} {attr.unit && !String(val).includes(attr.unit) ? attr.unit : ""}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {hasMinMax && (
                          <p className="mt-1.5 text-xs text-slate-500 font-medium">
                            Range: {attr.min ?? "—"} – {attr.max ?? "—"} {attr.unit || ""}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Configuration Footer: Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-5 mt-7 pt-4">
                  {/* Quantity Control */}
                  <div className="min-w-[180px]">
                    <label htmlFor="product-quantity" className="block text-sm font-semibold text-slate-800 mb-2">
                      Quantity (Pieces / MT)
                    </label>
                    <div className="flex items-center h-11 border border-slate-300 rounded-lg overflow-hidden bg-white w-fit shadow-xs">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, (Number(q) || 1) - 1))}
                        className="w-10 h-full bg-[#f2f6fc] text-[#004060] text-xl font-bold hover:bg-[#e4ecf7] transition flex items-center justify-center cursor-pointer select-none"
                      >
                        −
                      </button>
                      <input
                        id="product-quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                        className="w-16 h-full text-center text-base font-bold text-slate-900 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => (Number(q) || 1) + 1)}
                        className="w-10 h-full bg-[#f2f6fc] text-[#004060] text-xl font-bold hover:bg-[#e4ecf7] transition flex items-center justify-center cursor-pointer select-none"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Purchase Action & Cart Feedback */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {cartFeedback && (
                      <div
                        className={`px-3.5 py-2.5 rounded-lg text-sm flex items-center gap-2 ${
                          cartFeedback.type === "success"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : cartFeedback.type === "limit"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-rose-50 text-rose-800 border border-rose-200"
                        }`}
                      >
                        {cartFeedback.type === "success" ? (
                          <Check className="w-4 h-4 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0" />
                        )}
                        <span className="font-semibold">{cartFeedback.message}</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                      className="min-h-[46px] px-8 rounded-lg text-sm sm:text-base font-bold transition cursor-pointer border border-[#004060] bg-[#004060] text-white hover:bg-[#003048] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs"
                    >
                      {addingToCart ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Adding to Cart...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Product Specifications Section (Only Property Tables) */}
            {properties.length > 0 && (
              <section className="p-6 sm:p-7 bg-white border border-[#e5eaf2] rounded-xl shadow-xs">
                <div
                  className="flex items-center justify-between cursor-pointer select-none"
                  onClick={() => setIsDetailsOpen((prev) => !prev)}
                >
                  <div>
                    <span className="block text-xs font-bold tracking-wider text-[#004060] uppercase mb-1">
                      TECHNICAL SPECIFICATIONS
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Product Specifications
                    </h2>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#f0f4fa] text-[#004060] flex items-center justify-center transition-colors hover:bg-slate-200">
                    {isDetailsOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#004060]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#004060]" />
                    )}
                  </span>
                </div>

                {isDetailsOpen && (
                  <>
                    {/* Responsive specification buttons: 2.5 visible on mobile viewport with full name display */}
                    {properties.length > 1 && (
                      <div className="flex gap-2.5 mt-5 overflow-x-auto pb-2 scrollbar-none snap-x">
                        {properties.map((p) => {
                          const isActive = activeProperty?.heading === p.heading;
                          return (
                            <button
                              key={p.heading}
                              type="button"
                              onClick={() => setCurrentPropertyHeading(p.heading)}
                              className={`w-[38%] min-w-[130px] max-w-[180px] sm:w-auto sm:max-w-none shrink-0 py-2.5 px-3 sm:px-5 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition cursor-pointer text-center leading-snug snap-start whitespace-normal sm:whitespace-nowrap flex items-center justify-center ${
                                isActive
                                  ? "bg-[#004060] text-white shadow-xs"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                              title={p.heading}
                            >
                              {p.heading}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Active Property Table content */}
                    {activeProperty && (
                      <div className="pt-4">
                        {/* Bold Table Heading */}
                        <div className="mb-3">
                          <h3 className="text-base sm:text-lg font-bold text-[#004060] tracking-wide uppercase">
                            {activeProperty.heading}
                          </h3>
                        </div>

                        {/* Key-Value rows */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                          {Object.entries(activeProperty.tableOfContent || {}).map(([label, value], itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition"
                            >
                              <span className="text-sm sm:text-base font-medium text-slate-600">
                                {label}
                              </span>
                              <span className="text-sm sm:text-base font-bold text-slate-900 text-right ml-4">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </section>
            )}
          </div>

          {/* Right Column: Sticky Purchase Assistance Sidebar */}
          <aside className="w-full flex flex-col gap-5 lg:sticky lg:top-[135px]">
            {/* Supplier Contact Card */}
            <div className="p-6 bg-gradient-to-br from-[#092e59] to-[#075da8] rounded-xl text-white shadow-xs">
              <span className="text-xs font-bold tracking-wider text-[#a9d3ff] uppercase block">
                NEED HELP WITH YOUR ORDER?
              </span>
              <h3 className="mt-3 text-lg sm:text-xl font-bold leading-snug">
                Let's find the right steel for your project.
              </h3>
              <p className="mt-2 text-sm text-[#d4e6f9] leading-relaxed">
                Connect with our team for pricing, bulk orders and product availability.
              </p>
              <button
                type="button"
                onClick={handleContactSupplier}
                className="w-full mt-5 py-3 px-4 bg-white text-[#004060] rounded-lg text-sm sm:text-base font-bold hover:bg-slate-100 transition cursor-pointer shadow-xs"
              >
                Contact Supplier →
              </button>
            </div>

            {/* Business Benefits Banner */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-[#0751c6] to-[#079ce6] text-white shadow-xs">
              <span className="text-xs font-bold tracking-wider text-blue-100 uppercase block">
                BUSINESS BENEFITS
              </span>
              <h3 className="mt-2 text-base sm:text-lg font-bold leading-snug">
                Grow your business with better credit options.
              </h3>
            </div>
          </aside>
        </section>

        {/* Similar / Related Products Section: 1x4 Grid with "See All" Option */}
        {relatedProducts.length > 0 && (
          <section className="mt-14 pt-10 border-t border-slate-200">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <span className="block text-xs font-bold tracking-wider text-[#004060] uppercase mb-1">
                  RELATED PRODUCTS
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Similar Products You May Be Interested In
                </h2>
              </div>
              <Link
                to={
                  product.categoryId
                    ? `/category/${product.categoryId}`
                    : "/products"
                }
                className="text-sm sm:text-base font-bold text-[#004060] hover:text-[#002d44] hover:underline flex items-center gap-1 shrink-0"
              >
                See All Products →
              </Link>
            </div>

            {/* 1 Row, 4 Columns Grid across all views */}
            <div className="grid grid-flow-col auto-cols-[minmax(240px,1fr)] overflow-x-auto md:grid-cols-4 md:grid-flow-row md:auto-cols-auto gap-4 md:gap-6 pb-4 scrollbar-thin">
              {relatedProducts.slice(0, 4).map((relProduct) => (
                <ProductCard
                  key={relProduct.id || relProduct.slug}
                  product={relProduct}
                  nameMap={nameMap}
                  brandName={nameMap?.get(relProduct.brandId) || relProduct.brand || ""}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

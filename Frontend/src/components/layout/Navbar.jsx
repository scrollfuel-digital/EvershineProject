import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Headphones } from "lucide-react";
import evershineLogo from "../../assets/Evershinelogo.png";
import {
    HiOutlineShoppingCart,
    HiOutlineSearch,
    HiOutlineChevronDown,
    HiX,
} from "react-icons/hi";

import { useDataProcess } from "../../services/dataProccess";
import { fetchActiveProducts } from "../../services/productService";

export default function Navbar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [cartItems] = useState([]);
    const [products, setProducts] = useState([]);

    const { categories = [], categoryTypesMap, categoryVariantsMap, nameMap } = useDataProcess();

    useEffect(() => {
        let isMounted = true;
        fetchActiveProducts().then((data) => {
            if (isMounted && Array.isArray(data)) {
                setProducts(data);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    // Sub-navbar dropdown and mobile states
    const [openMenu, setOpenMenu] = useState(null);
    const [isHover, setIsHover] = useState(null);
    const [mobileAccordionState, setMobileAccordionState] = useState({});
    const closeTimeout = useRef(null);
    const location = useLocation();

    // Core main navigation links
    const mainNavLinks = [
        { href: "/about", label: "About Us" },
        { href: "/products", label: "Products" },
        { href: "/blogs", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];

    const toggleMobileMenu = (id) => {
        setMobileAccordionState((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Auto-close dropdowns when URL path or query params change
    useEffect(() => {
        setOpenMenu(null);
        setIsHover(null);
        setIsMobileOpen(false);
        setIsCartOpen(false);
    }, [location.pathname, location.search]);

    const handleHover = (menuId) => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setOpenMenu(menuId);
    };

    const handleLeave = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        closeTimeout.current = setTimeout(() => {
            setOpenMenu(null);
            setIsHover(null);
        }, 150);
    };

    // Linear search over all active products matching category, type, variant, brand, or title (up to 6 items)
    const searchResults = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q || !Array.isArray(products) || products.length === 0) return [];

        const matches = [];
        for (let i = 0; i < products.length; i++) {
            const p = products[i];
            const title = (p.title || p.name || "").toLowerCase();
            const cat = (nameMap?.get(p.categoryId) || p.categoryName || "").toLowerCase();
            const type = (nameMap?.get(p.categoryTypeId) || p.categoryTypeName || "").toLowerCase();
            const variant = (nameMap?.get(p.categoryVariantId) || p.categoryVariantName || "").toLowerCase();
            const brand = (nameMap?.get(p.brandId) || p.brandName || p.brand || "").toLowerCase();

            if (
                title.includes(q) ||
                cat.includes(q) ||
                type.includes(q) ||
                variant.includes(q) ||
                brand.includes(q)
            ) {
                matches.push({
                    id: p.id,
                    title: p.title || p.name || "Untitled Product",
                    brand: nameMap?.get(p.brandId) || p.brandName || p.brand || "",
                    image: p.imageUrl || p.img || null,
                    href: `/products/${p.slug || p.id}`,
                });
                if (matches.length >= 6) break;
            }
        }
        return matches;
    }, [search, products, nameMap]);

    const totalCartCount = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.qty || 1), 0);
    }, [cartItems]);

    // Reusable search bar input with auto-complete dropdown
    const renderSearchBar = (isMobile = false) => (
        <div className="relative w-full">
            <div className={`flex items-center bg-slate-100/90 hover:bg-slate-100 rounded-xl border border-transparent px-3 sm:px-4 ${isMobile ? "h-[40px]" : "h-[38px] sm:h-[42px]"} transition-all duration-300 focus-within:border-primary focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,64,96,0.08)]`}>
                <HiOutlineSearch className="text-slate-500 text-base sm:text-lg shrink-0" />
                <input
                    type="text"
                    placeholder="Search categories, products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 min-w-0 pl-2 sm:pl-3 pr-2 text-xs sm:text-sm bg-transparent text-dark placeholder-slate-400 outline-none"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                        aria-label="Clear search"
                    >
                        <HiX className="text-sm" />
                    </button>
                )}
            </div>

            {/* Live Search Auto-complete Dropdown */}
            {search.trim() && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-[380px] overflow-y-auto">
                    {searchResults.length > 0 ? (
                        <div className="py-1.5 divide-y divide-slate-100">
                            {searchResults.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.href}
                                    onClick={() => setSearch("")}
                                    className="flex items-center gap-3.5 px-3.5 py-2.5 hover:bg-slate-50 transition-colors group cursor-pointer"
                                >
                                    {/* Left: Product Image */}
                                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <span className="text-[10px] text-slate-400 font-medium">No img</span>
                                        )}
                                    </div>

                                    {/* Right: Title & Brand Name */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                                            {item.title}
                                        </h4>
                                        {item.brand ? (
                                            <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                                                Brand: <span className="text-slate-700 font-semibold">{item.brand}</span>
                                            </p>
                                        ) : (
                                            <p className="text-[11px] sm:text-xs text-slate-400 font-normal mt-0.5">
                                                Steel Product
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-6 text-center text-xs sm:text-sm text-slate-500">
                            No matching products found
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm">
            {/* ================= 1. PRIMARY MAIN NAVBAR (TOP TIER) ================= */}
            <div className="w-full border-b border-light-gray bg-white">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 h-[64px] sm:h-[72px] lg:h-[84px] flex items-center justify-between gap-3 lg:gap-6">

                    {/* LEFT SECTION: LOGO + MAIN NAV LINKS */}
                    <div className="flex items-center gap-4 lg:gap-6 shrink-0 h-full">
                        {/* Logo -> Redirect to Home with restored dimensions */}
                        <Link
                            to="/"
                            className="shrink-0 flex items-center h-full overflow-hidden transition-transform duration-300 ease-out hover:scale-105"
                            title="Evershine Solution - Home"
                        >
                            <img
                                src={evershineLogo}
                                alt="Evershine Solution Logo"
                                className="h-[150%] max-h-[100px] sm:max-h-[150px] lg:max-h-[170px] xl:h-[270%] xl:max-h-[164px] w-auto object-contain"
                            />
                        </Link>

                        {/* Core Nav Links (About Us, Products, Blog, Contact) */}
                        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                            {mainNavLinks.map((link) => {
                                const isActive = location.pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-[13.5px] xl:text-[14px] font-medium transition-colors duration-150 whitespace-nowrap ${
                                            isActive
                                                ? "text-primary bg-slate-100/80 font-semibold"
                                                : "text-slate-700 hover:text-primary hover:bg-slate-50"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* CENTER SECTION: DESKTOP SEARCH BAR (Takes all available space) */}
                    <div className="hidden md:block flex-1 min-w-0 max-w-[580px] xl:max-w-[720px] mx-2 lg:mx-4">
                        {renderSearchBar(false)}
                    </div>

                    {/* VACANT MIDDLE SPACE (PHONE VIEW ONLY) */}
                    <div className="flex-1 md:hidden" />

                    {/* RIGHT SECTION (DESKTOP): CART FLYOUT & SIGN IN BUTTON */}
                    <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
                        {/* Cart Trigger */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsCartOpen((prev) => !prev)}
                                className="relative flex items-center justify-center p-2 rounded-lg text-primary hover:bg-slate-100 transition-colors cursor-pointer group"
                                aria-label="Open Cart"
                            >
                                <HiOutlineShoppingCart className="text-2xl transition-transform duration-200 group-hover:scale-110" />
                                {totalCartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[11px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-sm">
                                        {totalCartCount}
                                    </span>
                                )}
                            </button>

                            {/* Cart Flyout Modal */}
                            {isCartOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsCartOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 w-[85vw] sm:w-[340px] max-w-[340px] bg-white border border-light-gray rounded-xl shadow-[0_16px_40px_rgba(0,64,96,0.15)] z-50 overflow-hidden animate-[popIn_0.2s_ease-out]">
                                        <div className="flex items-center justify-between px-5 py-4 border-b border-light-gray">
                                            <h4 className="text-sm font-semibold text-dark">
                                                Your Cart {totalCartCount > 0 ? `(${totalCartCount})` : ""}
                                            </h4>
                                            <button
                                                type="button"
                                                onClick={() => setIsCartOpen(false)}
                                                className="text-gray transition-all duration-200 hover:text-dark hover:rotate-90 cursor-pointer"
                                            >
                                                <HiX className="text-lg" />
                                            </button>
                                        </div>

                                        {cartItems.length > 0 ? (
                                            <>
                                                <div className="max-h-[50vh] sm:max-h-[340px] overflow-y-auto py-2">
                                                    {cartItems.map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center justify-between px-5 py-2.5 text-xs sm:text-sm text-dark border-b border-slate-50 last:border-b-0"
                                                        >
                                                            <div>
                                                                <p className="font-medium text-slate-800">{item.name}</p>
                                                                <span className="text-gray text-xs">Qty: {item.qty}</span>
                                                            </div>
                                                            <span className="font-semibold text-primary">{item.price}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="p-4 border-t border-light-gray bg-slate-50/50">
                                                    <Link
                                                        to="/products"
                                                        onClick={() => setIsCartOpen(false)}
                                                        className="block text-center w-full py-2.5 px-4 bg-primary text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-secondary transition-colors"
                                                    >
                                                        View Cart & Checkout
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="py-8 px-5 text-center flex flex-col items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2.5">
                                                    <HiOutlineShoppingCart className="text-2xl text-slate-400" />
                                                </div>
                                                <p className="text-sm font-semibold text-slate-800">Your cart is empty</p>
                                                <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
                                                    Looks like you haven't added any products yet.
                                                </p>
                                                <Link
                                                    to="/products"
                                                    onClick={() => setIsCartOpen(false)}
                                                    className="inline-flex items-center justify-center py-2 px-4 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-secondary transition-colors"
                                                >
                                                    Explore Products
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sign In Button */}
                        <Link
                            to="/admin"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-primary text-white hover:bg-secondary transition-all shadow-sm active:scale-95 whitespace-nowrap"
                        >
                            Sign In
                        </Link>
                    </div>

                    {/* RIGHT SECTION (PHONE / TABLET VIEW): CART + ANIMATED HAMBURGER MENU */}
                    <div className="flex md:hidden items-center gap-1.5 shrink-0">
                        {/* Mobile Cart Trigger */}
                        <button
                            type="button"
                            onClick={() => setIsCartOpen((prev) => !prev)}
                            className="relative flex items-center justify-center p-2 rounded-lg text-primary hover:bg-slate-100 transition-colors"
                            aria-label="Open Cart"
                        >
                            <HiOutlineShoppingCart className="text-2xl" />
                            {totalCartCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 bg-primary text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                                    {totalCartCount}
                                </span>
                            )}
                        </button>

                        {/* Animated Hamburger Trigger (Right side in phone view) */}
                        <button
                            type="button"
                            onClick={() => setIsMobileOpen((prev) => !prev)}
                            aria-expanded={isMobileOpen}
                            aria-label="Toggle navigation menu"
                            className="flex items-center justify-center w-10 h-10 rounded-lg text-primary hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                            <div className="w-5 h-4 relative flex flex-col justify-between items-center pointer-events-none">
                                <span
                                    className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                                        isMobileOpen ? "rotate-45 translate-y-[7px]" : ""
                                    }`}
                                />
                                <span
                                    className={`w-full h-0.5 bg-current rounded-full transition-all duration-200 ${
                                        isMobileOpen ? "opacity-0 scale-x-0" : "opacity-100"
                                    }`}
                                />
                                <span
                                    className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                                        isMobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                                    }`}
                                />
                            </div>
                        </button>
                    </div>

                </div>

                {/* FULL-WIDTH SEARCH BAR IN PHONE VIEW (Below logo/cart/hamburger row) */}
                <div className="w-full px-4 pb-2.5 pt-0.5 md:hidden">
                    {renderSearchBar(true)}
                </div>
            </div>

            {/* ================= 2. SECOND NAVBAR: CATEGORIES (DropdownNavigation) ================= */}
            <div className="w-full bg-white border-b border-slate-200/90 hidden md:block select-none shadow-[0_1px_2px_rgba(0,0,0,0.03)] z-40 relative">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 h-[44px] flex items-center text-sm relative">
                    <ul className="relative flex items-center space-x-1 h-full">
                        {categories.map((category, index) => {
                            const types = Array.isArray(category.types) && category.types.length > 0
                                ? category.types
                                : (categoryTypesMap?.get(category.id) || []);
                            const hasTypes = types.length > 0;
                            const isOpen = openMenu === category.id;

                            const hasAnyVariants = types.some((t) => {
                                const v = Array.isArray(t.variants) && t.variants.length > 0
                                    ? t.variants
                                    : (categoryVariantsMap?.get(t.id) || []);
                                return v.length > 0;
                            });

                            const isRightAligned = index > categories.length / 2;

                            return (
                                <li
                                    key={category.id || category.name}
                                    className="relative h-full flex items-center"
                                    onMouseEnter={() => handleHover(category.id)}
                                    onMouseLeave={handleLeave}
                                >
                                    <Link
                                        to={`/products?category=${encodeURIComponent(category.name)}`}
                                        className="text-[13px] xl:text-[13.5px] font-medium py-1.5 px-3 flex cursor-pointer group transition-colors duration-200 items-center justify-center gap-1 text-slate-700 hover:text-primary relative rounded-full"
                                        onMouseEnter={() => setIsHover(category.id)}
                                        onMouseLeave={() => setIsHover(null)}
                                        onClick={() => setOpenMenu(null)}
                                    >
                                        <span>{category.name}</span>
                                        {hasTypes && (
                                            <ChevronDown
                                                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                                                    isOpen ? "rotate-180 text-primary" : "text-slate-400 group-hover:text-primary"
                                                }`}
                                            />
                                        )}
                                        {(isHover === category.id || isOpen) && (
                                            <motion.div
                                                layoutId="cat-hover-bg"
                                                className="absolute inset-0 size-full bg-primary/10 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                                            />
                                        )}
                                    </Link>

                                    <AnimatePresence>
                                        {isOpen && hasTypes && (
                                            <div
                                                className={`w-auto absolute top-full pt-1.5 z-50 ${
                                                    isRightAligned ? "right-0" : "left-0"
                                                }`}
                                                onMouseEnter={() => {
                                                    if (closeTimeout.current) clearTimeout(closeTimeout.current);
                                                }}
                                                onMouseLeave={handleLeave}
                                            >
                                                {/* Hover Bridge */}
                                                <div className="absolute -top-3 left-0 right-0 h-4" />

                                                <motion.div
                                                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                                    transition={{ duration: 0.18, ease: "easeOut" }}
                                                    className="bg-white border border-slate-200/90 shadow-xl rounded-2xl p-5 w-max max-w-[85vw]"
                                                >
                                                    {hasAnyVariants ? (
                                                        <div className="w-fit shrink-0 flex gap-8 overflow-hidden">
                                                            {types.map((type) => {
                                                                const variants = Array.isArray(type.variants) && type.variants.length > 0
                                                                    ? type.variants
                                                                    : (categoryVariantsMap?.get(type.id) || []);
                                                                return (
                                                                    <div key={type.id || type.name} className="min-w-[140px] shrink-0">
                                                                        <Link
                                                                            to={`/products?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(type.name)}`}
                                                                            onClick={() => setOpenMenu(null)}
                                                                            className="text-sm xl:text-[14.5px] font-semibold text-primary hover:text-secondary transition-colors block pb-2 border-b border-slate-100 whitespace-nowrap"
                                                                        >
                                                                            {type.name}
                                                                        </Link>
                                                                        {variants.length > 0 && (
                                                                            <ul className="pt-2 space-y-2">
                                                                                {variants.map((v) => (
                                                                                    <li key={v.id || v.name}>
                                                                                        <Link
                                                                                            to={`/products?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(v.name)}`}
                                                                                            onClick={() => setOpenMenu(null)}
                                                                                            className="text-[13px] xl:text-[13.5px] font-medium text-slate-600 hover:text-primary transition-colors block whitespace-nowrap"
                                                                                        >
                                                                                            {v.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <div className="flex gap-4 p-0.5">
                                                            {types.map((type) => (
                                                                <Link
                                                                    key={type.id || type.name}
                                                                    to={`/products?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(type.name)}`}
                                                                    onClick={() => setOpenMenu(null)}
                                                                    className="text-sm xl:text-[14.5px] font-semibold text-primary hover:text-secondary transition-colors block whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-slate-50"
                                                                >
                                                                    {type.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* ================= 3. MOBILE MENU DRAWER ================= */}
            <div
                className={`md:hidden overflow-hidden bg-white border-t border-slate-200 transition-all duration-300 ease-out ${
                    isMobileOpen ? "max-h-[calc(100vh-116px)] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
                    {/* MOBILE CORE NAVIGATION LINKS */}
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                            Navigation
                        </span>
                        <Link
                            to="/"
                            onClick={() => setIsMobileOpen(false)}
                            className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                        >
                            Home
                        </Link>
                        {mainNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`px-3 py-2 text-sm font-semibold rounded-lg ${
                                    location.pathname === link.href
                                        ? "text-primary bg-slate-100/80"
                                        : "text-slate-800 hover:bg-slate-50"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* MOBILE CATEGORIES ACCORDION */}
                    <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                            Product Categories
                        </span>
                        {categories.map((category) => {
                            const types = Array.isArray(category.types) && category.types.length > 0
                                ? category.types
                                : (categoryTypesMap?.get(category.id) || []);
                            const isOpen = Boolean(mobileAccordionState[category.id]);
                            return (
                                <div key={category.id || category.name} className="border border-slate-200 rounded-lg overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => toggleMobileMenu(category.id)}
                                        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 text-sm font-medium text-slate-800 cursor-pointer"
                                    >
                                        <span>{category.name}</span>
                                        <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    {isOpen && (
                                        <div className="p-2.5 bg-white space-y-1.5 border-t border-slate-100">
                                            {types.length > 0 ? (
                                                <>
                                                    <Link
                                                        to={`/products?category=${encodeURIComponent(category.name)}`}
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="block px-2 py-1 text-xs font-semibold text-primary hover:underline border-b border-slate-100 mb-1"
                                                    >
                                                        All {category.name}
                                                    </Link>
                                                    {types.map((type) => {
                                                    const variants = Array.isArray(type.variants) && type.variants.length > 0
                                                        ? type.variants
                                                        : (categoryVariantsMap?.get(type.id) || []);
                                                    if (variants.length > 0) {
                                                        return (
                                                            <div key={type.id || type.name} className="space-y-0.5">
                                                                <Link
                                                                    to={`/products?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(type.name)}`}
                                                                    onClick={() => setIsMobileOpen(false)}
                                                                    className="block px-2 py-1 text-sm font-semibold text-primary hover:underline"
                                                                >
                                                                    {type.name}
                                                                </Link>
                                                                <div className="pl-3 space-y-0.5 border-l border-slate-100 ml-2">
                                                                    {variants.map((v) => (
                                                                        <Link
                                                                            key={v.id || v.name}
                                                                            to={`/products?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(v.name)}`}
                                                                            onClick={() => setIsMobileOpen(false)}
                                                                            className="block px-2 py-1 text-sm font-medium text-slate-700 hover:text-primary"
                                                                        >
                                                                            {v.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <Link
                                                            key={type.id || type.name}
                                                            to={`/products?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(type.name)}`}
                                                            onClick={() => setIsMobileOpen(false)}
                                                            className="block px-2 py-1 text-sm font-semibold text-primary hover:underline"
                                                        >
                                                            {type.name}
                                                        </Link>
                                                    );
                                                })}
                                                </>
                                            ) : (
                                                <Link
                                                    to={`/products?category=${encodeURIComponent(category.name)}`}
                                                    onClick={() => setIsMobileOpen(false)}
                                                    className="block px-2 py-1 text-sm font-medium text-slate-700 hover:text-primary"
                                                >
                                                    View all {category.name}
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Mobile Help & Support Action */}
                        <a
                            href="tel:+919860118911"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-50 text-[#1849A9] text-xs font-semibold mt-1"
                        >
                            <Headphones className="w-4 h-4" />
                            <span>Help Helpline: +91 9860118911</span>
                        </a>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* MOBILE BOTTOM ACTIONS: SIGN IN & CART */}
                    <div className="flex flex-col gap-2 pt-1 pb-3">
                        <Link
                            to="/admin"
                            onClick={() => setIsMobileOpen(false)}
                            className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-secondary transition-colors"
                        >
                            Sign In
                        </Link>
                        <button
                            type="button"
                            onClick={() => {
                                setIsCartOpen(true);
                                setIsMobileOpen(false);
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-200 text-primary text-sm font-semibold hover:bg-slate-50 transition-colors"
                        >
                            <HiOutlineShoppingCart className="text-lg" />
                            <span>View Cart {totalCartCount > 0 ? `(${totalCartCount})` : ""}</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Headphones, User, LogOut, X, Loader2 } from "lucide-react";
import evershineLogo from "../../assets/evershine png.png";
import {
    HiOutlineShoppingCart,
    HiOutlineSearch,
    HiOutlineChevronDown,
    HiX,
} from "react-icons/hi";

import { useDataProcess } from "../../services/dataProccess";
import { fetchActiveProducts } from "../../services/productService";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { getUserInfo } from "../../services/authService";

function CategoryNavItem({
    category,
    isOpen,
    isHover,
    types,
    hasTypes,
    hasAnyVariants,
    categoryVariantsMap,
    handleHover,
    handleLeave,
    setIsHover,
    setOpenMenu,
    closeTimeout,
}) {
    const liRef = useRef(null);
    const dropdownRef = useRef(null);

    useLayoutEffect(() => {
        if (!isOpen) return;

        const el = dropdownRef.current;
        const liEl = liRef.current;
        if (!el || !liEl) return;

        const updatePosition = () => {
            const liRect = liEl.getBoundingClientRect();
            // offsetWidth returns the natural unscaled layout width of the dropdown
            const dropdownWidth = el.offsetWidth;
            const viewportWidth = window.innerWidth;
            const screenPadding = 16;

            const liCenter = liRect.left + liRect.width / 2;
            const isRightHalf = liCenter > viewportWidth / 2;

            let targetLeft = isRightHalf
                ? liRect.right - dropdownWidth
                : liRect.left;

            if (targetLeft + dropdownWidth > viewportWidth - screenPadding) {
                targetLeft = viewportWidth - screenPadding - dropdownWidth;
            }
            if (targetLeft < screenPadding) {
                targetLeft = screenPadding;
            }

            const offsetLeft = targetLeft - liRect.left;
            el.style.left = `${Math.round(offsetLeft)}px`;
            el.style.right = "auto";
        };

        updatePosition();
        window.addEventListener("resize", updatePosition, { passive: true });
        window.addEventListener("scroll", updatePosition, { passive: true });

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition);
        };
    }, [isOpen]);

    return (
        <li
            ref={liRef}
            className="relative h-full flex items-center shrink-0"
            onMouseEnter={() => handleHover(category.id)}
            onMouseLeave={handleLeave}
        >
            <Link
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="text-[12.5px] xl:text-[13.5px] font-medium py-1.5 px-2.5 xl:px-3 flex cursor-pointer group transition-colors duration-200 items-center justify-center gap-1 text-white/90 hover:text-[#FBBF24] relative rounded-full whitespace-nowrap"
                onMouseEnter={() => setIsHover(category.id)}
                onMouseLeave={() => setIsHover(null)}
                onClick={() => setOpenMenu(null)}
            >
                <span>{category.name}</span>
                {hasTypes && (
                    <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-[#FBBF24]" : "text-white/60 group-hover:text-[#FBBF24]"
                        }`}
                    />
                )}
                {(isHover === category.id || isOpen) && (
                    <motion.div
                        layoutId="cat-hover-bg"
                        className="absolute inset-0 size-full bg-white/10 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                    />
                )}
            </Link>

            <AnimatePresence>
                {isOpen && hasTypes && (
                    <div
                        ref={dropdownRef}
                        className="w-auto absolute top-full pt-1.5 z-50 left-0"
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
                            className="bg-white border border-slate-200/90 shadow-xl rounded-2xl p-4 sm:p-5 w-max max-w-[calc(100vw-32px)] sm:max-w-[calc(100vw-48px)] lg:max-w-[calc(100vw-64px)]"
                        >
                            {hasAnyVariants ? (
                                <div className="w-full flex gap-6 lg:gap-8 overflow-x-auto max-h-[calc(100vh-140px)] overflow-y-auto p-0.5 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent]">
                                    {types.map((type) => {
                                        const variants = Array.isArray(type.variants) && type.variants.length > 0
                                            ? type.variants
                                            : (categoryVariantsMap?.get(type.id) || []);
                                        return (
                                            <div key={type.id || type.name} className="min-w-[130px] sm:min-w-[145px] shrink-0">
                                                <Link
                                                    to={`/products?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(type.name)}`}
                                                    onClick={() => setOpenMenu(null)}
                                                    className="text-sm xl:text-[14.5px] font-semibold text-primary hover:text-secondary transition-colors block pb-2 border-b border-slate-100 whitespace-nowrap"
                                                >
                                                    {type.name}
                                                </Link>
                                                {variants.length > 0 && (
                                                    <ul className="pt-2 space-y-1.5 sm:space-y-2">
                                                        {variants.map((v) => (
                                                            <li key={v.id || v.name}>
                                                                <Link
                                                                    to={`/products?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(v.name)}`}
                                                                    onClick={() => setOpenMenu(null)}
                                                                    className="text-[12.5px] xl:text-[13px] font-medium text-slate-600 hover:text-primary transition-colors block whitespace-nowrap"
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
                                <div className="flex flex-wrap gap-2 sm:gap-3 p-1 max-w-[calc(100vw-48px)]">
                                    {types.map((type) => (
                                        <Link
                                            key={type.id || type.name}
                                            to={`/products?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(type.name)}`}
                                            onClick={() => setOpenMenu(null)}
                                            className="text-sm xl:text-[14px] font-semibold text-primary hover:text-secondary transition-colors block whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-slate-50"
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
}

export default function Navbar() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { cartCount, openCart } = useCart();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [search, setSearch] = useState("");
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
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [infoLoading, setInfoLoading] = useState(false);
    const [infoError, setInfoError] = useState(null);
    const closeTimeout = useRef(null);
    const location = useLocation();

    const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : "U";

    const handleViewInfo = async () => {
        setIsProfileOpen(false);
        setIsInfoModalOpen(true);
        if (!userInfo) {
            setInfoLoading(true);
            setInfoError(null);
            try {
                const data = await getUserInfo();
                setUserInfo(data);
            } catch {
                setInfoError("Unable to fetch user information at this time.");
            } finally {
                setInfoLoading(false);
            }
        }
    };

    const handleLogout = () => {
        setIsProfileOpen(false);
        setIsInfoModalOpen(false);
        setUserInfo(null);
        logout();
    };

    // Core main navigation links
    const mainNavLinks = [
        { href: "/about", label: "About Us" },
        { href: "/products", label: "Products" },
        { href: "/blogs", label: "Blog" },
        { href: "/contact", label: "Contact & FAQs" },
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
        setIsProfileOpen(false);
        setIsInfoModalOpen(false);
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

    // Reusable search bar input with auto-complete dropdown
    const renderSearchBar = (isMobile = false) => (
        <div className="relative w-full">
            <div className={`flex items-center bg-white rounded-xl border border-white/20 px-3 sm:px-4 ${isMobile ? "h-[40px]" : "h-[38px] sm:h-[42px]"} transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FBBF24] shadow-xs`}>
                <HiOutlineSearch className="text-slate-400 text-base sm:text-lg shrink-0" />
                <input
                    type="text"
                    placeholder="Search categories, products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 min-w-0 pl-2 sm:pl-3 pr-2 text-xs sm:text-sm bg-transparent text-slate-800 placeholder-slate-400 outline-none"
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
        <header className="fixed top-0 left-0 z-50 w-full bg-[#004060] shadow-md">
            {/* ================= 1. PRIMARY MAIN NAVBAR (TOP TIER) ================= */}
            <div className="w-full border-b border-white/10 bg-[#004060]">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 h-[64px] sm:h-[72px] lg:h-[84px] flex items-center justify-between gap-3 lg:gap-6">

                    {/* LEFT SECTION: LOGO + MAIN NAV LINKS */}
                    <div className="flex items-center gap-4 lg:gap-6 shrink-0 h-full">
                        {/* Logo -> Redirect to Home */}
                        <Link
                            to="/"
                            className="shrink-0 flex items-center bg-[#fabd23] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-xs transition-transform duration-300 ease-out hover:scale-105"
                            title="Evershine Solution - Home"
                        >
                            <img
                                src={evershineLogo}
                                alt="Evershine Solution Logo"
                                className="h-[36px] sm:h-[42px] lg:h-[48px] w-auto object-contain"
                            />
                        </Link>

                        {/* Core Nav Links (About Us, Products, Blog, Contact & FAQs) */}
                        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                            {mainNavLinks.map((link) => {
                                const isActive = location.pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-[13.5px] xl:text-[14px] font-semibold transition-colors duration-150 whitespace-nowrap ${
                                            isActive
                                                ? "text-[#FBBF24] bg-white/10"
                                                : "text-white/90 hover:text-white hover:bg-white/10"
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
                                onClick={openCart}
                                className="relative flex items-center justify-center p-2 rounded-lg text-white hover:text-[#FBBF24] hover:bg-white/10 transition-colors cursor-pointer group"
                                aria-label="Open Cart"
                                title="Enquiry Cart"
                            >
                                <HiOutlineShoppingCart className="text-2xl transition-transform duration-200 group-hover:scale-110" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#FBBF24] text-[#004060] text-[11px] font-black rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Authentication Actions */}
                        {isAuthenticated ? (
                            <div className="relative flex items-center gap-2">
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-all shadow-sm whitespace-nowrap"
                                    >
                                        Admin Panel
                                    </Link>
                                )}

                                {/* Profile Circle Button */}
                                <button
                                    type="button"
                                    onClick={() => setIsProfileOpen((prev) => !prev)}
                                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#004060] font-black text-sm sm:text-base flex items-center justify-center hover:bg-slate-100 transition-transform active:scale-95 shadow-sm focus:outline-none cursor-pointer uppercase shrink-0"
                                    title="Account Profile"
                                    aria-label="Account Profile"
                                    aria-expanded={isProfileOpen}
                                >
                                    {userInitial}
                                </button>

                                {/* Profile Popup Dropdown */}
                                {isProfileOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setIsProfileOpen(false)}
                                        />
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-[popIn_0.15s_ease-out]">
                                            <button
                                                type="button"
                                                onClick={handleViewInfo}
                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-left cursor-pointer"
                                            >
                                                <User className="w-4 h-4 text-slate-500" />
                                                <span>View Info</span>
                                            </button>
                                            <div className="border-t border-slate-100 my-1" />
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                                            >
                                                <LogOut className="w-4 h-4 text-rose-500" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#FBBF24] text-[#004060] hover:bg-[#F59E0B] transition-all shadow-sm active:scale-95 whitespace-nowrap"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* RIGHT SECTION (PHONE / TABLET VIEW): CART + ANIMATED HAMBURGER MENU */}
                    <div className="flex md:hidden items-center gap-1.5 shrink-0">
                        {/* Mobile Cart Trigger */}
                        <button
                            type="button"
                            onClick={openCart}
                            className="relative flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Open Cart"
                            title="Enquiry Cart"
                        >
                            <HiOutlineShoppingCart className="text-2xl" />
                            {cartCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 bg-[#FBBF24] text-[#004060] text-[10px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Animated Hamburger Trigger (Right side in phone view) */}
                        <button
                            type="button"
                            onClick={() => setIsMobileOpen((prev) => !prev)}
                            aria-expanded={isMobileOpen}
                            aria-label="Toggle navigation menu"
                            className="flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
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
            <div className="w-full bg-[#003860] border-b border-white/10 hidden md:block select-none shadow-[0_1px_2px_rgba(0,0,0,0.08)] z-40 relative">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 h-[44px] flex items-center text-sm relative">
                    <ul className="relative flex items-center space-x-0.5 xl:space-x-1 h-full">
                        {categories.map((category) => {
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

                            return (
                                <CategoryNavItem
                                    key={category.id || category.name}
                                    category={category}
                                    isOpen={isOpen}
                                    isHover={isHover}
                                    types={types}
                                    hasTypes={hasTypes}
                                    hasAnyVariants={hasAnyVariants}
                                    categoryVariantsMap={categoryVariantsMap}
                                    handleHover={handleHover}
                                    handleLeave={handleLeave}
                                    setIsHover={setIsHover}
                                    setOpenMenu={setOpenMenu}
                                    closeTimeout={closeTimeout}
                                />
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

                    {/* MOBILE BOTTOM ACTIONS: SIGN IN / OUT & CART */}
                    <div className="flex flex-col gap-2 pt-1 pb-3">
                        {isAuthenticated ? (
                            <>
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        onClick={() => setIsMobileOpen(false)}
                                        className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-secondary transition-colors"
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMobileOpen(false);
                                        handleViewInfo();
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                                >
                                    <User className="w-4 h-4" />
                                    <span>View Info</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMobileOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-rose-200 text-rose-600 text-sm font-semibold hover:bg-rose-50 transition-colors cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsMobileOpen(false)}
                                className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-secondary transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                        <button
                            type="button"
                            onClick={() => {
                                setIsMobileOpen(false);
                                openCart();
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-200 text-primary text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            <HiOutlineShoppingCart className="text-lg" />
                            <span>View Cart {cartCount > 0 ? `(${cartCount})` : ""}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* USER INFORMATION MODAL */}
            {isInfoModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
                    <div
                        className="fixed inset-0"
                        onClick={() => setIsInfoModalOpen(false)}
                    />
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-[popIn_0.2s_ease-out]">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-base uppercase shrink-0">
                                    {userInitial}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 leading-tight">User Information</h3>
                                    <p className="text-xs text-slate-500">Account Details</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsInfoModalOpen(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="py-4">
                            {infoLoading ? (
                                <div className="py-8 flex flex-col items-center justify-center text-slate-500 gap-2">
                                    <Loader2 className="w-7 h-7 animate-spin text-primary" />
                                    <span className="text-sm">Loading user info...</span>
                                </div>
                            ) : infoError ? (
                                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center">
                                    <p>{infoError}</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUserInfo(null);
                                            handleViewInfo();
                                        }}
                                        className="mt-2 text-xs font-semibold text-rose-800 underline cursor-pointer"
                                    >
                                        Try again
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3 text-sm">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="text-xs text-slate-500 font-medium block">Full Name</span>
                                        <span className="text-[15px] font-semibold text-slate-800">{userInfo?.name || "N/A"}</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="text-xs text-slate-500 font-medium block">Email (Username)</span>
                                        <span className="text-[15px] font-semibold text-slate-800 break-all">{userInfo?.username || user?.username || "N/A"}</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="text-xs text-slate-500 font-medium block">Phone Number</span>
                                        <span className="text-[15px] font-semibold text-slate-800">{userInfo?.phoneNo || "N/A"}</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="text-xs text-slate-500 font-medium block">Address</span>
                                        <span className="text-[15px] font-semibold text-slate-800 leading-snug">{userInfo?.address || "N/A"}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="pt-3 border-t border-slate-100 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsInfoModalOpen(false)}
                                className="py-2 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import evershineLogo from "../../assets/Evershinelogo.png";
import {
    HiOutlineShoppingCart,
    HiOutlineSearch,
    HiOutlineChevronRight,
    HiOutlineChevronLeft,
    HiOutlineChevronDown,
    HiOutlineLocationMarker,
    HiOutlinePhone,
    HiOutlineMail,
    HiOutlineClock,
    HiX,
    HiOutlineViewGrid,
} from "react-icons/hi";
import { Headphones } from "lucide-react";

import { categoryListData } from "../../data/categoryListData.js";

// Sub-navbar dropdown data (Excluding wire rods & Beams and columns as requested)
export const MILD_STEEL_CATEGORIES = [
    {
        id: "colour-coated",
        label: "Colour coated",
        categoryFilter: "Colour coated",
        subCategories: [
            { label: "Pre-painted Galvanized sheets", href: "/products?subCategory=Pre-painted+Galvanized+sheets" },
            { label: "Pre-painted Galvanized coils", href: "/products?subCategory=Pre-painted+Galvanized+coils" },
            { label: "Pre-painted Galvalume coils", href: "/products?subCategory=Pre-painted+Galvalume+coils" },
            { label: "Pre-painted Galvalume sheets", href: "/products?subCategory=Pre-painted+Galvalume+sheets" },
        ],
    },
    {
        id: "ms-hot-rolled",
        label: "MS Hot rolled",
        categoryFilter: "MS Hot rolled",
        subCategories: [
            { label: "Hot rolled sheets", href: "/products?subCategory=Hot+rolled+sheets" },
            { label: "Hot rolled coils", href: "/products?subCategory=Hot+rolled+coils" },
            { label: "HRPO coils", href: "/products?subCategory=HRPO+coils" },
            { label: "HRPO sheets", href: "/products?subCategory=HRPO+sheets" },
        ],
    },
    {
        id: "ms-cold-rolled",
        label: "MS Cold rolled",
        categoryFilter: "MS Cold rolled",
        subCategories: [
            { label: "Cold rolled sheets", href: "/products?subCategory=Cold+rolled+sheets" },
            { label: "Cold rolled coils", href: "/products?subCategory=Cold+rolled+coils" },
        ],
    },
    {
        id: "coated-steel",
        label: "Coated Steel",
        categoryFilter: "Coated Steel",
        subCategories: [
            { label: "Galvalume coils", href: "/products?subCategory=Galvalume+coils" },
            { label: "Galvalume sheets", href: "/products?subCategory=Galvalume+sheets" },
            { label: "Galvanized coils", href: "/products?subCategory=Galvanized+coils" },
            { label: "Galvanized sheets", href: "/products?subCategory=Galvanized+sheets" },
        ],
    },
    {
        id: "purlins-girts",
        label: "Purlins & Girts",
        categoryFilter: "Purlins & Girts",
        subCategories: [
           
        ],
    },
];

export const STRUCTURAL_STEEL_ITEMS = [
    { label: "Angles", href: "/products?category=Angles" },
    { label: "Channels", href: "/products?category=Channels" },
];

export const INSULATION_ITEMS = [
    { label: "Puff Panal", href: "/puff-panel" },
    { label: "Air Bubble Insulation", href: "/air-bubble-insulation" },
    {
        label: "XLPE Insulation",
        href: "/xlpe",
        subItems: [
            { label: "Single side Aluminium foil", href: "/xlpe" },
            { label: "Both side without Aluminium foil", href: "/xlpe" },
        ],
    },
];

export const ACCESSORIES_ITEMS = [
    { label: "Ridges", href: "/accessories" },
    { label: "Flashings", href: "/accessories" },
    { label: "Turbo Ventilators", href: "/turbo-ventilators" },
    {
        label: "Louvers",
        href: "/louvres",
        subItems: [
            { label: "GI Louvers", href: "/louvres" },
            { label: "Poly Louvers", href: "/louvres" },
        ],
    },
    { label: "Crimping", href: "/crimping-profile-sheet" },
];

export const POLYCARBONATE_ITEMS = [
    {
        label: "Polycarbonate Sheets",
        href: "/poly-sheet",
        subItems: [
            { label: "Polycarbonate Trapezoidial Sheets", href: "/poly-sheet" },
            { label: "Polycarbonate Plain Sheets", href: "/poly-sheet" },
        ],
    },
    { label: "Multi-Wall Sheets", href: "/multiwall-sheet" },
];

export const UPVA_ITEMS = [
    {
        label: "UPVC Sheets",
        href: "/products?subCategory=UPVC+Sheets",
        subItems: [
            { label: "Tile sheets", href: "/products?subCategory=Tile+sheets" },
            { label: "Trapezoidal Profile sheet", href: "/products?subCategory=Trapezoidal+Profile+sheet" },
            { label: "Round Profile sheets", href: "/products?subCategory=Round+Profile+sheets" },
            { label: "Plain sheets", href: "/products?subCategory=Plain+sheets" },
        ],
    },
    {
        label: "UPVC Accessories",
        href: "/products?subCategory=UPVC+Accessories",
        isWideSubMenu: true,
        subItems: [
            { label: "Main Ridge", href: "/products?subCategory=Main+Ridge" },
            { label: "Main Ridge Cap", href: "/products?subCategory=Main+Ridge+Cap" },
            { label: "Side Ridge Cap", href: "/products?subCategory=Side+Ridge+Cap" },
            { label: "Wall Flashing Board", href: "/products?subCategory=Wall+Flashing+Board" },
            { label: "Tile Sheet Plain Ridges", href: "/products?subCategory=Tile+Sheet+Plain+Ridges" },
            { label: "3 Way Ridge", href: "/products?subCategory=3+Way+Ridge" },
            { label: "4 Way Ridge", href: "/products?subCategory=4+Way+Ridge" },
            { label: "Fascia Board", href: "/products?subCategory=Fascia+Board" },
            { label: "Gutter Drop Outlet", href: "/products?subCategory=Gutter+Drop+Outlet" },
            { label: "Gutter Drain End Cap", href: "/products?subCategory=Gutter+Drain+End+Cap" },
            { label: "End Cap", href: "/products?subCategory=End+Cap" },
            { label: "Polycarbonate Base Plates", href: "/products?subCategory=Polycarbonate+Base+Plates" },
            { label: "Gutter Joiner", href: "/products?subCategory=Gutter+Joiner" },
            { label: "UPVC Gutter", href: "/products?subCategory=UPVC+Gutter" },
            { label: "Face Curve sheets", href: "/products?subCategory=Face+Curve+sheets" },
            { label: "Transparent sheets", href: "/products?subCategory=Transparent+sheets" },
            { label: "UPVC Ridge", href: "/products?subCategory=UPVC+Ridge" },
            { label: "UPVC Corner", href: "/products?subCategory=UPVC+Corner" },
            { label: "Fixer Set", href: "/products?subCategory=Fixer+Set" },
            { label: "Air Ventilator", href: "/products?subCategory=Air+Ventilator" },
        ],
    },
];

export const ALUMINIUM_SHEETS_ITEMS = [
    {
        label: "Carrugated Sheets",
        href: "/aluminium-profile-sheet",
        subItems: [
            { label: "Circular Corrugated sheets", href: "/aluminium-profile-sheet" },
        ],
    },
    {
        label: "Trapezodial Sheets",
        href: "/aluminium-profile-sheet",
        subItems: [
            { label: "Modern Trough sheets", href: "/aluminium-profile-sheet" },
            { label: "Troughed sheets", href: "/aluminium-profile-sheet" },
            { label: "Hi-Crest sheets", href: "/aluminium-profile-sheet" },
            { label: "Tiled Profile sheets", href: "/aluminium-profile-sheet" },
        ],
    },
];

export const SINGLE_DROPDOWN_MENUS = [
    {
        id: "structural-steel",
        label: "Structural Steel",
        mainHref: "/products?category=Structural+Steel",
        items: STRUCTURAL_STEEL_ITEMS,
    },
    {
        id: "insulation",
        label: "Insulation",
        mainHref: "/puff-panel",
        items: INSULATION_ITEMS,
    },
    {
        id: "accessories",
        label: "Accessories",
        mainHref: "/accessories",
        items: ACCESSORIES_ITEMS,
    },
    {
        id: "polycarbonate",
        label: "Polycarbonate",
        mainHref: "/poly-sheet",
        items: POLYCARBONATE_ITEMS,
    },
    {
        id: "upva",
        label: "UPVA",
        mainHref: "/products?category=UPVC",
        items: UPVA_ITEMS,
    },
    {
        id: "aluminium-sheets",
        label: "Aluminium Sheets",
        mainHref: "/aluminium-profile-sheet",
        items: ALUMINIUM_SHEETS_ITEMS,
    },
];

/* ---------------- Reusable image slider used inside the Accessories card ---------------- */
function ImageSlider({ images, alt }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 2500);
        return () => clearInterval(timer);
    }, [images.length]);

    const goPrev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goNext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="relative w-full h-28 sm:h-32 overflow-hidden rounded-md bg-light-gray">
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}

            {images.length > 1 && (
                <>
                    <button
                        onClick={goPrev}
                        aria-label="Previous image"
                        className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-1 shadow transition-all duration-200"
                    >
                        <HiOutlineChevronLeft className="text-sm" />
                    </button>
                    <button
                        onClick={goNext}
                        aria-label="Next image"
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-1 shadow transition-all duration-200"
                    >
                        <HiOutlineChevronRight className="text-sm" />
                    </button>

                    {/* dots */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, i) => (
                            <span
                                key={i}
                                className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${i === index ? "bg-white w-3" : "bg-white/60"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

/* ---------------- Generic card rendered for every category in the mega-menu grid ---------------- */
function CategoryCard({ category, onNavigate }) {
    const { label, href, images } = category;

    return (
        <Link
            to={href}
            onClick={onNavigate}
            className="group block rounded-lg border border-light-gray p-3 transition-all duration-200 hover:border-primary hover:shadow-[0_8px_20px_rgba(0,64,96,0.1)]"
        >
            {images && images.length >= 2 ? (
                <ImageSlider images={images} alt={label} />
            ) : images && images.length === 1 ? (
                <div className="w-full h-28 sm:h-32 overflow-hidden rounded-md bg-light-gray">
                    <img
                        src={images[0]}
                        alt={label}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            ) : (
                <div className="w-full h-28 sm:h-32 flex items-center justify-center rounded-md bg-light-gray">
                    <HiOutlineViewGrid className="text-3xl text-gray transition-colors duration-200 group-hover:text-primary" />
                </div>
            )}

            <p className="mt-3 text-sm font-semibold text-dark group-hover:text-primary transition-colors duration-150 line-clamp-2">
                {label}
            </p>
        </Link>
    );
}

export default function Navbar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [search, setSearch] = useState("");

    // Sub-navbar dropdown and mobile states
    const [activeDropdown, setActiveDropdown] = useState(null); // 'mild-steel' | menu.id | 'help-support' | null
    const [activeMildCategory, setActiveMildCategory] = useState("colour-coated");
    const [mobileMildOpen, setMobileMildOpen] = useState(false);
    const [mobileAccordionState, setMobileAccordionState] = useState({});
    const closeTimeout = useRef(null);
    const location = useLocation();

    const toggleMobileMenu = (id) => {
        setMobileAccordionState((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Auto-close dropdowns when URL path or query params change
    useEffect(() => {
        setActiveDropdown(null);
        setIsMobileOpen(false);
    }, [location.pathname, location.search]);

    const handleMouseEnter = (menuName) => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setActiveDropdown(menuName);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 140);
    };

    const currentMildCategoryObj =
        MILD_STEEL_CATEGORIES.find((c) => c.id === activeMildCategory) || MILD_STEEL_CATEGORIES[0];

    const filteredCategories = categoryListData.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    // Mock cart data grouped by category — replace with real cart state later
    const cartData = [
        {
            category: "Mild Steel",
            items: [
                { name: "Hot rolled sheets", qty: 2, price: "₹48,000" },
                { name: "HRPO coils", qty: 1, price: "₹31,500" },
            ],
        },
        {
            category: "TMT",
            items: [{ name: "TMT Fe 500D 12mm", qty: 5, price: "₹22,000" }],
        },


    ];

    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-white">
            {/* ================= TOP UTILITY BAR ================= */}
            <div className="w-full border-b border-light-gray">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 h-[64px] sm:h-[72px] lg:h-[84px] flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">

                    {/* LEFT — LOGO + LOCATION */}
                    <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
                        <Link
                            to="/"
                            className="shrink-0 flex items-center h-full overflow-hidden transition-transform duration-300 ease-out hover:scale-105"
                        >
                            <img
                                src={evershineLogo}
                                alt="Evershine Solution Logo"
                                className="h-[150%] max-h-[100px] sm:max-h-[150px] lg:max-h-[170px] xl:h-[270%] xl:max-h-[164px] w-auto object-contain"
                            />
                        </Link>

                        <button
                            onClick={() => setIsLocationOpen(true)}
                            className="hidden sm:flex items-center gap-1 shrink-0 text-primary font-medium text-sm whitespace-nowrap transition-colors duration-200 hover:text-secondary group"
                        >
                            <HiOutlineLocationMarker className="text-2xl sm:text-3xl lg:text-4xl transition-transform duration-300 group-hover:scale-110" />
                        </button>
                    </div>

                    {/* CENTER — SEARCH BAR (tablet & up) */}
                    <div className="hidden md:flex flex-1 justify-center min-w-0">
                        <div className="relative w-full max-w-[620px] lg:max-w-[800px] xl:max-w-[920px]">

                            <div className="flex items-center bg-light-gray rounded-lg border border-transparent px-3 lg:px-4 h-[38px] lg:h-[46px] transition-all duration-300 hover:border-light focus-within:border-primary focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,64,96,0.08)]">

                                <HiOutlineSearch className="text-gray text-base lg:text-lg shrink-0" />

                                <input
                                    type="text"
                                    placeholder="Search Categories..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 min-w-0 pl-2 lg:pl-3 pr-2 text-sm bg-transparent text-dark placeholder-gray outline-none"
                                />

                            </div>

                            {search && (
                                <div className="absolute top-14 left-0 w-full bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">

                                    {filteredCategories.length > 0 ? (

                                        filteredCategories.map((item) => (

                                            <Link
                                                key={item.label}
                                                to={item.href}
                                                onClick={() => setSearch("")}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
                                            >

                                                {item.images && item.images.length > 0 ? (
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.label}
                                                        className="w-12 h-12 rounded-md object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                                                        <HiOutlineViewGrid className="text-primary text-xl" />
                                                    </div>
                                                )}

                                                <span className="font-medium text-dark">
                                                    {item.label}
                                                </span>

                                            </Link>

                                        ))

                                    ) : (

                                        <div className="px-4 py-3 text-gray-500">
                                            No Category Found
                                        </div>

                                    )}

                                </div>
                            )}

                        </div>
                    </div>
                    {/* RIGHT — CATEGORIES + PRODUCTS + CART (tablet & up) */}
                    <div className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-6 shrink-0">

                        {/* PRODUCTS — navigates to Product Details page */}
                        <Link
                            to="/products"
                            className="flex items-center gap-1 text-primary font-bold text-sm transition-all duration-200 hover:text-secondary hover:-translate-y-0.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200"
                        >
                            <span>Products</span>
                        </Link>

                        {/* CATEGORIES — navigates to AllCategories page */}
                        <div className="relative">
                            <Link
                                to="/all-categories"
                                className="flex items-center gap-2 text-primary font-medium text-sm transition-all duration-200 hover:text-secondary hover:-translate-y-0.5"
                                title="All Categories"
                            >
                                <HiOutlineViewGrid className="text-2xl lg:text-3xl" />
                            </Link>
                        </div>

                        {/* CART — toggleable popup grouped by category */}
                        <div className="relative">
                            <button
                                onClick={() => setIsCartOpen((prev) => !prev)}
                                className="flex items-center gap-2 text-primary font-medium text-sm transition-all duration-200 hover:text-secondary hover:-translate-y-0.5"
                            >
                                <HiOutlineShoppingCart className="text-2xl lg:text-4xl" />
                            </button>

                            {isCartOpen && (
                                <>
                                    {/* backdrop to close on outside click */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsCartOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-3 w-[85vw] sm:w-[340px] max-w-[340px] bg-white border border-light-gray rounded-lg shadow-[0_16px_40px_rgba(0,64,96,0.15)] z-50 overflow-hidden animate-[popIn_0.2s_ease-out]">
                                        <div className="flex items-center justify-between px-5 py-4 border-b border-light-gray">
                                            <h4 className="text-sm font-semibold text-dark">Your Cart</h4>
                                            <button
                                                onClick={() => setIsCartOpen(false)}
                                                className="text-gray transition-all duration-200 hover:text-dark hover:rotate-90"
                                            >
                                                <HiX className="text-lg" />
                                            </button>
                                        </div>

                                        <div className="max-h-[50vh] sm:max-h-[360px] overflow-y-auto py-2">
                                            {cartData.map((group) => (
                                                <div key={group.category} className="px-5 py-3">
                                                    <p className="text-xs font-semibold text-gray uppercase tracking-wide mb-2">
                                                        {group.category}
                                                    </p>
                                                    {group.items.map((item) => (
                                                        <div
                                                            key={item.name}
                                                            className="flex items-center justify-between py-1.5 text-sm text-dark"
                                                        >
                                                            <span>
                                                                {item.name} <span className="text-gray">× {item.qty}</span>
                                                            </span>
                                                            <span className="font-medium">{item.price}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>

                                        <button className="w-full px-5 py-3 bg-primary text-white text-sm font-semibold transition-colors duration-200 hover:bg-secondary">
                                            View Cart & Checkout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>


                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        className="md:hidden ml-auto text-primary text-2xl shrink-0 transition-transform duration-300"
                        style={{ transform: isMobileOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* ================= SUB NAVBAR ================= */}
            <div className="w-full bg-white border-b border-slate-200 hidden lg:block select-none">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 h-[44px] flex items-center justify-between text-sm relative">

                    {/* LEFT NAV ITEMS: Mild Steel, Structural Steel, Insulation, Accessories, Polycarbonate, UPVA, Aluminium Sheets */}
                    <div className="flex items-center gap-2.5 lg:gap-3.5 xl:gap-5 2xl:gap-6 h-full">

                        {/* 1. Mild Steel (Dropdown on hover with cascading flyout) */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => handleMouseEnter("mild-steel")}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                to="/products?category=Mild+Steel"
                                className={`flex items-center gap-1 h-full px-1 text-[13px] xl:text-[13.5px] font-medium transition-colors duration-150 whitespace-nowrap ${
                                    activeDropdown === "mild-steel"
                                        ? "text-[#1849A9]"
                                        : "text-slate-700 hover:text-[#1849A9]"
                                }`}
                            >
                                <span>Mild Steel</span>
                                <HiOutlineChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                        activeDropdown === "mild-steel" ? "rotate-180 text-[#1849A9]" : "text-slate-500"
                                    }`}
                                />
                                {activeDropdown === "mild-steel" && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1849A9] rounded-t-sm" />
                                )}
                            </Link>

                            {/* Cascading 2-tier Flyout Menu for Mild Steel */}
                            {activeDropdown === "mild-steel" && (
                                <div
                                    className="absolute left-0 top-full pt-1 z-50 animate-[popIn_0.15s_ease-out]"
                                    onMouseEnter={() => handleMouseEnter("mild-steel")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="bg-white rounded-xl shadow-[0_16px_40px_rgba(15,23,42,0.14)] border border-slate-200/90 flex overflow-hidden">
                                        {/* Left Column: Categories (No Wire rods) */}
                                        <div className="w-52 py-2 border-r border-slate-100 flex flex-col bg-slate-50/50">
                                            {MILD_STEEL_CATEGORIES.map((cat) => {
                                                const isSelected = activeMildCategory === cat.id;
                                                return (
                                                    <Link
                                                        key={cat.id}
                                                        to={`/products?category=${encodeURIComponent(cat.categoryFilter)}`}
                                                        onMouseEnter={() => setActiveMildCategory(cat.id)}
                                                        onClick={() => setActiveDropdown(null)}
                                                        className={`flex items-center justify-between px-4 py-3 text-[13.5px] transition-colors cursor-pointer ${
                                                            isSelected
                                                                ? "bg-[#EEF4FF] text-[#1849A9] font-semibold"
                                                                : "text-slate-700 hover:bg-slate-100/70 hover:text-slate-900 font-normal"
                                                        }`}
                                                    >
                                                        <span>{cat.label}</span>
                                                        <HiOutlineChevronRight
                                                            className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                                                                isSelected ? "text-[#1849A9]" : "text-slate-400"
                                                            }`}
                                                        />
                                                    </Link>
                                                );
                                            })}
                                        </div>

                                        {/* Right Column: Subcategories for Active Category */}
                                        <div className="w-60 py-2.5 px-2 bg-white flex flex-col justify-start min-h-[190px]">
                                            {currentMildCategoryObj.subCategories.map((sub) => (
                                                <Link
                                                    key={sub.label}
                                                    to={sub.href}
                                                    onClick={() => setActiveDropdown(null)}
                                                    className="px-3.5 py-2.5 rounded-lg text-[13.5px] text-slate-700 hover:text-[#1849A9] hover:bg-slate-50 transition-colors block font-normal"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 2 to 7. Dropdown Menus: Structural Steel, Insulation, Accessories, Polycarbonate, UPVA, Aluminium Sheets */}
                        {SINGLE_DROPDOWN_MENUS.map((menu) => (
                            <div
                                key={menu.id}
                                className="relative h-full flex items-center"
                                onMouseEnter={() => handleMouseEnter(menu.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link
                                    to={menu.mainHref}
                                    className={`flex items-center gap-1 h-full px-1 text-[13px] xl:text-[13.5px] font-medium transition-colors duration-150 whitespace-nowrap ${
                                        activeDropdown === menu.id
                                            ? "text-[#1849A9]"
                                            : "text-slate-700 hover:text-[#1849A9]"
                                    }`}
                                >
                                    <span>{menu.label}</span>
                                    <HiOutlineChevronDown
                                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                            activeDropdown === menu.id ? "rotate-180 text-[#1849A9]" : "text-slate-500"
                                        }`}
                                    />
                                    {activeDropdown === menu.id && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1849A9] rounded-t-sm" />
                                    )}
                                </Link>

                                {/* Dropdown Menu Panel */}
                                {activeDropdown === menu.id && (
                                    <div
                                        className="absolute left-0 top-full pt-1 z-50 animate-[popIn_0.15s_ease-out]"
                                        onMouseEnter={() => handleMouseEnter(menu.id)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="w-56 min-w-[210px] bg-white rounded-xl shadow-[0_16px_40px_rgba(15,23,42,0.14)] border border-slate-200/90 py-2">
                                            {menu.items.map((item) => {
                                                const hasSubItems = item.subItems && item.subItems.length > 0;
                                                return hasSubItems ? (
                                                    <div
                                                        key={item.label}
                                                        className="relative group/sub"
                                                    >
                                                        <Link
                                                            to={item.href}
                                                            onClick={() => setActiveDropdown(null)}
                                                            className="flex items-center justify-between px-4 py-2.5 text-[13.5px] text-slate-700 hover:text-[#1849A9] hover:bg-[#EEF4FF]/50 transition-colors font-normal whitespace-nowrap group-hover/sub:bg-[#EEF4FF]/50 group-hover/sub:text-[#1849A9]"
                                                        >
                                                            <span>{item.label}</span>
                                                            <HiOutlineChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/sub:text-[#1849A9] shrink-0 ml-3" />
                                                        </Link>

                                                        {/* Flyout Submenu */}
                                                        <div
                                                            className={`absolute top-0 hidden group-hover/sub:block z-50 animate-[popIn_0.12s_ease-out] ${
                                                                menu.flyoutAlignLeft
                                                                    ? "right-full mr-1.5"
                                                                    : "left-full ml-1.5"
                                                            }`}
                                                        >
                                                            {/* Invisible Bridge */}
                                                            <div
                                                                className={`absolute top-0 bottom-0 w-3.5 pointer-events-auto ${
                                                                    menu.flyoutAlignLeft ? "-right-3.5" : "-left-3.5"
                                                                }`}
                                                            />
                                                            <div
                                                                className={`bg-white rounded-xl shadow-[0_16px_40px_rgba(15,23,42,0.16)] border border-slate-200/90 ${
                                                                    item.isWideSubMenu
                                                                        ? "w-[360px] sm:w-[420px] p-2.5 max-h-[380px] overflow-y-auto"
                                                                        : "w-64 min-w-[230px] py-2"
                                                                }`}
                                                            >
                                                                {item.isWideSubMenu ? (
                                                                    <div>
                                                                        <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1.5">
                                                                            {item.label}
                                                                        </div>
                                                                        <div className="grid grid-cols-2 gap-1">
                                                                            {item.subItems.map((sub) => (
                                                                                <Link
                                                                                    key={sub.label}
                                                                                    to={sub.href}
                                                                                    onClick={() => setActiveDropdown(null)}
                                                                                    className="px-2.5 py-1.5 text-[12.5px] rounded-md text-slate-700 hover:text-[#1849A9] hover:bg-slate-50 transition-colors block font-normal truncate"
                                                                                    title={sub.label}
                                                                                >
                                                                                    • {sub.label}
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    item.subItems.map((sub) => (
                                                                        <Link
                                                                            key={sub.label}
                                                                            to={sub.href}
                                                                            onClick={() => setActiveDropdown(null)}
                                                                            className="px-4 py-2 text-[13px] text-slate-700 hover:text-[#1849A9] hover:bg-[#EEF4FF]/50 transition-colors block font-normal whitespace-nowrap"
                                                                        >
                                                                            {sub.label}
                                                                        </Link>
                                                                    ))
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        key={item.label}
                                                        to={item.href}
                                                        onClick={() => setActiveDropdown(null)}
                                                        className="px-4 py-2.5 text-[13.5px] text-slate-700 hover:text-[#1849A9] hover:bg-[#EEF4FF]/50 transition-colors block font-normal whitespace-nowrap"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>

                    {/* RIGHT NAV ITEM — Help & support */}
                    <div
                        className="relative h-full flex items-center ml-auto"
                        onMouseEnter={() => handleMouseEnter("help-support")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveDropdown(activeDropdown === "help-support" ? null : "help-support")}
                            className={`flex items-center gap-2 h-full px-1 text-[13.5px] lg:text-[14px] font-medium transition-colors duration-150 cursor-pointer ${
                                activeDropdown === "help-support"
                                    ? "text-[#1849A9]"
                                    : "text-slate-700 hover:text-[#1849A9]"
                            }`}
                        >
                            <Headphones className={`w-4 h-4 transition-colors ${
                                activeDropdown === "help-support" ? "text-[#1849A9]" : "text-slate-700"
                            }`} />
                            <span>Help & support</span>
                            <HiOutlineChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                    activeDropdown === "help-support" ? "rotate-180 text-[#1849A9]" : "text-slate-500"
                                }`}
                            />
                            {activeDropdown === "help-support" && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1849A9] rounded-t-sm" />
                            )}
                        </button>

                        {/* Help & Support Dropdown Card */}
                        {activeDropdown === "help-support" && (
                            <div
                                className="absolute right-0 top-full pt-1 z-50 animate-[popIn_0.15s_ease-out]"
                                onMouseEnter={() => handleMouseEnter("help-support")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="w-80 bg-white rounded-xl shadow-[0_16px_40px_rgba(15,23,42,0.14)] border border-slate-200/90 p-5 overflow-hidden">
                                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900">Help & Support</h4>
                                            <p className="text-xs text-slate-500">We're here to assist you</p>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Available
                                        </span>
                                    </div>

                                    <div className="py-3 space-y-2.5">
                                        <a
                                            href="tel:+919860118911"
                                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1849A9] flex items-center justify-center shrink-0 group-hover:bg-[#1849A9] group-hover:text-white transition-colors">
                                                <HiOutlinePhone className="text-lg" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs text-slate-500">Customer Helpline</p>
                                                <p className="text-sm font-semibold text-slate-800 group-hover:text-[#1849A9] transition-colors">
                                                    +91 9860118911
                                                </p>
                                            </div>
                                        </a>

                                        <a
                                            href="mailto:evershinengp@gmail.com"
                                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                <HiOutlineMail className="text-lg" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs text-slate-500">Email Support</p>
                                                <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                                                    evershinengp@gmail.com
                                                </p>
                                            </div>
                                        </a>

                                        <div className="flex items-center gap-3 p-2.5 text-xs text-slate-600 bg-slate-50 rounded-lg">
                                            <HiOutlineClock className="text-base text-slate-400 shrink-0" />
                                            <span>Mon – Sat: 09:00 AM – 06:00 PM</span>
                                        </div>
                                    </div>

                                    <Link
                                        to="/contact"
                                        onClick={() => setActiveDropdown(null)}
                                        className="w-full mt-1 flex items-center justify-center py-2.5 px-4 bg-[#1849A9] hover:bg-[#123985] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                                    >
                                        Contact Support Page
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* ================= MOBILE MENU ================= */}
            <div
                className={`md:hidden overflow-hidden bg-white border-t border-light-gray transition-all duration-300 ease-out ${isMobileOpen ? "max-h-[calc(100vh-64px)] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
                    {/* MOBILE SEARCH */}
                    <div className="flex items-center bg-light-gray rounded-lg border border-transparent px-3 h-[42px] transition-all duration-300 focus-within:border-primary focus-within:bg-white">
                        <HiOutlineSearch className="text-gray text-lg shrink-0" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 min-w-0 pl-2 pr-2 text-sm bg-transparent text-dark placeholder-gray outline-none"
                        />
                    </div>

                    {/* MOBILE LOCATION */}
                    <button
                        onClick={() => setIsLocationOpen(true)}
                        className="flex items-center gap-2 text-primary font-medium text-sm transition-colors duration-200 hover:text-secondary"
                    >
                        <HiOutlineLocationMarker className="text-xl shrink-0" />
                        <span>Select delivery location</span>
                    </button>

                    <div className="h-px bg-light-gray" />

                    {/* MOBILE SUB-NAV SECTIONS */}
                    <div className="flex flex-col gap-2.5">
                        {/* Mild Steel mobile accordion */}
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setMobileMildOpen(!mobileMildOpen)}
                                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 text-sm font-semibold text-slate-800"
                            >
                                <span>Mild Steel</span>
                                <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileMildOpen ? "rotate-180" : ""}`} />
                            </button>
                            {mobileMildOpen && (
                                <div className="p-3 bg-white space-y-3 border-t border-slate-100">
                                    {MILD_STEEL_CATEGORIES.map((cat) => (
                                        <div key={cat.id}>
                                            <Link
                                                to={`/products?category=${encodeURIComponent(cat.categoryFilter)}`}
                                                onClick={() => setIsMobileOpen(false)}
                                                className="text-xs font-bold text-[#1849A9] block mb-1"
                                            >
                                                {cat.label}
                                            </Link>
                                            <div className="pl-2 space-y-1">
                                                {cat.subCategories.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        to={sub.href}
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="text-xs text-slate-600 block py-0.5 hover:text-[#1849A9]"
                                                    >
                                                        • {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Single Dropdown Menus mobile accordions: Structural Steel, Insulation, Accessories, Polycarbonate, UPVA, Aluminium Sheets */}
                        {SINGLE_DROPDOWN_MENUS.map((menu) => {
                            const isOpen = Boolean(mobileAccordionState[menu.id]);
                            return (
                                <div key={menu.id} className="border border-slate-200 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => toggleMobileMenu(menu.id)}
                                        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 text-sm font-semibold text-slate-800"
                                    >
                                        <span>{menu.label}</span>
                                        <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    {isOpen && (
                                        <div className="p-3 bg-white space-y-2.5 border-t border-slate-100">
                                            {menu.items.map((item) => {
                                                if (item.subItems && item.subItems.length > 0) {
                                                    return (
                                                        <div key={item.label} className="space-y-1">
                                                            <Link
                                                                to={item.href}
                                                                onClick={() => setIsMobileOpen(false)}
                                                                className="text-xs font-bold text-[#1849A9] block"
                                                            >
                                                                {item.label}
                                                            </Link>
                                                            <div className="pl-2.5 space-y-1 border-l border-slate-100 ml-1">
                                                                {item.subItems.map((sub) => (
                                                                    <Link
                                                                        key={sub.label}
                                                                        to={sub.href}
                                                                        onClick={() => setIsMobileOpen(false)}
                                                                        className="text-xs text-slate-600 block py-0.5 hover:text-[#1849A9]"
                                                                    >
                                                                        • {sub.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return (
                                                    <Link
                                                        key={item.label}
                                                        to={item.href}
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="text-xs font-medium text-slate-700 block py-1 hover:text-[#1849A9]"
                                                    >
                                                        • {item.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}


                        {/* Help & Support Button */}
                        <a
                            href="tel:+919860118911"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-50 text-[#1849A9] text-xs font-semibold"
                        >
                            <Headphones className="w-4 h-4" />
                            <span>Help: +91 9860118911</span>
                        </a>
                    </div>

                    <div className="h-px bg-light-gray" />

                    {/* MOBILE — categories mapped directly from categoryListData */}
                    <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                        {categoryListData.map((cat) => (
                            <CategoryCard
                                key={cat.label}
                                category={cat}
                                onNavigate={() => {
                                    setIsMobileOpen(false);
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-3 pt-2 pb-1">
                        <button
                            onClick={() => {
                                setIsCartOpen(true);
                                setIsMobileOpen(false);
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-light text-primary text-sm font-semibold transition-all duration-200 hover:bg-light-gray active:scale-95"
                        >
                            <HiOutlineShoppingCart className="text-lg" />
                            <span>Cart</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* ================= LOCATION MODAL ================= */}
            {isLocationOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
                    onClick={() => setIsLocationOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                                <HiOutlineLocationMarker className="text-2xl" />
                                Our Location
                            </h3>

                            <button
                                onClick={() => setIsLocationOpen(false)}
                                className="text-gray-500 hover:text-red-500"
                            >
                                <HiX className="text-xl" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <p className="text-gray-700 leading-7">
                                <strong>Address:</strong>
                                <br />
                                Bidoba Sahkari Sanstha,
                                <br />
                                Plot No. 133, Wardha Rd,
                                <br />
                                Near Hotel Center Point,
                                <br />
                                Bante Layout, Sonegaon,
                                <br />
                                Nagpur, Maharashtra 440025
                            </p>

                            <a
                                href="https://maps.app.goo.gl/eiJkyE6ZmyYmcA9J9?g_st=aw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-flex items-center justify-center w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition"
                            >
                                Open in Google Maps
                            </a>
                        </div>
                    </div>
                </div>



            )}

            <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
        </header>
    );
}
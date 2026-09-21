import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import evershineLogo from "../../assets/Evershinelogo.png";
import {
    HiOutlineShoppingCart,
    HiOutlineSearch,
    HiOutlineChevronRight,
    HiOutlineChevronLeft,
    HiOutlineLocationMarker,
    HiX,
    HiOutlineViewGrid,
} from "react-icons/hi";

import { categoryListData } from "../../data/categoryListData.js";

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
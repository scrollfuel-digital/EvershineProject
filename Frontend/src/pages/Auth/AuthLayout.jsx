// src/pages/Auth/AuthLayout.jsx
// Independent, production-ready authentication wrapper maintaining Evershine website design language
import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "../../assets/evershine png.png";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerLink,
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 select-none">
      <div className="w-full max-w-lg mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-block transition-transform duration-200 hover:scale-105"
            aria-label="Evershine Home"
          >
            <img
              src={footerLogo}
              alt="Evershine Prefab Solutions"
              className="h-20 sm:h-24 w-auto mx-auto object-contain mb-2"
            />
          </Link>
          {title && (
            <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-2 text-base text-slate-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* Authentication Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 sm:p-9">
          {children}
        </div>

        {/* Footer Navigation Link */}
        {footerLink && (
          <div className="mt-6 text-center text-base text-slate-600">
            {footerLink}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { ChevronLeft } from "lucide-react";

/**
 * Universal AppSidebar Component
 * 
 * Reusable across the entire application for Policies, Filters, Catalogs, Admin, etc.
 * 
 * Capabilities:
 * 1. Desktop: True sticky sidebar that stays locked in viewport while right-side content scrolls.
 * 2. Mobile (< lg): Off-canvas drawer sliding from the left occupying 75% of screen width.
 * 3. Mobile Header: Features a prominent `<` (ChevronLeft) exit icon to dismiss back to content.
 * 4. Content Agnostic: Takes any children (policy list, filter facets, accordions, categories, etc.).
 */
export default function AppSidebar({
  isOpen = false,
  onClose,
  title,
  icon: Icon,
  headerActions,
  customHeader,
  children,
  footer,
  desktopColSpan = "lg:col-span-4 xl:col-span-3",
  stickyTopOffset = 130, // in pixels
  className = "",
  cardClassName = "",
  drawerWidth = "w-[75vw] max-w-[75vw]",
}) {
  // Lock background body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close drawer on 'Escape' key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* =========================================================================
          1. DESKTOP STICKY SIDEBAR (Visible on lg screens and up)
          ========================================================================= */}
      <aside
        className={`hidden lg:block ${desktopColSpan} self-start z-20 ${className}`}
        style={{
          position: "sticky",
          top: `${stickyTopOffset}px`,
        }}
      >
        <div
          className={`bg-[#004060] rounded-2xl border border-[#003860] shadow-md p-4 sm:p-5 text-white max-h-[calc(100vh-${stickyTopOffset + 30}px)] flex flex-col ${cardClassName}`}
        >
          {/* Header */}
          {customHeader ? (
            customHeader
          ) : title ? (
            <div className="pb-3 border-b border-white/15 flex items-center justify-between gap-2 shrink-0">
              <h3 className="text-sm sm:text-[15px] font-bold uppercase tracking-wider text-[#FBBF24] flex items-center gap-2.5">
                {Icon && <Icon className="w-4.5 h-4.5 text-[#FBBF24] shrink-0" />}
                <span>{title}</span>
              </h3>
              {headerActions}
            </div>
          ) : null}

          {/* Scrollable Children Body */}
          <div className="mt-3 flex-1 overflow-y-auto pr-1 flex flex-col gap-1.5 [scrollbar-width:thin] [scrollbar-color:#285870_transparent]">
            {children}
          </div>

          {/* Footer (Optional) */}
          {footer && (
            <div className="pt-3 mt-3 border-t border-white/15 shrink-0">
              {footer}
            </div>
          )}
        </div>
      </aside>

      {/* =========================================================================
          2. MOBILE OFF-CANVAS DRAWER (Appears on click from left, taking 75% width)
          ========================================================================= */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Drawer (75% Screen Width, Slide from Left, `<` icon to exit) */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 ${drawerWidth} bg-gradient-to-b from-[#003860] via-[#004060] to-[#002840] text-white shadow-2xl flex flex-col lg:hidden transition-transform duration-300 ease-in-out border-r border-white/10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : "Sidebar Menu"}
      >
        {/* Drawer Header with `<` Icon button to go out of screen */}
        <div className="p-4 sm:p-5 border-b border-white/15 flex items-center justify-between gap-3 bg-[#003050]">
          <div className="flex items-center gap-2.5 min-w-0">
            {Icon && <Icon className="w-5 h-5 text-[#FBBF24] shrink-0" />}
            <h2 className="font-bold text-base sm:text-lg text-white truncate">
              {title || "Menu"}
            </h2>
          </div>

          {/* `<` Icon button to exit */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-[#FBBF24] transition-all flex items-center justify-center shrink-0 cursor-pointer"
            title="Go back (Back to content)"
            aria-label="Close menu"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 [scrollbar-width:thin] [scrollbar-color:#285870_transparent]">
          {children}
        </div>

        {/* Drawer Footer (Optional or Default) */}
        {footer ? (
          <div className="p-3 border-t border-white/10 shrink-0">{footer}</div>
        ) : (
          <div className="p-3 border-t border-white/10 text-center text-xs text-slate-300 bg-[#002840]/80 shrink-0">
            Evershine Prefab Solutions
          </div>
        )}
      </div>
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import AppSidebar from "../ui/AppSidebar";
import ScrollReveal from "../ui/ScrollReveal";
import { websitePolicies as defaultPolicies } from "../../data/websitePolicies";
import { policyIconsMap } from "./policyIcons";

/**
 * Reusable Policy Sidebar Component
 * Built on top of the common universal AppSidebar component
 */
export default function PolicySidebar({
  currentSlug,
  isMobileOpen = false,
  setIsMobileOpen,
  policies = defaultPolicies,
  onSelect,
  className = "",
  desktopColSpan = "lg:col-span-4 xl:col-span-3",
}) {
  const handleLinkClick = (item) => {
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <AppSidebar
      isOpen={isMobileOpen}
      onClose={() => setIsMobileOpen && setIsMobileOpen(false)}
      title="All Policies & Terms"
      icon={FileText}
      desktopColSpan={desktopColSpan}
      stickyTopOffset={130}
      className={className}
    >
      <div className="space-y-1">
        {policies.map((item, idx) => {
          const isActive = item.slug === currentSlug;
          const Icon = policyIconsMap[item.slug] || FileText;

          return (
            <ScrollReveal
              key={item.slug}
              direction="left"
              duration={2500}
              delay={idx * 80}
              distance={25}
            >
              <Link
                to={`/policy/${item.slug}`}
                onClick={() => handleLinkClick(item)}
                className={`px-3.5 py-3 rounded-xl text-[15.5px] sm:text-[16.5px] font-semibold transition-all flex items-center gap-3 ${
                  isActive
                    ? "bg-white/10 text-[#FBBF24] font-bold shadow-xs border-l-[3px] border-[#FBBF24]"
                    : "text-white/80 hover:bg-white/5 hover:text-[#FBBF24]"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? "text-[#FBBF24]" : "text-white/70"
                  }`}
                />
                <span className="leading-snug">{item.title}</span>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </AppSidebar>
  );
}

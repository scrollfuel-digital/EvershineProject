import React, { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { websitePolicies } from "../../data/websitePolicies";
import { ShieldCheck, ChevronRight, Menu } from "lucide-react";
import PolicySidebar from "../../components/policies/PolicySidebar";
import ScrollReveal from "../../components/ui/ScrollReveal";

export default function PolicyPage() {
  const { slug } = useParams();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Find the policy matching the slug
  const currentPolicy = websitePolicies.find((p) => p.slug === slug);

  // If slug is not found or not provided, gracefully default to the first policy
  if (!currentPolicy) {
    if (websitePolicies.length > 0) {
      return <Navigate to={`/policy/${websitePolicies[0].slug}`} replace />;
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-[#dedfe3]/50 text-slate-800 font-sans pt-[85px] sm:pt-[105px] md:pt-[120px] lg:pt-[140px] pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        {/* Breadcrumb Navigation - Big font size, separated by > icon, all clickable */}
        <ScrollReveal direction="left" duration={1500} distance={20}>
          <nav className="flex items-center gap-2.5 text-base sm:text-lg lg:text-[19px] text-slate-700 mb-6 font-semibold flex-wrap">
            <Link to="/" className="hover:text-[#004060] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
            <Link
              to="/policy/terms-and-conditions"
              className="hover:text-[#004060] transition-colors"
            >
              Terms &amp; Policies
            </Link>
            <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
            <Link
              to={`/policy/${currentPolicy.slug}`}
              className="text-[#004060] font-bold hover:underline"
            >
              {currentPolicy.title}
            </Link>
          </nav>
        </ScrollReveal>

        {/* Hero Banner Header */}
        <ScrollReveal duration={2200} distance={40}>
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#003860] via-[#004060] to-[#002840] p-6 sm:p-8 md:p-10 text-white shadow-xl mb-8 relative overflow-hidden border border-white/10">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent absolute top-0 left-0 right-0" />
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Official Website Policy
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display text-white">
              {currentPolicy.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-2 max-w-2xl leading-relaxed">
              Please review our company guidelines, policies and terms regarding our industrial building materials and services.
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile View: Single Policies Drawer Trigger Button */}
        <div className="lg:hidden mb-6">
          <ScrollReveal direction="left" duration={2000} distance={25}>
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="w-full flex items-center justify-between px-4 py-3.5 bg-[#004060] hover:bg-[#003860] active:scale-[0.99] text-white rounded-xl shadow-md border border-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Menu className="w-5 h-5 text-[#FBBF24]" />
                <span className="font-semibold text-[15px] sm:text-base">
                  Other policies
                </span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-[#FBBF24] bg-white/10 px-2.5 py-1 rounded-lg">
                View <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </ScrollReveal>
        </div>

        {/* 2-Column Responsive Layout: Sticky Sidebar Directory + Document Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Reusable & Sharable Sidebar: Desktop Sticky + Mobile 75% Drawer with < Icon */}
          <PolicySidebar
            currentSlug={currentPolicy.slug}
            isMobileOpen={isMobileDrawerOpen}
            setIsMobileOpen={setIsMobileDrawerOpen}
          />

          {/* Right: Active Policy Content View */}
          <main className="lg:col-span-8 xl:col-span-9 w-full">
            <ScrollReveal
              key={currentPolicy.slug}
              direction="up"
              duration={2500}
              distance={85}
              threshold={0.08}
            >
              <article className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 md:p-12">
                <div
                  className="policy-content"
                  dangerouslySetInnerHTML={{ __html: currentPolicy.content }}
                />
              </article>
            </ScrollReveal>
          </main>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Search,
  X,
  ExternalLink
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import { faqs } from './data';

// Helper to render answer text with clickable links
function renderAnswerText(text) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#004060] font-bold underline hover:text-[#002540] inline-flex items-center gap-1 break-all"
        >
          {part}
          <ExternalLink className="w-3.5 h-3.5 inline shrink-0" />
        </a>
      );
    }
    return part;
  });
}

// Reusable FAQ Question & Answer Card Component (Used on Desktop & Search Results)
function FAQCard({ item, index, isOpen, onToggle }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:border-[#004060]/40">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-7 h-7 rounded-lg bg-[#004060]/10 text-[#004060] text-xs font-bold flex items-center justify-center mt-0.5">
            {index + 1}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#004060] transition-colors leading-snug">
            {item.question}
          </h4>
        </div>

        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isOpen
              ? 'bg-[#004060] text-white rotate-180'
              : 'bg-slate-100 text-slate-600 group-hover:bg-[#004060]/10 group-hover:text-[#004060]'
          }`}
        >
          <ChevronDown className="w-5 h-5 transition-transform duration-300" />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 text-slate-700 text-base sm:text-[17px] leading-relaxed">
          {renderAnswerText(item.answer)}
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Selected category for desktop view
  const [selectedCategory, setSelectedCategory] = useState(
    faqs[0]?.category || 'General Information'
  );

  // Mobile view: expanded category (null = no category open by default)
  const [openMobileCategory, setOpenMobileCategory] = useState(null);

  // Expanded questions state on desktop: { [questionIndex]: boolean }
  const [openIndices, setOpenIndices] = useState({ 0: true });

  // Search query across FAQs
  const [searchQuery, setSearchQuery] = useState('');

  // Switch desktop category
  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setOpenIndices({ 0: true });
  };

  // Toggle desktop question accordion
  const toggleQuestion = (index) => {
    setOpenIndices((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Toggle mobile category accordion
  const toggleMobileCategory = (categoryName) => {
    setOpenMobileCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  // Filtered FAQs if user is searching
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();

    const matches = [];
    faqs.forEach((cat) => {
      cat.questions.forEach((qItem) => {
        if (
          qItem.question.toLowerCase().includes(query) ||
          qItem.answer.toLowerCase().includes(query) ||
          cat.category.toLowerCase().includes(query)
        ) {
          matches.push(qItem);
        }
      });
    });
    return matches;
  }, [searchQuery]);

  // Current category questions when not searching (for desktop)
  const currentQuestions = useMemo(() => {
    const matched = faqs.find((f) => f.category === selectedCategory);
    return matched ? matched.questions : faqs[0]?.questions || [];
  }, [selectedCategory]);

  // Unified direct contact channels (Single array, no square box grid, no separate social icons)
  const contactChannels = [
    {
      icon: <Phone className="w-4 h-4" />,
      label: 'Phone',
      value: '+91 9860118911',
      href: 'tel:+919860118911'
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: 'Email',
      value: 'evershinengp@gmail.com',
      href: 'mailto:evershinengp@gmail.com'
    },
    {
      icon: <FaWhatsapp className="w-4 h-4" />,
      label: 'WhatsApp',
      value: '+91 9860118911',
      href: 'https://wa.me/919860118911',
      isExternal: true,
      isWhatsapp: true
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: 'Office',
      value: '133, Bante Layout, Nagpur',
      href: 'https://www.google.com/maps/search/?api=1&query=133,+Bante+Layout,+Wardha+Road,+Nagpur,+Maharashtra+440025',
      isExternal: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#dedfe3] text-slate-800 font-sans pt-[85px] sm:pt-[105px] md:pt-[120px] lg:pt-[140px] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-700 mb-6 font-medium">
          <Link to="/" className="hover:text-[#004060] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#004060] font-bold">Contact & FAQs</span>
        </nav>

        {/* Page Hero Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#004060] tracking-tight font-display mb-3">
            Contact & FAQs
          </h1>

          <p className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed">
            Reach out to our team for inquiries and quotations, or browse our knowledge base below to find fast answers.
          </p>
        </div>

        {/* 1. TOP DIRECT CONTACT BAR (Unified horizontal strip, no 4 square boxes/grid) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-2 sm:p-3 mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {contactChannels.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 py-2.5 px-3 md:px-5 hover:bg-slate-50/80 rounded-xl transition-all group flex-1"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    item.isWhatsapp
                      ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                      : 'bg-[#004060]/10 text-[#004060] group-hover:bg-[#004060] group-hover:text-white'
                  }`}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    {item.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#004060] transition-colors truncate block">
                    {item.value}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 2. FAQS SECTION: Category Filter + Q&A */}
        <section id="faqs" className="pt-2">

          {/* Section Header & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004060] tracking-tight font-display">
              Frequently Asked Questions
            </h2>

            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search FAQs by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004060]/30 focus:border-[#004060] shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* MOBILE VIEW: All categories in line (direct vertical stack).
              None is open by default. Tapping a category toggles it open/closed.
              The expand/collapse icon is on the category header only. */}
          {!filteredResults && (
            <div className="lg:hidden space-y-3">
              {faqs.map((cat) => {
                const isCatOpen = openMobileCategory === cat.category;
                return (
                  <div
                    key={cat.category}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
                  >
                    {/* Category Header with Chevron Icon */}
                    <button
                      onClick={() => toggleMobileCategory(cat.category)}
                      className={`w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer transition-colors ${
                        isCatOpen
                          ? 'bg-[#004060] text-white'
                          : 'bg-white text-slate-900 hover:bg-slate-50'
                      }`}
                      aria-expanded={isCatOpen}
                    >
                      <h3 className="text-base sm:text-lg font-bold leading-snug">
                        {cat.category}
                      </h3>
                      <div
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isCatOpen
                            ? 'bg-white/20 text-white rotate-180'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                      </div>
                    </button>

                    {/* Questions & Answers come along directly under the category header */}
                    {isCatOpen && (
                      <div className="p-4 sm:p-5 space-y-4 bg-slate-50/60 border-t border-slate-100">
                        {cat.questions.map((qItem, qIdx) => (
                          <div
                            key={qIdx}
                            className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs space-y-2"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="shrink-0 w-6 h-6 rounded-md bg-[#004060]/10 text-[#004060] text-xs font-bold flex items-center justify-center mt-0.5">
                                {qIdx + 1}
                              </span>
                              <h4 className="text-base font-bold text-slate-900 leading-snug">
                                {qItem.question}
                              </h4>
                            </div>
                            <div className="pl-8.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                              {renderAnswerText(qItem.answer)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* DESKTOP VIEW & SEARCH RESULTS VIEW */}
          <div
            className={`${
              filteredResults
                ? 'block'
                : 'hidden lg:grid lg:grid-cols-12 gap-8 items-start'
            }`}
          >
            {/* Desktop Left Sidebar: No category header, no count, no scroller */}
            {!filteredResults && (
              <div className="lg:col-span-4 sticky top-28">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3 space-y-1">
                  {faqs.map((cat) => {
                    const isActive = selectedCategory === cat.category;
                    return (
                      <button
                        key={cat.category}
                        onClick={() => handleSelectCategory(cat.category)}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all text-sm font-semibold cursor-pointer ${
                          isActive
                            ? 'bg-[#004060] text-white shadow-sm font-bold'
                            : 'text-slate-700 hover:bg-slate-100/80 hover:text-[#004060]'
                        }`}
                      >
                        <span className="truncate">{cat.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Desktop Right FAQs / Search Results Container */}
            <div
              className={`${
                filteredResults ? 'w-full' : 'lg:col-span-8'
              } space-y-3.5`}
            >
              {filteredResults ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#004060]">
                      Search Results ({filteredResults.length})
                    </h3>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-sm font-bold text-[#004060] hover:underline cursor-pointer"
                    >
                      Clear Search
                    </button>
                  </div>

                  {filteredResults.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-700">
                      <p className="text-lg font-bold text-slate-900">
                        No matching FAQs found
                      </p>
                      <p className="text-sm mt-1">
                        Try searching with different terms or select a category.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {filteredResults.map((item, idx) => (
                        <FAQCard
                          key={idx}
                          item={item}
                          index={idx}
                          isOpen={!!openIndices[idx]}
                          onToggle={() => toggleQuestion(idx)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Desktop Standard Category Mode */
                <div className="space-y-3.5">
                  {currentQuestions.map((item, idx) => (
                    <FAQCard
                      key={idx}
                      item={item}
                      index={idx}
                      isOpen={!!openIndices[idx]}
                      onToggle={() => toggleQuestion(idx)}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

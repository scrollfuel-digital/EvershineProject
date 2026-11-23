import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ui/ScrollReveal';
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  ExternalLink,
  Menu,
  HelpCircle,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import { faqs } from './data';
import { faqCategoryIconsMap } from './faqCategoryIcons';
import AppSidebar from '../../components/ui/AppSidebar';

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

// Reusable FAQ Question & Answer Card Component
function FAQCard({ item, index, isOpen, onToggle }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:border-[#004060]/40">
      <button
        type="button"
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Selected category for FAQs
  const [selectedCategory, setSelectedCategory] = useState(
    faqs[0]?.category || 'General Information'
  );

  // Mobile Drawer state (75% screen width off-canvas drawer)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Expanded questions state: { [questionIndex]: boolean }
  const [openIndices, setOpenIndices] = useState({ 0: true });

  // Search query across FAQs
  const [searchQuery, setSearchQuery] = useState('');

  // Switch category
  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setOpenIndices({ 0: true });
    setIsMobileDrawerOpen(false);
  };

  // Toggle question accordion
  const toggleQuestion = (index) => {
    setOpenIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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

  // Current category questions when not searching
  const currentQuestions = useMemo(() => {
    const matched = faqs.find((f) => f.category === selectedCategory);
    return matched ? matched.questions : faqs[0]?.questions || [];
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#dedfe3]/50 text-slate-800 font-sans pt-[85px] sm:pt-[105px] md:pt-[120px] lg:pt-[140px] pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">

        {/* Breadcrumb Navigation - Consistent with Policy Page */}
        <ScrollReveal direction="left" duration={1500} distance={20}>
          <nav className="flex items-center gap-2.5 text-base sm:text-lg lg:text-[19px] text-slate-700 mb-6 font-semibold flex-wrap">
            <Link to="/" className="hover:text-[#004060] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
            <span className="text-[#004060] font-bold">Contact &amp; FAQs</span>
          </nav>
        </ScrollReveal>

        {/* =========================================================================
            TOP HERO BANNER: Brand Blue Background
            Contains: Contact Info (Icons on Phone; Unboxed Large Typography on Desktop)
            and a Wide Prominent Search Bar Below
            ========================================================================= */}
        <ScrollReveal duration={2200} distance={40}>
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#003860] via-[#004060] to-[#002840] p-5 sm:p-7 md:p-9 text-white shadow-xl mb-8 relative overflow-hidden border border-white/10">
            {/* Top Golden Accent Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent absolute top-0 left-0 right-0" />

            {/* 1. PHONE VIEW: Icons Only (No verbose text/words or clutter) */}
            <div className="flex sm:hidden items-center justify-around gap-3 py-1">
              <ScrollReveal duration={1800} delay={100} distance={25}>
                <a
                  href="tel:+917774078785"
                  className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-[#FBBF24] flex items-center justify-center transition-all shadow-md"
                  aria-label="Call +91 7774078785"
                  title="Calling Support: +91 7774078785"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </ScrollReveal>
              <ScrollReveal duration={1800} delay={220} distance={25}>
                <a
                  href="https://wa.me/917774078785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-emerald-400 flex items-center justify-center transition-all shadow-md"
                  aria-label="WhatsApp Chat"
                  title="WhatsApp: +91 7774078785"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              </ScrollReveal>
              <ScrollReveal duration={1800} delay={340} distance={25}>
                <a
                  href="mailto:evershinengp@gmail.com"
                  className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-[#FBBF24] flex items-center justify-center transition-all shadow-md"
                  aria-label="Email evershinengp@gmail.com"
                  title="Email: evershinengp@gmail.com"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </ScrollReveal>
              <ScrollReveal duration={1800} delay={460} distance={25}>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=133,+Bante+Layout,+Wardha+Road,+Nagpur,+Maharashtra+440025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-[#FBBF24] flex items-center justify-center transition-all shadow-md"
                  aria-label="Head Office Location"
                  title="Head Office Location"
                >
                  <MapPin className="w-5 h-5" />
                </a>
              </ScrollReveal>
            </div>

            {/* 2. TABLET & DESKTOP VIEW: Unboxed Content (No enclosing box/border) with Increased Font Size */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start pt-1">
              {/* Calling Support */}
              <ScrollReveal direction="up" duration={2200} delay={150} distance={30}>
                <div className="flex items-start gap-3.5">
                  <Phone className="w-6 h-6 lg:w-7 lg:h-7 text-[#FBBF24] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs lg:text-[13px] font-bold uppercase tracking-wider text-[#FBBF24] block mb-1.5">
                      Calling Support
                    </span>
                    <div className="flex flex-col gap-1">
                      <a
                        href="tel:+917774078785"
                        className="text-base lg:text-[17px] font-bold text-white hover:text-[#FBBF24] transition-colors whitespace-nowrap block leading-snug"
                      >
                        +91 7774078785
                      </a>
                      <a
                        href="tel:+919860118911"
                        className="text-xs sm:text-[13.5px] lg:text-[15px] font-semibold text-slate-200 hover:text-[#FBBF24] transition-colors whitespace-nowrap block"
                      >
                        +91 9860118911
                      </a>
                      <a
                        href="tel:+919881147000"
                        className="text-xs sm:text-[13.5px] lg:text-[15px] font-semibold text-slate-200 hover:text-[#FBBF24] transition-colors whitespace-nowrap block"
                      >
                        +91 9881147000
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* WhatsApp Support */}
              <ScrollReveal direction="up" duration={2200} delay={300} distance={30}>
                <div className="flex items-start gap-3.5">
                  <FaWhatsapp className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs lg:text-[13px] font-bold uppercase tracking-wider text-[#FBBF24] block mb-1.5">
                      WhatsApp Support
                    </span>
                    <a
                      href="https://wa.me/917774078785"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base lg:text-[17px] font-bold text-white hover:text-emerald-300 transition-colors block leading-snug"
                    >
                      +91 7774078785
                    </a>
                    <span className="text-xs lg:text-sm text-slate-300 block mt-1">
                      Instant response
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Email Inquiries */}
              <ScrollReveal direction="up" duration={2200} delay={450} distance={30}>
                <div className="flex items-start gap-3.5">
                  <Mail className="w-6 h-6 lg:w-7 lg:h-7 text-[#FBBF24] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs lg:text-[13px] font-bold uppercase tracking-wider text-[#FBBF24] block mb-1.5">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:evershinengp@gmail.com"
                      className="text-base lg:text-[17px] font-bold text-white hover:text-[#FBBF24] transition-colors truncate block leading-snug"
                    >
                      evershinengp@gmail.com
                    </a>
                    <span className="text-xs lg:text-sm text-slate-300 block mt-1">
                      For formal RFQs
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Head Office Location */}
              <ScrollReveal direction="up" duration={2200} delay={600} distance={30}>
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-[#FBBF24] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs lg:text-[13px] font-bold uppercase tracking-wider text-[#FBBF24] block mb-1.5">
                      Head Office
                    </span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=133,+Bante+Layout,+Wardha+Road,+Nagpur,+Maharashtra+440025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm lg:text-[15px] font-medium text-slate-200 hover:text-white transition-colors block leading-relaxed"
                    >
                      133, Bante Layout, Wardha Road, Nagpur – 440025
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* 3. WIDE PROMINENT SEARCH BAR (Bigger Width for Desktop) */}
            <ScrollReveal direction="up" duration={2200} delay={700} distance={35}>
              <div className="mt-5 sm:mt-8 pt-5 sm:pt-6 border-t border-white/15">
                <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
                  <div className="relative">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search FAQs by question, topic or keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white text-slate-900 placeholder-slate-400 rounded-xl pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 text-base sm:text-lg shadow-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                        aria-label="Clear search"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            FAQS SECTION: Category Filter Directory + Q&A Content
            ========================================================================= */}
        <section id="faqs">
          {/* Phone View: Single Trigger Button (Only user content visible initially) */}
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
                    Other categories ({faqs.length})
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-[#FBBF24] bg-white/10 px-2.5 py-1 rounded-lg">
                  View <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </ScrollReveal>
          </div>

          {/* 2-Column Responsive Layout: Sticky Sidebar Directory + FAQ Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Reusable & Sharable AppSidebar: Desktop Sticky + Mobile 75% Drawer with < Icon */}
            <AppSidebar
              isOpen={isMobileDrawerOpen}
              onClose={() => setIsMobileDrawerOpen(false)}
              title="FAQ Categories"
              icon={HelpCircle}
              desktopColSpan="lg:col-span-4 xl:col-span-3"
              stickyTopOffset={130}
            >
              <div className="space-y-1">
                {faqs.map((cat, idx) => {
                  const isActive = selectedCategory === cat.category;
                  const Icon = faqCategoryIconsMap[cat.category] || HelpCircle;

                  return (
                    <ScrollReveal
                      key={cat.category}
                      direction="left"
                      duration={2500}
                      delay={idx * 80}
                      distance={25}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectCategory(cat.category)}
                        className={`w-full px-3.5 py-3 rounded-xl text-[15.5px] sm:text-[16.5px] font-semibold transition-all flex items-center gap-3 text-left cursor-pointer ${
                          isActive
                            ? 'bg-white/10 text-[#FBBF24] font-bold shadow-xs border-l-[3px] border-[#FBBF24]'
                            : 'text-white/80 hover:bg-white/5 hover:text-[#FBBF24]'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 shrink-0 transition-colors ${
                            isActive ? 'text-[#FBBF24]' : 'text-white/70'
                          }`}
                        />
                        <span className="leading-snug truncate">{cat.category}</span>
                      </button>
                    </ScrollReveal>
                  );
                })}
              </div>
            </AppSidebar>

            {/* Right: FAQ Questions / Search Results View */}
            <main className="lg:col-span-8 xl:col-span-9 w-full">
              {filteredResults ? (
                <div>
                  <ScrollReveal direction="up" duration={2000} distance={35}>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#004060]">
                        Search Results ({filteredResults.length})
                      </h3>
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="text-sm font-bold text-[#004060] hover:underline cursor-pointer"
                      >
                        Clear Search
                      </button>
                    </div>
                  </ScrollReveal>

                  {filteredResults.length === 0 ? (
                    <ScrollReveal direction="up" duration={2000} distance={40}>
                      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-700 shadow-sm">
                        <p className="text-lg font-bold text-slate-900">
                          No matching FAQs found
                        </p>
                        <p className="text-sm mt-1 text-slate-500">
                          Try searching with different terms or choose a category from the sidebar.
                        </p>
                      </div>
                    </ScrollReveal>
                  ) : (
                    <div className="space-y-3.5">
                      {filteredResults.map((item, idx) => (
                        <ScrollReveal
                          key={`search-${item.question}-${idx}`}
                          direction="up"
                          duration={2500}
                          delay={idx * 140}
                          distance={85}
                          threshold={0.08}
                        >
                          <FAQCard
                            item={item}
                            index={idx}
                            isOpen={!!openIndices[idx]}
                            onToggle={() => toggleQuestion(idx)}
                          />
                        </ScrollReveal>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Standard Category FAQs View */
                <div>
                  <ScrollReveal direction="up" duration={2000} distance={35}>
                    <div className="mb-4 pb-2 border-b border-slate-200 flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#004060]">
                        {selectedCategory}
                      </h3>
                      <span className="text-xs sm:text-sm font-bold text-[#004060] bg-[#004060]/10 px-3 py-1 rounded-full">
                        {currentQuestions.length} Questions
                      </span>
                    </div>
                  </ScrollReveal>

                  <div className="space-y-3.5">
                    {currentQuestions.map((item, idx) => (
                      <ScrollReveal
                        key={`${selectedCategory}-${item.question}-${idx}`}
                        direction="up"
                        duration={2500}
                        delay={idx * 140}
                        distance={85}
                        threshold={0.08}
                      >
                        <FAQCard
                          item={item}
                          index={idx}
                          isOpen={!!openIndices[idx]}
                          onToggle={() => toggleQuestion(idx)}
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </section>

      </div>
    </div>
  );
}

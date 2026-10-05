import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Tag, Search, BookOpen } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding Mild Steel vs Structural Steel: Which One Does Your Project Need?",
    excerpt: "Learn the core metallurgical differences, load-bearing capacities, and cost efficiencies between Mild Steel (MS) and Structural Steel sections.",
    category: "Steel Guide",
    date: "Sep 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    tags: ["Mild Steel", "Structural Steel", "Engineering"],
  },
  {
    id: 2,
    title: "Hot Rolled vs Cold Rolled Steel: Properties, Finishes & Industrial Applications",
    excerpt: "A comprehensive breakdown of HR vs CR coils and sheets, covering surface textures, dimensional tolerances, and when to specify HRPO.",
    category: "Technical Insights",
    date: "Sep 18, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    tags: ["Hot Rolled", "Cold Rolled", "Manufacturing"],
  },
  {
    id: 3,
    title: "Modern Industrial Roofing: Why Bare Galvalume & PPGL Outperform Traditional GC Sheets",
    excerpt: "Discover why zinc-aluminium alloy coated sheets deliver up to 4x superior corrosion resistance and thermal reflectivity for factories and warehouses.",
    category: "Roofing & Cladding",
    date: "Sep 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    tags: ["Galvalume", "PPGL", "Roofing"],
  },
  {
    id: 4,
    title: "Structural Steel Angles & Channels: Standard Sizes, IS 2062 Standards & Calculations",
    excerpt: "Everything structural engineers and fabricators need to know about equal angles, unequal angles, and tapered channel load tables.",
    category: "Structural Steel",
    date: "Aug 29, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    tags: ["Angles", "Channels", "IS 2062"],
  },
  {
    id: 5,
    title: "The Ultimate Guide to Pre-Engineered Buildings (PEB) for Modern Warehouses",
    excerpt: "Why PEB structures save up to 30% construction time and provide clear spans without intermediate columns for modern logistics hubs.",
    category: "PEB & Infrastructure",
    date: "Aug 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    tags: ["PEB", "Warehousing", "Industrial"],
  },
  {
    id: 6,
    title: "Preventing Corrosion in Steel Structures: Best Coating & Galvanization Practices",
    excerpt: "Best practices in hot-dip galvanizing, passivation, and organic paint coatings to ensure a 25+ year service life in aggressive environments.",
    category: "Corrosion Prevention",
    date: "Jul 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    tags: ["Galvanized", "Coating", "Maintenance"],
  },
];

export default function Blogs() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tags = ["All", "Mild Steel", "Structural Steel", "Hot Rolled", "Galvalume", "Angles", "Roofing"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag) || post.category === selectedTag;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-[115px] sm:pt-[130px] lg:pt-[140px] pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-[#1849A9] transition">Home</Link>
          <span className="text-slate-400 text-xs">/</span>
          <span className="text-slate-900 font-medium">Blogs & Technical Insights</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1849A9] border border-blue-200 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Evershine Knowledge Hub
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Steel & Industrial Roofing Insights
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore expert engineering guides, metallurgical grade comparisons, fabrication standards, and industrial building case studies curated by Evershine Solution's technical specialists.
            </p>
          </div>

          {/* Search & Tags */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
            {/* Tag Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedTag === tag
                      ? "bg-[#1849A9] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1849A9] focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 backdrop-blur-sm text-slate-800 shadow-sm">
                  {post.category}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1849A9] transition-colors leading-snug line-clamp-2 mb-2">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1849A9] group-hover:translate-x-0.5 transition-transform"
                  >
                    View Catalog <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-base font-semibold text-slate-700">No articles found</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for other terms or resetting filters.</p>
            <button
              onClick={() => {
                setSelectedTag("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#1849A9] rounded-lg hover:bg-blue-800 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

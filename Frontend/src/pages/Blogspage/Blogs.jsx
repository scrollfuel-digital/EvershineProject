import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, BookOpen, ChevronRight, ChevronLeft, Loader2, AlertCircle, Search, X } from "lucide-react";

// In-memory cache + sessionStorage persistence across route navigations
const blogsCache = {
  pages: {},
  search: {},
};

const getCachedPage = (pageNum) => {
  if (blogsCache.pages[pageNum]) {
    return blogsCache.pages[pageNum];
  }
  try {
    const raw = sessionStorage.getItem(`evershine_blogs_p_${pageNum}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      blogsCache.pages[pageNum] = parsed;
      return parsed;
    }
  } catch {
    // sessionStorage unavailable or parse error
  }
  return null;
};

const setCachedPage = (pageNum, data) => {
  blogsCache.pages[pageNum] = data;
  try {
    sessionStorage.setItem(`evershine_blogs_p_${pageNum}`, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
};

export default function Blogs() {
  const [page, setPage] = useState(0);

  // Initialize state directly from cache if available so there is zero flicker/re-fetch on navigation
  const [blogs, setBlogs] = useState(() => getCachedPage(0)?.content || []);
  const [totalPages, setTotalPages] = useState(() => getCachedPage(0)?.totalPages || 1);
  const [loading, setLoading] = useState(() => !getCachedPage(0));
  const [error, setError] = useState(null);

  // Debounced search state
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Debounce search input by 350ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch paginated blogs only when not in cache
  useEffect(() => {
    const cached = getCachedPage(page);
    if (cached) {
      return;
    }

    let isMounted = true;
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://evershine-backend-1.onrender.com/api/blogs?pageNo=${page}&size=6&sortBy=createdAt&sortDir=desc`,
          {
            headers: {
              accept: "*/*",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to load blogs (${res.status})`);
        }

        const data = await res.json();
        if (isMounted) {
          const content = Array.isArray(data.content) ? data.content : [];
          const pagesCount = data.totalPages || 1;
          setCachedPage(page, { content, totalPages: pagesCount });
          setBlogs(content);
          setTotalPages(pagesCount);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load blogs");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const cached = getCachedPage(newPage);
    if (cached) {
      setBlogs(cached.content);
      setTotalPages(cached.totalPages);
      setLoading(false);
    }
  };

  // Fetch search results via debounced search API (uses search cache)
  useEffect(() => {
    if (!debouncedQuery || blogsCache.search[debouncedQuery]) {
      return;
    }

    let isMounted = true;
    async function performSearch() {
      try {
        setIsSearching(true);
        setSearchError(null);
        const res = await fetch(
          `https://evershine-backend-1.onrender.com/api/blogs/search?keyword=${encodeURIComponent(debouncedQuery)}`,
          {
            headers: {
              accept: "*/*",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Search failed (${res.status})`);
        }

        const data = await res.json();
        if (isMounted) {
          const results = Array.isArray(data) ? data : [];
          blogsCache.search[debouncedQuery] = results;
          setSearchResults(results);
        }
      } catch (err) {
        if (isMounted) {
          setSearchError(err.message || "Failed to search articles");
        }
      } finally {
        if (isMounted) {
          setIsSearching(false);
        }
      }
    }

    performSearch();
    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSearchResults([]);
    setSearchError(null);
  };

  const isSearchMode = debouncedQuery.length > 0;
  const activeSearchResults = blogsCache.search[debouncedQuery] || searchResults;
  const displayedBlogs = isSearchMode ? activeSearchResults : blogs;
  const isOverallLoading = isSearchMode
    ? isSearching && !blogsCache.search[debouncedQuery]
    : loading;

  return (
    <div className="bg-[#fdf8ef] border-t border-[#004060]/10 min-h-screen text-slate-800 font-sans pt-[116px] sm:pt-[124px] md:pt-[116px] lg:pt-[128px] pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        {/* Breadcrumb Navigation - Clickable with equal top/bottom spacing */}
        <nav className="flex items-center gap-2.5 text-base sm:text-lg lg:text-[19px] text-slate-700 font-semibold flex-wrap py-5 sm:py-6">
          <Link to="/" className="hover:text-[#004060] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
          <Link to="/blogs" className="text-[#004060] font-bold hover:underline">
            Blogs &amp; Technical Insights
          </Link>
        </nav>

        {/* Hero Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#004060] font-display tracking-tight leading-tight">
            Steel &amp; Industrial Roofing Insights
          </h1>

          {/* Quick Search Bar with Live Debouncing - Increased width */}
          <div className="relative max-w-xl sm:max-w-2xl mx-auto mt-6 sm:mt-8">
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-[#004060] animate-spin absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            ) : (
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
            <input
              type="text"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 placeholder-slate-400 rounded-2xl pl-12 pr-12 py-3.5 text-sm sm:text-base shadow-sm border border-slate-300/80 focus:outline-none focus:ring-2 focus:ring-[#004060] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isOverallLoading && (
          <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-10 h-10 text-[#004060] animate-spin" />
            <span className="text-base sm:text-lg font-bold text-slate-700">
              {isSearchMode ? "Searching articles..." : "Loading articles..."}
            </span>
          </div>
        )}

        {/* Search Error State */}
        {!isOverallLoading && isSearchMode && searchError && (
          <div className="max-w-xl mx-auto my-12 bg-white rounded-2xl p-8 border border-red-200 shadow-md text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Search Error
            </h2>
            <p className="text-sm text-slate-600 mb-6">{searchError}</p>
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-5 py-2.5 rounded-xl bg-[#004060] text-white font-bold hover:bg-[#002f48] transition cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Regular Fetch Error State */}
        {!isOverallLoading && !isSearchMode && error && (
          <div className="max-w-xl mx-auto my-12 bg-white rounded-2xl p-8 border border-red-200 shadow-md text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Unable to Load Articles
            </h2>
            <p className="text-sm text-slate-600 mb-6">{error}</p>
            <button
              type="button"
              onClick={() => {
                delete blogsCache.pages[page];
                try {
                  sessionStorage.removeItem(`evershine_blogs_p_${page}`);
                } catch {
                  // ignore
                }
                setLoading(true);
                setError(null);
                setPage(page);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#004060] text-white font-bold hover:bg-[#002f48] transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Blog Posts Rendered Area */}
        {!isOverallLoading && !error && !searchError && (
          <div className="max-w-5xl lg:max-w-6xl mx-auto space-y-6">
            {/* Search Result Counter */}
            {isSearchMode && (
              <div className="flex items-center justify-between flex-wrap gap-2 text-sm sm:text-base text-slate-700 font-semibold px-1">
                <span>
                  {displayedBlogs.length === 0
                    ? `No articles found for "${debouncedQuery}"`
                    : `Showing ${displayedBlogs.length} ${
                        displayedBlogs.length === 1 ? "article" : "articles"
                      } for "${debouncedQuery}"`}
                </span>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-xs sm:text-sm font-bold text-[#004060] hover:underline cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}

            {displayedBlogs.length === 0 ? (
              <div className="text-center py-16 bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-sm px-6 max-w-2xl mx-auto">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  No articles found
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {isSearchMode
                    ? `We couldn't find any articles matching "${debouncedQuery}". Try another keyword.`
                    : "Check back later for new engineering and steel publications."}
                </p>
                {isSearchMode && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#004060] text-white text-xs sm:text-sm font-semibold hover:bg-[#002f48] transition cursor-pointer"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              /* Blog List rendered directly on section background with About page line separator */
              <div className="flex flex-col space-y-10 sm:space-y-14">
                {displayedBlogs.map((blog, index) => {
                  const isReverse = index % 2 === 1; // Alternating zig-zag
                  const formattedDate = blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : null;

                  return (
                    /* Separated by the line used in About Us section (no chevron/accordion icons) */
                    <article
                      key={blog.slug || blog.id || index}
                      className="border-b border-[#9eb4c7] pb-10 sm:pb-14 last:border-b-0 transition-colors"
                    >
                      <div
                        className={`flex flex-col ${
                          isReverse ? "md:flex-row-reverse" : "md:flex-row"
                        } gap-8 md:gap-12 lg:gap-16 items-center`}
                      >
                        {/* Image Container */}
                        <div className="w-full md:w-1/2 lg:w-5/12 shrink-0">
                          <Link
                            to={`/blogs/${blog.slug}`}
                            className="group block overflow-hidden rounded-2xl sm:rounded-3xl shadow-md border border-slate-200/80 bg-white aspect-[16/10] relative"
                          >
                            {blog.imageUrl ? (
                              <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-100 text-slate-400">
                                <BookOpen size={44} strokeWidth={1.3} />
                                <span className="text-xs font-medium">Evershine Article</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#003860]/25 via-transparent to-transparent pointer-events-none" />
                          </Link>
                        </div>

                        {/* Content Container */}
                        <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center space-y-3.5 sm:space-y-4">
                          {formattedDate && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600">
                              <Calendar className="w-4 h-4 text-[#004060]" />
                              <span>{formattedDate}</span>
                            </div>
                          )}

                          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#004060] leading-snug font-display">
                            <Link
                              to={`/blogs/${blog.slug}`}
                              className="hover:text-[#002840] transition-colors"
                            >
                              {blog.title}
                            </Link>
                          </h2>

                          <div className="pt-2">
                            <Link
                              to={`/blogs/${blog.slug}`}
                              className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-[#004060] hover:text-[#002840] transition-colors group cursor-pointer"
                            >
                              <span>Read Full Article</span>
                              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls - always visible in normal browsing mode */}
            {!isSearchMode && blogs.length > 0 && (
              <div className="flex items-center justify-center gap-3 pt-10 pb-4">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-white text-[#004060] font-bold border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-[0.98] transition shadow-xs cursor-pointer text-sm sm:text-base"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4.5 h-4.5 shrink-0" />
                  <span>Previous</span>
                </button>
                <span className="text-sm sm:text-base font-bold text-slate-700 px-4 py-2 bg-white/80 backdrop-blur-xs rounded-xl border border-slate-200/90 shadow-xs select-none">
                  Page {page + 1} of {Math.max(1, totalPages)}
                </span>
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-white text-[#004060] font-bold border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-[0.98] transition shadow-xs cursor-pointer text-sm sm:text-base"
                  aria-label="Next Page"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4.5 h-4.5 shrink-0" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Calendar, ArrowRight, BookOpen, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import {
  fetchBlogsPage,
  formatBlogDate,
  getCachedBlogsPage,
  getCachedBlogSearch,
  searchBlogsByKeyword,
} from "../../services/blogService";
import BlogFilterBar from "../../components/ui/BlogFilterBar";
import BlogPagination from "../../components/ui/BlogPagination";

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialUrlSearch = (searchParams.get("search") || searchParams.get("keyword") || "").trim();
  const initialUrlPage = Math.max(0, (parseInt(searchParams.get("page"), 10) || 1) - 1);
  const initialSortBy = searchParams.get("sortBy") === "title" ? "title" : "createdAt";
  const initialSortDir = searchParams.get("sortDir") === "asc" ? "asc" : "desc";

  const [page, setPage] = useState(initialUrlPage);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortDir, setSortDir] = useState(initialSortDir);

  // Initialize state directly from cache if available so there is zero flicker/re-fetch on navigation
  const [blogs, setBlogs] = useState(
    () => getCachedBlogsPage(initialUrlPage, 6, initialSortBy, initialSortDir)?.content || []
  );
  const [totalPages, setTotalPages] = useState(
    () => getCachedBlogsPage(initialUrlPage, 6, initialSortBy, initialSortDir)?.totalPages || 1
  );
  const [loading, setLoading] = useState(
    () => !getCachedBlogsPage(initialUrlPage, 6, initialSortBy, initialSortDir)
  );
  const [error, setError] = useState(null);

  // Debounced search state synced with URL
  const [searchQuery, setSearchQuery] = useState(initialUrlSearch);
  const [debouncedQuery, setDebouncedQuery] = useState(initialUrlSearch);
  const [searchResults, setSearchResults] = useState(
    () => (initialUrlSearch ? getCachedBlogSearch(initialUrlSearch) || [] : [])
  );
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

  // Sync URL query params with debounced search, sort & page
  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedQuery) {
      next.set("search", debouncedQuery);
    } else {
      if (page > 0) next.set("page", String(page + 1));
      if (sortBy !== "createdAt") next.set("sortBy", sortBy);
      if (sortDir !== "desc") next.set("sortDir", sortDir);
    }
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
  }, [debouncedQuery, page, sortBy, sortDir, searchParams, setSearchParams]);

  // Fetch paginated blogs only when not in cache
  useEffect(() => {
    const cached = getCachedBlogsPage(page, 6, sortBy, sortDir);
    if (cached) return;

    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBlogsPage({ pageNo: page, size: 6, sortBy, sortDir });
        if (isMounted) {
          setBlogs(data.content);
          setTotalPages(data.totalPages);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Failed to load blogs");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [page, sortBy, sortDir]);

  const applyCachedOrReset = (nextPage, nextSortBy, nextSortDir) => {
    const cached = getCachedBlogsPage(nextPage, 6, nextSortBy, nextSortDir);
    if (cached) {
      setBlogs(cached.content);
      setTotalPages(cached.totalPages);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    applyCachedOrReset(newPage, sortBy, sortDir);
  };

  const handleSortByChange = (newSortBy) => {
    setSortBy(newSortBy);
    setPage(0);
    applyCachedOrReset(0, newSortBy, sortDir);
  };

  const handleSortDirChange = (newSortDir) => {
    setSortDir(newSortDir);
    setPage(0);
    applyCachedOrReset(0, sortBy, newSortDir);
  };

  // Fetch search results via debounced search API (uses shared blogService cache)
  useEffect(() => {
    if (!debouncedQuery || getCachedBlogSearch(debouncedQuery)) {
      return;
    }

    let isMounted = true;
    async function performSearch() {
      try {
        setIsSearching(true);
        setSearchError(null);
        const results = await searchBlogsByKeyword(debouncedQuery);
        if (isMounted) {
          setSearchResults(results);
        }
      } catch (err) {
        if (isMounted) {
          setSearchError(err?.message || "Failed to search articles");
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
  const activeSearchResults = getCachedBlogSearch(debouncedQuery) || searchResults;
  const displayedBlogs = isSearchMode ? activeSearchResults : blogs;
  const isOverallLoading = isSearchMode
    ? isSearching && !getCachedBlogSearch(debouncedQuery)
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

          {/* Quick Search Bar + Sort Controls */}
          <BlogFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={handleClearSearch}
            isSearching={isSearching}
            isSearchMode={isSearchMode}
            sortBy={sortBy}
            sortDir={sortDir}
            onSortByChange={handleSortByChange}
            onSortDirChange={handleSortDirChange}
            className="max-w-3xl mx-auto mt-6 sm:mt-8"
          />
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
              onClick={async () => {
                setLoading(true);
                setError(null);
                try {
                  const data = await fetchBlogsPage({ pageNo: page, size: 6, sortBy, sortDir, force: true });
                  setBlogs(data.content);
                  setTotalPages(data.totalPages);
                } catch (err) {
                  setError(err?.message || "Failed to load blogs");
                } finally {
                  setLoading(false);
                }
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
                  const formattedDate = formatBlogDate(blog.createdAt);

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
              <BlogPagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

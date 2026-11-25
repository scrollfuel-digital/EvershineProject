// src/pages/Admin/blogs/BlogAdminView.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  BookOpen,
  LayoutGrid,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileText,
} from "lucide-react";
import {
  fetchBlogsPage,
  fetchBlogBySlug,
  deleteBlog,
  formatBlogDate,
  getCachedBlogsPage,
  getCachedBlogSearch,
  searchBlogsByKeyword,
} from "../../../services/blogService";
import BlogFilterBar from "../../../components/ui/BlogFilterBar";
import BlogPagination from "../../../components/ui/BlogPagination";
import BlogForm from "./BlogForm";

const ADMIN_BLOG_TABS = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "add-blog", label: "Add Blog", icon: Plus },
  { id: "update-delete", label: "Update & Delete", icon: Edit3 },
];

export default function BlogAdminView() {
  const { subSection } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialUrlSearch = (searchParams.get("search") || searchParams.get("keyword") || "").trim();
  const initialUrlPage = Math.max(0, (parseInt(searchParams.get("page"), 10) || 1) - 1);
  const initialSortBy = searchParams.get("sortBy") === "title" ? "title" : "createdAt";
  const initialSortDir = searchParams.get("sortDir") === "asc" ? "asc" : "desc";

  let activeTab = "overview";
  if (subSection === "add-blog") activeTab = "add-blog";
  else if (subSection === "update-delete") activeTab = "update-delete";

  const [page, setPage] = useState(initialUrlPage);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortDir, setSortDir] = useState(initialSortDir);
  const [pageData, setPageData] = useState(
    () => getCachedBlogsPage(initialUrlPage, 6, initialSortBy, initialSortDir)
  );
  const [loading, setLoading] = useState(
    () => !getCachedBlogsPage(initialUrlPage, 6, initialSortBy, initialSortDir)
  );
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState(initialUrlSearch);
  const [debouncedQuery, setDebouncedQuery] = useState(initialUrlSearch);
  const [searchResults, setSearchResults] = useState(
    () => (initialUrlSearch ? getCachedBlogSearch(initialUrlSearch) || [] : [])
  );
  const [isSearching, setIsSearching] = useState(false);

  const [editingBlog, setEditingBlog] = useState(null);
  const [fetchingSlug, setFetchingSlug] = useState(null);
  const [deletingSlug, setDeletingSlug] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (activeTab === "add-blog") return;
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
  }, [activeTab, debouncedQuery, page, sortBy, sortDir, searchParams, setSearchParams]);

  const loadPage = useCallback(
    async (pageNo, force = false, sBy = sortBy, sDir = sortDir) => {
      const cached = !force ? getCachedBlogsPage(pageNo, 6, sBy, sDir) : null;
      if (cached) {
        setPageData(cached);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchBlogsPage({ pageNo, size: 6, sortBy: sBy, sortDir: sDir, force });
        setPageData(data);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    },
    [sortBy, sortDir]
  );

  useEffect(() => {
    if (getCachedBlogsPage(page, 6, sortBy, sortDir)) return;

    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBlogsPage({ pageNo: page, size: 6, sortBy, sortDir });
        if (isMounted) setPageData(data);
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.message || err?.message || "Failed to load blogs.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [page, sortBy, sortDir]);

  useEffect(() => {
    if (!debouncedQuery || getCachedBlogSearch(debouncedQuery)) return;

    let isMounted = true;
    async function runSearch() {
      try {
        setIsSearching(true);
        setError(null);
        const results = await searchBlogsByKeyword(debouncedQuery);
        if (isMounted) setSearchResults(results);
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.message || err?.message || "Search failed.");
        }
      } finally {
        if (isMounted) setIsSearching(false);
      }
    }
    runSearch();
    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  const applyCached = (nextPage, nextSortBy, nextSortDir) => {
    const cached = getCachedBlogsPage(nextPage, 6, nextSortBy, nextSortDir);
    if (cached) {
      setPageData(cached);
      setLoading(false);
      setError(null);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    applyCached(newPage, sortBy, sortDir);
  };

  const handleSortByChange = (newSortBy) => {
    setSortBy(newSortBy);
    setPage(0);
    applyCached(0, newSortBy, sortDir);
  };

  const handleSortDirChange = (newSortDir) => {
    setSortDir(newSortDir);
    setPage(0);
    applyCached(0, sortBy, newSortDir);
  };

  const handleTabChange = (tabId) => {
    setEditingBlog(null);
    setStatusMessage(null);
    navigate(`/admin/blogs/${tabId}`);
  };

  const handleSelectForEdit = async (blog) => {
    try {
      setError(null);
      setStatusMessage(null);
      setFetchingSlug(blog.slug);
      const fullBlog = await fetchBlogBySlug(blog.slug);
      setEditingBlog(fullBlog);
      if (activeTab !== "update-delete") {
        navigate("/admin/blogs/update-delete");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load blog details.");
    } finally {
      setFetchingSlug(null);
    }
  };

  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This action cannot be undone.`)) return;

    try {
      setError(null);
      setStatusMessage(null);
      setDeletingSlug(blog.slug);

      let blogId = blog.id;
      if (!blogId) {
        const fullBlog = await fetchBlogBySlug(blog.slug);
        blogId = fullBlog?.id;
      }
      if (!blogId) throw new Error("Unable to resolve blog ID for deletion.");

      const res = await deleteBlog(blogId, blog.slug);
      setStatusMessage(res?.message || "Blog deleted successfully.");
      await loadPage(page, true);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to delete blog.");
    } finally {
      setDeletingSlug(null);
    }
  };

  const handleSaved = async (savedBlog, action) => {
    setEditingBlog(null);
    setStatusMessage(
      `Blog "${savedBlog?.title || ""}" ${action === "updated" ? "updated" : "published"} successfully.`
    );
    await loadPage(0, true);
    setPage(0);
    navigate("/admin/blogs/update-delete");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSearchResults([]);
  };

  const isSearchMode = debouncedQuery.length > 0;
  const activeSearchResults = getCachedBlogSearch(debouncedQuery) || searchResults;
  const blogs = pageData?.content || [];
  const displayedBlogs = isSearchMode ? activeSearchResults : blogs;
  const isOverallLoading = isSearchMode
    ? isSearching && !getCachedBlogSearch(debouncedQuery)
    : loading;
  const totalElements = pageData?.totalElements ?? blogs.length;
  const totalPages = Math.max(1, pageData?.totalPages ?? 1);

  const statsCards = [
    { label: "Available Blogs", value: loading ? "—" : totalElements, icon: BookOpen },
    { label: "Total Pages", value: loading ? "—" : totalPages, icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#c4a574]/30">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 font-display tracking-tight flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-[#c4a574]" />
          <span>Blog Management</span>
        </h1>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {ADMIN_BLOG_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "bg-white text-neutral-900 border border-[#c4a574]/40 hover:text-[#c4a574]"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {statusMessage && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm sm:text-base font-semibold">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm sm:text-base font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {statsCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-white rounded-2xl border border-[#c4a574]/35 p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-semibold text-neutral-700">
                      {card.label}
                    </span>
                    <Icon className="w-5 h-5 text-[#c4a574]" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-neutral-900 font-display mt-2">
                    {card.value}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-[#c4a574]/35 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
                Published Blogs
              </h2>
              <button
                type="button"
                onClick={() => handleTabChange("update-delete")}
                className="text-sm sm:text-base font-semibold text-neutral-900 hover:text-[#c4a574] cursor-pointer"
              >
                Manage All →
              </button>
            </div>

            {loading ? (
              <div className="py-12 flex items-center justify-center gap-3 text-neutral-700 text-base">
                <Loader2 className="w-6 h-6 animate-spin text-[#c4a574]" />
                <span>Loading blogs...</span>
              </div>
            ) : blogs.length === 0 ? (
              <p className="text-base text-slate-600 py-8 text-center">No blogs published yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {blogs.map((blog) => {
                  const dateLabel = formatBlogDate(blog.createdAt);
                  return (
                    <div
                      key={blog.slug}
                      onClick={() => handleSelectForEdit(blog)}
                      className="group rounded-xl border border-slate-200 overflow-hidden bg-[#fdf8ef]/50 hover:border-[#c4a574] transition cursor-pointer flex flex-col"
                    >
                      <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                        {blog.imageUrl && (
                          <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#c4a574] transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        {dateLabel && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4 text-[#c4a574]" />
                            <span>{dateLabel}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD BLOG */}
      {activeTab === "add-blog" && <BlogForm mode="create" onSaved={handleSaved} />}

      {/* UPDATE & DELETE */}
      {activeTab === "update-delete" &&
        (editingBlog ? (
          <BlogForm
            key={editingBlog.id}
            mode="edit"
            initialData={editingBlog}
            onSaved={handleSaved}
            onCancel={() => setEditingBlog(null)}
          />
        ) : (
          <div className="space-y-5">
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
              placeholder="Filter blogs by title or keyword..."
            />

            {isOverallLoading ? (
              <div className="py-16 flex items-center justify-center gap-3 text-neutral-800 text-base font-semibold bg-white rounded-2xl border border-[#c4a574]/35">
                <Loader2 className="w-6 h-6 animate-spin text-[#c4a574]" />
                <span>{isSearchMode ? "Searching blogs..." : "Loading blogs..."}</span>
              </div>
            ) : displayedBlogs.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-[#c4a574]/35 space-y-3">
                <p className="text-base sm:text-lg font-semibold text-neutral-900">
                  {isSearchMode ? `No blogs found for "${debouncedQuery}".` : "No blogs available."}
                </p>
                <button
                  type="button"
                  onClick={isSearchMode ? handleClearSearch : () => handleTabChange("add-blog")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white hover:bg-[#c4a574] text-sm sm:text-base font-semibold transition cursor-pointer"
                >
                  {!isSearchMode && <Plus className="w-4 h-4" />}
                  <span>{isSearchMode ? "Clear Filter" : "Add First Blog"}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedBlogs.map((blog) => {
                  const isFetching = fetchingSlug === blog.slug;
                  const isDeleting = deletingSlug === blog.slug;
                  const dateLabel = formatBlogDate(blog.createdAt);

                  return (
                    <div
                      key={blog.slug}
                      className="bg-white rounded-2xl border border-[#c4a574]/35 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6"
                    >
                      <div className="w-full md:w-44 aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        {blog.imageUrl && (
                          <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-slate-600 font-mono truncate">{blog.slug}</p>
                        {dateLabel && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4 text-[#c4a574]" />
                            <span>{dateLabel}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => handleSelectForEdit(blog)}
                          disabled={isFetching || isDeleting}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-white hover:bg-[#c4a574] disabled:opacity-50 text-sm sm:text-base font-semibold transition cursor-pointer"
                        >
                          {isFetching ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Edit3 className="w-4 h-4" />
                          )}
                          <span>{isFetching ? "Loading..." : "Update"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(blog)}
                          disabled={isFetching || isDeleting}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 text-sm sm:text-base font-semibold transition cursor-pointer"
                        >
                          {isDeleting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!isSearchMode && displayedBlogs.length > 0 && (
              <BlogPagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        ))}
    </div>
  );
}

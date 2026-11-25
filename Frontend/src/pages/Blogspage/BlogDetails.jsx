import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, ArrowLeft, Calendar, Loader2, AlertCircle } from "lucide-react";
import { fetchBlogBySlug, formatBlogDate, getCachedBlogBySlug } from "../../services/blogService";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(() => getCachedBlogBySlug(slug));
  const [loading, setLoading] = useState(() => !getCachedBlogBySlug(slug));
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    if (!slug || getCachedBlogBySlug(slug)) return;

    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBlogBySlug(slug);
        if (isMounted) setBlog(data);
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.message || err?.message || "Failed to load blog post");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const formattedDate = formatBlogDate(blog?.createdAt);

  return (
    <div className="bg-[#fdf8ef] border-t border-[#004060]/10 min-h-screen text-slate-800 font-sans pt-[116px] sm:pt-[124px] md:pt-[116px] lg:pt-[128px] pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        {/* Breadcrumb Navigation - Clickable with equal top/bottom spacing */}
        <nav className="flex items-center gap-2.5 text-base sm:text-lg lg:text-[19px] text-slate-700 font-semibold flex-wrap py-5 sm:py-6">
          <Link to="/" className="hover:text-[#004060] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
          <Link to="/blogs" className="hover:text-[#004060] transition-colors">
            Blogs &amp; Technical Insights
          </Link>
          {blog && (
            <>
              <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
              <span className="text-[#004060] font-bold truncate max-w-xs sm:max-w-md md:max-w-xl">
                {blog.title}
              </span>
            </>
          )}
        </nav>

        {/* Loading State */}
        {loading && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-10 h-10 text-[#004060] animate-spin" />
            <span className="text-base sm:text-lg font-bold text-slate-700">
              Loading article...
            </span>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-xl mx-auto my-12 bg-white rounded-2xl sm:rounded-3xl p-8 shadow-[0_12px_36px_rgba(0,0,0,0.08)] text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Article Not Found
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              The article you are looking for may have been removed or is temporarily unavailable.
            </p>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004060] text-white font-bold hover:bg-[#002f48] transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </Link>
          </div>
        )}

        {/* Loaded Blog Content - Renders immediately with zero opacity delays */}
        {!loading && blog && (
          <article className="max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.08)] p-6 sm:p-10 lg:p-14 transition-opacity duration-300">
            {/* Back Link */}
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#004060] hover:text-[#002540] transition-colors mb-6 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to all articles</span>
            </Link>

            {/* Meta Date */}
            {formattedDate && (
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 mb-3">
                <Calendar className="w-4 h-4 text-[#004060]" />
                <span>{formattedDate}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#004060] font-display leading-[1.25] mb-6 sm:mb-8 pb-4 border-b border-slate-200">
              {blog.title}
            </h1>

            {/* Featured Image - styled smaller and centered */}
            {blog.imageUrl && (
              <div className="max-w-2xl mx-auto overflow-hidden rounded-xl sm:rounded-2xl mb-8 sm:mb-10 shadow-md border border-slate-200/80 bg-slate-100">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full max-h-[320px] sm:max-h-[380px] object-cover mx-auto"
                />
              </div>
            )}

            {/* HTML Content Body */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Footer Back Link */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-base font-bold text-[#004060] hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to all articles</span>
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

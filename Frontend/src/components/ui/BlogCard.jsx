import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function BlogCard({ blog, className = "" }) {
  const [imgError, setImgError] = useState(false);

  if (!blog) return null;

  const {
    title,
    image,
    category,
    date,
    href = "/blogs",
  } = blog;

  return (
    <Link
      to={href}
      className={`group flex flex-col gap-2 sm:gap-2.5 text-inherit no-underline select-none ${className}`}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100">
        {image && !imgError ? (
          <img
            src={image}
            alt={title || "Blog cover"}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-slate-400">
            <BookOpen size={32} strokeWidth={1.4} />
            <span className="text-xs">No image</span>
          </div>
        )}
      </div>

      {/* Category Tag */}
      {category && (
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#004060]">
          {category}
        </span>
      )}

      {/* Title */}
      <h3
        className="line-clamp-2 min-h-[2.6rem] sm:min-h-[3rem] text-sm sm:text-base lg:text-[17px] font-bold leading-snug text-slate-900 group-hover:text-[#004060] transition-colors"
        title={title}
      >
        {title}
      </h3>

      {/* Date */}
      {date && (
        <p className="text-xs sm:text-sm text-slate-500">
          {date}
        </p>
      )}
    </Link>
  );
}


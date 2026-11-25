// src/pages/Admin/AdminNavbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import evershineLogo from "../../assets/evershine png.png";
import { HiOutlineSearch, HiOutlineChevronDown } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";

export default function AdminNavbar({
  isSidebarOpen = false,
  onToggleSidebar = () => {},
}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = () => {
    setIsProfileOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : "A";

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full border-b border-[#c4a574]/30 select-none"
      style={{ backgroundColor: "#efe4d2" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 h-[64px] sm:h-[72px] lg:h-[84px] flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
        {/* LEFT — LOGO + ADMIN BADGE */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
          <Link
            to="/admin"
            className="shrink-0 flex items-center transition-transform duration-300 ease-out hover:scale-105"
          >
            <img
              src={evershineLogo}
              alt="Evershine Solution Logo"
              className="h-[50px] sm:h-[58px] lg:h-[68px] w-auto object-contain"
            />
          </Link>

          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase bg-white/80 text-neutral-900 border border-[#c4a574]/40">
            Admin Panel
          </span>
        </div>

        {/* CENTER — SEARCH BAR (tablet & up) */}
        <div className="hidden md:flex flex-1 justify-center min-w-0">
          <div className="relative w-full max-w-[620px] lg:max-w-[800px] xl:max-w-[920px]">
            <div className="flex items-center bg-white/90 rounded-xl border border-[#c4a574]/40 px-3 lg:px-4 h-[38px] lg:h-[46px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#c4a574]">
              <HiOutlineSearch className="text-slate-400 text-base lg:text-lg shrink-0" />
              <input
                type="text"
                placeholder="Search admin panel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-0 pl-2 lg:pl-3 pr-2 text-sm bg-transparent text-neutral-900 placeholder-slate-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT — USER PROFILE & MOBILE SIDEBAR TOGGLE */}
        <div className="flex items-center gap-3 shrink-0">
          {/* USER PROFILE (Admin UI-only) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 rounded-xl border border-[#c4a574]/40 hover:border-[#c4a574] bg-white/80 hover:bg-white transition-all text-neutral-900 focus:outline-none cursor-pointer"
              aria-expanded={isProfileOpen}
              aria-label="User profile menu"
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                {userInitial}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-neutral-900 leading-tight">Admin User</span>
                <span className="text-[10px] text-neutral-600 leading-tight truncate max-w-[120px]">
                  {user?.username || "Admin"}
                </span>
              </div>
              <HiOutlineChevronDown
                className={`w-3.5 h-3.5 text-neutral-600 transition-transform duration-200 ${
                  isProfileOpen ? "rotate-180 text-[#c4a574]" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-[popIn_0.15s_ease-out]">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">Administrator</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.username || "admin@evershine.com"}</p>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Profile Settings
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Account Preferences
                    </button>
                    <Link
                      to="/"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-xs text-neutral-900 hover:text-[#c4a574] hover:bg-slate-50 transition-colors"
                    >
                      <span>View Live Site</span>
                      <span className="text-[10px] text-slate-400">Exit</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Sidebar Toggle Button for Admin */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-neutral-900 hover:text-[#c4a574] hover:bg-white/60 transition-colors text-xl font-bold cursor-pointer"
            onClick={onToggleSidebar}
            aria-label="Toggle admin sidebar"
          >
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </header>
  );
}

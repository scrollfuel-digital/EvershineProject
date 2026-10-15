// src/pages/Admin/AdminNavbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import evershineLogo from "../../assets/Evershinelogo.png";
import { HiOutlineSearch, HiOutlineChevronDown } from "react-icons/hi";

export default function AdminNavbar({
  isSidebarOpen = false,
  onToggleSidebar = () => {},
}) {
  const [search, setSearch] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b border-light-gray select-none">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 h-[64px] sm:h-[72px] lg:h-[84px] flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
        {/* LEFT — LOGO + ADMIN BADGE */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
          <Link
            to="/admin"
            className="shrink-0 flex items-center h-full overflow-hidden transition-transform duration-300 ease-out hover:scale-105"
          >
            <img
              src={evershineLogo}
              alt="Evershine Solution Logo"
              className="h-[150%] max-h-[100px] sm:max-h-[150px] lg:max-h-[170px] xl:h-[270%] xl:max-h-[164px] w-auto object-contain"
            />
          </Link>

          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase bg-slate-100 text-primary border border-slate-200">
            Admin Panel
          </span>
        </div>

        {/* CENTER — SEARCH BAR (tablet & up) */}
        <div className="hidden md:flex flex-1 justify-center min-w-0">
          <div className="relative w-full max-w-[620px] lg:max-w-[800px] xl:max-w-[920px]">
            <div className="flex items-center bg-light-gray rounded-lg border border-transparent px-3 lg:px-4 h-[38px] lg:h-[46px] transition-all duration-300 hover:border-light focus-within:border-primary focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,64,96,0.08)]">
              <HiOutlineSearch className="text-gray text-base lg:text-lg shrink-0" />
              <input
                type="text"
                placeholder="Search admin panel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-0 pl-2 lg:pl-3 pr-2 text-sm bg-transparent text-dark placeholder-gray outline-none"
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
              className="flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/80 hover:bg-slate-100 transition-all text-slate-800 focus:outline-none"
              aria-expanded={isProfileOpen}
              aria-label="User profile menu"
            >
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shadow-xs">
                AD
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 leading-tight">Admin User</span>
                <span className="text-[10px] text-slate-500 leading-tight">Super Admin</span>
              </div>
              <HiOutlineChevronDown
                className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                  isProfileOpen ? "rotate-180 text-primary" : ""
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
                    <p className="text-[11px] text-slate-500 truncate">admin@evershine.com</p>
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
                      className="flex items-center justify-between px-4 py-2 text-xs text-[#1849A9] hover:bg-blue-50 transition-colors"
                    >
                      <span>View Live Site</span>
                      <span className="text-[10px] text-slate-400">Exit</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
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
            className="lg:hidden p-2 rounded-lg text-primary hover:bg-slate-100 transition-colors text-xl font-bold"
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

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { AdminDashboardProvider } from "./products/AdminDashboardContext";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminDashboardProvider>
      <div className="admin-root min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Dedicated Admin Navbar */}
        <AdminNavbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* Main Admin Area below fixed Navbar */}
        <div className="pt-[64px] sm:pt-[72px] lg:pt-[84px] flex flex-1 min-h-screen">
          {/* Left Persistent & Responsive Sidebar */}
          <AdminSidebar
            isMobileOpen={isSidebarOpen}
            onCloseMobile={() => setIsSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminDashboardProvider>
  );
}

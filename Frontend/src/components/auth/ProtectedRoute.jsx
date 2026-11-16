// src/components/auth/ProtectedRoute.jsx
// Role-based route guard for Evershine Prefab Solutions
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Route protection component ensuring only authenticated users and appropriate roles can access routes.
 * @param {Object} props
 * @param {boolean} [props.requireAdmin=false] - Enforces ROLE_ADMIN access
 * @param {React.ReactNode} [props.children] - Child components to render when authorized
 */
export default function ProtectedRoute({ requireAdmin = false, children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium text-slate-500">Checking authorization...</span>
        </div>
      </div>
    );
  }

  // Not authenticated -> redirect to login preserving intent
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin route requested but user is not ROLE_ADMIN
  if (requireAdmin && !isAdmin) {
    console.warn("Access Denied: Admin privileges required for this route.");
    return <Navigate to="/" replace />;
  }

  return children;
}

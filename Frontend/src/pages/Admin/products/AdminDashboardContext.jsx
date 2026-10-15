import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import dataProccess, { processAdminData } from "./dataProccess.js";

const AdminDashboardContext = createContext(null);

const DASHBOARD_API_URL = "https://evershine-backend-1.onrender.com/api/admin-dashboard";

export function AdminDashboardProvider({ children }) {
  const [data, setData] = useState(null);
  const [adminMetrics, setAdminMetrics] = useState(null);
  const [filterHierarchy, setFilterHierarchy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async (force = false) => {
    setLoading(true);
    setError(null);
    try {
      // Async fetch using axios in parallel with filter relations
      const [dashResponse, filterResult] = await Promise.all([
        axios.get(DASHBOARD_API_URL, { headers: { Accept: "application/json" } }),
        dataProccess(force),
      ]);

      const rawData = dashResponse.data;
      const processedMetrics = processAdminData(rawData);

      setData(rawData);
      setAdminMetrics(processedMetrics);
      setFilterHierarchy(filterResult);
    } catch (err) {
      console.error("Dashboard API Error:", err);
      const errMsg = err.response?.data?.message || err.message || "Failed to load dashboard metrics";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch only once on initial mount
  useEffect(() => {
    if (!data && !loading) {
      fetchDashboardData(false);
    }
  }, [data, loading, fetchDashboardData]);

  const value = useMemo(
    () => ({
      data,
      loading,
      error,
      refetch: () => fetchDashboardData(true),
      // Processed Admin Metrics
      adminMetrics,
      nameMap: adminMetrics?.nameMap || new Map(),
      counts: adminMetrics?.counts || {},
      productCounts: adminMetrics?.productCounts || {},
      // Filter Hierarchy from dataProccess (single source of truth)
      filterHierarchy,
      categories: filterHierarchy?.categories || [],
      // Active-only lists for product forms & catalogue filters
      brands: filterHierarchy?.brands || [],
      subBrands: filterHierarchy?.subBrands || [],
      grades: filterHierarchy?.grades || [],
      subGrades: filterHierarchy?.subGrades || [],
      // Complete lists (active & unavailable) for Filter Options management
      allBrands: filterHierarchy?.allBrands || [],
      allSubBrands: filterHierarchy?.allSubBrands || [],
      allGrades: filterHierarchy?.allGrades || [],
      allSubGrades: filterHierarchy?.allSubGrades || [],
      categoryTypesMap: filterHierarchy?.categoryTypesMap || new Map(),
      categoryVariantsMap: filterHierarchy?.categoryVariantsMap || new Map(),
      // Reusable processors
      processAdminData,
      adminData: processAdminData,
      dataProccess,
    }),
    [data, adminMetrics, filterHierarchy, loading, error, fetchDashboardData]
  );

  return (
    <AdminDashboardContext.Provider value={value}>
      {children}
    </AdminDashboardContext.Provider>
  );
}

export function useAdminDashboard() {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    throw new Error("useAdminDashboard must be used within an AdminDashboardProvider");
  }
  return context;
}

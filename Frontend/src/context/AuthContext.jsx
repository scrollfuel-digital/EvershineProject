// src/context/AuthContext.jsx
// Centralized authentication context and provider for Evershine Prefab Solutions
import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import {
  getStoredToken,
  setStoredToken,
  getStoredUser,
  setStoredUser,
  clearStoredAuth,
  loginUser,
  API_BASE_URL,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getStoredToken());
  const [user, setUserState] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(false);

  // Setup Axios Request Interceptor for automatic Authorization header injection
  useEffect(() => {
    const interceptorId = axios.interceptors.request.use(
      (config) => {
        const currentToken = getStoredToken();
        // Only attach token to requests matching our backend base URL
        if (currentToken && config.url && (config.url.startsWith(API_BASE_URL) || config.url.startsWith("/api"))) {
          config.headers = config.headers || {};
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${currentToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(interceptorId);
    };
  }, []);

  /**
   * Log in user with credentials and store authentication state
   * @param {Object} credentials - { username: string, password: string }
   * @returns {Promise<{ token: string, username: string, role: string }>}
   */
  const login = useCallback(async ({ username, password }) => {
    setLoading(true);
    try {
      const data = await loginUser({ username, password });
      const { token: receivedToken, username: authUsername, role } = data;

      const authUser = {
        username: authUsername || username,
        role: role || "ROLE_USER",
      };

      setStoredToken(receivedToken);
      setStoredUser(authUser);

      setTokenState(receivedToken);
      setUserState(authUser);

      return {
        token: receivedToken,
        user: authUser,
        role: authUser.role,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Log out user and clear stored credentials
   */
  const logout = useCallback(() => {
    clearStoredAuth();
    setTokenState(null);
    setUserState(null);
  }, []);

  const value = useMemo(() => {
    const isAuthenticated = Boolean(token && user);
    const isAdmin = Boolean(isAuthenticated && user?.role === "ROLE_ADMIN");
    const isDeveloper = Boolean(isAuthenticated && user?.role === "ROLE_DEVELOPER");

    return {
      token,
      user,
      isAuthenticated,
      isAdmin,
      isDeveloper,
      loading,
      login,
      logout,
    };
  }, [token, user, loading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;

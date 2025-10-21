import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';
import { STORAGE_KEYS } from '../utils/constants';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get user from localStorage first (for faster initial load)
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // Verify with backend
      const userData = await authApi.getMe();
      setUser(userData);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));

      // Get CSRF token
      const token = await authApi.getCSRFToken();
      setCsrfToken(token);
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setCsrfToken(null);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      // Only set error if it's not a 401 (which means user is not logged in)
      if (error.response?.status !== 401) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(() => {
    authApi.googleLogin();
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
      setUser(null);
      setCsrfToken(null);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if API call fails
      setUser(null);
      setCsrfToken(null);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = '/';
    }
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  }, []);

  const value = {
    user,
    csrfToken,
    loading,
    error,
    isAuthenticated: !!user,
    checkAuth,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
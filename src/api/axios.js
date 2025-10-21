import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for session cookies
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Store for CSRF token
let csrfToken = null;

// Function to set CSRF token
export const setCSRFToken = (token) => {
  csrfToken = token;
};

// Function to get CSRF token
export const getCSRFToken = () => csrfToken;

// Request interceptor - add CSRF token to requests that need it
api.interceptors.request.use(
  (config) => {
    // Add CSRF token to state-changing requests
    if (csrfToken && ['post', 'put', 'delete', 'patch'].includes(config.method)) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log error in development
    if (import.meta.env.DEV) {
      console.error('[API Response Error]', {
        url: originalRequest?.url,
        method: originalRequest?.method,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    
    // Handle 401 Unauthorized - redirect to home/login
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear stored user data
      localStorage.removeItem('ureshii_user');
      csrfToken = null;
      
      // Redirect to home page
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      // Check if it's CSRF error
      if (error.response?.data?.detail?.includes('CSRF')) {
        // Try to refresh CSRF token
        try {
          const { data } = await api.get('/api/v1/auth/csrf');
          setCSRFToken(data.csrf_token);
          // Retry the original request with new token
          originalRequest.headers['X-CSRF-Token'] = data.csrf_token;
          return api(originalRequest);
        } catch (csrfError) {
          console.error('Failed to refresh CSRF token', csrfError);
        }
      }
    }
    
    // Handle 429 Too Many Requests
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      error.response.data = {
        ...error.response.data,
        detail: `Rate limit exceeded. Please wait ${retryAfter ? `${retryAfter} seconds` : 'a moment'} before trying again.`,
      };
    }
    
    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      error.response.data = {
        ...error.response.data,
        detail: 'An internal server error occurred. Please try again later.',
      };
    }
    
    // Handle network errors
    if (!error.response) {
      error.response = {
        data: {
          detail: 'Network error. Please check your connection and try again.',
        },
      };
    }
    
    return Promise.reject(error);
  }
);

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Export configured axios instance
export default api;
import api, { setCSRFToken } from './axios';
import { API_V1_STR } from '../utils/constants';

/**
 * Auth API service
 */
export const authApi = {
  /**
   * Get current user information
   * @returns {Promise} User data
   */
  async getMe() {
    const { data } = await api.get(`${API_V1_STR}/auth/me`);
    return data;
  },

  /**
   * Get CSRF token
   * @returns {Promise} CSRF token
   */
  async getCSRFToken() {
    const { data } = await api.get(`${API_V1_STR}/auth/csrf`);
    setCSRFToken(data.csrf_token);
    return data.csrf_token;
  },

  /**
   * Initiate Google OAuth login
   * This will redirect to Google OAuth page
   */
  googleLogin() {
    window.location.href = `${api.defaults.baseURL}${API_V1_STR}/auth/google/login`;
  },

  /**
   * Logout user
   * @returns {Promise}
   */
  async logout() {
    await api.get(`${API_V1_STR}/auth/logout`);
    setCSRFToken(null);
    localStorage.removeItem('ureshii_user');
    window.location.href = '/';
  },

  /**
   * Check authentication status
   * @returns {Promise<boolean>} Whether user is authenticated
   */
  async checkAuth() {
    try {
      await this.getMe();
      return true;
    } catch (error) {
      return false;
    }
  },
};
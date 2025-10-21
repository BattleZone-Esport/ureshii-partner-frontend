import api from './axios';
import { API_V1_STR } from '../utils/constants';

/**
 * App API service
 */
export const appApi = {
  /**
   * Get app info
   * @returns {Promise} App metadata
   */
  async getInfo() {
    const { data } = await api.get(`${API_V1_STR}/app/info`);
    return data;
  },

  /**
   * Get quick actions for landing page
   * @returns {Promise} Quick actions array
   */
  async getQuickActions() {
    const { data } = await api.get(`${API_V1_STR}/app/quick-actions`);
    return data;
  },

  /**
   * Get health status
   * @returns {Promise} Health check
   */
  async getHealth() {
    const { data } = await api.get('/healthz');
    return data;
  },

  /**
   * Get metrics (if available)
   * @returns {Promise} Metrics data
   */
  async getMetrics() {
    const { data } = await api.get('/metrics');
    return data;
  },
};
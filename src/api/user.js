import api from './axios';
import { API_V1_STR } from '../utils/constants';

/**
 * User API service
 */
export const userApi = {
  /**
   * Toggle private mode
   * @param {boolean} enabled - Whether to enable private mode
   * @returns {Promise}
   */
  async togglePrivateMode(enabled) {
    const { data } = await api.post(`${API_V1_STR}/user/private/toggle`, { enabled });
    return data;
  },

  /**
   * Get private mode status
   * @returns {Promise} Private mode status
   */
  async getPrivateModeStatus() {
    const { data } = await api.get(`${API_V1_STR}/user/private/status`);
    return data;
  },

  /**
   * Save user preferences/custom instructions
   * @param {Object} preferences - User preferences
   * @returns {Promise}
   */
  async savePreferences(preferences) {
    const { data } = await api.post(`${API_V1_STR}/user/preferences`, preferences);
    return data;
  },

  /**
   * Get user preferences (legacy - for backward compatibility)
   * @returns {Promise} User preferences
   */
  async getPreferences() {
    try {
      const { data } = await api.get(`${API_V1_STR}/user/settings`);
      return data;
    } catch (error) {
      // Fallback to empty preferences
      return {};
    }
  },

  /**
   * Get user settings (consolidated)
   * @returns {Promise} User settings
   */
  async getSettings() {
    const { data } = await api.get(`${API_V1_STR}/user/settings`);
    return data;
  },

  /**
   * Update user settings
   * @param {Object} settings - Settings to update
   * @returns {Promise}
   */
  async updateSettings(settings) {
    const { data } = await api.put(`${API_V1_STR}/user/settings`, settings);
    return data;
  },

  /**
   * Get user memory
   * @returns {Promise} User memory including chat history and journal
   */
  async getMemory() {
    const { data } = await api.get(`${API_V1_STR}/user/memory`);
    return data;
  },

  /**
   * Clear user memory (chat history)
   * @returns {Promise}
   */
  async clearMemory() {
    const { data } = await api.delete(`${API_V1_STR}/user/memory`);
    return data;
  },

  /**
   * Add journal entry
   * @param {string} entry - Journal text
   * @param {Array} tags - Optional tags
   * @returns {Promise}
   */
  async addJournalEntry(entry, tags = []) {
    const { data } = await api.post(`${API_V1_STR}/user/journal`, { entry, tags });
    return data;
  },

  /**
   * Get journal entries
   * @param {number} limit - Number of entries to retrieve
   * @returns {Promise} Journal entries
   */
  async getJournal(limit = 50) {
    const { data } = await api.get(`${API_V1_STR}/user/journal`, {
      params: { limit },
    });
    return data;
  },

  /**
   * Update user profile (deprecated - use updateSettings)
   * @param {Object} profile - Profile data
   * @returns {Promise}
   */
  async updateProfile(profile) {
    return this.updateSettings({ profile });
  },

  /**
   * Get usage statistics (deprecated - included in getSettings)
   * @returns {Promise} Usage statistics
   */
  async getUsageStats() {
    const settings = await this.getSettings();
    return settings.stats || {};
  },

  /**
   * Delete user account
   * @param {string} confirmation - Confirmation text
   * @returns {Promise}
   */
  async deleteAccount(confirmation) {
    const { data } = await api.delete(`${API_V1_STR}/user/account`, {
      data: { confirmation },
    });
    return data;
  },
};
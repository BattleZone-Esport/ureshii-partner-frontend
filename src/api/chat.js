import api from './axios';
import { API_V1_STR } from '../utils/constants';

/**
 * Chat API service
 */
export const chatApi = {
  /**
   * Send a chat message (authenticated users)
   * @param {Object} payload - Message payload
   * @param {string} payload.prompt - User message
   * @param {string} [payload.model] - AI model to use
   * @returns {Promise} AI response
   */
  async sendMessage(payload) {
    const { data } = await api.post(`${API_V1_STR}/chat`, payload);
    return data;
  },

  /**
   * Send a guest chat message
   * @param {string} message - User message
   * @returns {Promise} AI response with remaining messages
   */
  async sendGuestMessage(message) {
    const { data } = await api.post(`${API_V1_STR}/guest/chat`, { message });
    return data;
  },

  /**
   * Get guest chat status
   * @returns {Promise} Guest chat status with remaining messages
   */
  async getGuestStatus() {
    const { data } = await api.get(`${API_V1_STR}/guest/status`);
    return data;
  },

  /**
   * Get chat history for authenticated user
   * @param {number} skip - Number of messages to skip
   * @param {number} limit - Number of messages to return
   * @returns {Promise} Chat history
   */
  async getChatHistory(skip = 0, limit = 20) {
    const { data } = await api.get(`${API_V1_STR}/chat/history`, {
      params: { skip, limit },
    });
    return data;
  },

  /**
   * Clear chat history
   * @returns {Promise}
   */
  async clearHistory() {
    const { data } = await api.delete(`${API_V1_STR}/chat/history`);
    return data;
  },

  /**
   * Search chat history
   * @param {string} query - Search query
   * @returns {Promise} Search results
   */
  async searchHistory(query) {
    const { data } = await api.get(`${API_V1_STR}/chat/search`, {
      params: { q: query },
    });
    return data;
  },
};
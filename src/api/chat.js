import api from './axios';
import { API_V1_STR } from '../utils/constants';

export const chatApi = {
  // ✅ FIXED: Correct payload structure
  async sendMessage(payload) {
    const { data } = await api.post(`${API_V1_STR}/chat`, {
      prompt: payload.prompt,
      model: payload.model || 'ureshii-c1'
    });
    return data;
  },

  // ✅ FIXED: Use guest endpoint correctly
  async sendGuestMessage(message) {
    const { data } = await api.post(`${API_V1_STR}/guest/chat`, {
      message
    });
    return data;
  },

  // ✅ FIXED: Use guest status endpoint
  async getGuestStatus() {
    const { data } = await api.get(`${API_V1_STR}/guest/status`);
    return data;
  },

  // ✅ FIXED: Use user memory endpoint
  async getChatHistory(skip = 0, limit = 20) {
    const { data } = await api.get(`${API_V1_STR}/user/memory`);
    // Extract chat history from memory
    return {
      chats: data.chat_history ? [{
        id: 'current',
        messages: data.chat_history,
        created_at: new Date().toISOString()
      }] : []
    };
  },

  // ✅ FIXED: Use user memory delete endpoint
  async clearHistory() {
    const { data } = await api.delete(`${API_V1_STR}/user/memory`);
    return data;
  },

  // ✅ REMOVED: Search endpoint doesn't exist
  // Implement client-side search instead
};

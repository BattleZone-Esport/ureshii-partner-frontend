import api from './axios';
import { API_V1_STR } from '../utils/constants';

/**
 * Models API service
 */
export const modelsApi = {
  /**
   * Get available models/personas info
   * @returns {Promise} List of models with metadata
   */
  async getModelsInfo() {
    const { data } = await api.get(`${API_V1_STR}/models/info`);
    return data;
  },
};
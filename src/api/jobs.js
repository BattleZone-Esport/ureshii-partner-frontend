import api from './axios';
import { API_V1_STR } from '../utils/constants';

/**
 * Jobs API service
 */
export const jobsApi = {
  /**
   * Get list of jobs
   * @param {Object} params - Query parameters
   * @param {number} params.skip - Number of items to skip
   * @param {number} params.limit - Number of items to return
   * @param {string} params.status - Filter by status
   * @param {string} params.sort - Sort field
   * @returns {Promise} Jobs list
   */
  async getJobs(params = {}) {
    const { data } = await api.get(`${API_V1_STR}/jobs`, { params });
    return data;
  },

  /**
   * Get job by ID
   * @param {string} jobId - Job ID
   * @returns {Promise} Job details
   */
  async getJob(jobId) {
    const { data } = await api.get(`${API_V1_STR}/jobs/${jobId}`);
    return data;
  },

  /**
   * Create a new job
   * @param {Object} jobData - Job creation data
   * @returns {Promise} Created job
   */
  async createJob(jobData) {
    const { data } = await api.post(`${API_V1_STR}/jobs`, jobData);
    return data;
  },

  /**
   * Get job result
   * @param {string} jobId - Job ID
   * @returns {Promise} Job result
   */
  async getJobResult(jobId) {
    const { data } = await api.get(`${API_V1_STR}/jobs/${jobId}/result`);
    return data;
  },

  /**
   * Delete a job
   * @param {string} jobId - Job ID
   * @returns {Promise}
   */
  async deleteJob(jobId) {
    const { data } = await api.delete(`${API_V1_STR}/jobs/${jobId}`);
    return data;
  },

  /**
   * Re-run a job
   * @param {string} jobId - Job ID
   * @returns {Promise} New job
   */
  async rerunJob(jobId) {
    const { data } = await api.post(`${API_V1_STR}/jobs/${jobId}/rerun`);
    return data;
  },

  /**
   * Get job statistics
   * @returns {Promise} Job statistics
   */
  async getStats() {
    const { data } = await api.get(`${API_V1_STR}/jobs/stats`);
    return data;
  },
};
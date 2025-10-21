import api from './axios';
import { API_V1_STR } from '../utils/constants';

/**
 * Terminal API service
 */
export const terminalApi = {
  /**
   * Execute a terminal command
   * @param {Object} payload - Command payload
   * @param {string} payload.command - Command or natural language query
   * @param {boolean} payload.is_natural_language - Whether command is natural language
   * @param {string} payload.model - AI model to use
   * @param {number} payload.timeout - Timeout in seconds
   * @param {string} payload.working_dir - Working directory
   * @param {Object} payload.env_vars - Environment variables
   * @param {boolean} payload.require_confirmation - Require confirmation for risky commands
   * @param {Object} payload.context - Additional context
   * @returns {Promise} Command result
   */
  async executeCommand(payload) {
    const { data } = await api.post(`${API_V1_STR}/terminal/execute`, {
      command: payload.command,
      is_natural_language: payload.is_natural_language !== false,
      model: payload.model || 'ureshii-p1',
      timeout: payload.timeout || 30,
      working_dir: payload.working_dir,
      env_vars: payload.env_vars,
      require_confirmation: payload.require_confirmation !== false,
      context: payload.context,
    });
    return data;
  },

  /**
   * Get command history
   * @param {number} limit - Number of commands to return (1-100)
   * @param {string} status_filter - Filter by status
   * @returns {Promise} Command history
   */
  async getHistory(limit = 50, status_filter = null) {
    const { data } = await api.get(`${API_V1_STR}/terminal/history`, {
      params: { limit, status_filter },
    });
    return data;
  },

  /**
   * Clear command history
   * @returns {Promise}
   */
  async clearHistory() {
    const { data } = await api.post(`${API_V1_STR}/terminal/history/clear`);
    return data;
  },

  /**
   * Get terminal status
   * @returns {Promise} Terminal status including system info
   */
  async getStatus() {
    const { data } = await api.get(`${API_V1_STR}/terminal/status`);
    return data;
  },

  /**
   * Explain a command
   * @param {string} command - Command to explain
   * @param {string} model - AI model to use
   * @returns {Promise} Command explanation
   */
  async explainCommand(command, model = 'ureshii-p1') {
    const { data } = await api.post(`${API_V1_STR}/terminal/explain`, {
      command,
      model,
    });
    return data;
  },

  /**
   * Get command suggestions
   * @param {string} context - Context or goal
   * @param {number} num_suggestions - Number of suggestions
   * @param {string} model - AI model to use
   * @returns {Promise} Command suggestions
   */
  async getSuggestions(context, num_suggestions = 5, model = 'ureshii-p1') {
    const { data } = await api.post(`${API_V1_STR}/terminal/suggest`, {
      context,
      num_suggestions,
      model,
    });
    return data;
  },

  /**
   * Get system info
   * @returns {Promise} System information snapshot
   */
  async getSystemInfo() {
    const { data } = await api.get(`${API_V1_STR}/terminal/system-info`);
    return data;
  },

  /**
   * Read log file
   * @param {string} logFile - Log file path
   * @param {number} maxLines - Maximum lines to read
   * @returns {Promise} Log file content
   */
  async readLog(logFile, maxLines = 100) {
    const { data } = await api.get(`${API_V1_STR}/terminal/logs/${logFile}`, {
      params: { max_lines: maxLines },
    });
    return data;
  },

  /**
   * Write to log file
   * @param {Object} payload - Log write payload
   * @param {string} payload.log_file - Log file path
   * @param {string} payload.content - Content to write
   * @param {boolean} payload.append - Append mode
   * @param {number} payload.max_lines - Max lines to keep
   * @returns {Promise} Log response
   */
  async writeLog(payload) {
    const { data } = await api.post(`${API_V1_STR}/terminal/logs`, {
      log_file: payload.log_file,
      content: payload.content,
      append: payload.append !== false,
      max_lines: payload.max_lines || 100,
    });
    return data;
  },

  /**
   * Analyze command for safety (deprecated - use explainCommand)
   * @param {string} command - Command to analyze
   * @returns {Promise} Safety analysis
   */
  async analyzeCommand(command) {
    return this.explainCommand(command);
  },
};
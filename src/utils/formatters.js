/**
 * Format a date to a relative time string
 * @param {Date|string} date - The date to format
 * @returns {string} - Formatted relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return count === 1 
        ? `1 ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }
  
  return 'just now';
};

/**
 * Format a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {boolean} includeTime - Whether to include time
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, includeTime = false) => {
  const d = new Date(date);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(includeTime && { hour: '2-digit', minute: '2-digit' }),
  };
  return d.toLocaleDateString('en-US', options);
};

/**
 * Format bytes to human readable size
 * @param {number} bytes - The number of bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted size string
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format duration in milliseconds to human readable string
 * @param {number} ms - Duration in milliseconds
 * @returns {string} - Formatted duration string
 */
export const formatDuration = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add when truncated
 * @returns {string} - Truncated text
 */
export const truncate = (text, length = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length - suffix.length) + suffix;
};

/**
 * Format job ID for display (truncate with ellipsis)
 * @param {string} id - Job ID
 * @returns {string} - Formatted job ID
 */
export const formatJobId = (id) => {
  if (!id) return '';
  if (id.length <= 8) return id;
  return `${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
  if (!num && num !== 0) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format percentage
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (!value && value !== 0) return '0%';
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert camelCase to Title Case
 * @param {string} str - String to convert
 * @returns {string} - Title case string
 */
export const camelToTitle = (str) => {
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
};

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @returns {string} - Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return parts
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

/**
 * Format error message for display
 * @param {Error|string} error - Error object or message
 * @returns {string} - Formatted error message
 */
export const formatError = (error) => {
  if (typeof error === 'string') return error;
  if (error?.response?.data?.detail) return error.response.data.detail;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
};
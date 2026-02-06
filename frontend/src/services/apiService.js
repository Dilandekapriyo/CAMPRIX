/**
 * API Service for frontend-backend communication
 * Centralized HTTP client for all API calls
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

/**
 * Generic fetch wrapper with error handling
 */
const apiCall = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important: Send cookies with requests
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle 401 Unauthorized
      if (response.status === 401) {
        // Redirect to login if not authenticated
        const next = encodeURIComponent(window.location.pathname);
        window.location.href = `/login?next=${next}`;
        return null;
      }
      throw new Error(data.error || `HTTP Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Auth endpoints
 */
export const authAPI = {
  signup: (name, email, password) =>
    apiCall('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    apiCall('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiCall('/api/logout', {
      method: 'POST',
    }),

  getCurrentUser: () => apiCall('/api/me'),
};

/**
 * Products endpoints
 */
export const productsAPI = {
  getAll: () => apiCall('/api/products'),
};

/**
 * Reports endpoints
 */
export const reportsAPI = {
  submit: (product, details) =>
    apiCall('/api/report', {
      method: 'POST',
      body: JSON.stringify({ product, details }),
    }),

  getMyReports: () => apiCall('/api/reports'),
};

export default {
  authAPI,
  productsAPI,
  reportsAPI,
};

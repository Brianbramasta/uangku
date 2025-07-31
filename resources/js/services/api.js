/**
 * API Service for handling all API requests
 * This service provides methods for interacting with the backend API
 */

const API_URL = '/api/v1';

/**
 * Get the authentication token from localStorage
 * @returns {string|null} The authentication token or null if not found
 */
const getToken = () => localStorage.getItem('token');

/**
 * Get the headers for API requests
 * @param {boolean} includeAuth - Whether to include authentication headers
 * @returns {Object} The headers object
 */
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Make a request to the API
 * @param {string} endpoint - The API endpoint
 * @param {string} method - The HTTP method
 * @param {Object} data - The request data
 * @param {boolean} includeAuth - Whether to include authentication headers
 * @returns {Promise} The response promise
 */
const apiRequest = async (endpoint, method = 'GET', data = null, includeAuth = true) => {
  const url = `${API_URL}${endpoint}`;
  const options = {
    method,
    headers: getHeaders(includeAuth),
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export default {
  // Auth endpoints
  register: (data) => apiRequest('/register', 'POST', data, false),
  login: (credentials) => apiRequest('/login', 'POST', credentials, false),
  logout: () => apiRequest('/logout', 'POST'),

  // Transactions endpoints
  getTransactions: (params) => apiRequest(`/transactions?${new URLSearchParams(params)}`, 'GET'),
  createTransaction: (data) => apiRequest('/transactions', 'POST', data),
  updateTransaction: (id, data) => apiRequest(`/transactions/${id}`, 'PUT', data),
  deleteTransaction: (id) => apiRequest(`/transactions/${id}`, 'DELETE'),

  // Categories endpoints
  getCategories: (params) => apiRequest(`/categories?${new URLSearchParams(params)}`, 'GET'),
  createCategory: (data) => apiRequest('/categories', 'POST', data),
  updateCategory: (id, data) => apiRequest(`/categories/${id}`, 'PUT', data),
  deleteCategory: (id) => apiRequest(`/categories/${id}`, 'DELETE'),

  // Budgets endpoints
  getBudgets: (params) => apiRequest('/budgets', 'GET', null, true, params),
  createBudget: (data) => apiRequest('/budgets', 'POST', data),
  updateBudget: (id, data) => apiRequest(`/budgets/${id}`, 'PUT', data),
  deleteBudget: (id) => apiRequest(`/budgets/${id}`, 'DELETE'),

  // Dashboard endpoints
  getDashboardSummary: () => apiRequest('/dashboard/summary'),
  getDashboardChart: (params) => apiRequest(`/dashboard/chart?${new URLSearchParams(params)}`),
};

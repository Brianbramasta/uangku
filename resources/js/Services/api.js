import axios from 'axios';

/**
 * Base API configuration
 */
const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

/**
 * Auth service functions
 */
export const authService = {
    login: (email, password) => api.post('/login', { email, password })
};

/**
 * Transaction service functions
 */
export const transactionService = {
    getTransactions: (params) => api.get('/transactions', { params }),
    createTransaction: (data) => api.post('/transactions', data),
    updateTransaction: (id, data) => api.put(`/transactions/${id}`, data),
    deleteTransaction: (id) => api.delete(`/transactions/${id}`)
};

/**
 * Budget service functions
 */
export const budgetService = {
    getBudgets: (params) => api.get('/budgets', { params }),
    createBudget: (data) => api.post('/budgets', data),
    updateBudget: (id, data) => api.put(`/budgets/${id}`, data),
    deleteBudget: (id) => api.delete(`/budgets/${id}`)
};

/**
 * Category service functions
 */
export const categoryService = {
    getCategories: (params) => api.get('/categories', { params }),
    createCategory: (data) => api.post('/categories', data),
    updateCategory: (id, data) => api.put(`/categories/${id}`, data),
    deleteCategory: (id) => api.delete(`/categories/${id}`)
};

/**
 * Dashboard service functions
 */
export const dashboardService = {
    getSummary: () => api.get('/dashboard/summary'),
    getChartData: (params) => api.get('/dashboard/chart', { params })
};

// Axios interceptor for handling authentication token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Export the configured axios instance
export default api;

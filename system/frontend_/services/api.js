import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Membership API calls
export const membershipApi = {
    getAll: () => api.get('/memberships'),
    getById: (id) => api.get(`/memberships/${id}`),
    getByUserId: (userId) => api.get(`/memberships/user/${userId}`),
    getActiveByUserId: (userId) => api.get(`/memberships/user/${userId}/active`),
    create: (data) => api.post('/memberships', data),
    update: (id, data) => api.put(`/memberships/${id}`, data),
    deactivate: (id) => api.put(`/memberships/${id}/deactivate`),
    getExpired: () => api.get('/memberships/expired'),
};

// Auth API calls
export const authApi = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => {
        localStorage.removeItem('token');
    },
};

export default api; 
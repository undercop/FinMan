import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: { 'Content-Type': 'application/json' }
});

// Automatically add the Token to every request if it exists
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

// If the Token is invalid/expired (403), force logout
api.interceptors.response.use(response => response, error => {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default api;
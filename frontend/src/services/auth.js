import api from './api.js';

export const register = (payload) => api.post('/auth/register', payload);
export const login = (payload) => api.post('/auth/login', payload);
export const logout = () => api.post('/auth/logout');
export const getCurrentUser = () => api.get('/auth/me');
export const forgotPassword = (payload) => api.post('/auth/forgot-password', payload);
export const resetPassword = (payload) => api.post('/auth/reset-password', payload);
export const updateProfile = (payload) => api.patch('/users/me', payload);

export default { register, login, logout, getCurrentUser, forgotPassword, resetPassword, updateProfile };

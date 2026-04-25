import api from './api';

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  getMe: () => api.get('/auth/me'),
};

// Lead APIs
export const leadAPI = {
  createLead: (data) => api.post('/leads', data),
  getLeads: (page = 1, limit = 10, search = '', status = '') =>
    api.get('/leads', { params: { page, limit, search, status } }),
  getLead: (id) => api.get(`/leads/${id}`),
  updateLead: (id, data) => api.put(`/leads/${id}`, data),
  deleteLead: (id) => api.delete(`/leads/${id}`),
};

// Company APIs
export const companyAPI = {
  createCompany: (data) => api.post('/companies', data),
  getCompanies: (page = 1, limit = 10) =>
    api.get('/companies', { params: { page, limit } }),
  getCompanyDetail: (id) => api.get(`/companies/${id}`),
  updateCompany: (id, data) => api.put(`/companies/${id}`, data),
  deleteCompany: (id) => api.delete(`/companies/${id}`),
};

// Task APIs
export const taskAPI = {
  createTask: (data) => api.post('/tasks', data),
  getTasks: (page = 1, limit = 10, status = '') =>
    api.get('/tasks', { params: { page, limit, status } }),
  getTask: (id) => api.get(`/tasks/${id}`),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

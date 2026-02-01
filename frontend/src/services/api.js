import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  
  // Admin endpoints
  create: (data, token) => api.post('/admin/products', data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  update: (id, data, token) => api.put(`/admin/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  delete: (id, token) => api.delete(`/admin/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
}

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
  getFeatured: () => api.get('/services/featured'),
  
  // Admin endpoints
  create: (data, token) => api.post('/admin/services', data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  update: (id, data, token) => api.put(`/admin/services/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  delete: (id, token) => api.delete(`/admin/services/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
}

// Gallery API
export const galleryAPI = {
  getAll: (params = {}) => api.get('/gallery', { params }),
  getById: (id) => api.get(`/gallery/${id}`),
  getCategories: () => api.get('/gallery/categories'),
  getFeatured: () => api.get('/gallery/featured'),
  
  // Admin endpoints
  create: (data, token) => api.post('/admin/gallery', data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  update: (id, data, token) => api.put(`/admin/gallery/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  delete: (id, token) => api.delete(`/admin/gallery/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
}

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  
  // Admin endpoints
  getMessages: (params = {}, token) => api.get('/admin/contact-messages', { 
    params,
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateMessage: (id, data, token) => api.put(`/admin/contact-messages/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  deleteMessage: (id, token) => api.delete(`/admin/contact-messages/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
}

export default api

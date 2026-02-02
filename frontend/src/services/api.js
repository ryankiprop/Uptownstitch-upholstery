import axios from 'axios'

function normalizeApiBaseUrl(raw) {
  const trimmed = (raw || '').trim().replace(/\/+$/, '')
  if (!trimmed) return 'http://localhost:5000/api'
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL)

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

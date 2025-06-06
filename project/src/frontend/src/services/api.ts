import axios from 'axios';
import { User, Accommodation, Guide, Booking } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: Partial<User>) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Accommodations API
export const accommodationsAPI = {
  getAll: async () => {
    const response = await api.get('/accommodations');
    return response.data as Accommodation[];
  },

  getById: async (id: string) => {
    const response = await api.get(`/accommodations/${id}`);
    return response.data as Accommodation;
  },

  search: async (params: {
    query?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const response = await api.get('/accommodations/search', { params });
    return response.data as Accommodation[];
  },
};

// Guides API
export const guidesAPI = {
  getAll: async () => {
    const response = await api.get('/guides');
    return response.data as Guide[];
  },

  getById: async (id: string) => {
    const response = await api.get(`/guides/${id}`);
    return response.data as Guide;
  },

  search: async (params: {
    query?: string;
    specialization?: string;
    language?: string;
  }) => {
    const response = await api.get('/guides/search', { params });
    return response.data as Guide[];
  },
};

// Bookings API
export const bookingsAPI = {
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data as Booking[];
  },

  getById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data as Booking;
  },

  create: async (bookingData: Partial<Booking>) => {
    const response = await api.post('/bookings', bookingData);
    return response.data as Booking;
  },

  update: async (id: string, bookingData: Partial<Booking>) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data as Booking;
  },

  cancel: async (id: string) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },
};

// User Profile API
export const userAPI = {
  updateProfile: async (userData: Partial<User>) => {
    const response = await api.put('/users/profile', userData);
    return response.data as User;
  },

  getBookings: async () => {
    const response = await api.get('/users/bookings');
    return response.data as Booking[];
  },
}; 
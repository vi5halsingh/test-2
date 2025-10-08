import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // backend base

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};

export const register = (username: string, email: string, password: string, role?: string) => {
  return api.post('/auth/register', { username, email, password, role });
};

export const getAllNews = () => {
  return api.get('/get-all-news');
};

export const getNews = (id: string) => {
  return api.get(`/get-news/${id}`);
};

export const createNews = (data: any) => {
  return api.post('/create-news', data);
};

export const updateNews = (id: string, data: any) => {
  // backend uses PATCH in controller; keep flexible
  return api.patch(`/update-news/${id}`, data);
};

export const deleteNews = (id: string) => {
  return api.delete(`/delete-news/${id}`);
};

// client-side like (backend not implemented yet)
export const likeNews = (id: string) => {
  return api.post(`/news/${id}/like`);
};

export default api;

import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Make sure this matches your backend port

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const login = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};

export const register = (username: string, email: string, password: string) => {
  return api.post('/auth/register', { username, email, password });
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
  return api.put(`/update-news/${id}`, data);
};

export const deleteNews = (id: string) => {
  return api.delete(`/delete-news/${id}`);
};
import axios from 'axios';
import {auth } from './firebase'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const getCalls = () => api.get('/calls');
export const initiateCall = (phone_number,name) => api.post('/calls', { phone_number,name });

export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const getCalls = () => api.get('/calls');
export const initiateCall = (phone_number) => api.post('/calls', { phone_number });

export default api;
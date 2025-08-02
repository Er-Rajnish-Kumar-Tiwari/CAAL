import axios from 'axios';

const API = axios.create({
  baseURL: 'https://call-backend-o9dw.onrender.com/api',
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.authorization = token;
  return req;
});

export default API;

import axios from 'axios';

// The live backend Vercel URL
const API_URL = 'https://agroconnect-silk-five.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// We can add auth interceptors here later if needed

export default api;

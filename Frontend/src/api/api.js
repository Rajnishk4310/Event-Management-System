import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Change to match your backend server URL
});

export default api;

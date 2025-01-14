import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://todo-app-mern-stack-h1p7.onrender.com/api',
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data.message || 'Unknown error occurred.');
      console.error('Status Code:', error.response.status);
      console.error('Headers:', error.response.headers);
      return Promise.reject(error);
    } else if (error.request) {
      toast.error('Network error occurred.');
      console.error('No response received:', error.request);
      return Promise.reject(new Error('No response from the server. Please try again later.'));
    } else {
      toast.error('Request error occurred.');
      console.error('Error setting up the request:', error.message);
      return Promise.reject(new Error(error.message));
    }
  }
);



export default api;

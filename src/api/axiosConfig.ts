import axios from 'axios';
export const HOST_NAME = 'https://chchyj-api.wandookongproject.com';
export const ACCESS_TOKEN_NAME = 'praise_fairy';

const axiosInstance = axios.create({
  baseURL: `${HOST_NAME}`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME);
    console.log('token', token);
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('auth error');
      localStorage.removeItem('praise-fairy');

      return (window.location.href = '/login');
    }
    console.log(error.response?.data);
    return Promise.reject(error);
  },
);

export { axiosInstance };

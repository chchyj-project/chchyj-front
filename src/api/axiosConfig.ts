import axios from 'axios';
export const HOST_NAME = 'https://i.my.me.wine.wandookongproject.com';
export const ACCESS_TOKEN_NAME = 'i_m_m_w';

const axiosInstance = axios.create({
  baseURL: `${HOST_NAME}/api`,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.log('auth error');
      return (window.location.href = '/Login');
    }
    alert(error.response?.data?.message ?? '잠시 후 다시 시도해주세요');
    console.log(error.response?.data);
  },
);

export { axiosInstance };

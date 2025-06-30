import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";


interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}


const axiosInstance = axios.create({
 baseURL: "https://muslim-guide-apl7.onrender.com/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to ensure credentials
axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true; // Force credentials on all requests
  return config;
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error:AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== "/refresh-token") {
        originalRequest._retry = true;
        try {
             await axiosInstance.post('/refresh-token', {});
            return axiosInstance(originalRequest);
        } catch (refreshError) {
             if ((refreshError as AxiosError).response?.status === 401) {
          if (typeof window !== 'undefined') {
           // window.location.href = '/login';
          }
        }
        }
    }
    return Promise.reject(error);
});

export default axiosInstance
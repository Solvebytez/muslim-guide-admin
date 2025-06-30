import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";


interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}


 const axiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
  withCredentials: true, // ✅ Add this line
  headers: {
    "Content-Type": "application/json",
  },
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
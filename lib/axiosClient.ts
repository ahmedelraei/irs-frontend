import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// Create an axios instance with a base URL
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
});

// Request interceptor to attach the access token to headers
axiosClient.interceptors.request.use(
  (config) => {
    // Cast config to InternalAxiosRequestConfig to satisfy typing
    const internalConfig = config as InternalAxiosRequestConfig;

    const token = localStorage.getItem("access_token");

    if (token && internalConfig.headers) {
      internalConfig.headers.Authorization = `Bearer ${token}`;
    }

    return internalConfig;
  },
  (error: any): Promise<any> => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        const { data } = await axios.post<{ accessToken: string }>(
          `${process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"}/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = data.accessToken;

        localStorage.setItem("access_token", newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

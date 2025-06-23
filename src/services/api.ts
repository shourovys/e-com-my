import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_PREFIX = '/api';

// Check if we're running in the browser environment
const isBrowser = typeof window !== 'undefined';

// Add a short delay for development to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class ApiService {
  private instance: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: `${BASE_URL}${API_PREFIX}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for auth token
    this.instance.interceptors.request.use(
      (config) => {
        // Add token to request if available
        if (this.token) {
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle 401 Unauthorized errors - could implement token refresh here
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Could implement token refresh logic here
            // const newToken = await this.refreshToken();
            // this.setToken(newToken);
            // return this.instance(originalRequest);

            // For now, just reject with the error
            return Promise.reject(error);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Set authentication token
  public setToken(token: string | null): void {
    this.token = token;
  }

  // Get current token
  public getToken(): string | null {
    return this.token;
  }

  // Generic GET request
  public async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      // Add a small delay in development
      if (isBrowser && process.env.NODE_ENV === 'development') {
        await delay(300);
      }

      const response = await this.instance.get<T>(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic POST request
  public async post<T, R>(
    endpoint: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      const response = await this.instance.post<R>(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic PUT request
  public async put<T, R>(
    endpoint: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      const response = await this.instance.put<R>(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic DELETE request
  public async delete<R>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      const response = await this.instance.delete<R>(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`Error deleting from ${endpoint}:`, error);
      throw error;
    }
  }

  // Form data POST request
  public async postFormData<R>(
    endpoint: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const formConfig = {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await this.instance.post<R>(
        endpoint,
        formData,
        formConfig
      );
      return response.data;
    } catch (error) {
      console.error(`Error posting form data to ${endpoint}:`, error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

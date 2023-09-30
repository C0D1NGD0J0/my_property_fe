import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface IAxiosService {
  get<T = any>(url: string, params?: object): Promise<T>;
  post<T = any>(url: string, data?: object): Promise<T>;
  put<T = any>(url: string, data?: object): Promise<T>;
  delete<T = any>(url: string, params?: object): Promise<T>;
}

class AxioService implements IAxiosService {
  private _axios: AxiosInstance;

  constructor() {
    this._axios = axios.create({
      baseURL: "http://localhost:5000",
      timeout: 25000, // 25 seconds timeout
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this._axios.interceptors.request.use(
      (config: any) => {
        // Add custom logic here, like setting authorization headers
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this._axios.interceptors.response.use(
      (response: AxiosResponse) => {
        // Do something with the response data
        return response;
      },
      (error) => {
        // Handle errors
        return Promise.reject(error);
      },
    );
  }

  get = async <T = any>(url: string, params?: object): Promise<T> => {
    const response = await this._axios.get<T>(url, { params });
    return response.data;
  };

  post = async <T = any>(url: string, data?: object): Promise<T> => {
    const response = await this._axios.post<T>(url, data);
    return response.data;
  };

  put = async <T = any>(url: string, params?: object): Promise<T> => {
    const response = await this._axios.put<T>(url, { params });
    return response.data;
  };

  delete = async <T = any>(url: string, params?: object): Promise<T> => {
    const response = await this._axios.delete<T>(url, { params });
    return response.data;
  };
}

export default new AxioService();

import APIError from "@utils/errorHandler";
import _axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
} from "axios";
import AuthService from "@services/auth";
import CookieManager from "@utils/cookieManager";

interface IAxiosService {
  axios: AxiosInstance;
  get<T = any>(url: string, params?: object): Promise<T>;
  post<T = any>(url: string, data?: object): Promise<T>;
  put<T = any>(url: string, data?: object): Promise<T>;
  delete<T = any>(url: string, params?: object): Promise<T>;
}

class AxioService implements IAxiosService {
  public axios: AxiosInstance;

  constructor() {
    this.axios = _axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axios.interceptors.request.use(
      (config: any) => {
        // Add custom logic here, like setting authorization headers
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.axios.interceptors.response.use(
      async (response: AxiosResponse) => {
        // format response data to be uniform
        response.data = {
          ...response.data,
          ...(response.data.data ? { data: response.data.data } : null),
          success: response.data.success,
          ...(response.data?.msg ? { msg: response.data.msg } : null),
        };
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 419 && !originalRequest._retry) {
          originalRequest._retry = true;
          if (originalRequest.url !== "/api/v1/auth/refresh_token") {
            const res = await AuthService.refreshToken();

            return Promise.resolve(this.axios(originalRequest));
          }
        } else if (
          originalRequest.url == "/api/v1/auth/refresh_token" &&
          error.response.status === 401
        ) {
          // handle errror if refresh-token is also expired
          CookieManager.removeCookie("cid");
        }
        // Handle errors
        const apiError = new APIError().init(error);
        return Promise.reject(apiError);
      },
    );
  }

  get = async <T = any>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    try {
      const response = await this.axios.get<T>(url, { params });
      return response.data;
    } catch (error: unknown) {
      error = error as Error & { data: any };
      throw error;
    }
  };

  post = async <T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await this.axios.post<T>(url, data, config);
    return response.data;
  };

  put = async <T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await this.axios.put<T>(url, data, config);
    return response.data;
  };

  delete = async <T = any>(url: string, params?: object): Promise<T> => {
    const response = await this.axios.delete<T>(url, { params });
    return response.data;
  };

  getAxiosInstance = () => {
    return this.axios;
  };
}

const axiosService = new AxioService();
export default axiosService;

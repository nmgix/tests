import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const base_url = import.meta.env.VITE_API_URL;

class ApiInstance {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: base_url,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(endpoint, options);
    return response.data;
  }
}

export const apiInstance = new ApiInstance();

import { IDataAxios, IResponseAxios } from "./interface";

import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import handleError from "./handleError";

export type Method =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch"
  | "purge"
  | "link"
  | "unlink";

axios.defaults.baseURL = "https://server-one-kappa.vercel.app";

class AxiosService {
  #instance: AxiosInstance;
  constructor() {
    const instance = axios.create({
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(async (config) => {
      const ISSERVER = typeof window === "undefined";
      let token: string = "";
      if (!ISSERVER) {
        token = localStorage.getItem("token") || "";
      }

      return {
        ...config,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.message === "Request failed with status code 401") {
          location.href = "/login";
        }

        return Promise.reject(handleError(error));
      }
    );

    this.#instance = instance;
  }

  async get(url: string, params?: IDataAxios): IResponseAxios {
    try {
      return await this.#instance.get(url, { params });
    } catch (error) {
      throw error;
    }
  }

  async post(url: string, data?: IDataAxios): IResponseAxios {
    try {
      return await this.#instance.post(url, data);
    } catch (error) {
      throw error;
    }
  }
}

export default new AxiosService();

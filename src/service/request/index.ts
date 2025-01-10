// src/request/hyRequest.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class HYRequest {
    private instance;

    constructor(baseURL: string, timeout: number = 1000) {
        this.instance = axios.create({
            baseURL,
            timeout,
        })
    }

    request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.request<T>(config);
    }
    get<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request({ ...config, method: "get" });
    }
    post<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request({ ...config, method: "post" });
    }
}

export default new HYRequest(BASE_URL, TIMEOUT);
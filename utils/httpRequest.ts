import { UseFetchOptions } from "nuxt/app";
type Methods = "GET" | "POST" | "DELETE" | "PUT";

export interface IResultData<T> {
    code: number;
    data: T;
    msg: string;
}

class HttpRequest {
    request<T = any>(
        url: string,
        method: Methods,
        data: any,
        options?: UseFetchOptions<T>,
    ) {
        const config = useRuntimeConfig();
        return new Promise((resolve, reject) => {
            const newOptions: UseFetchOptions<T> = {
                baseURL: config.public.baseUrl + url,
                method: method,
                ...options,
            };

            if (method === "GET" || method === "DELETE") {
                newOptions.params = data;
            }
            if (method === "POST" || method === "PUT") {
                newOptions.body = data;
            }

            useFetch(url, newOptions)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    // 封装常用方法

    get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
        return this.request(url, "GET", params, options);
    }

    post<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
        return this.request(url, "POST", data, options);
    }

    Put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
        return this.request(url, "PUT", data, options);
    }

    Delete<T = any>(url: string, params: any, options?: UseFetchOptions<T>) {
        return this.request(url, "DELETE", params, options);
    }
}

const httpRequest = new HttpRequest();

export default httpRequest;


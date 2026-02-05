import axios, {
    type AxiosError,
    type InternalAxiosRequestConfig,
    type AxiosResponse,
} from 'axios';
import { getAccessToken } from '@lib/auth-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

interface ApiSuccessResponse<T> {
    success: true;
    data: T;
    message: string | null;
}

interface ApiErrorResponse {
    success: false;
    statusCode: number;
    message: string;
    error?: string;
}

export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public error?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response: AxiosResponse<ApiSuccessResponse<unknown>>) => {
        const body = response.data;
        if (body?.success === true) {
            (response as AxiosResponse<unknown>).data = body.data;
        }
        return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        const data = error.response?.data;
        if (
            data &&
            typeof data === 'object' &&
            'success' in data &&
            data.success === false
        ) {
            throw new ApiError(
                data.message ?? error.message,
                data.statusCode ?? error.response?.status ?? 500,
                data.error
            );
        }
        throw new ApiError(
            error.message ?? 'Request failed',
            error.response?.status ?? 500
        );
    }
);

/** 응답 data만 반환하는 유틸. 다른 API 모듈에서 import해서 사용 */
export const request = {
    get: <T>(path: string) => api.get<T>(path).then((res) => res.data),

    post: <T>(path: string, body?: object) =>
        api.post<T>(path, body).then((res) => res.data),

    put: <T>(path: string, body?: object) =>
        api.put<T>(path, body).then((res) => res.data),

    patch: <T>(path: string, body?: object) =>
        api.patch<T>(path, body).then((res) => res.data),

    delete: <T>(path: string) => api.delete<T>(path).then((res) => res.data),
};

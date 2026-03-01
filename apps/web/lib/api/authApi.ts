import { request } from '@api/client';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface RegisterResponse {
    account_id: number;
    email: string;
    name: string;
    displayName: string;
    role: string;
    status: string;
    createdAt: number;
}

export function login({
    email,
    password,
}: LoginRequest): Promise<LoginResponse> {
    return request.post<LoginResponse>('/auth/login', { email, password });
}

export function register({
    email,
    password,
    name,
}: RegisterRequest): Promise<RegisterResponse> {
    return request.post<RegisterResponse>('/auth/register', {
        email,
        password,
        name,
    });
}

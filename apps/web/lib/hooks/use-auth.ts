'use client';

import { useMutation } from '@tanstack/react-query';
import { login as loginApi, register as registerApi } from '@api/auth-api';
import type { LoginRequest, RegisterRequest } from '@api/auth-api';
import { setAccessToken } from '@lib/auth-store';

export function useLogin() {
    return useMutation({
        mutationFn: (body: LoginRequest) => loginApi(body),
        onSuccess: (data) => {
            setAccessToken(data.access_token);
        },
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (body: RegisterRequest) => registerApi(body),
    });
}

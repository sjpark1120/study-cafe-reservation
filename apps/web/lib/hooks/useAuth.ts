'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login as loginApi, register as registerApi } from '@api/authApi';
import type { LoginRequest, RegisterRequest } from '@api/authApi';
import { getMe } from '@/lib/api/accountApi';
import { setAccessToken } from '@lib/auth-store';

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: LoginRequest) => loginApi(body),
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            queryClient.refetchQueries({ queryKey: ['me'] });
        },
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (body: RegisterRequest) => registerApi(body),
    });
}

export function useMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: () => getMe(),
        retry: false,
    });
}

export function useLogout() {
    const queryClient = useQueryClient();

    const logout = () => {
        setAccessToken(null);
        queryClient.setQueryData(['me'], null);
    };

    return { logout };
}

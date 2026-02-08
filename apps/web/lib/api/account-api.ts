import { request } from '@api/client';

export interface MeResponse {
    accountId: number;
    email: string;
    name: string;
    displayName: string;
}

export function getMe(): Promise<MeResponse> {
    return request.get<MeResponse>('/account/me');
}

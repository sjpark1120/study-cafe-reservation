import { request } from '@api/client';

export interface MeResponse {
    account_id: number;
    email: string;
    name: string;
    display_name: string;
}

export function getMe(): Promise<MeResponse> {
    return request.get<MeResponse>('/account/me');
}

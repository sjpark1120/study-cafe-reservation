import { create } from 'zustand';

export const AuthModalMode = {
    Login: 'login',
    SignUp: 'signUp',
} as const;

export type AuthModalMode = (typeof AuthModalMode)[keyof typeof AuthModalMode];

export interface AuthModalStore {
    isOpen: boolean;
    mode: AuthModalMode;
    openLogin: () => void;
    openSignUp: () => void;
    setMode: (mode: AuthModalMode) => void;
    close: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    isOpen: false,
    mode: 'login',
    openLogin: () => set({ isOpen: true, mode: 'login' }),
    openSignUp: () => set({ isOpen: true, mode: 'signUp' }),
    setMode: (mode) => set({ mode }),
    close: () => set({ isOpen: false }),
}));

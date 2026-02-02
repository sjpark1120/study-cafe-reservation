import { create } from 'zustand';

export const AuthModalView = {
    Login: 'login',
    SignUp: 'signUp',
    SignupSuccess: 'signupSuccess',
} as const;

export type AuthModalView = (typeof AuthModalView)[keyof typeof AuthModalView];

export interface AuthModalStore {
    isOpen: boolean;
    view: AuthModalView;
    openLogin: () => void;
    openSignUp: () => void;
    openSignupSuccess: () => void;
    setView: (view: AuthModalView) => void;
    close: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    isOpen: false,
    view: AuthModalView.Login,
    openLogin: () => set({ isOpen: true, view: AuthModalView.Login }),
    openSignUp: () => set({ isOpen: true, view: AuthModalView.SignUp }),
    openSignupSuccess: () =>
        set({ isOpen: true, view: AuthModalView.SignupSuccess }),
    setView: (view) => set({ view }),
    close: () => set({ isOpen: false }),
}));

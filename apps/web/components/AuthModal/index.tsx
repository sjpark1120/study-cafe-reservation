'use client';

import { useTranslations } from 'next-intl';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog';
import Image from 'next/image';

import { AuthModalMode, useAuthModalStore } from '@stores/auth-modal-store';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const LOGO_SRC = '/logo.svg';

const AuthModal = () => {
    const t = useTranslations('auth');
    const isOpen = useAuthModalStore((s) => s.isOpen);
    const mode = useAuthModalStore((s) => s.mode);
    const close = useAuthModalStore((s) => s.close);
    const setMode = useAuthModalStore((s) => s.setMode);

    const isLogin = mode === AuthModalMode.Login;

    const handleSwitchToSignUp = () => {
        setMode(AuthModalMode.SignUp);
    };

    const handleSwitchToLogin = () => {
        setMode(AuthModalMode.Login);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) close();
            }}
        >
            <DialogContent showCloseButton={false}>
                <DialogHeader className="flex flex-col items-center justify-center">
                    <Image
                        src={LOGO_SRC}
                        alt="logo"
                        width={820}
                        height={160}
                        className="mb-4 h-8 w-auto"
                    />
                    <DialogTitle className="text-2xl font-bold">
                        {isLogin ? t('welcomeBack') : t('createAccount')}
                    </DialogTitle>
                    <DialogDescription>
                        {isLogin
                            ? t('signInDescription')
                            : t('signUpDescription')}
                    </DialogDescription>
                </DialogHeader>
                {isLogin ? (
                    <LoginForm onSwitchToSignUp={handleSwitchToSignUp} />
                ) : (
                    <SignupForm onSwitchToLogin={handleSwitchToLogin} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;

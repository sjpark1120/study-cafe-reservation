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

import { AuthModalView, useAuthModalStore } from '@stores/auth-modal-store';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import SignupSuccessView from './components/SignupSuccessView';

const LOGO_SRC = '/logo.svg';

const HEADER_CONFIG = {
    [AuthModalView.Login]: {
        titleKey: 'welcomeBack',
        descriptionKey: 'signInDescription',
    },
    [AuthModalView.SignUp]: {
        titleKey: 'createAccount',
        descriptionKey: 'signUpDescription',
    },
    [AuthModalView.SignupSuccess]: {
        titleKey: 'signUpComplete',
        descriptionKey: 'signUpSuccessDescription',
    },
} as const;

const AuthModal = () => {
    const t = useTranslations('auth');
    const isOpen = useAuthModalStore((s) => s.isOpen);
    const view = useAuthModalStore((s) => s.view);
    const close = useAuthModalStore((s) => s.close);

    const openLogin = useAuthModalStore((s) => s.openLogin);
    const openSignUp = useAuthModalStore((s) => s.openSignUp);
    const openSignupSuccess = useAuthModalStore((s) => s.openSignupSuccess);

    const header = HEADER_CONFIG[view];

    const isLogin = view === AuthModalView.Login;
    const isSignUp = view === AuthModalView.SignUp;
    const isSignupSuccess = view === AuthModalView.SignupSuccess;

    const handleSwitchToSignUp = () => {
        openSignUp();
    };
    const handleSwitchToLogin = () => {
        openLogin();
    };
    const handleSignupSuccess = () => {
        openSignupSuccess();
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
                        {t(header.titleKey)}
                    </DialogTitle>
                    <DialogDescription>
                        {t(header.descriptionKey)}
                    </DialogDescription>
                </DialogHeader>
                {isLogin && (
                    <LoginForm onSwitchToSignUp={handleSwitchToSignUp} />
                )}
                {isSignUp && (
                    <SignupForm
                        onSwitchToLogin={handleSwitchToLogin}
                        onSignupSuccess={handleSignupSuccess}
                    />
                )}
                {isSignupSuccess && (
                    <SignupSuccessView onSwitchToLogin={handleSwitchToLogin} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;

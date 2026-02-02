'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@components/ui/button';

interface SignupSuccessViewProps {
    onSwitchToLogin: () => void;
}

const SignupSuccessView = ({ onSwitchToLogin }: SignupSuccessViewProps) => {
    const t = useTranslations('auth');

    return (
        <div className="flex flex-col gap-4">
            <Button
                type="button"
                className="cursor-pointer font-semibold"
                onClick={onSwitchToLogin}
            >
                {t('goToLogin')}
            </Button>
        </div>
    );
};

export default SignupSuccessView;

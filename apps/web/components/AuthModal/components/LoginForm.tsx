'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@components/ui/button';
import { Field, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';

interface LoginFormProps {
    onSwitchToSignUp: () => void;
}

const LoginForm = ({ onSwitchToSignUp }: LoginFormProps) => {
    const t = useTranslations('auth');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: 로그인 API 연동
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field>
                <FieldLabel htmlFor="login-email">{t('email')}</FieldLabel>
                <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="login-password">
                    {t('password')}
                </FieldLabel>
                <Input
                    id="login-password"
                    type="password"
                    placeholder={t('passwordPlaceholder')}
                    autoComplete="current-password"
                />
            </Field>
            <Button type="submit" className="cursor-pointer font-semibold">
                {t('signIn')}
            </Button>
            <div className="flex items-center justify-center gap-2">
                <span className="text-muted-foreground text-sm">
                    {t('noAccount')}
                </span>
                <Button
                    type="button"
                    variant="link"
                    className="cursor-pointer p-0 text-sm font-bold"
                    onClick={onSwitchToSignUp}
                >
                    {t('signUp')}
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;

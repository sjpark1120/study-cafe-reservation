'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useLogin } from '@lib/hooks/use-auth';

import { Button } from '@components/ui/button';
import { Field, FieldError, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { Loader2 } from 'lucide-react';
import { useAuthModalStore } from '@stores/auth-modal-store';

interface LoginFormProps {
    onSwitchToSignUp: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = ({ onSwitchToSignUp }: LoginFormProps) => {
    const t = useTranslations('auth');
    const { mutate: login, isPending } = useLogin();
    const close = useAuthModalStore((s) => s.close);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(
            { email, password },
            {
                onSuccess: () => {
                    close();
                },
                onError: (error) => {
                    setErrorMessage(error.message);
                },
            }
        );
    };

    const isValidEmail = EMAIL_REGEX.test(email);
    const isDisabled = isPending || !email || !password || !isValidEmail;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field>
                <FieldLabel htmlFor="login-email">{t('email')}</FieldLabel>
                <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
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
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Field>
            {errorMessage && (
                <FieldError errors={[{ message: errorMessage }]} />
            )}
            <Button
                type="submit"
                className="cursor-pointer font-semibold"
                disabled={isDisabled}
            >
                {isPending ? <Loader2 className="animate-spin" /> : t('signIn')}
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

'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@components/ui/button';
import { Field, FieldError, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { useRegister } from '@lib/hooks/use-auth';

interface SignupFormProps {
    onSwitchToLogin: () => void;
    onSignupSuccess: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupForm = ({ onSwitchToLogin, onSignupSuccess }: SignupFormProps) => {
    const t = useTranslations('auth');
    const { mutate: register, isPending } = useRegister();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(
            { name, email, password },
            {
                onSuccess: onSignupSuccess,
                onError: (error) => {
                    setErrorMessage(error.message);
                },
            }
        );
    };

    const isValidEmail = EMAIL_REGEX.test(email);
    const isDisabled = isPending || !name || !password || !isValidEmail;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field>
                <FieldLabel htmlFor="signup-name">{t('name')}</FieldLabel>
                <Input
                    id="signup-name"
                    type="text"
                    placeholder={t('namePlaceholder')}
                    autoComplete="name"
                    value={name}
                    onChange={handleNameChange}
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="signup-email">{t('email')}</FieldLabel>
                <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="signup-password">
                    {t('password')}
                </FieldLabel>
                <Input
                    id="signup-password"
                    type="password"
                    placeholder={t('passwordPlaceholder')}
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Field>
            {errorMessage && (
                <FieldError errors={[{ message: errorMessage }]} />
            )}
            <Button
                type="submit"
                disabled={isDisabled}
                className="cursor-pointer font-semibold"
            >
                {isPending ? <Loader2 className="animate-spin" /> : t('signUp')}
            </Button>
            <div className="flex items-center justify-center gap-2">
                <span className="text-muted-foreground text-sm">
                    {t('alreadyHaveAccount')}
                </span>
                <Button
                    type="button"
                    variant="link"
                    className="cursor-pointer p-0 text-sm font-bold"
                    onClick={onSwitchToLogin}
                >
                    {t('login')}
                </Button>
            </div>
        </form>
    );
};

export default SignupForm;

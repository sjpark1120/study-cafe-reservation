'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@components/ui/button';
import { Field, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';

interface SignupFormProps {
    onSwitchToLogin: () => void;
}

const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
    const t = useTranslations('auth');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: 회원가입 API 연동
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field>
                <FieldLabel htmlFor="signup-name">{t('name')}</FieldLabel>
                <Input
                    id="signup-name"
                    type="text"
                    placeholder={t('namePlaceholder')}
                    autoComplete="name"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="signup-email">{t('email')}</FieldLabel>
                <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
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
                />
            </Field>
            <Button type="submit" className="cursor-pointer font-semibold">
                {t('signUp')}
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

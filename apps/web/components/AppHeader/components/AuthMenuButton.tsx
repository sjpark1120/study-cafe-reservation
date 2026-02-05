import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';

import {
    useAuthModalStore,
    type AuthModalStore,
} from '@stores/auth-modal-store';
import { Button } from '@components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useMe, useLogout } from '@lib/hooks/use-auth';

const AuthMenuButton = () => {
    const t = useTranslations('header');

    const openLogin = useAuthModalStore((s: AuthModalStore) => s.openLogin);
    const { data: me } = useMe();
    const { logout } = useLogout();

    if (!me) {
        return (
            <Button
                type="button"
                onClick={openLogin}
                variant="outline"
                className="cursor-pointer"
            >
                {t('login')}
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="flex cursor-pointer items-center gap-2"
                >
                    <span className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold uppercase">
                        {me.display_name[0]}
                    </span>
                    <span>{me.display_name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col items-start">
                    <span className="font-semibold">{me.name}</span>
                    <span className="text-muted-foreground text-xs">
                        {me.email}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:text-destructive cursor-pointer"
                >
                    <LogOut className="mr-2 size-4" />
                    <span>{t('logout')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AuthMenuButton;

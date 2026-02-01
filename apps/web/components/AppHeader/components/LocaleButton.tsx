import {
    useLocaleStore,
    type Locale,
    type LocaleStore,
} from '@lib/stores/locale-store';
import { Button } from '@components/ui/button';

const LOCALES = ['ko', 'en'] as const;
const LocaleButton = () => {
    const locale = useLocaleStore((s: LocaleStore) => s.locale);
    const setLocale = useLocaleStore((s: LocaleStore) => s.setLocale);
    return (
        <span className="border-border flex items-center gap-1 rounded-md border">
            {LOCALES.map((loc) => (
                <Button
                    key={loc}
                    type="button"
                    onClick={() => setLocale(loc as Locale)}
                    className="cursor-pointer"
                    variant={locale === loc ? 'secondary' : 'ghost'}
                    size="icon"
                >
                    {loc}
                </Button>
            ))}
        </span>
    );
};

export default LocaleButton;

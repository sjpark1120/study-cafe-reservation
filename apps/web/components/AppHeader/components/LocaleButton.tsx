import {
    useLocaleStore,
    type Locale,
    type LocaleStore,
} from '@lib/stores/locale-store';

const LOCALES = ['ko', 'en'] as const;
const LocaleButton = () => {
    const locale = useLocaleStore((s: LocaleStore) => s.locale);
    const setLocale = useLocaleStore((s: LocaleStore) => s.setLocale);
    return (
        <span className="flex items-center gap-1">
            {LOCALES.map((loc) => (
                <button
                    key={loc}
                    type="button"
                    onClick={() => setLocale(loc as Locale)}
                    className={`cursor-pointer rounded-md px-2 py-1 text-sm font-medium ${
                        locale === loc
                            ? 'bg-outline text-foreground'
                            : 'text-foreground/70 hover:text-foreground'
                    }`}
                >
                    {loc}
                </button>
            ))}
        </span>
    );
};

export default LocaleButton;

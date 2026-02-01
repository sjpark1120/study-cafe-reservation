import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@stores/theme-store';

const ThemeButton = () => {
    const theme = useThemeStore((s) => s.theme);
    const toggleTheme = useThemeStore((s) => s.toggleTheme);

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="text-foreground hover:bg-muted cursor-pointer rounded-md p-2"
        >
            {theme === 'dark' ? (
                <Sun className="size-5" />
            ) : (
                <Moon className="size-5" />
            )}
        </button>
    );
};

export default ThemeButton;

import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@stores/theme-store';
import { Button } from '@components/ui/button';

const ThemeButton = () => {
    const theme = useThemeStore((s) => s.theme);
    const toggleTheme = useThemeStore((s) => s.toggleTheme);

    return (
        <Button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer"
            variant="ghost"
            size="icon"
        >
            {theme === 'dark' ? (
                <Sun className="size-5" />
            ) : (
                <Moon className="size-5" />
            )}
        </Button>
    );
};

export default ThemeButton;

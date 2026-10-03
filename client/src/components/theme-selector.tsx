import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import type { Theme } from '@/contexts/theme-context';
import { useTheme } from '@/hooks/use-theme';
import { Monitor, Moon, Sun } from 'lucide-react';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'system', label: 'System', icon: Monitor },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ];

  return (
    <ButtonGroup>
      {themes.map(t => {
        return (
          <Button
            key={t.value}
            onClick={() => setTheme(t.value as Theme)}
            size="icon"
            variant={theme === t.value ? 'default' : 'outline'}
            aria-label={t.label}
          >
            {<t.icon />}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}

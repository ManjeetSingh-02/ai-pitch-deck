import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/hooks/use-theme';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const items = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <Select
      defaultValue={theme}
      onValueChange={v => setTheme(v as 'system' | 'light' | 'dark')}
      items={items}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          {items.map(item => (
            <SelectItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

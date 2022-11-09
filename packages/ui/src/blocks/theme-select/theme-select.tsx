import { useTheme } from 'next-themes';

import {
  ClientOnly,
  IconMoon,
  IconSettings,
  IconSun,
  Select,
} from '../../components';

export function ThemeSelect(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const handleChange = (value: string) => {
    setTheme(value);
  };
  return (
    <ClientOnly>
      <Select
        value={theme || 'system'}
        onChange={handleChange}
        className="w-32"
        placement="top"
        aria-label="Mode selector"
      >
        <Select.Option value="light">
          <IconSun size={16} />
          <span>Light</span>
        </Select.Option>
        <Select.Option value="dark">
          <IconMoon size={16} />
          <span>Dark</span>
        </Select.Option>
        <Select.Option value="system">
          <IconSettings size={16} />
          <span>System</span>
        </Select.Option>
      </Select>
    </ClientOnly>
  );
}

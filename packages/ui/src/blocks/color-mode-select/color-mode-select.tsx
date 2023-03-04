import { useTheme } from 'next-themes';

import {
  ClientOnly,
  IconMoon,
  IconSettings,
  IconSun,
  Select,
} from '../../components';

export function ColorModeSelect(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const handleChange = (value: string) => {
    setTheme(value);
  };
  const container = 'flex items-center justify-start gap-2';
  return (
    <ClientOnly>
      <Select
        value={theme || 'system'}
        onValueChange={handleChange}
        className="!w-36"
        aria-label="Mode selector"
      >
        <Select.Item value="light">
          <div className={container}>
            <IconSun size={20} />
            <span>Light</span>
          </div>
        </Select.Item>
        <Select.Item value="dark">
          <div className={container}>
            <IconMoon size={20} />
            <span>Dark</span>
          </div>
        </Select.Item>
        <Select.Item value="system">
          <div className={container}>
            <IconSettings size={20} />
            <span>System</span>
          </div>
        </Select.Item>
      </Select>
    </ClientOnly>
  );
}

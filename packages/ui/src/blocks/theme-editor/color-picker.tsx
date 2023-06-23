import * as React from 'react';

import { IconButton, Popover, Text } from '../../components';
import { hexToHSL } from './utilities';

export type ColorSeriesPickerProps = {
  label: string;
  colorOptions: Record<string, string>;
  onSelectColor: (colorKey: string) => void;
  styles: {
    triggerButton: string;
  };
};

export function ColorSeriesPicker({
  label,
  colorOptions,
  onSelectColor,
  styles,
}: ColorSeriesPickerProps): JSX.Element {
  const [selectedColor, setSelectedColor] = React.useState('');
  const handleClickColor = (colorKey: string, colorValue: string) => {
    setSelectedColor(colorValue);
    onSelectColor(colorKey);
  };
  return (
    <section className="space-y-3">
      <Text>{label}</Text>
      <div className="flex flex-row items-center space-x-2">
        <Popover>
          <Popover.Button as={IconButton} aria-label={`${label} color picker`}>
            <span className={`${pickerButtonStyle} ${styles.triggerButton}`} />
          </Popover.Button>
          <Popover.Panel>
            <ul className="grid w-max grid-cols-3 gap-3">
              {Object.entries(colorOptions).map(([colorKey, colorValue]) => (
                <li
                  key={colorValue}
                  className="flex flex-col items-center space-y-1"
                >
                  <IconButton
                    onClick={() => handleClickColor(colorKey, colorValue)}
                    aria-label={`Color ${colorKey}`}
                  >
                    <span
                      className="inline-block h-6 w-6 rounded-full"
                      style={{ background: colorValue }}
                    />
                  </IconButton>
                  <Text variant="secondary" size="xs">
                    {colorKey}
                  </Text>
                </li>
              ))}
            </ul>
          </Popover.Panel>
        </Popover>
        <Text className="mb-2 px-2 !leading-none" variant="secondary" size="sm">
          {selectedColor}
        </Text>
      </div>
    </section>
  );
}

export type ColorPickerProps = {
  label: string;
  hintText: string;
  defaultValue: string;
  onSelectColor: (color: string) => void;
};

export function ColorPicker({
  label,
  hintText,
  onSelectColor,
  defaultValue,
}: ColorPickerProps): JSX.Element {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <section className="space-y-3">
      <div>
        <Text>{label}</Text>
        <Text size="sm" variant="secondary">
          {hintText}
        </Text>
      </div>
      <input
        className={`hover:cursor-pointer [&::-moz-color-swatch-wrapper]:p-0 [&::-moz-color-swatch]:rounded-full [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full ${pickerButtonStyle}`}
        type="color"
        name="colorPicker"
        value={value}
        onChange={(e) => {
          const color = e.target.value;
          setValue(color);
          onSelectColor(hexToHSL(color));
        }}
      />
    </section>
  );
}

const pickerButtonStyle =
  'inline-block h-6 w-6 rounded-full border border-gray-1000 hover:ring-gray-400 hover:ring-4';

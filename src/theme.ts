import { funk, dark } from '@theme-ui/presets';

export default {
  ...funk,
  styles: {
    ...funk.styles,
  },
  colors: {
    ...funk.colors,
    modes: {
      dark: dark.colors,
    },
  },
};

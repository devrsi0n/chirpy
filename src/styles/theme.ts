import { Theme } from 'theme-ui';
import { lightColors, darkColors } from './colors';

const fontBody = [
  'system-ui',
  /* macOS 10.11-10.12 */ '-apple-system',
  /* Windows 6+ */ 'Segoe UI',
  /* Android 4+ */ 'Roboto',
  /* Ubuntu 10.10+ */ 'Ubuntu',
  /* Gnome 3+ */ 'Cantarell',
  /* KDE Plasma 5+ */ 'Noto Sans',
  /* fallback */ 'sans-serif',
  /* macOS emoji */ 'Apple Color Emoji',
  /* Windows emoji */ 'Segoe UI Emoji',
  /* Windows emoji */ 'Segoe UI Symbol',
  /* Linux emoji */ 'Noto Color Emoji',
];

const fontMonospace = [
  /* macOS 10.10+ */ 'Menlo',
  /* Windows 6+ */ 'Consolas',
  /* Android 4+ */ 'Roboto Mono',
  /* Ubuntu 10.10+ */ 'Ubuntu Monospace',
  /* KDE Plasma 5+ */ 'Noto Mono',
  /* KDE Plasma 4+ */ 'Oxygen Mono',
  /* Linux/OpenOffice fallback */ 'Liberation Mono',
  /* fallback */ 'monospace',
  /* macOS emoji */ 'Apple Color Emoji',
  /* Windows emoji */ 'Segoe UI Emoji',
  /* Windows emoji */ 'Segoe UI Symbol',
  /* Linux emoji */ 'Noto Color Emoji',
];

const theme: Theme = {
  useColorSchemeMediaQuery: true,
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: fontBody.join(', '),
    heading: `Georgia, "Palatino Linotype", "Book Antiqua", Palatino, serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    monospace: fontMonospace.join(', '),
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  lineHeights: {
    body: 1.625,
    heading: 1.25,
  },
  colors: {
    text: lightColors.foreground,
    textSecondary: lightColors.accents5,
    background: lightColors.background,
    navbarBackground: '#ffffff90',
    primary: lightColors.success,
    secondary: lightColors.secondary,
    muted: lightColors.border,
    modes: {
      dark: {
        text: darkColors.foreground,
        textSecondary: darkColors.accents5,
        background: darkColors.background,
        navbarBackground: '#06060690',
        primary: darkColors.success,
        secondary: darkColors.secondary,
        muted: lightColors.border,
      },
    },
  },
  styles: {
    // For body styles
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    a: {
      textDecoration: 'none',
      color: 'primary',
      ':hover': {
        cursor: 'pointer',
      },
    },
  },
  images: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999,
    },
  },
  text: {
    default: {
      color: 'text',
      fontSize: 3,
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      padding: '1.1rem 0',
      h1: {
        padding: '2rem 0',
      },
      h2: {
        padding: '1.5rem 0',
      },
      h3: {
        padding: '1.25rem 0',
      },
    },
    secondary: {
      color: 'textSecondary',
    },
  },
  links: {
    nav: {
      textDecoration: 'none',
      color: 'primary',
      ':hover': {
        cursor: 'pointer',
      },
    },
    reverse: {
      color: 'background',
    },
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      border: '1px solid transparent',
      '&:hover': {
        bg: 'background',
        color: 'primary',
        border: '1px solid',
        borderColor: 'primary',
        cursor: 'pointer',
      },
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
    },
  },
  cards: {
    primary: {
      padding: 4,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      marginTop: 4,
      marginBottom: 4,
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'muted',
    },
  },
};

export default theme;

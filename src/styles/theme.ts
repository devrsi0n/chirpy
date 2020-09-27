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
  radii: [0, 2, 4, 8, 16],
  shadows: {
    s: '0 1.6px 3.6px 0 rgba(0,0,0,.132), 0 0.3px 0.9px 0 rgba(0,0,0,.108)',
    m: '0 3.2px 7.2px 0 rgba(0,0,0,.132), 0 0.6px 1.8px 0 rgba(0,0,0,.108)',
    l: '0 6.4px 14.4px 0 rgba(0,0,0,.132), 0 1.2px 3.6px 0 rgba(0,0,0,.108)',
    xl: '0 25.6px 57.6px 0 rgba(0,0,0,.22), 0 4.8px 14.4px 0 rgba(0,0,0,.18)',
  },
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
    ...lightColors,
    text: lightColors.foreground,
    textSecondary: lightColors.accents5,
    background: lightColors.background,
    navbarBackground: '#ffffff90',
    primary: lightColors.success,
    secondary: lightColors.secondary,
    muted: lightColors.border,
    border: lightColors.border,
    modes: {
      dark: {
        ...darkColors,
        text: darkColors.foreground,
        textSecondary: darkColors.accents5,
        background: darkColors.background,
        navbarBackground: '#06060690',
        primary: darkColors.success,
        secondary: darkColors.secondary,
        muted: lightColors.border,
        border: lightColors.border,
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
      width: 32,
      height: 32,
      borderRadius: 99999,
      border: (theme: Theme): string => `1px solid ${theme.colors?.border}`,
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
    text: {
      borderRadius: 1,
      bg: 'background',
      color: 'secondary',
      p: 3,
      '&:hover': {
        color: 'text',
        bg: 'accents1',
        cursor: 'pointer',
      },
    },
    primary: {
      borderRadius: 1,
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
      boxShadow: 'm',
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
  layout: {
    header: {
      borderBottom: (theme: Theme): string => `1px solid ${theme.colors?.border}`,
      position: 'sticky',
      top: 0,
      left: 0,
      backgroundColor: 'navbarBackground',
      backdropFilter: 'blur(10px)',
    },
  },
};

export default theme;

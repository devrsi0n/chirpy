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

export default {
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
    text: '#000',
    background: '#fff',
    primary: '#609',
    secondary: '#306',
    muted: '#f6f6f6',
    modes: {
      dark: {
        text: '#fff',
        background: '#060606',
        primary: '#3cf',
        secondary: '#e0f',
        muted: '#191919',
        highlight: '#29112c',
        gray: '#999',
        purple: '#c0f',
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
  },
};

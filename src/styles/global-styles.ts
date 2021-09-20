import tw, { css, theme } from 'twin.macro';

export const appGlobalStyles = css`
  html,
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  * {
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
  }

  ::selection {
    ${tw`bg-primary-800 text-white opacity-75`}
  }

  input:focus,
  button:focus {
    outline: none;
  }

  @font-face {
    font-family: 'Inter var';
    font-style: normal;
    font-weight: 100 900;
    font-display: optional;
    src: url('/fonts/Inter/Inter-roman.var.woff2') format('woff2');
    font-named-instance: 'Regular';
  }

  @font-face {
    font-family: 'Inter var';
    font-style: italic;
    font-weight: 100 900;
    font-display: optional;
    src: url('/fonts/Inter/Inter-italic.var.woff2') format('woff2');
    font-named-instance: 'Italic';
  }

  // https://www.joshwcomeau.com/css/full-bleed/
  .main-container {
    display: grid;
    grid-template-columns: 1fr min(75ch, calc(100% - 64px)) 1fr;
    grid-column-gap: 32px;

    & > * {
      grid-column: 2;
    }

    .full-bleed {
      grid-column: 1 / -1;
    }
  }

  // Header and footer
  .layout {
    width: clamp(540px, 70ch, 1080px);
  }
  @media screen and (max-width: 540px) {
    .layout {
      width: 100%;
      padding-left: ${theme('padding.4')};
      padding-right: ${theme('spacing.4')};
    }
  }

  .article > * {
    margin-bottom: ${theme('padding.10')};
  }
`;

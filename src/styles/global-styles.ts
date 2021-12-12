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
    ${tw`bg-blue-900 text-white`}
  }

  :focus-visible {
    outline: none;
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

  [tooltip] {
    position: relative;
    display: inline-block;
  }

  [tooltip]::before {
    transition: 0.3s;
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px 6px 0 6px;
    border-style: solid;
    border-color: rgba(25, 30, 56) transparent transparent transparent;
    z-index: 99;
    opacity: 0;
  }

  [tooltip]::after {
    transition: 0.3s;
    white-space: nowrap;
    content: attr(tooltip);
    position: absolute;
    left: 50%;
    top: -6px;
    transform: translateX(-50%) translateY(-100%);
    background: rgba(25, 30, 56);
    text-align: center;
    color: #fff;
    font-size: 0.875rem;
    min-width: 80px;
    max-width: 420px;
    border-radius: 3px;
    pointer-events: none;
    padding: 4px 8px;
    z-index: 99;
    opacity: 0;
  }

  [tooltip]:hover::after,
  [tooltip]:hover::before {
    opacity: 1;
  }
`;

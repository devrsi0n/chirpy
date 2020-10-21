import css from 'styled-jsx/css';

export const layoutStyle = css`
  .layout {
    width: clamp(540px, 70ch, 1080px);
  }
  @media screen and (max-width: 540px) {
    .layout {
      width: 100%;
      padding-left: theme('padding.4');
      padding-right: theme('spacing.4');
    }
  }
`;

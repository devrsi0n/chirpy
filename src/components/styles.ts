import { SxStyleProp } from 'theme-ui';

export const layoutStyle: SxStyleProp = {
  width: 'clamp(280px, 70%, 1080px)',
  margin: '0 auto',
  paddingLeft: 4,
  paddingRight: 4,
  '@media screen and (max-width: 540px)': {
    width: '100%',
  },
};

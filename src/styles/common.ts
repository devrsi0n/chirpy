import tw, { css } from 'twin.macro';

export const bluredOverlay = tw`bg-blacka-400 dark:(bg-whitea-400) backdrop-filter backdrop-blur-sm`;

export const cardBg = tw`bg-white dark:(bg-grayd-300)`;

export const blured = tw`bg-opacity-75 dark:(bg-opacity-70) backdrop-filter backdrop-blur-xl backdrop-saturate-150`;
export const bluredBg = css`
  ${cardBg} ${blured}
`;

export const border = tw`border outline-none focus-visible:(border-primary-900)`;

export const listHoverableColor = tw`transition hover:(bg-primary-400 text-primary-1100)`;
export const listHoverable = [tw` px-2 py-1 rounded `, listHoverableColor];

export const ring = tw`focus-visible:(outline-none ring-2 ring-offset-bg ring-offset-2 ring-primary-700)`;

export const textInput = tw`placeholder-gray-900 bg-gray-100 dark:bg-gray-400`;

export const textInputError = tw`border-red-700 focus-visible:(border-red-800)`;

export const gradient = tw`bg-gradient-to-r from-primary-800 to-plum-800`;

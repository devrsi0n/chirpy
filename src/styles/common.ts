import tw, { css } from 'twin.macro';

export const bluredOverlay = tw`transition bg-blacka-400 dark:(bg-whitea-400) backdrop-filter backdrop-blur-sm`;

export const cardBg = tw`transition bg-white dark:(bg-gray-dark-300)`;

export const bluredBg = css`
  ${cardBg} ${tw`transition bg-opacity-75 dark:(bg-opacity-70) backdrop-filter backdrop-blur-xl backdrop-saturate-150`}
`;

export const border = tw`border outline-none focus:(border-primary-900)`;

export const hoverable = tw`hover:(bg-primary-900 text-white)`;

export const ring = tw`focus-visible:(outline-none ring-2 ring-offset-bg ring-offset-2 ring-primary-700)`;

export const textInput = tw`placeholder-gray-900 bg-gray-100 dark:bg-gray-400`;

export const textInputError = tw`border-red-700 focus-visible:(border-red-800)`;

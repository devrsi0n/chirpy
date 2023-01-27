export const bluredOverlay = `bg-blacka-400 dark:bg-whitea-400 backdrop-blur-sm`;

export const cardBg = `bg-gray-0`;

export const blured = `bg-opacity-75 dark:bg-opacity-70 backdrop-blur-xl backdrop-saturate-150`;
// Sync it with header.tsx blur background
export const bluredBg = `
  ${cardBg} ${blured}
`;

export const border = `border outline-none focus-visible:border-primary-900`;

export const listHoverableColor = `transition hover:bg-primary-400 hover:text-primary-1100`;
export const listHoverable = `px-2 py-1 rounded ${listHoverableColor}`;

export const ring = `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-bg focus-visible:ring-offset-2 focus-visible:ring-primary-700`;

export const textInput = `placeholder-gray-900 bg-transparent`;

export const textInputError = `border-red-700 focus-visible:border-red-800`;

export const gradient = `bg-gradient-to-r from-primary-800 to-plum-800`;

export const easeInOutTransition = 'transition duration-150 ease-in-out';
export const focusRing =
  'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-700 focus-visible:ring-opacity-25';
export const disabled =
  'cursor-not-allowed bg-gray-300 text-gray-1100 shadow-none';
export const borderHover = 'hover:border-gray-800';

import tw, { css, screen, theme } from 'twin.macro';

export const labelContainer = tw`flex items-center justify-between mt-3 mb-2 text-xs font-bold tracking-wide text-gray-1100`;
export const cardTitle = tw`font-bold text-gray-1100`;
export const tabContainer = tw`flex font-medium text-xs text-gray-1100 space-x-2`;
export const itemBg = tw`bg-orange-200 dark:bg-opacity-5`;

export const analyticsStyles = css`
  .feather {
    height: 1em;
    width: 1em;
    overflow: visible;
    display: inline;
  }

  .feather-sm {
    height: 1em;
    width: 1em;
    overflow: visible;
    display: inline;
  }

  .table-striped tbody tr:nth-child(odd) {
    background-color: #f1f5f8;
  }

  .dark .table-striped tbody tr:nth-child(odd) {
    background-color: rgb(37, 47, 63);
  }

  .dark .table-striped tbody tr:nth-child(even) {
    background-color: rgb(26, 32, 44);
  }

  .stats-item {
    min-height: 436px;
  }

  @media (min-width: ${theme`screens.md`}) {
    .stats-item {
      margin-left: 6px;
      margin-right: 6px;
      width: calc(50% - 6px);
      position: relative;
      min-height: initial;
      height: 27.25rem;
    }

    .stats-item-header {
      height: inherit;
    }
  }

  .stats-item:first-child {
    margin-left: 0;
  }

  .stats-item:last-child {
    margin-right: 0;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity 100ms ease-in;
  }

  .flatpickr-calendar.static.open {
    right: 2px;
    top: 12px;
  }

  .datamaps-subunit {
    cursor: pointer;
  }

  /* Only because the map handler doesn't expose an easier way to change the shadow color */
  .dark .hoverinfo {
    box-shadow: 1px 1px 5px rgb(26, 32, 44);
  }

  .fullwidth-shadow::before {
    ${tw`absolute top-0 w-screen h-full bg-gray-100 dark:bg-gray-800`}

    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.06);
    content: '';
    z-index: -1;
    left: calc(-1 * calc(50vw - 50%));
    background-color: inherit;
  }

  .dark .fullwidth-shadow::before {
    box-shadow: 0 4px 2px -2px rgba(200, 200, 200, 0.1);
  }

  iframe[hidden] {
    display: none;
  }

  .pagination-link[disabled] {
    ${tw`cursor-default bg-gray-100 dark:bg-gray-300 pointer-events-none`}
  }

  @media (max-width: 768px) {
    .flatpickr-wrapper {
      position: absolute !important;
      right: 0 !important;
      left: 0 !important;
    }
  }

  .active-prop-heading {
    /* Properties related to text-decoration are all here in one place. TailwindCSS does support underline but that's about it. */
    text-decoration-line: underline;
    text-decoration-color: #4338ca; /* tailwind's indigo-700 */
    text-decoration-thickness: 2px;
  }

  @media (prefers-color-scheme: dark) {
    .active-prop-heading {
      text-decoration-color: #6366f1; /* tailwind's indigo-500 */
    }
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

  .loading {
    width: 50px;
    height: 50px;
    animation: loaderFadein 0.2s ease-in;
  }

  .loading.sm {
    width: 25px;
    height: 25px;
  }

  .loading div {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid #dae1e7;
    border-radius: 50%;
    border-top-color: #606f7b;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }

  .dark .loading div {
    border: 3px solid #606f7b;
    border-top-color: #dae1e7;
  }

  .loading.sm div {
    width: 25px;
    height: 25px;
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes loaderFadein {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

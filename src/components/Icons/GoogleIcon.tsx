import * as React from 'react';

export type GoogleIconProps = {
  width?: number;
  height?: number;
};

export function GoogleIcon(props: GoogleIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google"
      viewBox="0 0 512 512"
      width={props.width}
      height={props.height}
    >
      <rect width="512" height="512" fill="#fff" rx="15%"></rect>
      <path fill="#4285f4" d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"></path>
      <path fill="#34a853" d="M90 341a192 192 0 00296 59l-62-48c-53 35-141 22-171-60z"></path>
      <path fill="#fbbc02" d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"></path>
      <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"></path>
    </svg>
  );
}

import * as React from 'react';

export type ICardProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className }: ICardProps): JSX.Element {
  return <div className={`border rounded my-5 px-5 ${className}`}>{children}</div>;
}

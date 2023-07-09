import * as React from 'react';

import { Heading } from '../../../components';

export type CardProps = {
  children: React.ReactNode;
};

export function Card(props: CardProps): JSX.Element {
  return (
    <section className="mt-10 rounded-md border">{props.children}</section>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export type CardTitleProps = {
  children: React.ReactNode;
};

function CardHeader(props: CardTitleProps): JSX.Element {
  return (
    <Heading as="h3" className="px-5 pt-5 font-medium">
      {props.children}
    </Heading>
  );
}

export type CardBodyProps = {
  children: React.ReactNode;
};

function CardBody(props: CardBodyProps): JSX.Element {
  return <div className="space-y-3 p-5">{props.children}</div>;
}

export type CardFooterProps = {
  children: React.ReactNode;
};

function CardFooter(props: CardFooterProps) {
  return (
    <footer className="flex justify-end border-t bg-gray-300 px-5 py-3">
      {props.children}
    </footer>
  );
}

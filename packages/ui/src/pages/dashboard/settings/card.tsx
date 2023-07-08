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

Card.Body = CardBody;
Card.Title = CardTitle;
Card.Footer = CardFooter;

export type CardTitleProps = {
  children: React.ReactNode;
};

function CardTitle(props: CardTitleProps): JSX.Element {
  return (
    <Heading as="h3" className="font-medium">
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

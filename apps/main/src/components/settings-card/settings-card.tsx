import { Heading } from '@chirpy-dev/ui';
import clsx from 'clsx';
import * as React from 'react';

export type SettingsCardProps = {
  children: React.ReactNode;
};

export function SettingsCard(props: SettingsCardProps): JSX.Element {
  return (
    <section className="mt-10 rounded-lg border">{props.children}</section>
  );
}

SettingsCard.Header = CardHeader;
SettingsCard.Body = CardBody;
SettingsCard.Footer = CardFooter;

export type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
};

function CardHeader(props: CardTitleProps): JSX.Element {
  return (
    <Heading as="h3" className={clsx('px-5 pt-5 font-medium', props.className)}>
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

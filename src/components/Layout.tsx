import * as React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface ILayoutProps {
  children: React.ReactNode;
}

export function Layout(props: ILayoutProps): JSX.Element {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

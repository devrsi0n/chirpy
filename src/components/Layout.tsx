/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface ILayoutProps {
  children: React.ReactNode;
}

export function Layout(props: ILayoutProps): JSX.Element {
  return (
    <div
      sx={{
        width: 'clamp(280px, 70%, 1080px)',
        margin: '0 auto',
        paddingLeft: 3,
        paddingRight: 3,
      }}
    >
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

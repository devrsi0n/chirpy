/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { layoutStyle } from './styles';

interface ILayoutProps {
  children: React.ReactNode;
}

export function Layout(props: ILayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <div sx={layoutStyle}>{props.children}</div>
      <Footer />
    </>
  );
}

import * as React from 'react';
import 'twin.macro';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

interface ILayoutProps {
  children: React.ReactNode;
  disableContainer?: boolean;
}

export function Layout({ disableContainer, children }: ILayoutProps): JSX.Element {
  return (
    <div tw="flex flex-col items-center">
      <Header />
      {disableContainer ? (
        children
      ) : (
        <main tw="py-10" className="main-container">
          {children}
        </main>
      )}

      <Footer />
    </div>
  );
}

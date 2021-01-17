import * as React from 'react';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

interface ILayoutProps {
  children: React.ReactNode;
  disableContainer?: boolean;
}

export function Layout({ disableContainer, children }: ILayoutProps): JSX.Element {
  return (
    <div className={`flex flex-col items-center`}>
      <Header />
      {disableContainer ? children : <main className="py-10 main-container">{children}</main>}

      <Footer />
    </div>
  );
}

import * as React from 'react';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

interface ILayoutProps {
  children: React.ReactNode;
}

export function Layout(props: ILayoutProps): JSX.Element {
  return (
    <div className={`flex flex-col items-center`}>
      <Header />
      <main className="py-10 main-container">{props.children}</main>
      <Footer />
    </div>
  );
}

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
      <div className="py-10 layout">{props.children}</div>
      <Footer />
    </div>
  );
}

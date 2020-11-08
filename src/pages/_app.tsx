import '../styles/tailwind.css';
import '../styles/utilities.css';
import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import GoogleFonts from 'next-google-fonts';

import { ThemeProvider } from '$/components/ThemeProvider';
import { useApollo } from '$/lib/apollo-client';
import { colorModes } from '$/styles/colors';
import { CurrentUserProvider } from '$/components/CurrentUserProvider';

interface IAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

function App({ Component, pageProps }: IAppProps): JSX.Element {
  const apollo = useApollo();
  return (
    <ThemeProvider colorModes={colorModes}>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&display=swap" />
      <ApolloProvider client={apollo}>
        <CurrentUserProvider>
          <Component {...pageProps} />
        </CurrentUserProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;

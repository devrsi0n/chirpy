import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    return { ...initialProps, ...page };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="title" content="Chirpy" />
          <meta
            name="description"
            content="Chirpy is a privacy-friendly, customizable 
and open-source Disqus alternate."
          />
          <meta name="copyright" content="Chirpy Information Technology LLC" />
          <meta
            name="keywords"
            content="comment system, privacy-friendly, customizable, open-source"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
          <link rel="alternate icon" href="/favicon.png"></link>
          <link
            rel="preload"
            href="/fonts/Inter/Inter-roman.var.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

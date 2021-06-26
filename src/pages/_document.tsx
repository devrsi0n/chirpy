import { extractCritical } from '@emotion/server';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import tw from 'twin.macro';

class MyDocument extends Document<ReturnType<typeof extractCritical>> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return { ...initialProps, ...page, ...styles };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="google-site-verification"
            content="koggX1GsLqeXzbQmq-JUcGh2pZHRN3Xy5o_oXNS9nRo"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
          <link rel="alternate icon" href="/favicon.png"></link>
          <link
            rel="preload"
            href="/fonts/Inter/Inter-roman.var.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body
          css={tw`bg-white text-gray-600 dark:bg-black dark:text-gray-300 transition duration-300 font-sans`}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

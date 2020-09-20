/** @jsx jsx */
import { Heading, jsx } from 'theme-ui';
import Head from 'next/head';

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>ZOO</title>
      </Head>
      <Heading
        as="h1"
        sx={{
          textAlign: 'center',
        }}
      >
        Hello zoo!
      </Heading>
    </>
  );
};

export default Home;

/** @jsx jsx */
import { Heading, jsx, Text } from 'theme-ui';
import Head from 'next/head';

import { Button } from '$/components/Button';

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>ZOO</title>
      </Head>
      <Heading as="h1" className="text-center text-6xl">
        Welcome to ZOO!
      </Heading>
      <Text>ZOO is a comment service.</Text>
      <Button>Start for free</Button>
    </>
  );
};

export default Home;

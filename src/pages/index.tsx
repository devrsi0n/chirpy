import Head from 'next/head';

import { Heading } from '$/components/Heading';
import { Button } from '$/components/Button';
import { Text } from '$/components/Text';

const Home = (): JSX.Element => {
  return (
    <main>
      <Head>
        <title>ZOO</title>
      </Head>
      <Heading as="h1" className="text-center">
        Welcome to ZOO!
      </Heading>
      <Text className="py-6">ZOO is a comment service.</Text>
      <Button>Start for free</Button>
    </main>
  );
};

export default Home;

/** @jsx jsx */
import { Heading, jsx, Text } from 'theme-ui';
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
        Welcome to ZOO!
      </Heading>
      <Text>ZOO is a comment service.</Text>
    </>
  );
};

export default Home;

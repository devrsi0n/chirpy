/** @jsx jsx */
import { Heading, jsx } from 'theme-ui';

const Home = (): JSX.Element => {
  return (
    <>
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

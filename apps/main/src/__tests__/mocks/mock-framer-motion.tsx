import * as motionModule from 'framer-motion';

jest
  .spyOn(motionModule, 'LazyMotion')
  .mockImplementation(({ children }) => (
    <div data-mocked-framer-motion>{children}</div>
  ));

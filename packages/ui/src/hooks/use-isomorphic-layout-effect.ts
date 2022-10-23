import * as React from 'react';

import { isSSRMode } from 'utils';

const useIsomorphicLayoutEffect = isSSRMode
  ? React.useEffect
  : React.useLayoutEffect;

export default useIsomorphicLayoutEffect;

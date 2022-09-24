import * as React from 'react';

import { isSSRMode } from '$/utilities/isomorphic/env';

const useIsomorphicLayoutEffect = isSSRMode
  ? React.useEffect
  : React.useLayoutEffect;

export default useIsomorphicLayoutEffect;

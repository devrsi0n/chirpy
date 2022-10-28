import * as React from 'react';

import { isSSRMode } from '@chirpy-dev/utils';

const useIsomorphicLayoutEffect = isSSRMode
  ? React.useEffect
  : React.useLayoutEffect;

export default useIsomorphicLayoutEffect;

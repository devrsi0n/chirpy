import { isSSRMode } from '@chirpy-dev/utils';
import * as React from 'react';

const useIsomorphicLayoutEffect = isSSRMode
  ? React.useEffect
  : React.useLayoutEffect;

export default useIsomorphicLayoutEffect;

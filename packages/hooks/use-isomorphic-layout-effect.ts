import * as React from 'react';
import { ssrMode } from '@chirpy/utilities';

const useIsomorphicLayoutEffect = ssrMode ? React.useEffect : React.useLayoutEffect;

export { useIsomorphicLayoutEffect };

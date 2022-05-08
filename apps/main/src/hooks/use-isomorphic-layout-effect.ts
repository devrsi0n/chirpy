import * as React from 'react';

import { ssrMode } from '$/utilities/env';

const useIsomorphicLayoutEffect = ssrMode ? React.useEffect : React.useLayoutEffect;

export default useIsomorphicLayoutEffect;

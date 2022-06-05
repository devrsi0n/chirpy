import * as React from 'react';

import { isSSRMode } from '$/utilities/env';

const useIsomorphicLayoutEffect = isSSRMode ? React.useEffect : React.useLayoutEffect;

export default useIsomorphicLayoutEffect;

import { Noop } from '@chirpy-dev/utils';
import * as React from 'react';

import { useInterval } from '../../hooks';

export function useIntervalRefrsh(refetch: Noop) {
  const intervalTime = React.useRef(5000);
  useInterval(() => {
    refetch();
    intervalTime.current += 500;
  }, intervalTime.current);
}

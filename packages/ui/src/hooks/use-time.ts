import * as React from 'react';

export type TimeCallback = () => void;
/**
 * Use null to stop the timer
 */
export type TimeDelay = number | null;

export function useTimeout(callback: TimeCallback, delay: TimeDelay) {
  return useTimeControl(callback, delay, setTimeout);
}

export function useInterval(callback: TimeCallback, delay: TimeDelay) {
  return useTimeControl(callback, delay, setInterval);
}

function useTimeControl(
  callback: TimeCallback,
  delay: TimeDelay,
  timeFn: typeof setTimeout | typeof setInterval,
) {
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = timeFn(() => savedCallback.current(), delay);

    return () => (timeFn === setTimeout ? clearTimeout(id) : clearInterval(id));
  }, [delay, timeFn]);
}

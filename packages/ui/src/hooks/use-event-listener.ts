import * as React from 'react';

import { logger } from '../utils/logger';

function useEventListener<WE extends keyof WindowEventMap = 'resize'>(
  eventName: WE,
  listener: (event: WindowEventMap[WE]) => void,
  element?: Window,
): void;
function useEventListener<HE extends keyof HTMLElementEventMap = 'click'>(
  eventName: HE,
  listener: (event: HTMLElementEventMap[HE]) => void,
  element: React.RefObject<HTMLElement>,
): void;
function useEventListener(
  eventName: string,
  listener: (event: Event) => void,
  element?: HTMLElement | Window,
): void;

function useEventListener<
  HE extends keyof HTMLElementEventMap,
  WE extends keyof WindowEventMap,
>(
  eventName: HE | WE | string,
  listener: (
    event: HTMLElementEventMap[HE] | WindowEventMap[WE] | Event,
  ) => void,
  element?: HTMLElement | Window | React.RefObject<HTMLElement>,
): void {
  const listenerRef =
    React.useRef<
      (event: HTMLElementEventMap[HE] | WindowEventMap[WE] | Event) => void
    >();
  listenerRef.current = listener;

  React.useEffect(() => {
    const targetElement: HTMLElement | Window =
      (element as React.RefObject<HTMLElement>)?.current ||
      (element as HTMLElement) ||
      window;
    if (!targetElement.addEventListener) {
      logger.warn(
        `Can't find add event listner(${listenerRef.current}) for element ${element}`,
      );
      return;
    }

    const eventListener = (
      event: HTMLElementEventMap[HE] | WindowEventMap[WE] | Event,
    ) => listenerRef.current?.call(element, event);

    targetElement.addEventListener(eventName, eventListener);
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export { useEventListener };

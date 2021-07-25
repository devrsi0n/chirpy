import { useRouter } from 'next/router';
import * as React from 'react';

import { AnonymousSessionRequestBody } from '$/server/types/anonymous-session';
import { EventRequestBody, EventResponseBody } from '$/server/types/event';

import { TelemetryContext, TelemetryContextType } from './TelemetryContext';

export type TelemetryProviderProps = React.PropsWithChildren<{
  projectId: string;
}>;

type Event = {
  type: string;
  params: EventRequestBody['params'];
  url: string;
  projectId: string;
};

const SESSION_KEY = 'session.cache';
const eventsToRecord: Event[] = [];

export function TelemetryProvider({ children, projectId }: TelemetryProviderProps): JSX.Element {
  const router = useRouter();

  const recordEvent = React.useCallback(
    (type: string, params: EventRequestBody['params'] = null, url: string = location.href) => {
      eventsToRecord.push({
        type,
        params,
        url,
        projectId,
      });
      schedulePendingEvents();
    },
    [projectId],
  );
  React.useEffect(() => {
    recordEvent('pageview');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handleRouteChange = () => {
      recordEvent('pageview');
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, recordEvent]);

  const contextValue: TelemetryContextType = React.useMemo(
    () => ({
      recordEvent,
    }),
    [recordEvent],
  );
  return <TelemetryContext.Provider value={contextValue}>{children}</TelemetryContext.Provider>;
}

function schedulePendingEvents() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(processPendingAnalyticsEvents, { timeout: 2000 });
  } else {
    requestAnimationFrame(() =>
      processPendingAnalyticsEvents({ timeRemaining: () => 100, didTimeout: true }),
    );
  }
}

const processPendingAnalyticsEvents = (deadline: IdleDeadline): void => {
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && eventsToRecord.length > 0) {
    logEvent(eventsToRecord.pop()!);
  }
};

async function logEvent({ type, params, url, projectId }: Event) {
  const { screen, navigator, document } = window;
  const event: EventRequestBody = {
    params,
    type,
    url,
    referrer: document.referrer,
  };
  const session: AnonymousSessionRequestBody = {
    projectId,
    token: sessionStorage.getItem(SESSION_KEY) || '',
    hostname: new URL(url).hostname,
    screen: `${screen.width}x${screen.height}`,
    language: navigator.language,
  };

  const data: EventResponseBody = await (
    await fetch(`/api/event`, {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session, event }),
    })
  ).json();
  sessionStorage.setItem(SESSION_KEY, data.cache);
}

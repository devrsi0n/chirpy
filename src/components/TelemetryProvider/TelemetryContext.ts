import * as React from 'react';

import { EventRequestBody } from '$shared/types/event';

export type TelemetryContextType = {
  recordEvent(type: string, params: EventRequestBody['params']): void;
};

export const TelemetryContext = React.createContext<TelemetryContextType>({
  recordEvent: () => null,
});

import * as React from 'react';

import { EventRequestBody } from '$/server/types/event';

export type TelemetryContextType = {
  recordEvent(type: string, params: EventRequestBody['params']): void;
};

export const TelemetryContext = React.createContext<TelemetryContextType>({
  recordEvent: () => null,
});

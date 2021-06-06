import React from 'react';

import { TelemetryContext, TelemetryContextType } from './TelemetryContext';

export const useTelemetry = (): TelemetryContextType => {
  const context = React.useContext(TelemetryContext);
  if (!context) {
    throw new Error(`'useTelemetry' must be used within a TelemetryProvider`);
  }
  return context;
};

import React from 'react';

import ExceededUsage from '../ExceededUsage';

export function preview() {
  return (
    <ExceededUsage
      usage={1200}
      usageLimit={1000}
      plan="Free"
      type="first"
      userName="Qing"
    />
  );
}

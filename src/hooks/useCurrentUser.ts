import * as React from 'react';
import { CurrentUserContext, CurrentUserContextType } from '$/context/CurrentUserContext';

export function useCurrentUser(): CurrentUserContextType {
  const context = React.useContext(CurrentUserContext);
  if (!context) {
    throw new Error(`'useCurrentUser' must be used within a CurrentUserContext`);
  }
  return context;
}

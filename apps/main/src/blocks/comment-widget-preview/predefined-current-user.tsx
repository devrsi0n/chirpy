import * as React from 'react';

import { CurrentUserContext, CurrentUserContextType } from '$/contexts/current-user-context';

export type PredefinedCurrentUserProps = {
  children: React.ReactNode;
};

/**
 * Provide existing or mocked current user context
 * @param props
 * @returns
 */
export function PredefinedCurrentUser(props: PredefinedCurrentUserProps): JSX.Element {
  const originalContext = React.useContext(CurrentUserContext);

  const currentUser: CurrentUserContextType = React.useMemo(() => {
    if (originalContext.data.id) {
      return originalContext;
    }
    return {
      loading: false,
      isSignIn: true,
      data: {
        editableProjectIds: [],
        id: 'ffad5f9c-0c28-4c9b-a652-b21a2a42949b',
        username: 'michael',
        email: 'michael@chirpy.dev',
        name: 'Michael',
        avatar: '/images/avatars/male-2.jpeg',
      },
    };
  }, [originalContext]);
  return (
    <CurrentUserContext.Provider value={currentUser}>{props.children}</CurrentUserContext.Provider>
  );
}

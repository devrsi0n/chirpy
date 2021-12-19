import * as AuthClient from 'next-auth/react';

import { EDITABLE_PROJECT_IDS } from './editableProjectIds';

const mockUseSession = jest.spyOn(AuthClient, 'useSession');

mockUseSession.mockReturnValue({
  data: {
    hasuraToken: 'random-string-for-testing',
    user: {
      id: 1,
      email: '',
      name: '',
      image: '',
      editableProjectIds: EDITABLE_PROJECT_IDS,
    },
    isNewUser: true,
  } as any,
  status: 'authenticated',
});

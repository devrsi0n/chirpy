import * as authModule from 'next-auth/react';

import { EDITABLE_PROJECT_IDS } from './data/editable-project-ids';

const mockUseSession = jest.spyOn(authModule, 'useSession');

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
  } as any,
  status: 'authenticated',
});

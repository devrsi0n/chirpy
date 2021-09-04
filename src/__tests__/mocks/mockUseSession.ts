import * as AuthClient from 'next-auth/client';

import { EDITABLE_PROJECT_IDS } from './editableProjectIds';

const mockUseSession = jest.spyOn(AuthClient, 'useSession');

mockUseSession.mockReturnValue([
  {
    hasuraToken: 'random-string-for-testing',
    user: {
      id: 1,
      email: '',
      name: '',
      image: '',
      editableProjectIds: EDITABLE_PROJECT_IDS,
    },
    isNewUser: true,
  },
  false,
]);

// import { useSession } from 'next-auth/client';
// jest.mock('next-auth/client');
// // @ts-ignore
// useSession.mockReturnValue([
//   {
//     hasuraToken: 'random-string-for-testing',
//     user: {
//       id: 1,
//       email: '',
//       name: '',
//       image: '',
//     },
//     isNewUser: true,
//   },
//   false,
// ]);

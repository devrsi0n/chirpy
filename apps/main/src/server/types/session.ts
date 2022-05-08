import { NextApiRequest } from 'next';

export type AuthUser = {
  sub: string;
  name: string;
  email: string;
};

export interface SessionRequest extends NextApiRequest {
  session?: AuthUser;
}

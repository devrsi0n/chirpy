import { UserData } from '@chirpy/contexts';

export function hasValidUserProfile(data: UserData): boolean {
  return !!(data.email && data.name && data.username);
}

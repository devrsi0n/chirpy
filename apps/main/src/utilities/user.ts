import { UserData } from 'ui';

export function hasValidUserProfile(data: UserData): boolean {
  return !!(data.name && data.username);
}

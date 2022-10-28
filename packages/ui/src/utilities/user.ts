import { UserData } from '../contexts';

export function hasValidUserProfile(data: UserData): boolean {
  return !!(data.name && data.username);
}

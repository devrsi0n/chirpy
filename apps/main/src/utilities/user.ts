import { UserData } from '$/contexts/current-user-context/current-user-context';

export function hasValidUserProfile(data: UserData): boolean {
  return !!(data.name && data.username);
}

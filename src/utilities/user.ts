import { UserData } from '$/contexts/current-user-provider/CurrentUserContext';

export function hasValidUserProfile(data: UserData): boolean {
  return !!(data.email && data.name && data.username);
}

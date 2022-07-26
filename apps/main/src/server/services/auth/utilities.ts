import { randomUUID } from 'crypto';

export function generateUsername(name: string): string {
  // Replace all whitespace characters with underscores
  name = name.toLowerCase().replace(/\s/g, '_');
  // Remove all special characters like "@ . _ ";
  name = name.replace(/\W/g, '');
  // Create and return unique username
  return name + randomUUID().slice(0, 6);
}

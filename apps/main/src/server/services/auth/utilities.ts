import { randomUUID } from 'crypto';

/**
 * Generate an unique username based on the provided name.
 */
export function generateUsername(name: string): string {
  // Replace all whitespace characters with underscores
  name = name.toLowerCase().replace(/\s/g, '_');
  // Remove all special characters like "@ . _ ";
  name = name.replace(/\W/g, '');
  // Append a **short** random string to the username
  // to make it easier to type manually for user, and also avoid collisions
  return `${name}-${randomUUID().slice(0, 4)}`;
}

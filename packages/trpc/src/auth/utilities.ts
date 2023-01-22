/**
 * Generate an unique username based on the provided name.
 */
export function generateUsername(name: string): string {
  // Replace all whitespace characters with underscores
  name = name.trim().toLowerCase().replace(/\s/g, '_');
  // Remove all special characters like "@ . _ ";
  name = name.replace(/\W/g, '');
  // Append a **short** number list to the username
  // to make it easier to type manually for user, and also avoid collisions
  return `${name}${Math.random().toString().slice(2, 4)}`;
}

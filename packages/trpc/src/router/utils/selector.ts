const COMMENT_USER = {
  select: {
    id: true,
    name: true,
    username: true,
    email: true,
    image: true,
  },
} as const;

const COMMENT_LIKE = {
  select: {
    id: true,
    userId: true,
  },
} as const;

/**
 * Select common fields for comments
 */
export const COMMON_COMMENT_SELECTOR = {
  user: COMMENT_USER,
  likes: COMMENT_LIKE,
} as const;

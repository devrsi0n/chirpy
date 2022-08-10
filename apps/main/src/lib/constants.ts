export const SESSION_IN_SUCCESS_KEY = 'sign-in.success';
export const CALLBACK_URL_KEY = 'callback.url';

// 30 days
export const SESSION_MAX_AGE = 30 * 24 * 60 * 60;
export const HASURA_TOKEN_MAX_AGE = 60 * 60;

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const EVENT_PREFIX = 'CP_EVENT_';

export const EVENT_CLICK_CONTAINER = `${EVENT_PREFIX}CLICK_CONTAINER`;
export const EVENT_CHANGE_THEME = `${EVENT_PREFIX}CHANGE_THEME`;
export const EVENT_WIDGET_LOADED = `${EVENT_PREFIX}WIDGET_LOADED`;

export const WIDGET_COMMENT_PATH = '/widget/comment/';

export const ANALYTICS_DOMAIN = 'chirpy.dev';

export const FEEDBACK_LINK = `mailto:support@chirpy.dev`;

export const GRAPHQL_CACHE_DB_NAME = 'graphcache-v1';

export const COMMENT_TREE_MAX_DEPTH = 4;

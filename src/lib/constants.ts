export const LOG_IN_SUCCESS_KEY = 'LOG_IN_SUCCESS';
export const LOG_OUT_SUCCESS_KEY = 'LOG_OUT_SUCCESS';

// 7 days
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60;
export const HASURA_TOKEN_MAX_AGE = 60 * 60;

export const APP_NAME = 'Chirpy';
export const APP_NAME_LOWERCASE = 'chirpy';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const EVENT_CLICK_CONTAINER = 'EVENT_CLICK_CONTAINER';

export const WIDGET_COMMENT_PATH = '/widget/comment/';

export const ANALYTICS_DOMAIN = new URL(APP_URL).host;

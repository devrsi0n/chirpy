import { HOME_ORIGIN } from '@chirpy-dev/utils';

const homeUrl = new URL(HOME_ORIGIN);
const { protocol, host } = homeUrl;
export const WIDGET_DOMAIN = `${protocol}//widget.${host}`;

import { isENVDev } from '@chirpy-dev/utils';

export const WIDGET_DOMAIN = `${isENVDev ? 'http' : 'https'}://widget.${
  process.env.NEXT_PUBLIC_HOST
}`;

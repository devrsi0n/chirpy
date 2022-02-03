import { APP_NAME } from '../../../lib/constants';
import { comment } from './comment-bootstrapper';

const win = window as any;
if (win && !win.disableAutoInjection) {
  comment();
  win[APP_NAME] = {
    comment,
  };
}

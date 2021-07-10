import { appName, comment } from './comment-bootstrapper';

const win = window as any;
if (win && !win.disableAutoInjection) {
  comment();
  win[appName] = {
    comment,
  };
}

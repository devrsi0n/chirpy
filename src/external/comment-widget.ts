import { appName, comment } from './comment';

const win = window as any;
if (win && !win.disableAutoInjection) {
  comment();
  win[appName] = {
    comment,
  };
}

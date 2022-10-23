import { chalk } from 'zx';

export function logError(message: string, error?: any): void {
  console.error(chalk.redBright(`❌ ${message}`, error));
}

export function logDebug(
  verbose: boolean | undefined,
  message: string,
  ...args: any[]
): void {
  if (!verbose) {
    return;
  }
  console.log(chalk.blueBright(`${message}`, ...args));
}

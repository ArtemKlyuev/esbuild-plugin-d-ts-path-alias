export const color = {
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
};

export class Logger {
  private readonly logger?: Console;

  private readonly prefix: string = '';

  constructor(name: string, disable: boolean) {
    if (disable) {
      return;
    }

    this.prefix = `[${name}]`;
    this.logger = console;
  }

  info(message: string, ...args: any[]): void {
    this.logger?.log(color.blue(`${this.prefix}: ${message}`), ...args);
  }

  success(message: string, ...args: any[]): void {
    this.logger?.log(color.green(`${this.prefix}: ${message}`), ...args);
  }

  error(message: string, ...args: any[]): void {
    this.logger?.error(color.red(`${this.prefix}: ${message}`), ...args);
  }
}

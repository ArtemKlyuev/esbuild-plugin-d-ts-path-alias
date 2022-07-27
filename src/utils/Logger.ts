import chalk from 'chalk';

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

  info(message: string): void {
    this.logger?.log(chalk.green(`${this.prefix}: ${message}`));
  }

  error(message: string): void {
    this.logger?.error(chalk.red(`${this.prefix}: ${message}`));
  }
}

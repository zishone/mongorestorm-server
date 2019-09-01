import * as debug from 'debug';

class Logger {
  private component?: string;

  constructor(filename: string) {
    this.component = filename.split('.')[0].split('/').pop();
  }

  public debug(formatter: any, ...args: any[]) {
    debug(`${new Date().toISOString()} mongorestorm:debug:${this.component}:`)(formatter, args);
  }

  public info(formatter: any, ...args: any[]) {
    debug(`${new Date().toISOString()} mongorestorm:info:${this.component}:`)(formatter, args);
  }

  public warn(formatter: any, ...args: any[]) {
    debug(`${new Date().toISOString()} mongorestorm:warn:${this.component}:`)(formatter, args);
  }

  public error(formatter: any, ...args: any[]) {
    debug(`${new Date().toISOString()} mongorestorm:error:${this.component}:`)(formatter, args);
  }
}

export { Logger };

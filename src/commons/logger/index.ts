import { Bindings, pino } from 'pino';
import config from '../../config';

interface BasicLogParams {
  name: string;
  info?: Record<string, unknown>;
}

interface ErrorLogParams extends BasicLogParams {
  error?: Record<string, unknown> | unknown;
}

interface ExtendedBindings extends Bindings {
  requestId?: string;
}

class Logger {
  public logger: pino.Logger;

  constructor() {
    this.logger = Logger.createLogger();
  }

  private static createLogger(): pino.Logger {
    const level = config.logger.levelsByStage[config.stage];
    const transport = config.stage === 'local' ? {
      target: 'pino-pretty',
    } : undefined;
    const options = {
      level,
      messageKey: 'name',
      timestamp: true,
      formatters: {
        level(label: string) {
          return { level: label };
        },
      },
      transport,
    };

    return pino(options);
  }

  info({
    name,
    info,
  }: BasicLogParams): void {
    this.logger.info(
      { info },
      name,
    );
  }

  error({
    name,
    error,
    info,
  }: ErrorLogParams): void {
    this.logger.error(
      {
        error,
        info,
      },
      name,
    );
  }

  debug({
    name,
    info,
  }: BasicLogParams): void {
    this.logger.debug(
      { info },
      name,
    );
  }

  warning({
    name,
    info,
  }: BasicLogParams): void {
    this.logger.warn(
      { info },
      name,
    );
  }

  fatal({
    name,
    error,
    info,
  }: ErrorLogParams): void {
    this.logger.fatal(
      {
        error,
        info,
      },
      name,
    );
  }

  attachRequestId(
    { requestId }: { requestId: string },
  ): void {
    if (!this.logger) {
      this.logger = Logger.createLogger();
    }

    const loggerBindings: ExtendedBindings = this.logger.bindings;

    if (!loggerBindings.requestId) {
      this.logger = this.logger.child({
        requestId,
      });
    }
  }
}

export default new Logger();

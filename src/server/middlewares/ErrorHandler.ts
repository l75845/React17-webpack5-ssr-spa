import Koa from 'koa';
import { Context } from '@interfaces/IKoa';
import { Logger } from 'log4js';

class ErrorHandler {
  static error(app: Koa, logger: Logger) {
    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      try {
        await next();
      } catch (e) {
        logger.error(e);
        ctx.body = 'ERROR code:500';
      }
    });
    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      await next();
      if (ctx.status !== 404) {
        return;
      }
      ctx.body = 'Page not found';
    });
  }
}
export default ErrorHandler;

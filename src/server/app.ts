import Koa from 'koa';
import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import serve from 'koa-static';
import { configure, getLogger } from 'log4js';
import config from '@config/index';
import ErrorHandler from '@middlewares/ErrorHandler';
import { resolve } from 'path';

configure({
  appenders: { cheese: { type: 'file', filename: resolve(__dirname, '..', '..', 'logs/logger.log') } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});

const logger = getLogger('cheese');
const { port, staticDir } = config;

const app = new Koa();

app.use(serve(staticDir));

const container = createContainer();

container.loadModules(['./services/*.ts'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});

app.use(scopePerRequest(container));
ErrorHandler.error(app, logger);
app.use(loadControllers(`${__dirname}/controllers/*.tsx`));

app.listen(port, () => {
  console.log('🍺:', port);
});

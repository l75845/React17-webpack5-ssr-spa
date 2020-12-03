/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Koa from 'koa';
import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import serve from 'koa-static';
import { configure, getLogger } from 'log4js';
import config from '@config/index';
import ErrorHandler from '@middlewares/ErrorHandler';
import { resolve } from 'path';
import compress from 'koa-compress';

configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: resolve(__dirname, '..', '..', 'logs/logger.log'),
    },
  },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});

const logger = getLogger('cheese');
const { port, staticDir } = config;

const app = new Koa();

app.use(
  compress({
    // eslint-disable-next-line camelcase
    filter(content_type) {
      return /text/i.test(content_type);
    },
    threshold: 2048,
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false, // disable brotli
  }),
);

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

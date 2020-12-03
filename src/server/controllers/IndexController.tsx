/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { route, GET } from 'awilix-koa';
import { Context } from '@interfaces/IKoa';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import { resolve } from 'path';
import Lru from 'lru-cache';

const ssrDictionaries: { [key: string]: { title: string } } = {
  '/': {
    title: 'login',
  },
  login: {
    title: 'login',
  },
  content: {
    title: 'content',
  },
};

const cache = new Lru({
  maxAge: 6000000,
  max: 500000000000,
  length: (n: string) => n.length * 100,
});

@route('/:controller?/:action?')
class IndexController {
  @GET()
  async actionIndex(ctx: Context) {
    if (cache.has(ctx.req.url)) {
      ctx.body = cache.get(ctx.req.url);
    } else {
      // eslint-disable-next-line import/no-unresolved
      const serverEntry = require('../../../dist/server-entry').default;
      const indexFile = resolve(__dirname, '../../../', 'dist/index.html');
      let content = fs.readFileSync(indexFile, 'utf8');
      const _controller: string = ctx.params.controller || '/';
      const title = ssrDictionaries[_controller]?.title || 'Page not found';
      const reactDom = await serverEntry(ctx);
      const pageContent = renderToString(reactDom);
      content = content
        .replace('<div id="main"></div>', `<div id="main">${pageContent}</div><script>window.__INITIAL__DATA__ = ${JSON.stringify(ctx.recoilInitData)}</script>`)
        .replace(/<title>.*?<\/title>/g, `<title>${title}</title>`);
      cache.set(ctx.req.url, content);
      ctx.body = content;
    }
  }
}

export default IndexController;

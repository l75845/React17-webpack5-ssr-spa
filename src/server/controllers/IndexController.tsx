/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { route, GET } from 'awilix-koa';
import { Context } from '@interfaces/IKoa';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import { resolve } from 'path';

@route('/:controller?/:action?')
class IndexController {
  @GET()
  actionIndex(ctx: Context) {
    const serverEntry = require('../../../dist/server-entry').default;
    const indexFile = resolve(__dirname, '../../../', 'dist/index.html');
    const content = fs.readFileSync(indexFile, 'utf8');
    // const _controller: string = ctx.params.controller || '/';
    const pageContent = renderToString(serverEntry(ctx.req.url));
    ctx.body = content.replace(
      '<div id="main"></div>',
      `<div id="main">${pageContent}</div>`,
    );
  }
}

export default IndexController;

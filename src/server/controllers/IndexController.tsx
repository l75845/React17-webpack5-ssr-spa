import { route, GET } from 'awilix-koa';
import { Context } from '@interfaces/IKoa';
import React from 'react';
import { renderToString } from 'react-dom/server';
const serverEntry = require('../../../dist/server-entry').default;
import fs from 'fs';
import { resolve } from 'path';

@route('/:controller?/:action?')
class IndexController {
  @GET()
  async actionIndex(ctx: Context): Promise<void> {
    const indexFile = resolve(__dirname,'../../../','dist/index.html');
    let content = fs.readFileSync(indexFile, 'utf8');
    // const _controller: string = ctx.params.controller || '/';
    const pageContent = renderToString(serverEntry(ctx.req.url));
    ctx.body = content.replace(
      '<div id="main"></div>',
      `<div id="main">${pageContent}</div>`
    );
  }
}

export default IndexController;

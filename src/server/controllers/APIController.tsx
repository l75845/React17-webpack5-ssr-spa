import { route, GET } from 'awilix-koa';
import { Context } from '@interfaces/IKoa';

@route('/api')
class APIController {
  @route('/')
  @GET()
  actionIndex(ctx: Context) {
    ctx.body = `${JSON.stringify({ id: 1, name: 'xxx' })}`;
  }
}

export default APIController;

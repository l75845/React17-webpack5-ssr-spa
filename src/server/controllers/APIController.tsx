import { route, GET } from 'awilix-koa';
import { Context } from '@interfaces/IKoa';

@route('/api')
class APIController {
  @route('/')
  @GET()
  async actionIndex(ctx: Context): Promise<void> {
    ctx.body = `${JSON.stringify({id:1,name:'xxx'})}`;
  }
}

export default APIController;

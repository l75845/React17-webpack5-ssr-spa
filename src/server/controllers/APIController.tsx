import { route, POST } from 'awilix-koa';
import { Context } from '@interfaces/IKoa';

@route('/api')
class APIController {
  @route('/getContentData')
  @POST()
  actionIndex(ctx: Context) {
    const results = {
      code: 0,
      message: '',
      data: {
        id: 1,
        name: 'xxx',
      },
    };
    ctx.body = JSON.stringify(results);
  }
}

export default APIController;

import React from 'react';
import { Context } from '@interfaces/IKoa';
import Routes, { firstRoutes } from 'web/routes/index-server';
import { Link, StaticRouter, matchPath } from 'react-router-dom';
import contentState from '@recoil/atoms/contentState';
import { MutableSnapshot, RecoilRoot } from 'recoil';

export default (ctx: Context) => {
  const routerPath = ctx.request.url;
  const returnData = new Promise((resolve) => {
    const promises: Array<Promise<any>> = [];
    firstRoutes.some((route) => {
      // matchPath 就是匹配前端的路由
      const match = matchPath(ctx.request.path, route);
      // 如果匹配到了前端路由，并且有这个方法，
      if (match && route.loadData) promises.push(route.loadData());
      return match;
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.all(promises).then((data: [{ data: unknown }]) => {
      console.log(ctx.request.url, ' : ', data);
      // eslint-disable-next-line no-unused-vars
      let initializeState: (mutableSnapshot: MutableSnapshot) => void;
      if (routerPath === '/content' && data.length > 0) {
        ctx.recoilInitData = data[0].data;
        initializeState = ({ set }: MutableSnapshot) => {
          set(contentState, data[0].data);
        };
      }
      resolve(
        <RecoilRoot initializeState={initializeState}>
          <StaticRouter location={ctx.request.url}>
            <h1>
              <Link to="/login">login</Link>
            </h1>
            <h1>
              <Link to="/content">content</Link>
            </h1>
            {Routes()}
          </StaticRouter>
        </RecoilRoot>,
      );
    });
  });
  return returnData;
};

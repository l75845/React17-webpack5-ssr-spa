import NotFound from '@components/NotFund';
import Login from '@pages/Login';
import React, { lazy, Suspense } from 'react';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import contentApi from 'web/services/contentApi';

const Content = lazy(
  () => import(/* webpackChunkName:"content" */ '@pages/Content'),
);

interface IRoutes extends RouteProps {
  routes?: Array<IRoutes>;
  title?: string;
  loadData?: Function;
}
export const firstRoutes: IRoutes[] = [
  {
    path: '/login',
    exact: true,
    title: 'login',
    component: Login,
  },
  {
    path: '/content',
    exact: true,
    title: 'content',
    component: Content,
    loadData: () => contentApi(),
  },
];

const Routes = (routes: IRoutes[] = firstRoutes) => (
  <Suspense fallback={<div>loading</div>}>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/login" />} />
      {routes.map((route, index) => {
        const { path, exact, component, title } = route;
        const LazyCom = component;
        const key = index;
        return (
          <Route
            key={key}
            path={path}
            exact={exact}
            render={(props) => (
              <>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>{title}</title>
                </Helmet>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <LazyCom {...props} />
              </>
            )}
          />
        );
      })}
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;

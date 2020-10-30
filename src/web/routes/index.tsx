import NotFound from '@components/NotFund';
import Login from '@pages/Login';
import React, { lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  RouteProps,
  Redirect,
} from 'react-router-dom';
import uuid = require('uuid');
// const { lazy, Suspense } = React;
// import Content from '@pages/Content';
// import TestSwiper from '@pages/TestSwiper';

const Content = lazy(
  () => import(/* webpackChunkName:"content" */ '@pages/Content'),
);

// const TestSwiper = lazy(
//   () => import(/* webpackChunkName:"testSwiper"*/ '@pages/TestSwiper')
// );

interface IRoutes extends RouteProps {
  routes?: Array<IRoutes>;
}
export const firstRoutes: IRoutes[] = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/content',
    exact: true,
    component: Content,
  },
];

const Routes = (routes: IRoutes[] = firstRoutes) => (
  <Suspense fallback={<div>loading</div>}>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/login" />} />
      {routes.map((route) => {
        const { path, exact, component } = route;
        const LazyCom = component;
        return (
          <Route
            key={uuid.v4()}
            path={path}
            exact={exact}
            // eslint-disable-next-line react/jsx-props-no-spreading
            render={(props) => <LazyCom {...props} />}
          />
        );
      })}
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;

import NotFound from '@components/NotFund';
import Login from '@pages/Login';
import React from 'react';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import Content from '@pages/Content';
import TestSwiper from '@pages/TestSwiper';

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
  {
    path: '/test',
    exact: true,
    component: TestSwiper,
  },
];

const Routes = (routes: IRoutes[] = firstRoutes) => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/login" />} />
    {routes.map((route, index) => {
      const { path, exact, component } = route;
      const LazyCom = component;
      return (
        <Route
          key={index}
          path={path}
          exact={exact}
          render={(props) => <LazyCom {...props} />}
        />
      );
    })}
    <Route component={NotFound} />
  </Switch>
);

export default Routes;

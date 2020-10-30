import NotFound from '@components/NotFund';
import Login from '@pages/Login';
import React from 'react';
import {
  Route, Switch, RouteProps, Redirect,
} from 'react-router-dom';
import Content from '@pages/Content';
import uuid = require('uuid');

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
);

export default Routes;

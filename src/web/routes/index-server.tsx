import NotFound from '@components/NotFund';
import Login from '@pages/Login';
import React from 'react';
import {
  Route, Switch, RouteProps, Redirect,
} from 'react-router-dom';
import Content from '@pages/Content';

interface IRoutes extends RouteProps {
  routes?: Array<IRoutes>;
  title?:string;
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
  },
];

const Routes = (routes: IRoutes[] = firstRoutes) => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/login" />} />
    {routes.map((route, index) => {
      const {
        path, exact, component,
      } = route;
      const LazyCom = component;
      const key = `${new Date().getTime()}${index}`;
      return (
        <Route
          key={key}
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

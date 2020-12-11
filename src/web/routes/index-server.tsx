import NotFound from '@components/NotFund';
import Login from '@pages/Login';
import React from 'react';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import Content from '@pages/Content';
import contentApi from 'web/services/contentApi';

interface IRoutes extends RouteProps {
  key: string;
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
    key: 'login',
  },
  {
    path: '/content',
    exact: true,
    title: 'content',
    component: Content,
    key: 'content',
    loadData: () => contentApi(),
  },
];

const Routes = (routes: IRoutes[] = firstRoutes) => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/login" />} />
    {routes.map((route) => {
      const { path, exact, component, key } = route;
      const LazyCom = component;
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

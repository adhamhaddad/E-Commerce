import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from '@hooks';
import HomePage from '@pages/home';
import AccountPage from '@pages/account';
import AboutPage from '@pages/about';
import DashboardPage from '@pages/dashboard';
import CartPage from '@pages/cart';
import OrdersPage from '@pages/orders';
import NotFoundPage from '@pages/404';
import NotAuthorizedPage from '@pages/401';

const Routes = ({ socket }) => {
  const { user } = useAuth();
  return (
    <>
      {(user.role === 'STORE_OWNER' || user.role === 'SUPER_ADMIN') && (
        <Switch>
          <Route path='/products' render={() => <HomePage socket={socket} />} />
          <Route path='/dashboard' component={DashboardPage} />
          <Route exact path='/account' component={AccountPage} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/orders' component={NotFoundPage} />
          <Route exact path='/cart' component={NotFoundPage} />
          <Route exact path='*' component={NotFoundPage} />
        </Switch>
      )}
      {user.role === 'CUSTOMER' && (
        <Switch>
          <Route path='/products' render={() => <HomePage socket={socket} />} />
          <Route path='/dashboard' component={NotAuthorizedPage} />
          <Route exact path='/account' component={AccountPage} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/orders' component={OrdersPage} />
          <Route exact path='/cart' component={CartPage} />
          <Route exact path='*' component={NotFoundPage} />
        </Switch>
      )}
    </>
  );
};

export default Routes;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from '@hooks';
import HomePage from '@pages/home';
import AccountPage from '@pages/account';
import AboutPage from '@pages/about';
import NotFoundPage from '@pages/notFound';
import DashboardPage from '@pages/dashboard';
import NotAuthorizedPage from '@pages/authority';
import CartPage from '@pages/cart';
import OrderPage from '@pages/orders';

const Routes = ({ socket }) => {
  const { user } = useAuth();
  return (
    <>
      {(user.role === 'STORE_OWNER' || user.role === 'SUPER_ADMIN') && (
        <Switch>
          <Route path='/products' render={() => <HomePage socket={socket} />} />
          <Route path='/dashboard' component={DashboardPage} />
          <Route exact path='/account' component={NotFoundPage} />
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
          <Route exact path='/orders' component={OrderPage} />
          <Route exact path='/cart' component={CartPage} />
          <Route exact path='*' component={NotFoundPage} />
        </Switch>
      )}
    </>
  );
};

export default Routes;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from '@hooks';
import HomePage from '@pages/home';
import ProductPage from '@pages/product';
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
    <Switch>
      {user && (
        <>
          {user.role === 'TENANT' && (
            <>
              {/* <Route exact path='/' component={HomePage} /> */}
              <Route
                // exact
                path='/products'
                render={() => <HomePage socket={socket} />}
              />
              <Route exact path='/product' component={ProductPage} />
              <Route exact path='/dashboard' component={DashboardPage} />
              <Route exact path='/account' component={NotFoundPage} />
              <Route exact path='/about' component={AboutPage} />
              <Route exact path='/orders' component={OrderPage} />
              <Route exact path='/cart' component={CartPage} />
              <Route exact path='/' component={NotFoundPage} />
            </>
          )}
          {user.role === 'CLIENT' && (
            <>
              {/* <Route exact path='/' component={HomePage} /> */}
              <Route
                // exact
                path='/products'
                render={() => <HomePage socket={socket} />}
              />
              <Route exact path='/product' component={ProductPage} />
              <Route exact path='/dashboard' component={NotAuthorizedPage} />
              <Route exact path='/account' component={AccountPage} />
              <Route exact path='/about' component={AboutPage} />
              <Route exact path='/orders' component={OrderPage} />
              <Route exact path='/cart' component={CartPage} />
              <Route exact path='/' component={NotFoundPage} />
            </>
          )}
        </>
      )}
    </Switch>
  );
};

export default Routes;

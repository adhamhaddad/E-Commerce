import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import HomePage from '../pages/home';
import AccountPage from '../pages/account';
import AboutPage from '../pages/about';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import NotFoundPage from '../pages/notFound';
import DashboardPage from '../pages/dashboard';
import NotAuthorizedPage from '../pages/authority';
import CartPage from '../pages/cart';
import OrderPage from '../pages/orders';
import Header from '../components/common/header';

const Routes = ({ socket }) => {
  const { isLogged, user } = useAuth();
  return (
    <Switch>
      {user && (
        <>
          <Header />
          {user.role === 'TENANT' && (
            <>
              <Route
                // exact
                path='/products'
                render={() => <HomePage socket={socket} />}
              />
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
              <Route
                // exact
                path='/products'
                render={() => <HomePage socket={socket} />}
              />
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
      {!user && (
        <>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='*' render={() => <Redirect exact to='/login' />} />
        </>
      )}
    </Switch>
  );
};

export default Routes;

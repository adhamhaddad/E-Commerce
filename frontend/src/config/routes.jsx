import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import AccountPage from '../pages/account';
import AboutPage from '../pages/about';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import NotFoundPage from '../pages/notFound';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/login' component={LoginPage} />
    <Route exact path='/register' component={RegisterPage} />
    <Route exact path='/account' component={AccountPage} />
    <Route exact path='/about' component={AboutPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;

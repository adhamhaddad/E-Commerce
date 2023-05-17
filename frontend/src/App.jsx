import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from '@hooks';
import { connect } from 'socket.io-client';
import Header from '@common/header';
import Main from '@common/main';
import RegisterPage from '@pages/register';
import LoginPage from '@pages/login';

const socket = connect('http://localhost:8000');
const App = () => {
  const { isLogged, user } = useAuth();
  return user ? (
    <>
      <Header />
      <Switch>
        <Route path='/login' exact>
          <Redirect to='/products' />
        </Route>
        <Route path='/register' exact>
          <Redirect to='/products' />
        </Route>
        <Route path='/'>
          <Main socket={socket} />
        </Route>
      </Switch>
    </>
  ) : (
    <>
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/register' component={RegisterPage} />
      <Route exact path='*' render={() => <Redirect exact to='/login' />} />
    </>
  );
};

export default App;

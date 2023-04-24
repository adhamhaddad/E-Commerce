import React, { useState, createContext } from 'react';
import axios from 'axios';

export const authContext = createContext({
  user: '',
  login: (email, password) => {},
  logout: () => {}
});

const AuthContext = ({ children }) => {
  const { isLoading, isError, sendRequest } = useHttp();
  const [user, setUser] = useState({
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token'),
    isLogged: localStorage.getItem('isLogged')
  });

  const login = (email, password) => {
    const body = {
      email,
      password
    };
    // sendRequest('/auth', { method: 'POST', body: body }, (res) => {
    //   if (res.status) {
    //     localStorage.setItem('id', res.data.id);
    //     localStorage.setItem('token', res.data.token);
    //     localStorage.setItem('isLogged', true);
    //   }
    // });
  };
  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('isLogged');
  };
  const value = {
    user,
    login,
    logout
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
export default AuthContext;

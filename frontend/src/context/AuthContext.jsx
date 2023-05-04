import React, { useState, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { api } from '../config';

const auth = {
  user: localStorage.getItem('user'),
  accessToken: null,
  refreshToken: null,
  loading: true,
  setLoading: () => {},
  register: () => {},
  login: () => {},
  logout: () => {}
};

export const AuthContext = createContext(auth);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.user && JSON.parse(auth.user));
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(auth.loading);

  const history = useHistory();

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken) {
        setLoading(true);
        await api
          .get('/auth/auth-me')
          .then(async (response) => {
            setLoading(false);
            const { user: userData, accessToken: AccessToken } = response.data;
            if (accessToken) {
              window.localStorage.setItem('user', JSON.stringify(userData));
              window.localStorage.setItem('accessToken', AccessToken);
            }
            setUser(userData);
            setAccessToken(AccessToken);
          })
          .catch(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            setUser(null);
            setAccessToken(null);
            setRefreshToken(null);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (params, errorCallback) => {
    try {
      const response = await api.post('/auth/login', params);
      // Extract user, accessToken, refreshToken from the response body
      const { user, accessToken, refreshToken } = response.data;

      // Store accessToken and refreshToken in state
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // Store user in state
      setUser(user);

      // Set user data in localStorage
      window.localStorage.setItem('user', JSON.stringify(user));
      // Set accessToken in localStorage
      window.localStorage.setItem('accessToken', accessToken);

      // Set refreshToken in cookies
      Cookies.set('refreshToken', refreshToken, {
        expires: 30,
        secure: true,
        sameSite: 'strict'
      });
      history.replace('/');
    } catch (err) {
      if (errorCallback) errorCallback(err);
    }
  };
  const handleRegister = async (params, errorCallback) => {
    try {
      const response = await api.post('/auth/register', body);
      // Extract accessToken from the response body
      const { accessToken } = response;
    } catch (err) {
      if (errorCallback) errorCallback(err);
    }
  };

  const handleLogout = () => {
    // Remove states
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    // Remove user data from localStorage
    window.localStorage.removeItem('user');
    // Remove accessToken from localStorage
    window.localStorage.removeItem('accessToken');
    // Remove refreshToken from cookies
    Cookies.remove('refreshToken', {
      expires: 30,
      secure: true,
      sameSite: 'strict'
    });
    history.replace('/login');
  };

  const values = {
    user: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
    loading: loading,
    setLoading: setLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthProvider;

import React, { useState, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useApi } from '../config';

const auth = {
  user: localStorage.getItem('user'),
  accessToken: null,
  refreshToken: null,
  isLogged: false,
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
  const { get, post } = useApi();

  const isLoggedIn = !!accessToken;

  const history = useHistory();

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken) {
        await get('/auth/auth-me')
          .then(async (response) => {
            const { user: userData, accessToken: AccessToken } = response.data;
            if (accessToken) {
              window.localStorage.setItem('user', JSON.stringify(userData));
              window.localStorage.setItem('accessToken', AccessToken);
            }
            setUser(userData);
            setAccessToken(AccessToken);
          })
          .catch(() => {
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('refreshToken');
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('cartItems');
            setUser(null);
            setAccessToken(null);
            setRefreshToken(null);
          });
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (params, errorCallback) => {
    try {
      const response = await post('/auth/login', params);
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
      history.replace('/products');
    } catch (err) {
      if (errorCallback) errorCallback(err);
    }
  };
  const handleRegister = async (params, errorCallback) => {
    try {
      const response = await post('/auth/register', params);
      if (response.data.error) {
        if (errorCallback) errorCallback(response.data.error);
      } else {
        handleLogin({ email: params.email, password: params.password });
      }
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
    // Remove cartItems from localStorage
    window.localStorage.removeItem('cartItems');
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
    isLogged: isLoggedIn,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthProvider;

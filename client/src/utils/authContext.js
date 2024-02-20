import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode as decode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  const getProfile = async () => {
    const token = await getToken();
    if (token) {
      const profile = decode(token);
      return profile;
    }
    return null;
  };

  const loggedIn = async () => {
    const token = await getToken();
    return token && !(await isTokenExpired(token)) ? true : false;
  };

  const isTokenExpired = (token) => {
    const decoded = decode(token);
    if (decoded.exp < (Date.now()/1000)) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  };

  const getToken = () => {
    const token = localStorage.getItem('id_token');
    return (token);
  };

  const login = (idToken) => {
    try {
      // Try to decode the token. If it's not valid, an error will be thrown
      decode(idToken);
      localStorage.setItem('id_token', idToken);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Invalid token', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('id_token');
  };

  const isAdmin = async () => {
    const token = await getToken();
    if (token) {
      const decoded = decode(token);
      if (decoded.data.role === 'admin') {
        setAdmin(true);
      };
    }
  };

  useEffect(() => {
    isAdmin();
  },);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, admin, setAdmin, getProfile, loggedIn, isTokenExpired, getToken, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
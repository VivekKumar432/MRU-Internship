import React, { createContext, useState, useEffect, useContext } from 'react';
import { register, login, getUser } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      getUser(token).then((data) => setUser(data));
    }
  }, [token]);

  const registerUser = async (userData) => {
    const data = await register(userData);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      getUser(data.token).then((data) => setUser(data));
    }
  };

  const loginUser = async (userData) => {
    const data = await login(userData);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      getUser(data.token).then((data) => setUser(data));
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

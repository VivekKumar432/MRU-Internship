import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};

export const getUser = async (token) => {
  const res = await axios.get(`${API_URL}/users`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return res.data;
};

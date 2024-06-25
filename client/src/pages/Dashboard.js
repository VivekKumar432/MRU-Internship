import React from 'react';
import { useAuth } from '../context/AuthContext';


const Dashboard = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.name}</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Route, Navigate, Router } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard">
          {user ? <Dashboard /> : <Navigate to="/login" />}
        </Route>
        <Navigate from="/" to="/login" />
      </Router>
    </div>
  );
}

export default App;
 

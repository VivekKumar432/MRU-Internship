// client/src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/users/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(response.data);
                } catch (error) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            };
            fetchUser();
        } else {
            setUser(null);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <Router>
            <NavBar user={user} handleSignOut={handleSignOut} />
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn setUser={setUser} />} />
                <Route path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
                <Route path="/admin" element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/signin" />} />
            </Routes>
        </Router>
    );
};

const Home = () => <h1>Home</h1>; // Placeholder for home page content
const AdminDashboard = () => <h1>Admin Dashboard</h1>; // Placeholder for admin dashboard content

export default App;

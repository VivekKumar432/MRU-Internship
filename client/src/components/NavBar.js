// client/src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user, handleSignOut }) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {user && user.isAdmin && <li><Link to="/admin">Admin Dashboard</Link></li>}
                {!user && <li><Link to="/signup">Sign Up</Link></li>}
                {!user && <li><Link to="/signin">Sign In</Link></li>}
                {user && <li><button onClick={handleSignOut}>Sign Out</button></li>}
            </ul>
        </nav>
    );
};

export default NavBar;

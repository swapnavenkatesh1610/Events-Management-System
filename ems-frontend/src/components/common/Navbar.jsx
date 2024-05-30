import React from 'react';
import UserService from '../service/UserService';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css'; // Ensure this points to the correct path


const Navbar = () => {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            navigate('/login'); // Redirect to login page after logout
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        )}
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/events">Events</Link>
                            </li>
                        )}
                        {isAuthenticated && isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link"to="/admin/user-management">Admin Page</Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

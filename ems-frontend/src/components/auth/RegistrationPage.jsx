import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css'; // Ensure this points to the correct path
import registerImage from '../assets/register.jpg'; // Adjusted import statement

function RegistrationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'email') {
            validateEmail(value);
        }
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError) {
            return;
        }
        try {
            // Register user with only name, email, and password
            const response = await UserService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (response.statusCode === 200) {
                setFormData({
                    name: '',
                    email: '',
                    password: ''
                });
                alert('User registered successfully');
                navigate('/login');
            } else if (response.statusCode === 400) {
                setError(response.message); // Display error message returned from backend
            } else {
                alert('An error occurred while registering user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div>
            <div style={{
                backgroundImage: `url(${registerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="auth-container" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '20px',
                    borderRadius: '5px'
                }}>
                    <h2>Registration</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="form-control"
                            />
                            {emailError && <span className="text-danger">{emailError}</span>}
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={emailError !== ''}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;

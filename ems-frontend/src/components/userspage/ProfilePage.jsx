import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';
import '../styles.css'; 


function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="profile-page-container">
            <h2>Profile Information</h2>
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            {profileInfo.role === "ADMIN" && (
                <Link to={`/update-user/${profileInfo.id}`} className="mixed-color-button">Update This Profile</Link>
            )}
        </div>
    );
}

export default ProfilePage;

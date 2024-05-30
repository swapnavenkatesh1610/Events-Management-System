// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import AddEventComponent from './components/EventsPage/AddEventComponent';
import ListEventComponent from './components/EventsPage/ListEventComponent';
import EventService from './components/service/EventService';
function App() {

  return (
    <BrowserRouter>
      <div className="App">
      <Navbar />
        <div className="content">
          <Routes>
            <Route path="/register" element={<RegistrationPage />} />
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/" element={<ListEventComponent eventService={EventService} />} />
                <Route path="/events" element={<ListEventComponent eventService={EventService} />} />
                <Route path="/add-event" element={<AddEventComponent eventService={EventService} />} />
                <Route path="/edit-event/:id" element={<AddEventComponent eventService={EventService} />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />‰
          </Routes>
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  return (
    <div className="user-management-container">
      <h2>Users Page</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;

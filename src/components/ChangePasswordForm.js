'use client'
import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/change_password/', data);
      console.log(response.data); // Handle the response data accordingly
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="oldPassword">Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePasswordForm;
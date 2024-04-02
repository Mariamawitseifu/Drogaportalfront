"use client"
import React, { useState } from 'react';
import Link from 'next/link';

function Userpass() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'oldPassword') {
      setOldPassword(e.target.value);
    } else if (e.target.name === 'newPassword') { // Corrected typo here
      setNewPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the request body
    const requestBody = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    try {
      // Make the API request with the token
      const response = await fetch('http://127.0.0.1:8000/api/change_password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`, // Include the token in the request headers
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setError('');
      } else if (response.status === 401) {
        setError('Unauthorized: Please make sure you are logged in.');
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request.');
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: 'yellow', padding: '20px', borderRadius: '5px', position: 'relative' }}>
        <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Change Password</h2>
        <Link legacyBehavior href="/home">
        <a
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          x
        </a>
        </Link>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Old Password:</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={handleChange}
              style={{ border: '1px solid black', padding: '5px', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleChange}
              style={{ border: '1px solid black', padding: '5px', width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: 'black', color: 'white', padding: '4px', borderRadius: '5px', border: 'none' }} type="submit">Change Password</button>
        </div>
        </form>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
      </div>
    </div>
  );
}
export default Userpass;

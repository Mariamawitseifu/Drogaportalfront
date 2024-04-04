'use client'
import axios from 'axios';
import React, { useState,useEffect } from 'react';
// import fetch from 'isomorphic-unfetch';
// import fetch from 'unfetch';
export default function Registration() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [email, setEmail] = useState('');
 const [isDropdownOpen, setDropdownOpen] = useState(false);
 const [role, setRole] = useState('');
 const [error, setError] = useState('');
 const [users, setUsers] = useState([]);
 const [successMessage, setSuccessMessage] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 
const deleteUser = async (username) => {
 try {
  console.log(`Attempting to delete user with username: ${username}`);
  await fetch(`http://127.0.0.1:8000/api/users/?username=${username}`, {
    method: 'DELETE',
  });
  console.log(`User with username: ${username} has been deleted successfully.`);
  // Remove the deleted user from the users state
  setUsers(users.filter((user) => user.username !== username));
 } catch (error) {
  console.error('Error:', error);
  // Handle the error, e.g., display an error message to the user
 }
};



useEffect(() => {
  fetch('http://127.0.0.1:8000/api/users/')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error fetching users');
      }
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Data is not an array:', data);
      }
    })
    .catch((error) => console.error('Error:', error));
}, []);
 
 const handleSubmit = async (e) => {
  e.preventDefault();
 
  const user = {
   username: username,
   password: password,
   email: email,
   role: role,
  };
 
  console.log('User object:', user);
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  try {
    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(user)
    });
 
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
 
    if (response.ok) {
      const data = await response.json(); 
      console.log('Response data:', data);
      setSuccessMessage('Registration successful');
    } else {
      const error = await response.json(); 
      throw error;
    }
 
  }
  catch (error) {
    console.error('Error:', error);
   
    setErrorMessage(error?.message || 'An error occurred during registration');
   
    if (error?.response) {
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status); 
      console.log('Response headers:', error.response.headers);
    } else {
      console.log('Error message:', error?.message || 'No error details available');
    }
   }
   
 };

 useEffect(() => {
  axios
    .get('http://127.0.0.1:8000/api/users/')
    .then((response) => {
      const data = response.data;
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Data is not an array:', data);
      }
    })
    .catch((error) => console.error('Error:', error));
}, []);
 
 const toggleDropdown = () => {
   setDropdownOpen(!isDropdownOpen);
 };
  return (
    <>

<form onSubmit={handleSubmit}>
        <div className="flex text-lg gap-3 p-8 flex-col">
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
       

        <div className="flex">
          <h1 className="mr-2">Role:</h1>

          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py- text-sm bg-dro_white font-medium focus:outline-none"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
               {role ? role : 'Select'}
                <svg
                  className="-mr-1 ml-2 h-5 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

{isDropdownOpen && (
 <div
   className="origin-top-right absolute z-30 bg-dro_white right- mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
   <div
     className="py-1 flex flex-col bg-white"
     role="menu"
     aria-orientation="vertical"
     aria-labelledby="options-menu"
   >
<a
 href="#"
 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
 role="menuitem"
 onClick={() => {
   setRole('Admin');
   console.log('Selected role: Admin');
 }}
>
 Admin
</a>

     <a
       href="#"
       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
       role="menuitem"
       onClick={() => setRole('Manager')}
     >
       Manager
     </a>
     <a
       href="#"
       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
       role="menuitem"
       onClick={() => setRole('Graphicsdesigner')}
     >
       Graphic Design
     </a>
     <a
       href="#"
       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
       role="menuitem"
       onClick={() => setRole('User')}
     >
       User
     </a>
   </div>
 </div>
)}
        <button type="submit" className=" bg-dro_green p-1 mt-4 rounded">
          Register
        </button>
        </div></div></div>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <table className=" m-7 text-lg">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th> {/* Note: Displaying the password like this is not recommended in a real application */}
            </tr>
          </thead>
          <tbody style={{margin:'20px'}}>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                {/* <td>{user.password}</td> */}
                <button onClick={() => deleteUser(user.username)}>Delete</button>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
}
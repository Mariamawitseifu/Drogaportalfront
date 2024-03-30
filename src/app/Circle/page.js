'use client';
import Link from 'next/link';
import Popup from "reactjs-popup";
import {useState, useEffect ,useRef} from "react";
import axios from "axios";
import Homepage from '../page';
import Image from 'next/image';


export default function Circle () {
  const [user, setUser] = useState(null)
  const [isOpeen,setIsOpeen]=useState(null)

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
  
    await axios.post("http://127.0.0.1:8000/api/logout/", null, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

      localStorage.removeItem("token");
      console.log("Token removed from local storage");
  
      localStorage.removeItem("user");
      console.log("User removed from local storage");
  
      window.location.href = "/homepage";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
    const [username, setUsername] = useState(null);
    useEffect(() => {
        const storedUsername = localStorage.getItem('username'); // Fetch the username from local storage
        const storedEmail = localStorage.getItem('email');
        if (storedUsername) {
          setUser({ username: storedUsername, email: storedEmail }); // Set the user state with the fetched username
        } else {
          console.error('Username is not found in local storage');
          // handle the error
        }
       }, []);
       
  const handleClickP = () => {
    setIsOpeen(!isOpeen);
  };
return( 
  <>
  <div>
  <Popup
    trigger={
    <button className="flex h-10 w-10 ml-6 items-center justify-center rounded-full bg-dro_white border-dro_black font-semibold text-xl">{user && user.username[0].toUpperCase()}</button>
  }
    position="bottom right"
  >
<div className="w-64 h-50 bg-dro_white shadow-lg flex flex-col items-center py-3">
      <h3 className="text-lg mt-3 font-bold"> 
      {user && user.username}
      </h3>
      <h3 className="text-xs mb-3">{user && user.email}</h3>
      <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center">
      <Image src="/lock.png" alt="Lock icon" width={20} height={20} />
      <button className="hover:bg-dro_gray font-medium py-2 px-4" onClick={handleClickP}>
      <Link legacyBehavior href="/Passwordchange">
      <a> Change Password</a>
      </Link>
      </button> 
      </div>
      <div className="flex flex-row mr-24 ml-3 items-center justify-center">
      <Image src="/log.png" alt="Log icon" width={20} height={20} />
        <button className="hover:bg-dro_gray font-medium py-2 px-4" onClick={handleLogout}>
          Log Out
        </button>
        </div>
        </div>
        </div>
        </Popup>
        </div>
    </>
)
}
'use client';
import Link from 'next/link';
import Popup from "reactjs-popup";
import {useState, useEffect ,useRef} from "react";
import axios from "axios";
import Homepage from '../page';
import Image from 'next/image';
import { sessionStatus } from '@/utils/Auth';
// import { redirect } from 'next/navigation';

// function ProtectedRoute({ children }) {
//   const { authenticated } = useAuth();

//   if(!authenticated) {
//     return <Redirect to="/" />
//   }

//   return <>{children}</>
// }

import { isAuthenticated } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";


const Circle = () => {
useLayoutEffect(() => {
   const isAuth = isAuthenticated;
   if(!isAuth){
      redirect('/')
   }
}, [])

// export default function Circle () {
  const [user, setUser] = useState(null)
  const [isOpeen,setIsOpeen]=useState(null)


    // useEffect(() => {
    //   const session = sessionStatus;
    //   if(!session){
    //     redirect("/")
    //   }
    // }, [])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
  
      await axios.post("http://127.0.0.1:8000/api/logout/", null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      // Clearing all user-related data from local storage
      localStorage.removeItem("token");
      console.log("Token removed from local storage");
  
      localStorage.removeItem("user");
      console.log("User removed from local storage");
  
      localStorage.removeItem("username"); // Assuming this stores the username
      console.log("Username removed from local storage");
  
      localStorage.removeItem("email"); // Assuming this stores the email
      console.log("Email removed from local storage");
  
      // Adding removal of new items
      localStorage.removeItem("blogID"); // Assuming this stores the blog ID
      console.log("Blog ID removed from local storage");
  
      localStorage.removeItem("blogs"); // Assuming this stores blog data
      console.log("Blogs removed from local storage");
  
      localStorage.removeItem("role"); // Assuming this stores the user role
      console.log("Role removed from local storage");
  
      window.location.href = "/";
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
      <Link legacyBehavior href="/passwordchange">
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
export default Circle;
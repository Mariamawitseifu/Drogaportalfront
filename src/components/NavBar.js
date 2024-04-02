'use client';
import Link from 'next/link';
import Image from 'next/image';
import Notification from './Notification';
import Popup from "reactjs-popup";
import { useState, useEffect ,useRef} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Quicklinks from './QuickLinks';
import Filter from './Filter';
import Circle from '@/app/circle/page';
// import Quicklinks from '@/app/quicklinks/page.js';

export default function Navbar() {
const [modalOpen, setModalOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [results, setResults] = useState([]);

 const handleSearch = async () => {
   try {
     const response = await axios.get('http://127.0.0.1:8000/api1/search/', {
       params: { query: searchQuery },
     });
     setResults(response.data.posts);
   } catch (error) {
     console.error('Error searching:', error);
   }
 };

  const [user, setUser] = useState(null)
  const [isOpeen, setIsOpeen] = useState(false);
  const [isOpened, setIsOpened]=useState(false);
  const passRef = useRef(null);
  const handleToggle = () => {
    setIsOpened((prevState) => !prevState);
  };

  
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (passRef.current && !passRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popRef.current && !popRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
      window.location.href = "http://localhost:3000";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const popupRef = useRef(null);
  const popRef = useRef(null);
  useEffect(() => {

const user = Cookies.get("user");
console.log("User value:", user);
if (user !== undefined) {
  try {
    setUser(JSON.parse(user));
  } catch (error) {
    // Handle the case where the value is not valid JSON
    console.error("Invalid JSON:", error);
  }
}

    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
    console.log(user) 
  }, []);


  
  function Buttons({ children }) {
    return (
      <button className="hover:bg-dro_yellow border bg-dro_white py-3 md:py-4 lg:py-5 px-4 md:px-8">
        {children}
      </button>
    );
  }


  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  }; 

  
const fetchData = async () => {
  try {
    const response = await axios.get('/api/your-endpoint');
    console.log(response.data); // Process the response data as needed
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleFetchData = () => {
  fetchData();
};
const handlePost = () => {
  // update state 
}
  return (
    <>
<div className="relative lg:w-auto bg-dro_yellow md:py-8 sm:py-1">
  <header className="text-dro_black body-font relative z-20">
    <div className=" mx-auto flex flex-wrap md:flex-nowrap lg:gap-72 md:flex-col lg:flex-row items-center">
      <div className="flex flex-row px-4 md:px-8 py-1">
      <Link href="/home">
      <Image
        className="w-16 h-14 md:w-20 md:h-16 lg:w-24 lg:h-20"
        src="/Droga.jpg"
        alt="droga logo"
        width={160}
        height={14}
      />
      </Link>
        <h1 className="px-3 font-medium md:text-lg sm:text-base lg:text-4xl">
          Droga Group <span className="font-semibold animate-pulse">Portal</span>
        </h1>
      </div>
      <div className="flex title-font font-medium items-center mx-auto md:my-0">
  <nav className="flex flex-row lg:space-x-16 sm:space-x-9 space-x-8 md:space-x-12 w-full bg-dro_yellow px-4 items-center text-base" >
    <div className="flex space-x-4 md:text-base">
      <Quicklinks />
    </div>
    <Link legacyBehavior href="/userguide">
      <a className="font-semibold text-base lg:text-lg">Portal User Guide</a>
    </Link>
    <ul>
      <li style={{ position: "relative" }}>
        <Notification />
      </li>
    </ul>
    <Filter />
    <>
      <Circle />
    </>
  </nav>
</div>
           </div>
        </header>
      </div>
    </>
  )
}

     
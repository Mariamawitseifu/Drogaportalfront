"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/NavBar";
import { useState, useEffect ,useRef} from "react";
import Footer from "@/components/Footer";
import Endfooter from "@/components/Endfooter";
import { isAuthenticated } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import Drogaceo from "../drogaceo/page";

const Ceopage = () => {
useLayoutEffect(() => {
   const isAuth = isAuthenticated;
   if(!isAuth){
      redirect('/')
   }
}, [])
// export default function Ceopage (){
   const router = useRouter();

   const handleClickG = () => {
     router.push('/galleryceo');
   };
   const [typewriterText, setTypewriterText] = useState('');

   useEffect(() => {
    const text = 'Group CEO';
    let i = 0;
    let interval = null;
  
    const startTyping = () => {
      interval = setInterval(() => {
        setTypewriterText(prevText => {
          if (i < text.length) {
            return text.slice(0, i + 1);
          } else {
            return prevText.slice(0, -1);
          }
        });
  
        i++;
  
        if (i > text.length * 2) {
          clearInterval(interval);
          setTimeout(() => {
            i = 0;
            startTyping(); // Restart the typewriter effect
          }, 1000); // Delay before restarting the effect (1 second in this example)
        }
      }, 500);
    };
  
    startTyping();
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  return<>
  <div>
        <div>
     <Navbar/>         
        </div>
        <div className="relative h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] 2xl:h-[400px]">
 <Image
 src="/drogaceo.jpg"
 className="absolute inset-0 w-full h-full object-cover"
 alt="Groupceo"
 width={4000}
 height={400}
 />
 <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-typewriter">
 <span className="typewriter">{typewriterText}</span>
 </h1>
</div>
  </div>
 <div className=" px-40 py-10 center-component">
  <Drogaceo/>
 </div>
  <div>
  <button className=" font-semibold text-2xl py-10 px-8 animate-bounce"onClick={handleClickG}> Picture Gallery
  </button>
  </div>
  <Footer/>
  <Endfooter/>
  </>
}
export default Ceopage;
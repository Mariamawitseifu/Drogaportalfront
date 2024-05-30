'use client'
import Image from "next/image"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/NavBar";
import 'tailwindcss/tailwind.css';
import { useState, useEffect ,useRef, useLayoutEffect} from "react";
import Footer from "@/components/Footer";
import Endfooter from "@/components/Endfooter";
import Gallerypyhsio from '../gallerypyshio/page';
import { isAuthenticated } from "@/utils/Auth";
import { redirect } from "next/navigation";


const Drogapyhsio = () => {
  useLayoutEffect(() => {
    const isAuth = isAuthenticated;
    if(!isAuth){
        redirect('/')
    }
  }, []);
   const router = useRouter();
   const handleClickG = () => {
     router.push('/gallerypyshio');
   };
   const [typewriterText, setTypewriterText] = useState('');

   useEffect(() => {
    const text = 'Droga Pyshiotherapy';
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
          }, 600); // Delay before restarting the effect (1 second in this example)
        }
      }, 100);
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
 src="/test5.jpg"
 className="absolute inset-0 w-full h-full object-cover"
 width={4000}
 height={400}
 alt="droga physio"
 />
 <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-typewriter">
 <span className="typewriter">{typewriterText}</span>
 </h1>
</div>
  </div>
  
  <div className="flex flex-wrap py-28 gap-60 px-80">
        <div  className=" flex flex-row gap-3">
        <div className="w-1/2 py-10 px-4">
     <div className="flex items-center">
       <div className=" flex flex-row"> 
        <div>
         <Image 
         src= "/www.png"
         height={50} 
         width={50}
         alt="website"/>
  <h1 className="">
  Website
  </h1>     
        </div>
  </div> 
     </div>
     <div className="flex items-center">
       <div className=" flex flex-row">
        <div>
         <Image src="/itwitter.png" height={50} width={50} alt="twitter">
  </Image> 
  <h1 className="">
  Twitter
  </h1>     
        </div>
  </div> 
     </div>
     <div className="flex items-center">
       <div className=" flex flex-row">
        <div>
         <Image src="/ifb.png" height={50} width={50} alt="fb">
  </Image> 
  <h1 className="">
  Facebook
  </h1>     
        </div>
  
  </div> 
     </div>
  <div>
     <div className="flex items-center">
       <div className=" flex flex-row">
        <div>
         <Image src="/ilinkedin.png" height={50} width={50} alt="linkedin">
  </Image> 
  <h1 className="">
  LinkedIn
  </h1>     
        </div>
  
  </div> 
     </div>
     </div>
     </div>
     <div className="px-">
     <div className="  py-14">
   <a href='https://drogaphysiotherapy.com/' className="underline"> https://drogaphysiotherapy.com/</a>  
  </div>
     <div className="">
   <a className="underline"> https://twitter.com/DrogaPharm63360</a>  
  </div>
     <div className=" py-12">
   <a href='https://www.facebook.com/drogaphysiotherapy/' className="underline">https://www.facebook.com/drogaphysiotherapy/</a>  
  </div>
     <div className=" py-4">
   <a href='https://www.linkedin.com/in/droga-physiotherapy-clinic-314b31186/?trk=people_directory&originalSubdomain=et' className="underline">https://www.linkedin.com/in/droga-physiotherapy-clinic</a>  
  </div>
     </div>       
        </div>
  
  <div  className=" flex flex-row px-5 gap-3">
         <div className="w-1/2 py-10 px-4">
     <div className="flex items-center">
       <div className=" flex flex-row">
        <div>
         <Image src="/deskphone.png" height={50} width={50} alt="deskphone">
  </Image> 
  <h1 className="">
  DeskPhone
  </h1>     
        </div>
  
  </div> 
     </div>
     <div className="flex items-center">
       <div className=" flex flex-row">
        <div>
         <Image src="/telegram.png" height={50} width={50} alt="telegram">
  </Image> 
  <h1 className="">
  Telegram
  </h1>     
        </div>
  
  </div> 
     </div>
     <div className="flex items-center">
       <div className=" flex flex-row">
        <div>
         <Image src="/whatsappblue.png" height={50} width={50} alt="whatsapp">
  </Image> 
  <h1 className="">
  Whatsapp
  </h1>     
        </div>
  
  </div> 
     </div>
     <div className="flex items-center">
       <div className=" flex flex-row">
        <div>
         <Image src="/phoneblue.png" height={50} width={50} alt="whatsapp">
  </Image> 
  <h1 className="">
  Phone No
  </h1>     
        </div>
  
  </div>
  </div> 
     </div>
     <div className="px-">
     <div className=" py-14">
   <a className="underline">(+251)116687006</a>  
  </div>
  <div className=" py-2">
   <a className="underline">https:\\telegram\Ethiopharma</a>  
  </div>
  <div className=" py-12">
   <a className="underline">https:whatsapp\trustethiopharma</a>  
  </div>
  <div className=" py-">
   <a className="underline"> (+251)974959595</a>  
  </div>
     </div>  
  </div>
  
     </div>
  <div>
  <button className=" font-semibold text-2xl py-10 px-8 animate-bounce"onClick={handleClickG}> Picture Gallery
  </button>
  <Footer/>
  <Endfooter/>
  </div>
  </>

}
export default Drogapyhsio;
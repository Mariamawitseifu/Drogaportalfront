"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/NavBar";
import { useState, useEffect ,useRef} from "react";
import 'tailwindcss/tailwind.css';
import Footer from "@/components/Footer";
import Endfooter from "@/components/Endfooter";
// import gallerychain from '../gallerychain/page';
import Image from 'next/image';


export default function Chainpharmacy(){
   const [typewriterText, setTypewriterText] = useState('');

   useEffect(() => {
    const text = 'Droga Chainpharmacy';
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
   const router = useRouter();

   const handleClickG = () => {
     router.push('/gallerychain');
   };
   return<>
   <div>
         <div>
      <Navbar/>         
         </div>
         <div className="relative h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] 2xl:h-[400px]">
 <Image
 src="/image/test3.jpg"
 className="absolute inset-0 w-full h-full object-cover"
 alt="Groupceo"
 width={4000}
 height={400}
 />
 <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-typewriter">
 <span className="typewriter">{typewriterText}</span>
 </h1>
</div>
     <div className="flex flex-wrap py-28 gap-60 px-80">
        <div  className=" flex flex-row gap-3">
        <div className="w-1/2 py-10 px-4">
     <div className="flex items-center">
       <div className=" flex flex-row"> 
        <div>
         <Image 
         src= "/image/www.png"
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
         <Image src="/image/itwitter.png" height={50} width={50} alt='twitter image'>
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
         <Image src="/image/ifb.png" height={50} width={50} alt='facebook'>
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
         <Image src="/image/ilinkedin.png" height={50} width={50} alt='linkedin'>
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
   <a href='https://drogapharmacy.com/' className="underline"> https://drogapharmacy.com/</a>  
  </div>
     <div className="">
   <a href='https://twitter.com/DrogaPharm63360' className="underline">https://twitter.com/DrogaPharm63360</a>  
  </div>
     <div className=" py-12">
   <a href='https://www.facebook.com/profile.php?id=100093153377821' className="underline">https://www.facebook.com/profile</a>  
  </div>
     <div className=" py-4">
   <a href='https://www.linkedin.com/company/droga-pharmacies' className="underline">https://www.linkedin.com/company</a>  
  </div>
     </div>       
        </div>
  
  <div  className=" flex flex-row px-5 gap-3">
         <div className="w-1/2 py-10 px-4">
     <div className="flex items-center">
       <div className=" flex flex-row">
        <div>
         <Image src="/image/deskphone.png" height={50} width={50} alt='phone'>
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
         <Image src="/image/telegram.png" height={50} width={50} alt='telegram'>
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
         <Image src="/image/whatsappblue.png" height={50} width={50} alt='whatsapp'>
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
         <Image src="/image/phoneblue.png" height={50} width={50} alt='phone'>
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
   <a className="underline"> </a>  
  </div>
  <div className=" py-2">
   <a href='https://t.me/droga_pharmacies' className="underline">https://t.me/droga_pharmacies</a>  
  </div>
  <div className=" py-12">
   <a className="underline">https:whatsapp\trustethiopharma</a>  
  </div>
  <div className=" py-">
   <a className="underline"> +251965757515</a>  
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
   </div>
   </>
}
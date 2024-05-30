'use client'
import Image from "next/image"
import { isAuthenticated } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";


const Userguide = () => {
useLayoutEffect(() => {
   const isAuth = isAuthenticated;
   if(!isAuth){
      redirect('/')
   }
}, [])
// export default function Userguide(){
    return(        
<>
{/* style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }} */}
<Image src="/home.png" alt="userguide" layout="fill" objectFit="cover" />
</>
)}
export default Userguide;
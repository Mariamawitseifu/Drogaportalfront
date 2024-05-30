"use client"
import Image from "next/image";
import Link from 'next/link';
import { isAuthenticated } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";


const Droga = () => {
useLayoutEffect(() => {
   const isAuth = isAuthenticated;
   if(!isAuth){
      redirect('/')
   }
}, [])


// export default function Droga(){
return<>
<div>
<h1 className=" font-semibold text-4xl px-9 py-20 bg-dro_yellow">
   Droga Pharma
</h1>
</div>
<div className=" py-20 grid grid-cols-3 bg-dro_green">
<div className=" px-3 grid grid-cols-6 grid-rows-2 gap-1">
<Image src="/itwitter.png" width={50}height={50} alt="twitter">
</Image>
<Image src="/ifb.png" height={50} width={50} alt="fb">
</Image> 
<Image src="/igmail.png" height={50} width={50} alt="gmail">
</Image>
<Image src="/instagram.png" height={50} width={50} alt="insta">
</Image>
<Image src="/ilinkedin.png" height={50} width={50} alt="linkedin">
</Image> 
</div>
</div>
</>
};


export default Droga;
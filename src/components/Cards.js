// 'use client'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./slider.css";
// import { useRouter } from "next/navigation";
// import Image from 'next/image';


// function Cards() {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push('/blogs');
//   };
//   const handleClick1 = () => {
//     router.push('/chainpharmacy');
//   };

//   const handleClick2 = () => {
//     router.push('/drogapharma');
//   };

//   const handleClick3 = () => {
//     router.push('/emaethiopia');
//   };

//   const handleClick4 = () => {
//     router.push('/trustethio');
//   };

//   const handleClick5 = () => {
//     router.push('/drogapysio');
//   };

//   const handleClick6 = () => {
//     router.push('/drogasomaliland');
//   };

//   const handleClick7 = () => {
//     router.push('/drogarwanda');
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };


//     return (
//       <div className="slider-container">
//         <Slider {...settings}>
//         <div>
//           <button className="button" onClick={handleClick}>
//             <Image className=" rounded-md image" src="/image/henok.jpg" width={400} height={350} alt="Sunset in the mountains" />
//             <p className="caption">Group CEO</p>
//           </button>
//         </div>
//         <div>
//           <button className=" rounded-md button" onClick={handleClick2}>
//             <Image className="image" src="/image/i1.jpg" width={400} height={350} alt="Sunset in the mountains" />
//             <p className="caption">Droga Pharma</p>
//           </button>
//         </div>
//         <div>
//           <button className="button" onClick={handleClick3}>
//             <Image className="rounded-md  image" src="/image/i155.png" width={300} height={275} alt="Sunset in the mountains" />
//             <p className="caption">Ema Ethiopia</p>
//           </button>
//         </div>
//         <div>
//           <button className="button" onClick={handleClick4}>
//             <Image className="rounded-md  image" src="/image/i2.jpg" width={300} height={275} alt="Sunset in the mountains" />
//             <p className="caption">Trust Ethiopharma</p>
//           </button>
//         </div>
//         <div>
//           <button className="button" onClick={handleClick5}>
//             <Image className="rounded-md image" src="/image/i3.jpg" width={300} height={275} alt="Sunset in the mountains" />
//             <p className="caption">Droga pyshiotherapy</p>
//           </button>
//         </div>
//         <div>
//           <button className="button" onClick={handleClick1}>
//             <Image className="rounded-md image" src="/image/i4.jpg" width={300} height={275} alt="Sunset in the mountains" />
//             <p className="caption">Droga Chain Pharmacy</p>
//           </button>
//         </div>
//         <div>
//           <button className="button" onClick={handleClick6}>
//             <Image className="rounded-md image" src="/image/i5.jpg" width={300} height={275} alt="Sunset in the mountains" />
//             <p className="caption">Droga Somaliland</p>
//           </button>
//         </div>
//         <div>
//           <button className="button" onClick={handleClick7}>
//             <Image className="rounded-md image" src="/image/i6.jpg" width={300} height={275} alt="Sunset in the mountains" />
//             <p className="caption">Droga Rwanda</p>
//           </button>
//         </div>
//       </Slider>
//     </div>
//   );
// }

// export default (Cards);
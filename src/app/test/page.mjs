'use client'
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Faq from '@/components/Faq.js';
import Cookies from 'js-cookie';
import Image from 'next/image';



export default function Test({ visiblePosts }) {
  const [isOpen, setIsOpen] = useState(false);
  const titleInputRef = useRef(null);
  const bodyInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const cardRef = useRef(null);
  const popupRef = useRef(null);
  const [isOpenn, setIsOpenn] = useState(false);
  // const [token, setToken] = useState(localStorage.getItem('token'));
  const [visibleFaqs, setVisibleFaqs] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [postData, setPostData] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const selectedImageInputRef = useRef(null);
  const numFaqsPerPage = 5;


  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [role, setRole] = useState('');

  useEffect(() => {
   if (typeof window !== 'undefined') {
     const storedRole = window.localStorage.getItem('role');
     if (storedRole) {
       setRole(storedRole);
     }
   }
  }, []);
  
  useEffect(() => {
  }, [role]);
  
//  console.log(role);
  const isBrowser = typeof window !== 'undefined';
  
  const [token, setToken] = useState(isBrowser ? localStorage.getItem('token') : null);
  
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('blogs', JSON.stringify(blogs));
    }
  }, [blogs, isBrowser]);
   

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  const handlePost = async () => {
     
    const data = new FormData();
    data.append('title', titleInputRef.current.value);
    data.append('body', bodyInputRef.current.value);
    data.append('image', selectedImage);
    if (!token) return;

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api1/createpost/',
        data,
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
           },
        }
      );

      setPostData(response.data);

      handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
   };   

  const loadMoreFaqs = () => {
    setVisibleFaqs(visibleFaqs + numFaqsPerPage);
    setCurrentPage(currentPage + 1);
  };

  const numTotalFaqs = visiblePosts.length;
  const remainingFaqs = numTotalFaqs - visibleFaqs;
  const shouldDisplayLoadMore = remainingFaqs > 0;

  const lastPageNumFaqs = numTotalFaqs % numFaqsPerPage;
  const faqsToDisplay = currentPage === Math.ceil(numTotalFaqs / numFaqsPerPage)
    ? visiblePosts.slice(0, currentPage * numFaqsPerPage + lastPageNumFaqs)
    : visiblePosts.slice(0, currentPage * numFaqsPerPage);

  return (
    <>
{role === "manager" || role === 'superadmin' ? (
  <button className="bg-dro_green rounded-md mb-3 ml-3 text-2xl px-10 py-3" onClick={handleClick}>
    Add a new Blog
  </button>
) : null}

      {isOpen && (
        <Modal
          handlePost={handlePost}
          titleInputRef={titleInputRef}
          bodyInputRef={bodyInputRef}
          handleImageUpload={handleImageUpload}
          selectedImage={selectedImage}
          selectedImageInputRef={selectedImageInputRef}
          cardRef={cardRef}
          popupRef={popupRef}
          closeModal={closeModal}
        />
      )}

      {faqsToDisplay.map((blog) => (
        <Faq
          key={blog.id}
          postId={blog.id}
          title={blog.title}
          body={blog.body}
          author={blog.author}
          image={blog.image}
          published_date={blog.published_date}

        />
      ))}

      {shouldDisplayLoadMore && (
        <div className="flex justify-center mt-4">
          <button
            className="rectangle-button bg-dro_black text-dro_white px-4 py-2"
            onClick={loadMoreFaqs}
          >
            Load More
          </button>
        </div>
      )}

      {!shouldDisplayLoadMore && remainingFaqs > 0 && (
        <div className="flex justify-center mt-4">
          <button
            className="rectangle-button bg-dro_black text-dro_white px-4 py-2"
            onClick={loadMoreFaqs}
          >
            Show {remainingFaqs} More
          </button>
        </div>
      )}
    </>
  );
}


const Modal = ({
  handlePost,
  closeModal,
  titleInputRef,
  bodyInputRef,
  cardRef,
  popupRef,
  handleImageUpload,
  selectedImage,
  selectedImageInputRef,
}) => {
  const isBrowser = typeof window !== 'undefined';
  const token = isBrowser ? localStorage.getItem('token') : null;

  
  const handleSubmit = async () => {
    await handlePost();
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 grid place-items-center p-16 bg-dro_white bg-opacity-75 border-dro_gray blur-background backdrop-filter z-10"
      ref={popupRef}
    >
      <div
        ref={cardRef}
        className="md:w-full w-2/3 lg:w-2/3 lg:h-96 bg-dro_yellow shadow-lg flex flex-col justify-between"
      >
        <div className="">
          <div className="relative">
            <div className="card py-6 px-16">
              <label
                htmlFor="image-upload"
                className="upload-button bg-dro_white px-8 py-2 md:px-4 md:py-1"
              >
                Choose Image
                <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={selectedImageInputRef}
                />

              </label>
              {selectedImage && (
                <Image
                  className="absolute top-2 right-2"
                  src={selectedImage}
                  alt="Selected"
                  // style={{ maxWidth: '40px' }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-10 py-2 sm:h-80 w-full">
          <div className="px-10 h-11 w-full">
            <input
              ref={titleInputRef}
              className="h-10 w-full border py-3 border-dro_gray px-4 text-md text-dro_black resize-none"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="px-10 h-52">
            <textarea
              ref={bodyInputRef}
              className="h-full w-full border border-dro_gray px-4 text-md text-dro_black resize-none"
              type="text"
              placeholder="Write Your Blog Here"
            />
          </div>
          <div className="grid place-items-center pb-12 sm:flex-col md:flex-row lg:flex-row lg:pb-10">
            <button
              onClick={handleSubmit}
              className="bg-dro_green text-dro_white p-4 px-6 py-2"
            >
              POST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
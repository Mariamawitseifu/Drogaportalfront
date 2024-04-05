'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Button from "../components/Button";
import "../components/animation.css";
import Image from 'next/image';
import "aos/dist/aos.css";
import Aos from 'aos';
import { FiTrash2 } from 'react-icons/fi';
import format from 'date-fns/format';


export default function Faq({ title, body, author, image, published_date, visibleFaqs, postId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isOppen, setIsOpenn] = useState([]);
  const [post, setPost] = useState([]);
  const [entry, setEntry] = useState();
  const [loadMoreFaqs, setLoadMoreFaqs] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

function formatPublished_date(dateString) {
  const date = new Date(dateString)
  return format(date, 'dd MMM yyyy') 
}


const formattedDate = published_date.slice(0,10);
<p>{formattedDate}</p>
function formatDate(date) {
  return date.slice(0, 10);
}

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  
  const lastCardRef = useRef();
  const observer = useRef();

  useEffect(() => {
    let currentObserver;

    if (!observer.current) {
      currentObserver = new IntersectionObserver(handleIntersect);
      observer.current = currentObserver;
    } else {
      currentObserver = observer.current;
    }

    if (lastCardRef.current) {
      currentObserver.observe(lastCardRef.current);
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    const nextPage = Math.ceil(filteredPosts.length / 5) + 1;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api1/posts/?page=${nextPage}`);
      setFilteredPosts(prev => [...prev, ...response.data.results]);
    } catch (error) {
      console.error(error);
    }
    setLoadMoreFaqs(prev => !prev); // Toggle the loadMoreFaqs state
 }, [filteredPosts]);
//  console.log('Title:', title);

 // Example logging an object
//  console.log('Post:', post);
 

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClickload = () => {
    setIsOpenn(true);
  };

  const handleIntersect = useCallback(async (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      await handleLoadMore();
    }
 }, [handleLoadMore]);

  const deletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");

    setIsDeleteClicked(true);
    if(confirmDelete){
    try {
     const response = await axios.delete(`http://127.0.0.1:8000/api1/deleteposts/${postId}`);
     if (response.status === 204) {
       // If the server returns a 204 status, the post was deleted successfully
       // You can then update your state to remove the post from the list
       setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
     }
     window.location.reload();
    } catch (error) {
     console.error('Error:', error);
    } finally {
     setIsDeleteClicked(false);
    }
   };
  }
   useEffect(() => {
    if(isDeleteClicked) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      setIsDeleteClicked(false);
    }
  }, [isDeleteClicked, postId]); 
  return (
    <div
      data-aos="fade-up"
      data-te-animation-init
      data-te-animation-reset="true"
      data-te-animation="[slide-right_1s_ease-in-out]"
      className="animate-slide-right_1s_ease-in-out"
    >
      <div className="flex flex-col ">
        <div className="mb-12 sm:ml-8 lg:ml-3 sm:mr-4 lg:mr-3 bg-dro_yellow rounded shadow-lg">
          <div className="flex lg:flex-row sm:flex-row justify-end">
          <div className="w-full h-80 relative overflow-auto">
          <Image src={`http://127.0.0.1:8000/${image}`} alt='image' height={500} width={500} style={{objectFit: 'cover', objectPosition: 'center', height: '100%', width: '100%'}} />
</div>
            <div className="flex flex-col justify-center ml-24 w-full">
              <div className="font-bold sm:mt-3 text-xl sm:text-lg">{title}</div>
              <div className="text-md sm:text-sm font-medium"></div>
              <div className="sm:mb-3">
                {!isOpen && (
                  <button
                    className="rectangle-button float bg-dro_black inline-block px-4 py-2 mt-10 right-5 sm:mt-6 sm:py-2 text-dro_white"
                    onClick={handleClick}
                  >
                    See More
                  </button>
                )}
              </div>
              {isOpen && (
                <div style={{overflow: 'auto', maxHeight: '200px'}}>
                  <p>{body}</p>
                </div>
              )}
               {/* <p>{published_date}</p> 
                 */}
                 {/* <p>{formatDate(published_date)}</p> */}
                 <p>{formatPublished_date(published_date)}</p>
              <div className=' font-bold text-lg'>
                {author.username}
              </div>
              <div className="flex px-10 justify-end">
  <div className="flex-1"></div>

  <FiTrash2
    className="text-red-500 w-6 h-6"
    onClick={deletePost} 
  />
</div>   </div>
          </div>
        </div>

        {posts && posts.length > 0 && (
          <div>
{sortedFilteredPosts && sortedFilteredPosts.map((post, index) => (
 <div
 key={post.id}
 data-blog-id={post.id}
 ref={index === filteredPosts.length - 1 ? lastCardRef : null}
>
 <h2>{post.title}</h2>
 <p>{post.body}</p>
 <p>Author: {post.author.username}</p>
 <p>Published at: {post.published_date}</p>
</div>
))
}
          </div>
        )}
      </div>
    </div>
  );
}

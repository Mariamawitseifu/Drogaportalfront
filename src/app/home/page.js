'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/NavBar';
import Endfooter from '@/components/Endfooter';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Test from '../test/page.mjs';
import Cards from '@/components/Cards';

export default function Home({ title }) {
 const [visiblePosts, setVisiblePosts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const numVisiblePosts = 4;

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api1/posts?page=${currentPage}`);
      const data = await response.json();

      if (currentPage === 1) {
        setVisiblePosts(data);
      } else {
        setVisiblePosts(prevVisiblePosts => {
          const lastFetchedPage = prevVisiblePosts.length / numVisiblePosts;
          if (lastFetchedPage === currentPage - 1) {
            const uniqueIds = new Set(prevVisiblePosts.map(post => post.id));
            const newPosts = data.filter(post =>!uniqueIds.has(post.id));
            return [...prevVisiblePosts,...newPosts];
          } else {
            return data;
          }
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [currentPage]); // Removed fetchData from dependencies

 const handleLoadMoreClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
 };

 return (
    <div>
      <div className="scroll-smooth">
        <Navbar />
        <div className="flex flex-row absolute top-0 right-0 h-full w-full"></div>
      </div>

      <div className="py-52 px-5">
        <Cards />
      </div>

      <div className="">
        <div className="flex items-center justify-center">
          <h1 className="px-12 text-2xl font-semibold relative mb-12">
            Announcements and Blogs
          </h1>
        </div>
        <Test visiblePosts={[...visiblePosts].reverse()} />
      </div>
      <div className="mt-4">
        <Footer />
      </div>
      <div>
        <Endfooter />
      </div>
    </div>
 );
}

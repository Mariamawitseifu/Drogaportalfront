"use client"
import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const NewBlog = () => {
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/blog-posts/1/')
      .then(response => response.json())
      .then(data => setBlogPost(data))
      .catch(error => console.log(error));

  }, []);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  const { image, title, description } = blogPost || {};

  return (
    <div>
      <Image src={`data:image/jpeg;base64,${image}`} width={100} height={100} alt="Blog Post" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default NewBlog;
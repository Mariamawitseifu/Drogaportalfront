'use client'
import { useState, useEffect, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import Popup from 'reactjs-popup';
import Link from 'next/link';
// import Detail from '@/app/detail/[id].js';
import Blog from '@/app/blog/page';
import "./filter.css";
import { useRouter } from 'next/navigation';

const Filter = () => {
 const [query, setQuery] = useState('');
 const [results, setResults] = useState({post_results: [], record_results: []});
 const router = useRouter();
 const isHighlighted = useRef(false);

 

 useEffect(() => {
  if (router.isReady) {
  if (router.query) {
   const blogID = router.query.id;
   localStorage.setItem('blogID', blogID);
  }
  }
 }, [router.isReady, router.query]);
 
 useEffect(() => {
  // console.log('Query:', query);
 if (query.trim() !== '') {
  // Fetch search results from the API
  fetch(`http://127.0.0.1:8000/api1/api/search/?query=${query}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching search results');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); 
      console.log(results.post_results);// Log the data to inspect its structure
      if (data && data.post_results && data.record_results) {
        setResults({post_results: data.post_results, record_results: data.record_results});
      } else {
        console.error('Invalid data structure in the API response');
        setResults({post_results: [], record_results: []});
      }
    })
    .catch((error) => {
      console.error('Error fetching search results:', error);
      setResults({post_results: [], record_results: []});
    });
 } else {
  setResults({post_results: [], record_results: []});
 }
 }, [query]);

 const handleInputChange = (event) => {
 setQuery(event.target.value);
 };

 const handleKeyPress = (event) => {
 if (event.key === 'Enter') {
  // Start search when Enter key is pressed
  search();
 }
 };

 const search = () => {
 if (query.trim() !== '') {
  // Fetch search results from the API
  fetch(`http://127.0.0.1:8000/api1/api/search/?query=${query}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching search results');
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      console.log(results.record_results); // Log the data to inspect its structure
      if (data && data.post_results && data.record_results) {
        setResults({post_results: data.post_results, record_results: data.record_results});
      } else {
        console.error('Invalid data structure in the API response');
        setResults({post_results: [], record_results: []});
      }
    })
    .catch((error) => {
      console.error('Error fetching search results:', error);
      setResults({post_results: [], record_results: []});
    });
 } else {
  setResults({post_results: [], record_results: []});
 }
 };

 return (
  <div>
  <Popup
    className="wide-popup"
    position="bottom left"
    trigger={
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
        className="py-2 px-4 rounded-md border focus:outline-none bg-dro_white"
        style={{ width: '80%' }}
      />
    }
  >
    <div className=' bg-dro_white'>
      <ul>
        {results.post_results && results.post_results.map((result) => (
          <div style={{marginBottom: '1rem'}}  key={result.id}>
        <li>
            {/* Display the relevant data from the search results */}
            <Link href="/blog" as={`/blog`} onClick={() => localStorage.setItem('blogID', result.id)}>
              <Highlighter
                highlightClassName="Highlight"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={result.title}
              />
              <Highlighter
                highlightClassName="Highlight"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={result.body}
              />
            </Link>
          </li>
          </div>
        ))}
      </ul>
      <div style={{marginBottom: '1rem'}}></div>
      <ul>
        {results.record_results && results.record_results.map((result) => (
             <div style={{marginBottom: '1rem'}} key={result.id}>
<li onClick={() => isHighlighted.current = true} className={isHighlighted.current ? 'highlight' : ''}>
            {/* Display the relevant data from the search results */}
            <Link href={`/quicklinks?openPopup=true`}>
              <Highlighter
                highlightClassName="Highlight"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={result.name}
              />
              <Highlighter
                highlightClassName="Highlight"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={result.internal_links}
              />
              <Highlighter
                highlightClassName="Highlight"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={result.external_links}
              />
            </Link>
          </li>
          </div>
        ))}
      </ul>
    </div>
  </Popup>
  </div>
  );
 };
 
 export default Filter;
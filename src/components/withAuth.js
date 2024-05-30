"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import path
import { sessionStatus } from '@/utils/Auth';

function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const session = sessionStatus(); // Assuming sessionStatus is a function that returns the session status

    useEffect(() => {
      if (!session) {
        router.push('/'); // Redirect to home or login page
      }
    }, [session, router]); // Dependency array includes session to re-run effect if session changes

    if (!session) {
      return null; // Optionally, return a loading indicator or similar placeholder UI
    }

    return <Component {...props} />;
  };
}

export default withAuth;

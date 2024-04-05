'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Popup from 'reactjs-popup';
// import 'components/animation.css'
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);



  const fetchNotifications = useCallback(async () => {
    try {
      let response = await fetch('http://127.0.0.1:8000/api1/notifications/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      let data = await response.json();
      console.log(data);

      setNotifications(data);

      if (data.length > 0) {
        setHasNewNotifications(true);
      } else {
        setHasNewNotifications(false);
      }

      // Mark the notifications as read after fetching
      markNotificationsAsRead(data);
    } catch (err) {
      console.error('Error fetching notifications', err);
    }
  }, []);

  const markNotificationsAsRead = async (data) => {
    try {
      const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken'))?.split('=')[1] ?? '';
      await Promise.all(
        data.map(async (notification) => {
          // Replace with the actual URL of your backend API
          await fetch(`http://127.0.0.1:8000/api1/notifications/mark-as-read/${notification.id}/`, {
            method: 'POST',
            headers: {
              'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
            },
          });
        })
      );

      // Clear local storage
      localStorage.removeItem('notifications');
    } catch (err) {
      console.error('Error marking notifications as read', err);
    }
  };


  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handlePopupClose = () => {
    markNotificationsAsRead(notifications);
    setNotifications([]);
    setHasNewNotifications(false);
    localStorage.removeItem('notifications');
  };
  
  
return (
  <Popup
    trigger={
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-7">
          <path
            fillRule="evenodd"
            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244a.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
            clipRule="evenodd"
          />
        </svg>
        {hasNewNotifications && <div className="new-notification-indicator"></div>}
      </button>
    }
    position="bottom center"
    onClose={handlePopupClose}
  >
    <div className="hover:bg-dro_gray text-xl border-dro_black px-4 w-50 h-18 bg-dro_white py-4">
      {notifications.length > 0 ? (
        notifications
          .reverse()
          .map((notification) => (
            <div key={notification.id}>
              <h2>{notification.text}</h2>
              {/* <p>{notification.post}</p> */}
            </div>
          ))
      ) : (
        <p>You don&apos;t have any notifications</p>
      )}
    </div>
  </Popup>
);
};

export default Notification;

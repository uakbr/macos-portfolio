import React, { useState } from 'react';
import '../styles/NotificationCenter.css'; // Updated import path

function NotificationCenter({ show, notifications }) {
  return (
    <div className={`notification-center ${show ? 'show' : ''}`}>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} className="notification">
            <p>{notification.message}</p>
          </div>
        ))
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
}

export default NotificationCenter;

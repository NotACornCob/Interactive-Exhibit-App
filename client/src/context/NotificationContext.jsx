import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const addNotification = (message) => {
    setNotificationCount((prevCount) => prevCount + 1);
  };

  const resetNotificationCount = () => {
    setNotificationCount(0);
  };

  return (
    <NotificationContext.Provider value={{ notificationCount, addNotification, resetNotificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

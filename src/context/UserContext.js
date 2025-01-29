import { createContext, useState, useCallback } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const stableSetUsers = useCallback((updater) => {
    setUsers(prev => typeof updater === 'function' ? updater(prev) : updater);
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers: stableSetUsers,
        loading,
        setLoading,
        error,
        setError,
        isModalOpen,
        setIsModalOpen,
        selectedUser,
        setSelectedUser,
        isFormVisible,
        setIsFormVisible
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
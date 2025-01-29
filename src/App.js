import React, { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import './App.css';

const App = () => {
  const { isFormVisible } = useContext(UserContext);

  return (
    <div className="app">
      {/* Toast will work as error notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
      <header>
        <h1>User Management</h1>
        <AddUserButton />
      </header>
      <UserList />
      {isFormVisible && <UserForm />}
    </div>
  );
};

const AddUserButton = () => {
  const { setIsFormVisible, setSelectedUser } = useContext(UserContext);
  
  return (
    <button 
      className="add-user-btn" 
      onClick={() => {
        setSelectedUser(null);
        setIsFormVisible(true);
      }}
    >
      Add User
    </button>
  );
};

export default App;
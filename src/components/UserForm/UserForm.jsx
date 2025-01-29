import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/api';
import './UserForm.css';

const UserForm = () => {
  const {
    selectedUser,
    setUsers,
    setIsFormVisible,
    setSelectedUser
  } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });


  const handleCancel = () => {
    setIsFormVisible(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        firstName: selectedUser.name?.split(' ')[0] || '',
        lastName: selectedUser.name?.split(' ')[1] || '',
        email: selectedUser.email || '',
        department: selectedUser.company?.bs || ''
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
      });
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      company: { bs: formData.department },
      id: selectedUser?.id || Date.now()
    };

    try {
      if (selectedUser) {
        if(selectedUser.id<=10){
          await updateUser(selectedUser.id, user);
        }
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, ...user } : u));
      } else {
        setUsers(prev => [...prev, user]);
      }
      handleCancel();
    } catch (err) {
      // console.error('Operation failed');
      toast.error('Request failed due to an API error');
      if (selectedUser?.id <= 10) {
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, ...user } : u));
      }
      handleCancel();
    }
  };

  return (
    <>
      <div className="form-backdrop" onClick={handleCancel} />
      <div className="user-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
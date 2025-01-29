import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { fetchUsers, deleteUser } from '../../services/api';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import './UserList.css';

const UserList = () => {
  const {
    users,
    setUsers,
    loading,
    setLoading,
    error,
    setError,
    setIsModalOpen,
    setSelectedUser,
    setIsFormVisible  
  } = useContext(UserContext);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const { data } = await fetchUsers();
        setUsers(data.sort((a, b) => a.id - b.id));
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [setUsers, setLoading, setError]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsFormVisible(true); 
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list">
      <ConfirmationModal message="Deleted successfully!" />
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{users.findIndex(u => u.id === user.id) + 1}</td>
              <td>{user.name.split(' ')[0]}</td>
              <td>{user.name.split(' ')[1] || ''}</td>
              <td>{user.email}</td>
              <td>{user.company?.bs || 'N/A'}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
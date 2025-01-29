import React, { useContext } from 'react';
import Modal from 'react-modal';
import { UserContext } from '../../context/UserContext';
import './ConfirmationModal.css';

Modal.setAppElement('#root');

const ConfirmationModal = ({ message }) => {
  const { isModalOpen, setIsModalOpen } = useContext(UserContext);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="confirmation-modal"
      overlayClassName="overlay"
    >
      <h3>{message}</h3>
      <button onClick={() => setIsModalOpen(false)}>Close</button>
    </Modal>
  );
};

export default ConfirmationModal;
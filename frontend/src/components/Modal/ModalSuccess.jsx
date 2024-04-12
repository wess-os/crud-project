import React, { useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ModalSuccess = ({ isOpen, message, onClose }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-fade-in');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${animationClass} mt-[-100px]`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="modal-content bg-gray-50 p-4">
          <div className="flex justify-center mt-4">
            <CheckCircleIcon className='font-semibold text-center text-green-700'/>
          </div>
          <p className='text-lg font-semibold text-center text-gray-700 mt-[10px]'>{message}</p>
          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess
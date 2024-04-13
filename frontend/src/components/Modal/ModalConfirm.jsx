import React, { useState, useEffect } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

const ModalConfirm = ({ show, onConfirm, onCancel }) => {
  const [animationClass, setAnimationClass] = useState('');
  
  useEffect(() => {
    if (show) {
      setAnimationClass('animate-fade-in');
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${animationClass} mt-[-100px]`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="modal-content bg-gray-50 p-4">
          <div className="flex justify-center mt-4">
            <ErrorIcon className='font-semibold text-center text-red-700'/>
          </div>
          <p className='text-lg font-semibold text-center text-gray-700 mt-[10px]'>Tem certeza que deseja deletar?</p>
          <div className="flex justify-center mt-4 gap-[10px]">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={onConfirm}>Sim</button>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={onCancel}>Não</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm
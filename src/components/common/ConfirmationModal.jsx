import React from 'react';

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <p className="text-lg text-gray-600 font-semibold mb-2">{modalData.text1}</p>
        <p className="text-gray-600 mb-4">{modalData.text2}</p>
        <div className="flex justify-around mt-4">
          <button 
            onClick={modalData?.btn1Handler}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {modalData?.btn1Text}
          </button>
          <button 
            onClick={modalData?.btn2Handler}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

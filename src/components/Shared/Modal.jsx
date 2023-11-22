import React from "react";

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden">
        <img src={content.photo} alt="modal" className="w-full h-auto max-w-full" style={{ maxWidth: "400px" }} />
        <button onClick={onClose} className="absolute top-2 right-2 text-red">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

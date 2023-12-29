import React, { useState } from 'react';

const Modal = ({ image, onClose, onEdit, onReturn }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({ author: image.author, download_url: image.download_url });

  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedData);
    setEditing(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Author"
              name="author"
              value={editedData.author}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Image URL"
              name="download_url"
              value={editedData.download_url}
              onChange={handleInputChange}
            />
            <button className='border border-black px-2 bg-red-400' onClick={handleSaveClick}>Save</button>
          </>
        ) : (
          <>
            <img src={image.download_url} alt="Random Image" className="modal-image" />
            <p>Author: {image.author}</p>
            <p>Dimensions: {image.width} x {image.height}</p>
            <button className='border border-black px-2 mx-3 bg-gray-200' onClick={handleEditClick}>Edit</button>
            <button className='border border-black px-2 bg-red-400' onClick={onReturn}>Return</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;

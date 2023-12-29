import React from 'react';

const Card = ({ image, onClick, onDelete }) => {
  return (
    <div className="card" onClick={() => onClick(image)}>
      <img src={image.download_url} alt="Random Image" />
      <button onClick={(e) => { e.stopPropagation(); onDelete(image.id); }} className="delete-btn">Delete</button>
    </div>
  );
};

export default Card;


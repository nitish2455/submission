// src/App.js
import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Modal from './components/Modal';
import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newCard, setNewCard] = useState({ author: '', download_url: '' });

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=1&limit=6')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleInputChange = (e) => {
    setNewCard({
      ...newCard,
      [e.target.name]: e.target.value,
    });
  };

  const addCard = () => {
    setImages([...images, { ...newCard, id: Date.now() }]);
    setNewCard({ author: '', download_url: '' });
  };

  const editCard = (id, updatedData) => {
    setImages(images.map(image => (image.id === id ? { ...image, ...updatedData } : image)));
  };

  const deleteCard = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this card?');
    if (isConfirmed) {
      setImages(images.filter(image => image.id !== id));
      closeModal();
    }
  };

  const handleReturn = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <h1 className='font-bold text-4xl p-4 sm:ml-64 pt-20 '>My Projects</h1>
    <div className="dashboard grid grid-cols-3 p-2 pb-6 sm:ml-64 ">
      {images.map((image) => (
        <Card key={image.id} image={image} onClick={openModal} onDelete={deleteCard} />
      ))}
      <div className="add-card border border-black px-4 py-6 w-[300px]">
        <h1 className='font-bold'>Add Image of Your Choice</h1>
        <input
          type="text"
          placeholder="Add Author..."
          name="author"
          value={newCard.author}
          onChange={handleInputChange}
          className='border border-black py-1 px-2 my-2 '
        />
        <input
          type="text"
          placeholder="Add Image URL..."
          name="download_url"
          value={newCard.download_url}
          onChange={handleInputChange}
          className='border border-black py-1 px-2 '
        />
        <button onClick={addCard}>Add Card</button>
      </div>
      {selectedImage && (
        <Modal
          image={selectedImage}
          onClose={closeModal}
          onEdit={(updatedData) => editCard(selectedImage.id, updatedData)}
          onReturn={handleReturn} 
        />
      )}
    </div>
    </div>
  );
};

export default App;
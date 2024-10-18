import React from 'react';

function PhotosApp() {
  const photos = [
    { id: 1, src: 'img/photos/photo1.jpg', title: 'Photo 1' },
    { id: 2, src: 'img/photos/photo2.jpg', title: 'Photo 2' },
    // Add more photos as needed
  ];

  return (
    <div className="photos-app">
      <h1>Photos App</h1>
      <div className="photo-gallery">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.src} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotosApp;

import React from 'react';
import LazyLoad from 'react-lazyload';

function ImageComponent({ src, alt }) {
  return (
    <LazyLoad height={200} offset={100}>
      <img src={src} alt={alt} />
    </LazyLoad>
  );
}

export default ImageComponent;

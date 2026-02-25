import React from 'react';
import { Carousel } from 'react-bootstrap';
import { slideImages } from '../data/slideImages';

function SlideBar() {
  return (
    <Carousel fade interval={3000} className="shadow-sm overflow-hidden">
      {slideImages.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={item.image}
            alt={item.title}
            style={{ height: '550px', objectFit: 'cover' }} 
          />
          <Carousel.Caption className="bg-dark bg-opacity-25 rounded p-3" style={{ bottom: '20%' }}>
            <h2 className="fw-bold display-4 text-white">{item.title}</h2>
            <p className="fs-5">{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
export default SlideBar;
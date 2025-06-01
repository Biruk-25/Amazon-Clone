

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { img } from './img/data';
import styles from './Carousel.module.css'; // ✅ CSS Module import

function CarouselEffect() {
  return (
    <div className={styles.carouselContainer}> {/* Apply your custom class */}
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators
        showThumbs={false}
        showStatus={false}
        // interval={3000}
      >
        {img.map((imageItemLink, index) => (
          <div key={index} className={styles.carouselImage}> {/* Optional scoped style */}
            <img src={imageItemLink} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;



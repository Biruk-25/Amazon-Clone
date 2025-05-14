// src/Components/Category/CategoryCard.js
import React from 'react';
import styles from './Category.module.css';

function CategoryCard({ data }) {
  return (
    <div className={styles.card}>
      <a href="#">
        <h2>{data.title}</h2>
        <img src={data.imglink} alt={data.name} />
        <p>Shop now</p>
      </a>
    </div>
  );
}

export default CategoryCard;


// src/Components/Category/CategoryCard.js
import React from 'react';
import styles from './Category.module.css';
import { Link } from 'react-router-dom';


function CategoryCard({ product}) {
  if (!product) return null;
  return (
    <div className={styles.card}>
      <Link to={`/category/${product.name}`}>
        <h2>{product.title}</h2>
        <img src={product?.imglink} alt={product.title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;


// src/Components/Category/Categories.js

import React from 'react';
import { category } from './category';
import CategoryCard from './CategoryCard';
import styles from './Category.module.css';

function Categories() {
  return (
    <section className={styles.section}>
      {category.map((infos, index) => (
        <CategoryCard key={index} product={infos} />
      ))}
    </section>
  );
}

export default Categories;



// https://fakestoreapi.com/products/category/jewelery
// https://fakestoreapi.com/products/category/women's clothing
// https://fakestoreapi.com/products/category/men's clothing
// https://fakestoreapi.com/products/category/elecrtonics
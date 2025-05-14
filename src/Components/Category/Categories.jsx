// src/Components/Category/Categories.js
// src/Components/Category/Categories.js
import React from 'react';
import { category } from './category';
import CategoryCard from './CategoryCard';
import styles from './Category.module.css';

function Categories() {
  return (
    <section className={styles.section}>
      {category.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </section>
  );
}

export default Categories;

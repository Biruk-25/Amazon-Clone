import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard';
import styles from './Product.module.css';
function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
return (
  <section className={styles.grid}>
  {products.map((singleProduct) => (
    <ProductCard product={singleProduct} key={singleProduct.id} />
  ))}
</section>
);

}

export default Product;
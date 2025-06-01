import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard';
import styles from './Product.module.css';
import Loader from '../Loader/Loader';


function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
         setLoading(false)
      });
  }, []);
return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.grid}>
          {products.map((singleProduct) => (
            <ProductCard renderAdd ={true} product={singleProduct} key={singleProduct.id} />
          ))}
        </section>
      )}
    </div>
  );
}
export default Product;
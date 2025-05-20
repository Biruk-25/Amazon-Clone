




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Components/LayOut/Layout';
import ProductCard from '../../Components/Product/ProductCard';
import { productUrl } from '../../Api/endPoints';
import Loader from '../../Components/Loader/Loader';
import styles from './Results.module.css';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Add loading state
  const { categoryName } = useParams();

  useEffect(() => {
    const url = `${productUrl}/products/category/${categoryName}`;
    setLoading(true); // ✅ Start loader
    axios.get(url)
      .then((res) => {
        setResults(res.data);
        setLoading(false); // ✅ Stop loader on success
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false); // 
      });
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 className={styles.heading}>Results</h1>
        <p className={styles.subheading}>Category / {categoryName}</p>
        <hr />

        {loading ? (
          <Loader />
        ) : (
          <div className={styles.resultsContainer}>
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} 
              renderAdd ={true}/>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Results;

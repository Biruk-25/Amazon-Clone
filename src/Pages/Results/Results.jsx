import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Components/LayOut/Layout';
import ProductCard from '../../Components/Product/ProductCard';
import { productUrl } from '../../Api/endPoints';
import styles from './Results.module.css';

function Results() {
    const [results, setResults] = useState([]);
    const { categoryName } = useParams();

  useEffect(() => {
    const url = (`${productUrl}/products/category/${categoryName}`);
    // console.log('Fetching:', url); // Log to ensure the URL is correct
    axios.get(url)
      .then((res) => {
        // console.log('API Response:', res.data);
        setResults(res.data);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  }, []);

  return (
    <Layout>
      <section>
        <h1 className={styles.heading}>Results</h1>
        <p className={styles.subheading}>Category / {categoryName}</p>
        <hr />
        
        <div className={styles.resultsContainer}>
          {results?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Results;






// import React, { useEffect, useState } from 'react';
// import styles from './Results.module.css';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Layout from '../../Components/LayOut/Layout';
// import ProductCard from '../../Components/Category/CategoryCard';
// import { productUrl } from '../../Api/endPoints';

// function Results() {
//   const { categoryName } = useParams();
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     const url = `${productUrl}/products/category/${categoryName}`;
//     console.log('Fetching:', url); // ✅ log for debugging
//     axios.get(url)
//       .then((res) => {
//         console.log('API Response:', res.data);
//         setResults(res.data);
//       })
//       .catch((err) => {
//         console.error('Fetch error:', err);
//       });
//   }, [categoryName]);

//   return (
//     <Layout>
//       <section>
//         <h1 className={styles.heading}>Results</h1>
//         <p className={styles.subheading}>Category / {categoryName}</p>
//         <hr />
//         <div className={styles.resultsContainer}>
//           {results?.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Results;





import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import styles from './Product.module.css'; // Assuming CSS is in Product.module.css

function ProductCard({ product }) {
  const { image, title, rating, price } = product;

  return (
    <div className={styles.card}>
      <Link to={`/category/${product.name}`}>
        <img src={image} alt={title} className={styles.image} />
      </Link>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.ratingContainer}>
          <Rating value={rating.rate} precision={0.1} readOnly />
          <small>({rating.count})</small>
        </div>
        <div className={styles.price}>
          <CurrencyFormat amount={price} />
        </div>
        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;



// import React from 'react';
// import Rating from '@mui/material/Rating';
// import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
// import styles from './Product.module.css';

// function ProductCard({ product }) {
//   const { image, title, rating, price } = product;

//   return (
//     <div className={styles.card}>
//       <Link to="#">
//         <img src={image} alt={title} className={styles.image} />
//       </Link>
//       <div>
//         <h3 className={styles.title}>{title}</h3>
//         <div className={styles.ratingContainer}>
//           <Rating value={rating.rate} precision={0.1} readOnly />
//           <small>({rating.count})</small>
//         </div>
//         <div className={styles.price}>
//           <CurrencyFormat amount={price} />
//         </div>
//         <button className={styles.button}>Add to Cart</button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;




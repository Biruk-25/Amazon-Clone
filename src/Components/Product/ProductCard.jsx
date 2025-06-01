
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import styles from './Product.module.css'; 
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/action';

function ProductCard({ product, flex = false, renderDesc = false, renderAdd = false }) {
  const [state, dispatch] = useContext(DataContext);

  // Fallback if product is undefined or null
  if (!product) {
    return <div className={styles.error}>⚠️ Product not available</div>;
  }

  const { image, title, id, rating, price, description } = product;

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description, amount: 1 }
    });
  };

  return (
    <div className={`${styles.card} ${flex ? styles.product_flexed : ''}`}>
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} className={styles.image} />
      </Link>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {renderDesc && <div className={styles.description}>{description}</div>}

        <div className={styles.hoverWrapper}>
          <div className={styles.price}>
            <CurrencyFormat amount={price} />
          </div>

          {rating && (
            <div className={styles.ratingContainer}>
              <Rating value={rating.rate} precision={0.1} readOnly />
              <small>({rating.count})</small>
            </div>
          )}
        </div>

        {renderAdd && (
          <button className={styles.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;


// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import Rating from '@mui/material/Rating';
// import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
// import styles from './Product.module.css'; 
// import {DataContext} from '../DataProvider/DataProvider'
// import { Type } from '../../Utility/action';

// function ProductCard({ product, flex, renderDesc, renderAdd}) {
//   const { image, title, id, rating, price, description } = product;

// const [state, dispatch] =useContext(DataContext)
// const addToCart = ()=>{
//   dispatch({
//     type:Type.ADD_TO_BASKET,
//     item: {image, title, id, rating, price, description}
//   })
// }

//   return (
//     <div className={`${styles.card} ${flex ? styles.product_flexed : ''}`}>
//       <Link to={`/product/${id}`}>
//         <img src={image} alt={title} className={styles.image} />
//       </Link>
//       <div className={styles.content}>
//         <h3 className={styles.title}>{title}</h3>
//         {renderDesc && <div > {description}</div>} 

//         <div className={styles.hoverWrapper}>
//           <div className={styles.price}>
//             <CurrencyFormat amount={price} />
//           </div>
//           {rating && (
//             <div className={styles.ratingContainer}>
//               <Rating value={rating.rate} precision={0.1} readOnly />
//               <small>({rating.count})</small>
//             </div>
//           )}
//         </div>

//         {
//           renderAdd && <button className={styles.button} onClick={addToCart}>Add to Cart</button>
//         }

//       </div>
//     </div>
//   );
// }

// export default ProductCard;



import React, { useContext } from 'react';
import Layout from '../../Components/LayOut/Layout';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { Link } from 'react-router-dom';
import style from './Cart.module.css';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { Type } from '../../Utility/action';

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { ...item, amount: item.amount + 1 }
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.DECREMENT_ITEM,
      id
    });
  };

  return (
    <Layout>
      <section className={style.cartSection}>
        <div className={style.cartLeft}>
          <h2>Hello, {user?.name || 'Guest'}</h2>
          <h3 className={style.cartTitle}>Your Shopping Basket</h3>
          <hr />

          {basket?.length === 0 ? (
            <p className={style.emptyCartMessage}>Oops! No item in your cart</p>
          ) : (
            basket.map((item, i) => (
              <section key={i} className={style.cartItemSection}>
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={style.quantityControls}>
                  <button onClick={() => increment(item)}>+</button>
                  <span>{item.amount}</span>
                  <button onClick={() => decrement(item.id)}>-</button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={style.cartRight}>
            <p className={style.subtotal}>
              Subtotal ({basket.length} item{basket.length > 1 ? 's' : ''}):
            </p>
            <CurrencyFormat amount={total} />
            <div className={style.giftOption}>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </div>
            <Link to="/payment" className={style.checkoutLink}>
              Continue to Checkout
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;

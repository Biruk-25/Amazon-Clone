
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import Layout from "../../Components/LayOut/Layout";
import ProductCard from "../../Components/Product/ProductCard";
import style from "./Order.module.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to payment if cart has items
    if (basket.length > 0) {
      navigate("/payment");
      return;
    }

    if (!user?.uid) return;

    const ordersRef = collection(db, "users", user.uid, "orders");
    const ordersQuery = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, [basket, user, navigate]);

  // Check if all order items exist in the cart with enough quantity
  const basketHasOrderItems = (orderBasket) => {
    return orderBasket.every((orderItem) => {
      const matchingItem = basket.find((cartItem) => cartItem.id === orderItem.id);
      return matchingItem && matchingItem.amount >= orderItem.amount;
    });
  };

  // Add missing order items to cart before payment
  const addMissingItemsToCart = (orderBasket) => {
    orderBasket.forEach((orderItem) => {
      const cartItem = basket.find((item) => item.id === orderItem.id);
      if (!cartItem) {
        // Add missing item
        dispatch({ type: "ADD_TO_BASKET", item: orderItem });
      } else if (cartItem.amount < orderItem.amount) {
        // Update with required amount (optional, depending on your reducer logic)
        const additionalAmount = orderItem.amount - cartItem.amount;
        for (let i = 0; i < additionalAmount; i++) {
          dispatch({ type: "ADD_TO_BASKET", item: orderItem });
        }
      }
    });
  };

  const handleBuyAgain = (orderBasket) => {
    if (basketHasOrderItems(orderBasket)) {
      // Cart already has all items with enough qty
      navigate("/payment");
    } else {
      // Add missing items first, then navigate
      addMissingItemsToCart(orderBasket);
      navigate("/payment");
    }
  };

  return (
    <Layout>
      <section className={style.container}>
        <div className={style.orders_container}>
          <h2 className={style.heading}>Your Orders</h2>
          <hr className={style.orangeLine} />

          {orders.length === 0 ? (
            <p className={style.noOrders}>You have no orders.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className={style.order}>
                <hr />
                <p><strong>Order ID:</strong> {order.id}</p>

                {Array.isArray(order.data?.basket) && order.data.basket.length > 0 ? (
                  <>
                    {order.data.basket.map((item) => (
                      <ProductCard key={item.id} product={item} flex />
                    ))}

                    <button
                      className={style.payNowButton}
                      onClick={() => handleBuyAgain(order.data.basket)}
                    >
                      Buy Again
                    </button>
                  </>
                ) : (
                  <p>No items found in this order.</p>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Orders;




// import React, { useState, useEffect, useContext } from 'react';
// import Layout from '../../Components/LayOut/Layout';
// import { db } from '../../Utility/firebase';
// import ProductCard from '../../Components/Product/ProductCard';
// import { DataContext } from '../../Components/DataProvider/DataProvider';
// import style from './Order.module.css';

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [{ user }] = useContext(DataContext);

//   useEffect(() => {
//     if (!user) return;

//     const unsubscribe = db
//       .collection('users')
//       .doc(user.uid)
//       .collection('orders')
//       .orderBy('created', 'desc')
//       .onSnapshot((snapshot) => {
//         const fetchedOrders = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           data: doc.data(),
//         }));
//         setOrders(fetchedOrders);
//       });

//     return () => unsubscribe();
//   }, [user]);

//   return (
//     <Layout>
//       <section className={style.container}>
//         <div className={style.orders_container}>
//           <h2>Your Orders</h2>
//           {orders.length === 0 ? (
//             <p>You have no orders.</p>
//           ) : (
//             orders.map((eachOrder) => (
//               <div key={eachOrder.id} className={style.order}>
//                 <hr />
//                 <p>Order ID: {eachOrder.id}</p>
//                 {eachOrder.data?.basket?.map((item) => (
//                   <ProductCard key={item.id} flex={true} product={item} />
//                 ))}
//               </div>
//             ))
//           )}
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Orders;







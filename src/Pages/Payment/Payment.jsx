
import React, { useContext, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection } from "firebase/firestore";

import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { axiosInstance } from "../../Api/axios";

import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import Layout from "../../Components/LayOut/Layout";
import ProductCard from "../../Components/Product/ProductCard";
import ClipLoader from "react-spinners/ClipLoader";

import styles from "./Payment.module.css";
import { Type } from "../../Utility/action";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const totalItems = basket.reduce((sum, item) => sum + item.amount, 0);
  const total = basket.reduce((sum, item) => sum + item.price * item.amount, 0);

  const increaseQuantity = (id) => {
    const updated = basket.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    dispatch({ type: Type.UPDATE_BASKET, payload: updated });
  };

  const decreaseQuantity = (id) => {
    const updated = basket
      .map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      )
      .filter((item) => item.amount > 0);
    dispatch({ type: Type.UPDATE_BASKET, payload: updated });
  };

  const handleChange = (event) => {
    setCardError(event?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setCardError("");

    if (!stripe || !elements) {
      setCardError("Stripe is not ready.");
      setProcessing(false);
      return;
    }

    if (total <= 0) {
      setCardError("Order total must be greater than $0.");
      setProcessing(false);
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/payment/create?total=${Math.round(total * 100)}`
      );
      const clientSecret = res.data?.clientSecret;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setCardError(error.message || "Payment failed.");
        setProcessing(false);
        return;
      }

      const orderRef = doc(
        collection(db, "users", user.uid, "orders"),
        paymentIntent.id
      );

      await setDoc(orderRef, {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      dispatch({ type: Type.EMPTY_BASKET });

      navigate("/orders", {
        state: { message: "You have placed a new order." },
      });
    } catch (err) {
      console.error("Payment error:", err);
      setCardError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={styles.paymentHeader}>
        <h1>
          Checkout ({totalItems} item{totalItems !== 1 ? "s" : ""})
        </h1>
      </div>

      <section className={styles.paymentSection}>
        <div className={styles.row}>
          <div className={styles.sectionTitle}>Delivery Address</div>
          <div className={styles.infoBlock}>
            <p>
              <strong>{user?.email}</strong>
            </p>
            <p>1234 Demo Street</p>
            <p>Nashville, TN</p>
          </div>
        </div>

        <hr />

        <div className={styles.row}>
          <div className={styles.sectionTitle}>Review Items</div>
          <div className={styles.itemsBlock}>
            {basket.map((item) => (
              <div key={item.id} className={styles.itemWrapper}>
                <ProductCard product={item} flex />
                <div className={styles.quantityControls}>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={processing || totalItems === 0}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span>{item.amount}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    disabled={processing}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr />

        <div className={styles.row}>
          <div className={styles.sectionTitle}>Payment Method</div>
          <div className={styles.infoBlock}>
            <form onSubmit={handlePayment} className={styles.paymentForm}>
              {cardError && <small className={styles.error}>{cardError}</small>}
              <CardElement
                onChange={handleChange}
                className={styles.cardElement}
              />

              <div className={styles.totalSection}>
                <span>Total Order:</span>
                <CurrencyFormat amount={total} />
              </div>

              <button
                type="submit"
                className={styles.payButton}
                disabled={processing || !stripe || totalItems === 0}
              >
                {processing ? (
                  <div className={styles.loading}>
                    <ClipLoader size={16} />
                    <p>Please wait...</p>
                  </div>
                ) : (
                  "Pay Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;




// import React, { useState, useContext, useEffect } from "react";
// import {
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import { useNavigate, useLocation } from "react-router-dom";
// import { doc, setDoc, collection } from "firebase/firestore";

// import { db } from "../../Utility/firebase";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import { axiosInstance } from "../../Api/axios";

// import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
// import Layout from "../../Components/LayOut/Layout";
// import ProductCard from "../../Components/Product/ProductCard";
// import ClipLoader from "react-spinners/ClipLoader";

// import styles from "./Payment.module.css";

// function Payment() {
//   const [{ user, basket: globalBasket }, dispatch] = useContext(DataContext);
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Use basket from navigation state if available (Buy Again), else global basket
//   const basket = location.state?.basket || globalBasket;

//   const [cardError, setCardError] = useState("");
//   const [processing, setProcessing] = useState(false);

//   const totalItems = basket.reduce((sum, item) => sum + item.amount, 0);
//   const total = basket.reduce(
//     (sum, item) => sum + item.price * item.amount,
//     0
//   );

//   const handleChange = (event) => {
//     setCardError(event?.error?.message || "");
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     setCardError("");

//     if (!stripe || !elements) {
//       setCardError("Stripe has not loaded yet.");
//       setProcessing(false);
//       return;
//     }

//     if (total <= 0) {
//       setCardError("Order total must be greater than $0.");
//       setProcessing(false);
//       return;
//     }

//     try {
//       // 1. Request client secret from backend
//       const response = await axiosInstance.post(
//         `/payment/create?total=${Math.round(total * 100)}`
//       );
//       const clientSecret = response.data?.clientSecret;

//       // 2. Confirm card payment
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//           },
//         }
//       );

//       if (error) {
//         setCardError(error.message || "Payment failed.");
//         setProcessing(false);
//         return;
//       }

//       // 3. Save order in Firestore
//       const orderRef = doc(
//         collection(db, "users", user.uid, "orders"),
//         paymentIntent.id
//       );

//       await setDoc(orderRef, {
//         basket,
//         amount: paymentIntent.amount,
//         created: paymentIntent.created,
//       });

//       dispatch({ type: "EMPTY_BASKET" });

//       navigate("/orders", {
//         state: { message: "You have placed a new order." },
//       });
//     } catch (err) {
//       console.error("Payment error:", err);
//       setCardError("Payment failed. Please try again.");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className={styles.paymentHeader}>
//         <h1>
//           Checkout ({totalItems} item{totalItems !== 1 ? "s" : ""})
//         </h1>
//       </div>

//       <section className={styles.paymentSection}>
//         {/* Delivery Address */}
//         <div className={styles.row}>
//           <div className={styles.sectionTitle}>Delivery Address</div>
//           <div className={styles.infoBlock}>
//             <p><strong>{user?.email}</strong></p>
//             <p>1234 Demo Street</p>
//             <p>Nashville, TN</p>
//           </div>
//         </div>

//         <hr />

//         {/* Review Items */}
//         <div className={styles.row}>
//           <div className={styles.sectionTitle}>Review Items</div>
//           <div className={styles.itemsBlock}>
//             {basket.map((item, index) => (
//               <ProductCard key={index} product={item} flex />
//             ))}
//           </div>
//         </div>

//         <hr />

//         {/* Payment Method */}
//         <div className={styles.row}>
//           <div className={styles.sectionTitle}>Payment Method</div>
//           <div className={styles.infoBlock}>
//             <form onSubmit={handlePayment} className={styles.paymentForm}>
//               {cardError && (
//                 <small className={styles.error}>{cardError}</small>
//               )}
//               <CardElement
//                 onChange={handleChange}
//                 className={styles.cardElement}
//               />

//               <div className={styles.totalSection}>
//                 <span>Total Order:</span>
//                 <CurrencyFormat amount={total} />
//               </div>

//               <button
//                 type="submit"
//                 className={styles.payButton}
//                 disabled={processing || !stripe}
//               >
//                 {processing ? (
//                   <div className={styles.loading}>
//                     <ClipLoader size={16} />
//                     <p>Please wait...</p>
//                   </div>
//                 ) : (
//                   "Pay Now"
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Payment;




import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../Pages/Landing/Landing';
import Auth from '../Pages/Auth/Auth'; 
import Payment from '../Pages/Payment/Payment';
import Orders from '../Pages/Orders/Order';
import Cart from '../Pages/Cart/Cart';
import Results from '../Pages/Results/Results';
import ProductDetail from './ProductDetail/ProductDetail'
import {CheckoutProvider, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectRout from './ProtectRout/ProtectRout';
import NotFound from '../Pages/NotFound'; 


const stripePromise = loadStripe('pk_test_51RSRIzCSsDaJVQ0PaZRT6EkIiJ4hjXvEk5oH7B7fPHR2VN17BJhbyExoDZCB7Y2du8mZmzQj66hTrRYrzhMOVE5V00YHrRrgKU');
// import Auth from '../Pages/Auth/Auth';


function Routing() {
  return (
    <BrowserRouter basename="/Amazon-Clone">

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payment" element={
          <ProtectRout msg={"You must log in to pay"} redirect= {"/payment"}>
            <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
          </ProtectRout>
          } />
        <Route path="/orders" element={
          <ProtectRout msg={"You must log in to access your orders"} redirect= {"/orders"}>

          <Orders />
          </ProtectRout>
          } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Results/>} />
        <Route path="/product/:productId" element={<ProductDetail/>} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Routing;

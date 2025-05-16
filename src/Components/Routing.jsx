import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../Pages/Landing/Landing';
import SignIn from '../Pages/Auth/Signup'; 
import Payment from '../Pages/Payment/Payment';
import Orders from '../Pages/Orders/Order';
import Cart from '../Pages/Cart/Cart';
import Results from '../pages/Results/Results';
import NotFound from '../Pages/NotFound'; 


function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/category/:categoryName" element={<Results/>} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Routing;

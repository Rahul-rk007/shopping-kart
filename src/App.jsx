import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import ProductDetails from "./components/Product-Details/ProductDetails";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Aboutus from "./components/Aboutus/Aboutus";
import Contactus from "./components/Contactus/Contactus";

function App() {
  return (
    <>
      {/* <Home /> */}
      {/* <Shop /> */}
      {/* <ProductDetails /> */}
      {/* <Cart /> */}
      {/* <Checkout /> */}
      {/* <Aboutus /> */}
      <Contactus />
    </>
  );
}

export default App;

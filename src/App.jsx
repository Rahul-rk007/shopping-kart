import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import ProductDetails from "./components/Product-Details/ProductDetails";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Aboutus from "./components/Aboutus/Aboutus";
import Contactus from "./components/Contactus/Contactus";
import Routes from "./components/Routes/Routing";

function App() {
  return (
    <>
      <Routes />
    </>
  );
}

export default App;

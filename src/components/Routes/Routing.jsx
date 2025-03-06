import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Shop from "../Shop/Shop";
import ProductDetails from "../Product-Details/ProductDetails";
import Cart from "../Cart/Cart";
import Checkout from "../Checkout/Checkout";
import Aboutus from "../Aboutus/Aboutus";
import Contactus from "../Contactus/Contactus";
import Login from "../Login/Login"; // Import Login
import Signup from "../Signup/Signup";
import MyOrders from "../MyAccount/MyOrders/MyOrders";
import Profile from "../MyAccount/Profile/Profile";
import Wishlist from "../MyAccount/Wishlist/Wishlist";
import Address from "../MyAccount/Address/Address";
import ChangePassword from "../MyAccount/ChangePassword/ChangePassword";
import OrderDetails from "../MyAccount/OrderDetails/OrderDetails";
import Logout from "../Logout/Logout";
import PrivateRoute from "../PrivateRoute";

const Routing = ({ setUser }) => {
  // Accept setUser  as a prop
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/contactus" element={<Contactus />} />
      <Route path="/login" element={<Login setUser={setUser} />} />{" "}
      {/* Pass setUser  to Login */}
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/myaccount/myorders"
        element={<PrivateRoute element={<MyOrders />} />}
      />
      <Route
        path="/myaccount/profile"
        element={<PrivateRoute element={<Profile />} />}
      />
      <Route
        path="/myaccount/wishlist"
        element={<PrivateRoute element={<Wishlist />} />}
      />
      <Route
        path="/myaccount/address"
        element={<PrivateRoute element={<Address />} />}
      />
      <Route
        path="/myaccount/changepassword"
        element={<PrivateRoute element={<ChangePassword />} />}
      />
      <Route
        path="/myaccount/orderdetails"
        element={<PrivateRoute element={<OrderDetails />} />}
      />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default Routing;

import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/myaccount/profile">Profile</Link>
        </li>
        <li>
          <Link to="/myaccount/myorders">My Orders</Link>
        </li>
        <li>
          <Link to="/myaccount/address">Address</Link>
        </li>
        <li>
          <Link to="/myaccount/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

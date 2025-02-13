import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="myaccount-sidebar">
      <ul className="myaccount-sidebar-container">
        <li className="myaccount-list">
          <Link className="myaccount-list-link" to="/myaccount/profile">Profile</Link>
        </li>
        <li className="myaccount-list">
          <Link className="myaccount-list-link" to="/myaccount/myorders">My Orders</Link>
        </li>
        <li className="myaccount-list">
          <Link className="myaccount-list-link" to="/myaccount/address">Address</Link>
        </li>
        <li className="myaccount-list">
          <Link className="myaccount-list-link" to="/myaccount/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;


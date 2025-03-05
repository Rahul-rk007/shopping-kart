import React from "react";
import { NavLink, useLocation } from "react-router-dom"; // Import NavLink and useLocation
import "./Sidebar.css";
import Profile from "../../../assets/icon/profile.webp";
import MyOrder from "../../../assets/icon/myorder.png";
import Address from "../../../assets/icon/address.jpg";
import Wishlist from "../../../assets/icon/wishlist.png";
import ChangePassword from "../../../assets/icon/changepassword.png";

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  // Function to determine if the current path matches the link's path
  const getActiveClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="myaccount-sidebar">
      <ul className="myaccount-sidebar-container">
        <li
          className={`myaccount-list myaccount-list-link ${getActiveClass(
            "/myaccount/profile"
          )}`}
        >
          <NavLink className="myaccount-link" to="/myaccount/profile">
            <img className="myaccount-list-img" src={Profile} alt="Profile" />
            Profile
          </NavLink>
        </li>
        <hr />
        <li
          className={`myaccount-list myaccount-list-link ${getActiveClass(
            "/myaccount/myorders"
          )}`}
        >
          <NavLink className="myaccount-link" to="/myaccount/myorders">
            <img className="myaccount-list-img" src={MyOrder} alt="My Orders" />
            My Orders
          </NavLink>
        </li>
        <hr />
        <li
          className={`myaccount-list myaccount-list-link ${getActiveClass(
            "/myaccount/address"
          )}`}
        >
          <NavLink className="myaccount-link" to="/myaccount/address">
            <img className="myaccount-list-img" src={Address} alt="Address" />
            Address
          </NavLink>
        </li>
        <hr />
        <li
          className={`myaccount-list myaccount-list-link ${getActiveClass(
            "/myaccount/wishlist"
          )}`}
        >
          <NavLink className="myaccount-link" to="/myaccount/wishlist">
            <img className="myaccount-list-img" src={Wishlist} alt="Wishlist" />
            Wishlist
          </NavLink>
        </li>
        <hr />
        <li
          className={`myaccount-list myaccount-list-link ${getActiveClass(
            "/myaccount/changepassword"
          )}`}
        >
          <NavLink className="myaccount-link" to="/myaccount/changepassword">
            <img
              className="myaccount-list-img"
              src={ChangePassword}
              alt="Change Password"
            />
            Change Password
          </NavLink>
        </li>
        <hr />
        <li
          className={`myaccount-list myaccount-logout-btn ${getActiveClass(
            "/logout"
          )}`}
        >
          <NavLink className="btn btn-danger" to="/logout">
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

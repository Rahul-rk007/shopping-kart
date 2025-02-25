import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Profile from "../../../assets/icon/profile.webp";
import MyOrder from "../../../assets/icon/myorder.png";
import Address from "../../../assets/icon/address.jpg";
import Wishlist from "../../../assets/icon/wishlist.png";
import ChangePassword from "../../../assets/icon/changepassword.png";

const Sidebar = () => {
  return (
    <div className="myaccount-sidebar">
      <ul className="myaccount-sidebar-container">
        <li className="myaccount-list myaccount-list-link">
          <img className="myaccount-list-img" src={Profile} />
          <Link className="myaccount-link" to="/myaccount/profile">
            Profile
          </Link>
        </li>
        <hr />
        <li className="myaccount-list myaccount-list-link">
          <img className="myaccount-list-img" src={MyOrder} />
          <Link className="myaccount-link" to="/myaccount/myorders">
            My Orders
          </Link>
        </li>
        <hr />
        <li className="myaccount-list myaccount-list-link">
          <img className="myaccount-list-img" src={Address} />
          <Link className="myaccount-link" to="/myaccount/address">
            Address
          </Link>
        </li>
        <hr />
        <li className="myaccount-list myaccount-list-link">
          <img className="myaccount-list-img" src={Wishlist} />
          <Link className="myaccount-link" to="/myaccount/wishlist">
            Wishlist
          </Link>
        </li>
        <hr />
        <li className="myaccount-list myaccount-list-link">
          <img className="myaccount-list-img" src={ChangePassword} />
          <Link className="myaccount-link" to="/myaccount/changepassword">
            Change Password
          </Link>
        </li>
        <hr />
        <li className="myaccount-list myaccount-logout-btn">
          <Link className="btn btn-danger" to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

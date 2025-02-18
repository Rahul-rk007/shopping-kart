import React from "react";
import "./MyAccount.css";
import Layout from "../Layout/Layout";
import Sidebar from "./Sidebar/Sidebar";

const MyAccount = ({ children }) => {
  return (
    <Layout>
      <div className="myaccount-container">
        <Sidebar />
        <div className="myaccount-content bg-color">{children}</div>
      </div>
    </Layout>
  );
};

export default MyAccount;

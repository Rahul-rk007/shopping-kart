import React from "react";
import "./MyAccount.css";
import Layout from "../Layout/Layout";
import Sidebar from "./Sidebar/Sidebar";

const MyAccount = ({ children }) => {
  return (
    <Layout>
      <div className="account-container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </Layout>
  );
};

export default MyAccount;

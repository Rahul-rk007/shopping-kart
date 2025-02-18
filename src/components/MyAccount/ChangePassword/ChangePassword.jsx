import React,{useState} from "react";
import MyAccount from "../MyAccount";
import './ChangePassword.css'
import { Link } from "react-router-dom";

const ChangePassword = () => {
  return (
    <MyAccount>
      <div>
        <div className="changepassword-main">
          <div className="changepassword-container">
            <h3 className="text-center changepassword-header">Change Password</h3>
            <form>
              <div className="form-group">
                <label htmlFor="currentpassword" className="w-100">
                  Current Password
                </label>
                <input
                  type="currentpassword"
                  className="form-control w-100 changepassword-inputbox"
                  id="currentpassword"
                  placeholder="Enter your current password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newpassword" className="w-100">
                  New Password
                </label>
                <input
                  type="newpassword"
                  className="form-control w-100 changepassword-inputbox" 
                  id="newpassword"
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="conformpassword" className="w-100">
                  Conform Password
                </label>
                <input
                  type="conformpassword"
                  className="form-control w-100 changepassword-inputbox"
                  id="conformpassword"
                  placeholder="Conform Password"
                  required
                />
                </div>
              <button type="submit" className="btn btn-primary w-100 changepassword-btn btn-red">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </MyAccount>
  );
};

export default ChangePassword;

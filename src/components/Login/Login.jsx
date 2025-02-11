import React from "react";
import "./Login.css";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Layout>
      <div className="login-main">
        <div className="login-container">
          <h3 className="text-center">Login</h3>
          <form>
            <div className="form-group">
              <label htmlFor="email" className="w-100">
                Email address
              </label>
              <input        
                type="email"
                className="form-control w-100"
                id="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="w-100">
                Password
              </label>
              <input
                type="password"
                className="form-control w-100"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 btnLogin">
              Login
            </button>
            <div className="loginFooter w-100">
              <div className="text-center w-50">
                <Link href="#" className="btnSignUp">Forgot password?</Link>
              </div>
              <div className="text-center w-50">                
                 <Link to="/signup" className="btnSignUp">Sign up?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

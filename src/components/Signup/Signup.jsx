import React, { useState } from "react";
import "./Signup.css";
import Layout from "../Layout/Layout";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("User  signed up:", formData);
    setError("");
    alert("Sign up successful!");
  };
  return (
    <Layout>
      <div className="signup-main">
        <div className="signup-wrapper">
          <h3 className="text-center">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <div className="signup-form-field ">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>
              <div className="signup-form-field ">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="signup-form-field  ">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <div className="signup-form-field  ">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Confirm your password"
                />
              </div>
              <div className="signup-form-field signup-mobile-field ">
                <label>Mobile Number:</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn btn-primary signup-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

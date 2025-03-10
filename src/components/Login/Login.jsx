import React from "react";
import "./Login.css";
import Layout from "../Layout/Layout";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { loginUser } from "../../api/userApi"; // Import the loginUser  function
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify"; // Import toast
import setAuthToken from "../../api/setAuthToken"; // Import setAuthToken
import { getUser } from "../../api/userApi"; // Import getUser

// Define the validation schema using Zod
const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Invalid email address."),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(6, "Password must be at least 6 characters long."),
});

const Login = ({ setUser }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const response = await loginUser(email, password); // Call the loginUser  function

      const { token } = response; // Assuming the response contains a token

      localStorage.setItem("token", token);
      setAuthToken(token);

      const jwtUser = getUser(); // Get user from token
      setUser(jwtUser); // Update user state in App
      const { state } = location;
      window.location = state ? state.form : "/";
    } catch (err) {
      // Handle error (e.g., display error message)
      console.error(err);
      toast.error("Login failed. Please check your credentials."); // Show error toast message
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="login-main bg-color">
        <div className="login-container">
          <h3 className="text-center">Login</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email" className="w-100">
                Email address
              </label>
              <input
                type="email"
                className="form-control w-100"
                id="email"
                placeholder="Enter email"
                {...register("email")} // Register the email input
              />
              {errors.email && (
                <div className="form-error">{errors.email.message}</div>
              )}
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
                {...register("password")} // Register the password input
              />
              {errors.password && (
                <div className="form-error">{errors.password.message}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 btnLogin btn-red"
            >
              Login
            </button>
            <div className="loginFooter w-100">
              <div className="text-center w-50">
                <Link to="#" className="btnSignUp">
                  Forgot password?
                </Link>
              </div>
              <div className="text-center w-50">
                <Link to="/signup" className="btnSignUp">
                  Sign up?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

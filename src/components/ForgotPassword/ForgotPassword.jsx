import { React, useState } from "react";
import Layout from "../Layout/Layout";
import "./ForgotPassword.css";
import { forgotPassword } from "../../api/forgotPasswordApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the validation schema using zod
const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Invalid email address."),
});

const ForgotPassword = () => {
  const [message, setMessage] = useState(""); // State to hold success/error messages

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await forgotPassword(data.email);
      setMessage(response.message); // Display success message
      // Optionally reset the form or clear the email input
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      setMessage(error.response?.data?.message || "An error occurred."); // Display error message
    }
  };

  return (
    <Layout>
      <div className="bg-color"> 
        <div className="container">
          <div className="row justify-content-center forgot-password-container">
            <div className="col-md-4 forgot-password-inner-container">
              <div className="card mt-5">
                <div className="forgot-password-card">
                  <div className="mt-4 text-center">
                    <h4>Forgot Password</h4>
                    {message && <div className="alert alert-success">{message}</div>}
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`} // Add Bootstrap invalid class
                          id="email"
                          placeholder="Enter your email"
                          {...register("email")} // Register the input with react-hook-form
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>} {/* Display error message */}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block btn-red"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="forgot-password-card-footer text-center mb-4">
                    <a href="/login">Back to Login</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
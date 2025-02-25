import React, { useState } from "react";
import "./Signup.css";
import Layout from "../Layout/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { signupUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = z
  .object({
    firstName: z.string().nonempty("First Name is required."),
    lastName: z.string().nonempty("Last Name is required."),
    email: z
      .string()
      .nonempty("Email is required.")
      .email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
    mobileNumber: z
      .string()
      .min(1, "Mobile Number is required")
      .regex(/^\d{10}$/, "Mobile number must contain only digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (formData) => {
    try {
      const response = await signupUser(formData);
      localStorage.setItem("token", response);
      window.location = "/";
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <Layout>
      <div className="signup-main bg-color">
        <div className="signup-wrapper">
          <h3 className="text-center">Sign Up</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 signup-form-field mb-3">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <em className="form-error">{errors.firstName.message}</em>
                )}
              </div>
              <div className="col-md-6 signup-form-field mb3">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <em className="form-error">{errors.lastName.message}</em>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 signup-form-field mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && (
                  <em className="form-error">{errors.email.message}</em>
                )}
              </div>
              <div className="col-md-6 signup-form-field mb-3">
                <label htmlFor="mobileNumber">Mobile Number:</label>
                <input
                  type="text"
                  id="mobileNumber"
                  className="form-control"
                  placeholder="Enter your mobile number"
                  {...register("mobileNumber")}
                />
                {errors.mobileNumber && (
                  <em className="form-error">{errors.mobileNumber.message}</em>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 signup-form-field mb-3">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <em className="form-error">{errors.password.message}</em>
                )}
              </div>
              <div className="col-md-6 signup-form-field">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <em className="form-error">
                    {errors.confirmPassword.message}
                  </em>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary signup-btn btn-red"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

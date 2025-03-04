import React, { useState } from "react";
import MyAccount from "../MyAccount";
import "./ChangePassword.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changePassword } from "../../../api/userApi"; // Import the changePassword function

// Define the validation schema using Zod
const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long."),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match.",
    path: ["confirmPassword"], // This will highlight the confirmPassword field
  });

const ChangePassword = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Destructure reset method
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setError(""); // Reset error message
    setSuccess(""); // Reset success message

    try {
      // Call the changePassword function from userApi
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      // Handle success response
      setSuccess("Password changed successfully!");

      // Reset the form values to blank
      reset(); // Reset the form fields
    } catch (err) {
      // Handle error response
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <MyAccount>
      <div>
        <div className="changepassword-main">
          <div className="changepassword-container">
            <h3 className="text-center changepassword-header">
              Change Password
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <div className="form-group">
                <label htmlFor="currentpassword" className="w-100">
                  Current Password
                </label>
                <input
                  type="password" // Change type to password for security
                  className="form-control w-100 changepassword-inputbox"
                  id="currentpassword"
                  placeholder="Enter your current password"
                  {...register("currentPassword")}
                />
                {errors.currentPassword && (
                  <span className="error">
                    {errors.currentPassword.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="newpassword" className="w-100">
                  New Password
                </label>
                <input
                  type="password" // Change type to password for security
                  className="form-control w-100 changepassword-inputbox"
                  id="newpassword"
                  placeholder="New Password"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <span className="error">{errors.newPassword.message}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="conformpassword" className="w-100">
                  Confirm Password
                </label>
                <input
                  type="password" // Change type to password for security
                  className="form-control w-100 changepassword-inputbox"
                  id="conformpassword"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className="error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 changepassword-btn btn-red"
              >
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

import { React, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import Layout from '../Layout/Layout';
import resetPasswordApi from '../../api/resetPasswordApi'; // Import the API function
import './ResetPassword.css';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the validation schema using zod
const schema = z.object({
  newPassword: z
    .string()
    .nonempty("New Password is required.")
    .min(6, "Password must be at least 6 characters long."),
  confirmPassword: z
    .string()
    .nonempty("Confirm Password is required.")
    .min(6, "Password must be at least 6 characters long."),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords must match.",
  path: ["confirmPassword"], // This will highlight the confirmPassword field
});

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setMessage('');
    setError('');

    try {
      // Call the reset password API with the token and new password
      const response = await resetPasswordApi(token, data.newPassword);
      setMessage(response.message); // Set success message
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <Layout>
      <div className='reset-password-outer-container'>
        <div className="reset-password-container">
          <h2>Reset Password</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`} // Add Bootstrap invalid class
                id="newPassword"
                placeholder="Enter new password"
                {...register("newPassword")} // Register the input with react-hook-form
              />
              {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>} {/* Display error message */}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} // Add Bootstrap invalid class
                id="confirmPassword"
                placeholder="Confirm new password"
                {...register("confirmPassword")} // Register the input with react-hook-form
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>} {/* Display error message */}
            </div>
            <button type="submit" className="btn-red reset-password-btn btn btn-primary">Reset Password</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
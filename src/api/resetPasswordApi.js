// src/api/resetPasswordApi.js
import apiClient from "./apiClient";

const resetPasswordApi = async (token, newPassword) => {
  try {
    // Construct the URL with the actual token
    const response = await apiClient.post(`/user/reset-password/${token}`, {
      password: newPassword, // Send only the new password in the body
    });
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred. Please try again.');
  }
};

export default resetPasswordApi;
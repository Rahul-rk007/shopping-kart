import apiClient from "./apiClient";

export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post("/user/forgot-password", { email });
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};
import apiClient from "./apiClient"; // Import the Axios instance
import { jwtDecode } from "jwt-decode";
const tokenName = "token";

// Function to handle user login
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/user/login", { email, password });
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Login failed. Please try again."; // Handle errors
  }
};

// Function to handle user signup
export const signupUser = async (userData) => {
  try {
    const response = await apiClient.post("/user/signup", userData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Signup failed. Please try again."; // Handle errors
  }
};

export const getUser = () => {
  const token = localStorage.getItem("token"); // Ensure you're getting the token from local storage
  if (!token) {
    return null; // Return null if no token is found
  }
  try {
    return jwtDecode(token); // Decode the token
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null if there's an error decoding the token
  }
};

export const getJwt = () => {
  return localStorage.getItem(tokenName);
};

export const logout = () => {
  localStorage.removeItem(tokenName);
};

// Function to get user details
export const userProfile = async (userData) => {
  try {
    const response = await apiClient.get("/user/profile", userData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Something went wrong!"; // Handle errors
  }
};

// Function to update user details
export const editUserProfile = async (userData) => {
  try {
    const response = await apiClient.put("/user/profile", userData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Something went wrong!"; // Handle errors
  }
};

// Function to update user password
export const changePassword = async (userData) => {
  try {
    const response = await apiClient.post("/user/change-password", userData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Something went wrong!"; // Handle errors
  }
};

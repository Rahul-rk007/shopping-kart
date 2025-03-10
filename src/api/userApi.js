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
  const jwt = localStorage.getItem("token");

  // Check if the token exists and is a valid string
  if (!jwt) {
    return null; // or throw an error, or return an empty object, depending on your needs
  }

  try {
    return jwtDecode(jwt);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null; // Return null if decoding fails
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

// src/api/wishlistApi.js
import apiClient from "./apiClient"; // Import the Axios instance

// Function to add a product to the wishlist
export const addToWishlist = async (product) => {
  try {
    
    const response = await apiClient.post(`/wishlist/products`, product);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Failed to add to wishlist. Please try again."; // Handle errors
  }
};

// Function to get a user's wishlist
export const getWishlist = async () => {
  try {
    const response = await apiClient.get(`/wishlist`);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Failed to fetch wishlist. Please try again."; // Handle errors
  }
};

// Function to remove a product from the wishlist
export const removeFromWishlist = async (productId) => {
  try {
    const response = await apiClient.delete(`/wishlist/${productId}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Failed to remove from wishlist:", error); // Log the error
    throw error.response?.data || "Failed to remove from wishlist. Please try again."; // Handle errors
  }
};
import apiClient from "./apiClient";

export const checkout = async (orderData) => {
  try {
    const response = await apiClient.post("/order/checkout", orderData); // Adjust the endpoint as necessary
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Something went wrong! Please try again."; // Handle errors
  }
};

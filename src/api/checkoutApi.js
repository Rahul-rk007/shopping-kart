import apiClient from "./apiClient";

// Function to create a PayPal payment
export const createPayPalPayment = async (total) => {
  try {
    const response = await apiClient.post(`/payment/createpayment`, { total });
    return response.data; // Return the payment response
  } catch (error) {
    throw new Error("Error creating PayPal payment: " + error.message);
  }
};


export const fetchSuccessMessage = async () => {
  try {
    const response = await apiClient.get("/payment/success");
    return response.data; // Assuming the response contains the message
  } catch (error) {
    console.error('Error fetching success message:', error);
    throw error; // Rethrow the error for handling in the component
  }
};


export const fetchCancelMessage = async () => {
  try {
    const response = await apiClient.get("/payment/cancel");
    return response.data; // Assuming the response contains the message
  } catch (error) {
    console.error('Error fetching cancel message:', error);
    throw error; // Rethrow the error for handling in the component
  }
};


// Function to handle the checkout process
export const checkout = async (orderData) => {
  try {
    const response = await apiClient.post(`/checkout`, orderData);
    return response.data; // Return the checkout response
  } catch (error) {
    throw new Error("Checkout failed: " + error.message);
  }
};


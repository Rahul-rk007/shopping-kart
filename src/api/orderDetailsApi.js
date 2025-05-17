import apiClient from "./apiClient";

export const getOrderDetails = async (orderId) => {
  try {
    const response = await apiClient.get(`/order/detail/${orderId}`);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while fetching order details.";
  }
};


export const cancelOrder = async (orderId) => {
  try {
    const response = await apiClient.patch(`/order/${orderId}/cancel`);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error('Failed to cancel order: ' + error.message);
  }
};

export const getUserProfile = async () => {
  try {
  const response = await apiClient.get('/user/profile')
  return response.data;
    }
   catch (error) {
    throw error.response?.data || "Something went wrong!"; 
  }
};


import apiClient from "./apiClient";

export const getOrderList = async () => {
  try {
    const response = await apiClient.get('/order/list');
    return response.data; 
  } catch (error) {
    throw error.response?.data || "Something went wrong!"; 
  }
};


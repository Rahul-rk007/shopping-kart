import apiClient from "./apiClient";

export const productList = async (limit = 9, offset = 0) => {
  try {
    const response = await apiClient.get('/product', {
      params: { limit, offset } // Pass limit and offset as query parameters
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || 'Something went wrong!.'; // Handle errors
  }
}

// New function to fetch product details by ID
export const getProductDetails = async (id) => {
  try {
    const response = await apiClient.get(`/product/${id}`);
    console.log(response.data);
    
    return response.data; // Return the product details
  } catch (error) {
    throw error.response?.data || 'Something went wrong!.'; // Handle errors
  }
}
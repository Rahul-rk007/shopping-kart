import apiClient from "./apiClient";

export const productList = async (limit = 9, offset = 0, subcategoryId) => {
  try {
    const response = await apiClient.get("/product", {
      params: { limit, offset, subcategoryId }, // Pass limit and offset as query parameters
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Something went wrong!."; // Handle errors
  }
};

// New function to fetch product details by ID
export const getProductDetails = async (id) => {
  try {
    const response = await apiClient.get(`/product/detail/${id}`);

    return response.data; // Return the product details
  } catch (error) {
    throw error.response?.data || "Something went wrong!."; // Handle errors
  }
};

export const newArrivalProductList = async (
  limit = 6,
  offset = 0,
  category = "All"
) => {
  try {
    const response = await apiClient.get(`/product/new-arrivals`, {
      params: { limit, offset, category }, // Pass limit, offset, and category as query parameters
    });

    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Something went wrong!"; // Handle errors
  }
};

export const fetchCategoriesWithSubcategories = async () => {
  try {
    const response = await apiClient.get(
      "/subcategory/list/categories-subcategories"
    );

    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};

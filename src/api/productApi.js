import apiClient from "./apiClient";

export const productList = async (
  limit = 9,
  offset = 0,
  subcategoryId,
  priceRange = [0, 3000], // Default price range
  color // Single color instead of an array
) => {
  try {
    const params = {
      limit,
      offset,
      subcategoryId,
      ...(priceRange &&
        priceRange.length === 2 && {
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        }),
      ...(color && { color }), // Only include color if it is provided
    };

    const response = await apiClient.get("/product", { params });
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

export const fetchColorCounts = async ({
  subcategoryId,
  minPrice,
  maxPrice,
}) => {
  try {
    const response = await apiClient.get(`/product/colors`, {
      params: {
        subcategoryId,
        minPrice,
        maxPrice,
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching color counts:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};

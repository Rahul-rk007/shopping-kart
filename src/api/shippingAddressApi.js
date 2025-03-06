import apiClient from "./apiClient";

export const addShippingAddress = async (data) => {
  try {
    const response = await apiClient.post("/shipping-addresses", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || "failed, Please try again.";
  }
};

export const getAllShippingAddresses = async () => {
  try {
    return await apiClient.get("/shipping-addresses"); // Adjust the endpoint as necessary
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};

export const getAddress = async (data) => {
  try {
    const response = await apiClient.get(``);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};

export const editAddress = async (id, data) => {
  try {
    const response = await apiClient.put(`/shipping-addresses/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await apiClient.delete(`/shipping-addresses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};
export const countryList = async () => {
  try {
    const response = await apiClient.get("/state/countries");
    return response;
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};

export const stateList = async (id) => {
  try {
    const response = await apiClient.get(`/state/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};

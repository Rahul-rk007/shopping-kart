import apiClient from "./apiClient";

export const addContact = async (contactData) => {
  try {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
  } catch (error) {
       
      throw error.response?.data || "Failed, please try again.";
  }
};
import apiClient from './apiClient'; // Import the Axios instance

// Function to handle user login
export const loginUser  = async (email, password) => {
  try {
    const response = await apiClient.post('/user/login', { email, password });
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || 'Login failed. Please try again.'; // Handle errors
  }
};

// Function to handle user signup
export const signupUser  = async (userData) => {
  try {
    const response = await apiClient.post('/user/signup', userData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || 'Signup failed. Please try again.'; // Handle errors
  }
};
import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient; // Export the Axios instance if needed
import apiClient from "./apiClient";

const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = token;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;

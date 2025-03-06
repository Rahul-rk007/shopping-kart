import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null;
  const [hasShownToast, setHasShownToast] = useState(false);

  // Define the checkTokenExpiry function outside of useEffect
  const checkTokenExpiry = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp < currentTime; // Check if token is expired
    }
    return true; // If no token, consider it expired
  };

  useEffect(() => {
    if (!isAuthenticated || checkTokenExpiry()) {
      if (!hasShownToast) {
        toast.error("You need to log in to access this page.");
        setHasShownToast(true);
      }
      navigate("/login");
    }
  }, [isAuthenticated, hasShownToast, navigate, token]);

  // Check token expiry again before rendering the element
  if (isAuthenticated && !checkTokenExpiry()) {
    return element; // Render the protected element
  }

  return null; // Return null if not authenticated or token expired
};

export default PrivateRoute;

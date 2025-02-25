import React, { useEffect } from "react";
import { logout } from "../../api/userApi";

const Logout = () => {
  useEffect(() => {
    logout();
    window.location = "/";
  }, []);
  return null;
};

export default Logout;

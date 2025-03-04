import React, { useState, useEffect, useRef, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Routes from "./components/Routes/Routing";
import { getJwt, getUser } from "./api/userApi";
import UserContext from "./context/UserContext";
import setAuthToken from "./api/setAuthToken";

setAuthToken(getJwt());

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      const jwtUser = getUser(); // Call the getUser  function
      if (jwtUser && Date.now() < jwtUser.exp * 1000) {
        setUser(jwtUser); // Set the user state
      } else {
        localStorage.removeItem("token");
        setUser(null); // Clear user state
      }
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
      setUser(null); // Clear user state in case of an error
    }
  }, []);
  return (
    <UserContext.Provider value={user}>
      <ToastContainer />
      <main>
        <Routes />
      </main>
    </UserContext.Provider>
  );
}

export default App;

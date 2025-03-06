import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Routes from "./components/Routes/Routing";
import { getJwt, getUser } from "./api/userApi";
import UserContext from "./context/UserContext";
import setAuthToken from "./api/setAuthToken";
import Login from "./components/Login/Login"; // Import Login component

setAuthToken(getJwt());

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwtUser = getUser(); // Call the getUser  function
    if (jwtUser && Date.now() < jwtUser.exp * 1000) {
      setUser(jwtUser); // Set the user state
    } else {
      localStorage.removeItem("token");
      setUser(null); // Clear user state
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ToastContainer />
      <main>
        <Routes setUser={setUser} /> {/* Pass setUser  to Routes */}
      </main>
    </UserContext.Provider>
  );
}

export default App;

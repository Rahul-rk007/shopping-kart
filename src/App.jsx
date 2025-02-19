import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "./App.css";
import Routes from "./components/Routes/Routing";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes />
    </>
  );
}

export default App;

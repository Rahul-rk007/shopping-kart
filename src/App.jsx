import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Routes from "./components/Routes/Routing";
import { getJwt, getUser } from "./api/userApi";
import UserContext from "./context/UserContext";
import setAuthToken from "./api/setAuthToken";
import CartContext from "./context/CartContext";
import {
  addToCartAPI,
  descreaseCartApi,
  getCartApi,
  increaseCartApi,
  removeFromCartApi,
} from "../src/api/cartApi"; // Adjust the import path as necessary

setAuthToken(getJwt());

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const jwtUser = getUser(); // Call the getUser  function
    if (jwtUser && Date.now() < jwtUser.exp * 1000) {
      setUser(jwtUser); // Set the user state
    } else {
      localStorage.removeItem("token");
      setUser(null); // Clear user state
    }
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = Array.isArray(cart) ? [...cart] : [];

    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );

    if (productIndex === -1) {
      updatedCart.push({ product, quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error adding to cart");
        setCart(cart); // Revert to previous cart state
      });
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart.products];
    console.log("old=>", oldCart);
    const newCart = oldCart.filter((item) => item.product._id !== id);
    console.log("new=>", newCart);

    setCart(newCart);

    removeFromCartApi(id)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        setCart(oldCart); // Revert to previous cart state
        toast.error("Something went wrong!");
      });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart.products];
    const updatedCart = [...cart.products];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );

    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart({ products: updatedCart }); // Update cart with the new products array
      increaseCartApi(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart({ products: oldCart }); // Revert to previous cart state
      });
    } else if (type === "decrease") {
      if (updatedCart[productIndex].quantity > 1) {
        updatedCart[productIndex].quantity -= 1;
        setCart({ products: updatedCart }); // Update cart with the new products array
        descreaseCartApi(id).catch((err) => {
          toast.error("Something went wrong!");
          setCart({ products: oldCart }); // Revert to previous cart state
        });
      } else {
        removeFromCart(id); // Remove item if quantity is 1
      }
    }
  };

  const getCart = () => {
    getCartApi()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    if (user) {
      getCart(); // Fetch cart when user is authenticated
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <ToastContainer />
        <main>
          <Routes setUser={setUser} />
        </main>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

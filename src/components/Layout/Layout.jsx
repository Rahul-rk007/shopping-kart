// src/components/Layout.js
import React, { useState } from "react";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import Header from "../Header/Header";
import Discount from "../Discount/Discount";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div id="wrapper" className={isMenuOpen ? "karl-side-menu-open" : ""}>
      <CategoriesMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
      <Header onToggleMenu={toggleMenu} />
      <Discount />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

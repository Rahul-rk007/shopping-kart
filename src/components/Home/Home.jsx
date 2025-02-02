import React, { useState } from "react";

import "./Home.css";
import product1 from "../../assets/product-img/product-1.jpg";
import product2 from "../../assets/product-img/product-2.jpg";
import product3 from "../../assets/product-img/product-3.jpg";
import product4 from "../../assets/product-img/product-4.jpg";
import product5 from "../../assets/product-img/product-5.jpg";
import product6 from "../../assets/product-img/product-6.jpg";

import Header from "../Header/Header";
import Discount from "../Discount/Discount";
import Welcome from "../Welcome/Welcome";
import CategoryArea from "../CategoryArea/CategoryArea";
import QuickViewModal from "../QuickViewModal/QuickViewModal";
import NewArrivals from "../NewArrivals/NewArrivals";
import OfferArea from "../OfferArea/OfferArea";
import Footer from "../Footer/Footer";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";

const Home = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const products = [
    {
      image: product1,
      name: "Jeans Midi Cocktail Dress",
      price: 39.9,
      description: "Stylish and comfortable dress.",
      category: "women",
      delay: "0.2s",
      originalPrice: 49.9,
    },
    {
      image: product2,
      name: "Elegant Evening Dress",
      price: 39.9,
      description: "Perfect for evening events.",
      category: "women",
      delay: "0.3s",
      originalPrice: 49.9,
    },
    {
      image: product3,
      name: "Casual Summer Dress",
      price: 39.9,
      description: "Light and breezy for summer.",
      category: "access",
      delay: "0.4s",
      originalPrice: 49.9,
    },
    {
      image: product4,
      name: "Trendy Sneakers",
      price: 39.9,
      description: "Comfortable and stylish sneakers.",
      category: "shoes",
      delay: "0.5s",
      originalPrice: 49.9,
    },
    {
      image: product5,
      name: "Classic Handbag",
      price: 39.9,
      description: "A timeless accessory.",
      category: "women",
      delay: "0.6s",
      originalPrice: 49.9,
    },
    {
      image: product6,
      name: "Kids Play Shoes",
      price: 39.9,
      description: "Durable shoes for kids.",
      category: "kids man",
      delay: "0.7s",
      originalPrice: 49.9,
    },
  ];

  const handleQuickViewOpen = (product) => {
    const scrollY = window.scrollY; // Capture the current scroll position
    setScrollPosition(scrollY); // Set the scroll position in state
    setSelectedProduct(product); // Set the selected product
    setModalOpen(true); // Open the modal
  };

  const handleQuickViewClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    window.scrollTo(0, scrollPosition);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <CategoriesMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />

      <div id="wrapper" className={isMenuOpen ? "karl-side-menu-open" : ""}>
        <Header onToggleMenu={toggleMenu} />

        <Discount />

        <Welcome />

        <CategoryArea />

        <NewArrivals products={products} onQuickView={handleQuickViewOpen} />
        <QuickViewModal
          isOpen={isModalOpen}
          onClose={handleQuickViewClose}
          product={selectedProduct}
          scrollPosition={scrollPosition}
        />

        <OfferArea />

        <Footer />
      </div>
    </>
  );
};

export default Home;

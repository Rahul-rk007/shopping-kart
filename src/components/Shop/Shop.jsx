import React, { useState } from "react";
import QuickViewModal from "../QuickViewModal/QuickViewModal";
import Sidebar from "../Sidebar/Sidebar";
import ProductGrid from "../ProductGrid/ProductGrid";
import Layout from "../Layout/Layout";

import product1 from "../../assets/product-img/product-1.jpg";
import product2 from "../../assets/product-img/product-2.jpg";
import product3 from "../../assets/product-img/product-3.jpg";
import product4 from "../../assets/product-img/product-4.jpg";
import product5 from "../../assets/product-img/product-5.jpg";
import product6 from "../../assets/product-img/product-6.jpg";
import product7 from "../../assets/product-img/product-7.jpg";
import product8 from "../../assets/product-img/product-8.jpg";
import product9 from "../../assets/product-img/product-9.jpg";

const Shop = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      image: product1,
      name: "Jeans midi cocktail dress",
      price: "39.90",
      description: "Stylish jeans midi cocktail dress",
      originalPrice: "49.90",
    },
    {
      image: product2,
      name: "Elegant Maxi Dress",
      price: "59.90",
      description: "Elegant maxi dress for special occasions",
      originalPrice: "69.90",
    },
    {
      image: product3,
      name: "Casual T-shirt",
      price: "19.90",
      description: "Comfortable casual t-shirt",
      originalPrice: "29.90",
    },
    {
      image: product4,
      name: "Stylish Handbag",
      price: "49.90",
      description: "Stylish handbag for everyday use",
      originalPrice: "59.90",
    },
    {
      image: product5,
      name: "Trendy Sneakers",
      price: "79.90",
      description: "Trendy sneakers for casual wear",
      originalPrice: "89.90",
    },
    {
      image: product6,
      name: "Classic Watch",
      price: "99.90",
      description: "Classic watch for all occasions",
      originalPrice: "109.90",
    },
    {
      image: product7,
      name: "Summer Hat",
      price: "29.90",
      description: "Stylish summer hat",
      originalPrice: "39.90",
    },
    {
      image: product8,
      name: "Leather Wallet",
      price: "39.90",
      description: "Genuine leather wallet",
      originalPrice: "49.90",
    },
    {
      image: product9,
      name: "Sporty Backpack",
      price: "59.90",
      description: "Durable sporty backpack",
      originalPrice: "69.90",
    },
  ];

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <Layout>
      <section className="shop_grid_area section_padding_100">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <Sidebar />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <ProductGrid products={products} onQuickView={handleQuickView} />
            </div>
          </div>
        </div>
        <QuickViewModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          product={selectedProduct}
        />
      </section>
    </Layout>
  );
};

export default Shop;

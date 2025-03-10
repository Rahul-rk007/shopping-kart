import React, { useState, useEffect, useRef } from "react";
import QuickViewModal from "../QuickViewModal/QuickViewModal";
import Sidebar from "../Sidebar/Sidebar";
import ProductGrid from "../ProductGrid/ProductGrid";
import Layout from "../Layout/Layout";
import { productList } from "../../api/productApi";

const Shop = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState({
    total: 0,
    limit: 9,
    offset: 0,
    products: [],
  });
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);
  const [priceRange, setPriceRange] = useState([0, 3000]); // Default price range
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null); // Track selected subcategory

  // Function to fetch products
  const fetchProducts = async (subcategoryId = selectedSubcategoryId) => {
    setLoading(true);
    if (subcategoryId !== selectedSubcategoryId) {
      products.offset = 0;
    }

    try {
      const response = await productList(
        products.limit,
        products.offset,
        subcategoryId,
        priceRange,
        selectedColor
      );
      console.log("API Response:", response);
      setProducts((prev) => ({
        ...prev,
        total: response.total,
        products: [...prev.products, ...response.products],
        offset: prev.offset + response.products.length,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial products when the component mounts
  useEffect(() => {
    if (!hasFetched.current) {
      fetchProducts();
      hasFetched.current = true;
    }
  }, []);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleLoadMore = () => {
    setProducts((prev) => ({ ...prev, offset: prev.offset }));
    fetchProducts();
  };

  const handleCategorySelect = async (subcategoryId) => {
    setProducts((prev) => ({
      limit: 9,
      total: 0,
      products: [],
      offset: 0,
    }));
    //setProducts({ total: 0, limit: 9, offset: 0, products: [] }); // Reset products and offset
    setSelectedSubcategoryId(subcategoryId); // Update selected subcategory
    fetchProducts(subcategoryId);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    setProducts({ total: 0, limit: 9, offset: 0, products: [] }); // Reset products and offset
    fetchProducts(selectedSubcategoryId); // Fetch products with the new price range and current category
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color); // Set the selected color
    setProducts({ total: 0, limit: 9, offset: 0, products: [] }); // Reset products and offset
    fetchProducts(selectedSubcategoryId); // Fetch products with the selected color and current category
  };

  return (
    <Layout>
      <section className="shop_grid_area section_padding_100 bg-color">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <Sidebar
                onCategorySelect={handleCategorySelect}
                onPriceRangeChange={handlePriceRangeChange}
                onColorSelect={handleColorSelect}
              />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              {products.total <= 0 ? (
                <div className="no-data-section">
                  <h2>No Data Available</h2>
                  <p>Sorry, there are no products available at this time.</p>
                </div>
              ) : (
                <>
                  <ProductGrid
                    products={products.products}
                    onQuickView={handleQuickView}
                  />
                  {products.offset < products.total && (
                    <div className="d-flex justify-content-center mt-3">
                      <button
                        onClick={handleLoadMore}
                        className="btn btn-danger load-more-button"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Load More"}
                      </button>
                    </div>
                  )}
                </>
              )}
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

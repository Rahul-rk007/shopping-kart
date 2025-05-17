import React, { useState, useEffect, useContext } from "react";
import "./ProductDetails.css";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../api/productApi";
import CartContext from "../../context/CartContext";
import UserContext from "../../context/UserContext";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to hold product details
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleQuantityChange = (change) => {
    setQuantity((prev) => {
      const newQuantity = prev + change;
      return newQuantity < 1 ? 1 : newQuantity > 12 ? 12 : newQuantity;
    });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          const data = await getProductDetails(id); // Fetch product details by ID
          setProduct(data); // Set the product details in state
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        console.error("Product ID is undefined");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); // Fetch product details when the component mounts or when the ID changes

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (user) {
      addToCart(product, quantity); // Call addToCart with the product and quantity
    } else {
      localStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({ product, quantity })
      ); // Store product and quantity
      navigate("/login"); // Redirect to login page
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!product) {
    return <div>No product found.</div>; // Handle case where product is not found
  }

  return (
    <Layout>
      <div className="breadcumb_area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ol className="breadcrumb d-flex align-items-center">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                {product.CategoryID && (
                  <li className="breadcrumb-item">
                    <a href="#">{product.CategoryID.CategoryName}</a>
                  </li>
                )}
                {product.SubcategoryID && (
                  <li className="breadcrumb-item active">
                    {product.SubcategoryID.SubcategoryName}
                  </li>
                )}
              </ol>

              <a href="#" className="backToHome d-block">
                <i className="fa fa-angle-double-left"></i> Back to Category
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="single_product_details_area section_padding_0_100">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="single_product_thumb">
                <div
                  id="product_details_slider"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    {product.ImageURLs.map((image, index) => (
                      <li
                        key={index}
                        data-target="#product_details_slider"
                        data-slide-to={index}
                        style={{ backgroundImage: `url(${image})` }}
                      ></li>
                    ))}
                  </ol>

                  <div className="carousel-inner">
                  {product.ImageURLs.map((image, index) => (
                      <div
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                        key={index}
                      >
                        <a className="gallery_img" href={image}>
                          <img
                            className="d-block w-100"
                            src={image}
                            alt={`Slide ${index + 1}`}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="single_product_desc">
                <h4 className="title">
                  <a href="#">{product.ProductName}</a>
                </h4>
                <h4 className="price">Rs. {product.Price}</h4>
                <p className="available">
                  Available: <span className="text-muted">In Stock</span>
                </p>

                <div className="single_product_ratings mb-15">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </div>

                <form
                  className="cart clearfix mb-50 d-flex"
                  onSubmit={handleAddToCart}
                  method="post"
                >
                  <div className="quantity">
                    <span
                      className="qty-minus"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </span>
                    <input
                      type="number"
                      className="qty-text"
                      id="qty"
                      step="1"
                      min="1"
                      max="12"
                      name="quantity"
                      value={quantity}
                      readOnly
                    />
                    <span
                      className="qty-plus"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </span>
                  </div>
                  <button
                    type="submit"
                    name="addtocart"
                    value="5"
                    className="btn cart-submit d-block"
                  >
                    Add to cart
                  </button>
                </form>

                <div id="accordion" role="tablist">
                  <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                      <h6 className="mb-0">
                        <a
                          data-toggle="collapse"
                          href="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Information
                        </a>
                      </h6>
                    </div>

                    <div
                      id="collapseOne"
                      className="collapse show"
                      role="tabpanel"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Proin pharetra tempor sodales. Phasellus
                          sagittis auctor gravida. Integer bibendum sodales arcu
                          id tempus. Ut consectetur lacus.
                        </p>
                        <p>
                          Approx length 66cm/26" (Based on a UK size 8 sample)
                          Mixed fibres
                        </p>
                        <p>
                          The Model wears a UK size 8/ EU size 36/ US size 4 and
                          her height is 5'8"
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="headingTwo">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Cart Details
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Explicabo quis in veritatis officia inventore,
                          tempore provident dignissimos nemo,nulla quaerat. Quibusdam non, eos, voluptatem reprehenderit hic nam!
                          Laboriosam, sapiente! Praesentium.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Officia magnam laborum eaque.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="headingThree">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Shipping &amp; Returns
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Esse quo sint repudiandae suscipit ab soluta
                          delectus voluptate, vero vitae, tempore maxime rerum
                          iste dolorem mollitia perferendis distinctio.
                          Quibusdam laboriosam rerum distinctio. Repudiandae
                          fugit odit, sequi id!
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Beatae qui maxime consequatur laudantium
                          temporibus ad et. A optio inventore deleniti ipsa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
import React, { useEffect, useState, useContext } from "react";
import MyAccount from "../MyAccount";
import "./Wishlist.css";
import { getWishlist, removeFromWishlist } from "../../../api/wishlistApi"; // Import the wishlist API functions
import { addToCartAPI } from "../../../api/cartApi"; // Import the addToCartAPI function
import UserContext from "../../../context/UserContext"; // Import UserContext
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext); // Get the user context

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const data = await getWishlist(); // Fetch the wishlist using the user's ID
          setWishlistItems(data.products); // Set the fetched products to state
        } catch (error) {
          console.error("Failed to fetch wishlist:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setLoading(false); // If no user, stop loading
      }
    };

    fetchWishlist(); // Call the fetch function
  }, [user]); // Run effect when user changes

  const handleRemoveFromWishlist = async (productId) => {
    console.log("Removing product with ID:", productId);
    if (user) {
      try {
        await removeFromWishlist(productId);
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item.product.toString() !== productId)
        );
        toast.success("Product removed from wishlist successfully!"); // Show success toast
      } catch (error) {
        console.error("Failed to remove from wishlist:", error);
        toast.error("Failed to remove product from wishlist."); // Show error toast
      }
    }
  };

  const handleAddToCart = async (productId) => {
    console.log("Adding product to cart with ID:", productId);
    if (user) {
      try {
        // Assuming a default quantity of 1 for simplicity
        await addToCartAPI(productId, 1);
        toast.success("Product added to cart successfully!"); // Show success toast
      } catch (error) {
        console.error("Failed to add to cart:", error);
        toast.error("Failed to add product to cart."); // Show error toast
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <MyAccount>
      <div>
        <div className="wishlist-body-content">
          <div className="container">
            <div className="my-wishlist-page">
              <div className="row">
                <div className="col-md-10 my-wishlist wishlist-tablebody">
                  <div className="table-responsive">
                    <h2
                      colSpan="4"
                      className="wishlist-heading-title wishlist-title"
                    >
                      My Wishlist
                    </h2>
                    <div className="wishlist-table-container">
                      <table className="table wishlist-table">
                        <tbody>
                          {wishlistItems.length > 0 ? (
                            wishlistItems.map((item, index) => (
                              <tr key={`${item.product}-${index}`}>
                                <td className="col-md-2 col-sm-6 col-xs-6">
                                  <img
                                    src={item.image}
                                    alt={item.productName}
                                  />
                                </td>
                                <td className="col-md-7 col-sm-6 col-xs-6">
                                  <div className="wishlist-product-name wishlist-product-details">
                                    <a href={`/product/${item.product}`}>
                                      {item.productName}
                                    </a>
                                  </div>
                                  <div className="wishlist-rating wishlist-product-details">
                                    {[...Array(5)].map((_, starIndex) => (
                                      <i
                                        key={starIndex}
                                        className="fa fa-star rate"
                                        aria-hidden="true"
                                      ></i>
                                    ))}
                                    <span className="review wishlist-reviews">
                                      ( 06 Reviews )
                                    </span>
                                  </div>
                                  <div className="wishlist-price wishlist-price wishlist-product-details">
                                    Rs. {item.price}{" "}
                                    <span> {item.originalPrice}</span>
                                  </div>
                                </td>
                                <td className="col-md-2">
                                  <button
                                    onClick={() =>
                                      handleAddToCart(item.product)
                                    }
                                    className="wishlist-btn-upper btn btn-primary wishlist-btnaddtocart btn-red"
                                  >
                                    Add to cart
                                  </button>
                                </td>
                                <td className="col-md-1 wishlist-close-btn">
                                  <button
                                    onClick={() =>
                                      handleRemoveFromWishlist(item.product._id)
                                    }
                                    className="btn"
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">
                                Your wishlist is empty.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Brands Carousel */}
              <div
                id="brands-carousel"
                className="wishlist-logo-slider wow fadeInUp"
              >
                <div className="wishlist-logo-slider-inner">
                  <div
                    id="brand-slider"
                    className="owl-carousel brand-slider custom-carousel owl-theme"
                  >
                    {Array.from({ length: 10 }, (_, index) => (
                      <div className="item m-t-15" key={index}>
                        <a href="#" className="image">
                          <img
                            data-echo={`assets/images/brands/brand${
                              (index % 6) + 1
                            }.png`}
                            src={`assets/images/brands/brand${
                              (index % 6) + 1
                            }.png`}
                            alt={`Brand ${index + 1}`}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer /> {/* Add ToastContainer here */}
      </div>
    </MyAccount>
  );
};

export default Wishlist;

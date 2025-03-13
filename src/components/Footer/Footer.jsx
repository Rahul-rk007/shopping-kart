import React from "react";
import "./Footer.css";
import LOGO from "../../assets/core-img/logo.png";

const Footer = () => {
  return (
    <footer className="footer_area">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="single_footer_area">
              <div className="footer-logo">
                <img src={LOGO} alt="" />
              </div>
              <div className="copywrite_text d-flex align-items-center">
                <p>
                  Copyright &copy; {new Date().getFullYear()} All rights
                  reserved
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <div className="single_footer_area">
              <ul className="footer_widget_menu">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Returns</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <div className="single_footer_area">
              <ul className="footer_widget_menu">
                <li>
                  <a href="#">My Account</a>
                </li>
                <li>
                  <a href="#">Shipping</a>
                </li>
                <li>
                  <a href="#">Our Policies</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="single_footer_area">
              <div className="footer_heading mb-30">
                <h6>Subscribe to our newsletter</h6>
              </div>
              <div className="subscribtion_form">
                <form action="#" method="post">
                  <input
                    type="email"
                    name="mail"
                    className="mail"
                    placeholder="Your email here"
                    required
                  />
                  <button type="submit" className="submit btn-red">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

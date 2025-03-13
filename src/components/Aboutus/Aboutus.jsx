import React from "react";
import Layout from "../Layout/Layout";
import "./Aboutus.css";
import AboutusImg from "../../assets/aboutus.jpg";

const Aboutus = () => {
  return (
    <Layout>
      <section className="about-us bg-color">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2>About Us</h2>
              <p>
                Welcome to Snappy Wish, your premier online shopping destination! Our dedicated team is here to provide you with a fun and hassle-free shopping experience. We offer a wide range of high-quality products, from trendy fashion to the latest gadgets, all curated to meet your needs.
              </p>
              <p>
                At Snappy Wish, customer satisfaction is our priority. Enjoy fast shipping, easy returns, and exceptional service. Thank you for choosing us we look forward to helping you find your next favorite item!
              </p>
            </div>
            <div className="col-lg-6">
              <img src={AboutusImg} alt="About Snappy Wish" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Aboutus;
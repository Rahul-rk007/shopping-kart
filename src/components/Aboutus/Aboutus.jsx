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
                Welcome to our website! We are a team of passionate individuals
                dedicated to providing the best services to our customers. Our
                mission is to deliver high-quality products that meet the needs
                of our clients.
              </p>
              <p>
                With years of experience in the industry, we understand the
                importance of customer satisfaction. Our team works tirelessly
                to ensure that every product we offer is crafted with care and
                precision.
              </p>
              <p>Thank you for choosing us. We look forward to serving you!</p>
            </div>
            <div className="col-lg-6">
              <img src={AboutusImg} alt="About Us" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Aboutus;

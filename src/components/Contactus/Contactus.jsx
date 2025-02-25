import React from "react";
import "./Contactus.css";
import Layout from "../Layout/Layout";
import { useState } from "react";
import PhoneImg from "../../assets/icon/phone.png";
import TextImg from "../../assets/icon/text.png";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to an API
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Layout>
      <div className="bg-color">
        <section className="bg-dark text-white text-center py-5 contactus-main">
          <h1 className="display-4 font-weight-bold">Get in touch</h1>
          <p className="lead mt-5">
            Want to get in touch? We'd love to hear from you. Here's how you can
            reach us.
          </p>
        </section>
        <section className="d-flex flex-column flex-md-row justify-content-center align-items-center py-5 contactus-cards">
          <div className="card text-center shadow-lg mb-4 mb-md-0 mx-2 contactus-card-1">
            <div className="card-body">
              <img src={PhoneImg} className="contactus-icon" />
              <h5 className="card-title">Talk to Sales</h5>
              <p className="card-text contactus-card-text">
                Interested in HubSpot’s software? Just pick up the phone to chat
                with a member of our sales team.
              </p>
              <a href="tel:0008000503669" className="d-block text-primary">
                000800 050 3669
              </a>
            </div>
          </div>
          <div className="card text-center shadow-lg mx-2 contactus-card-2">
            <div>
              {/* <img src={TextImg} class="icon" /> */}
              <div className="contact-us">
                <h2>Contact Us</h2>
                {submitted && <p>Thank you for your message!</p>}
                <form onSubmit={handleSubmit}>
                  <div className="contactus-form-group d-flex">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contactus-form-group d-flex">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contactus-form-group d-flex">
                    <label htmlFor="message">Message:</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button className="contactus-btn btn-red" type="submit">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contactus;

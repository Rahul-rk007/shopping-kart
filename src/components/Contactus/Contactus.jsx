import React from "react";
import "./Contactus.css";
import Layout from "../Layout/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneImg from "../../assets/icon/phone.png";
import { toast } from "react-toastify";
import { addContact } from "../../api/contactusApi";

const schema = z.object({
  name: z.string().nonempty("Name is required."),
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Invalid email address."),
    subject: z.string().nonempty("Subject is required."),
    message: z.string().nonempty("Message is required."),
});

const Contactus = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset here
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    console.log('Form Data:', formData); // Log the form data
    try {
        // const response = await addContact(formData);
        // console.log("Form submitted:", response);
        toast.success("Your message has been sent!");
        reset(); // Reset the form after successful submission
    } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Something went wrong!");
    }
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
              <img src={PhoneImg} className="contactus-icon" alt="Phone Icon" />
              <h5 className="card-title">Talk to Sales</h5>
              <p className="card-text contactus-card-text">
                Interested in our software? Just pick up the phone to chat with
                a member of our sales team.
              </p>
              <a href="tel:0008000503669" className="d-block text-primary">
                000800 050 3669
              </a>
            </div>
          </div>
          <div className="card text-center shadow-lg mx-2 contactus-card-2">
            <div className="contact-us">
              <h2>Contact Us</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="contactus-form-group d-flex">
                  <label htmlFor="name">Name:</label>
                  <div className="contactus-form-validation">
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <em className="form-error">{errors.name.message}</em>
                  )}
                  </div>
                </div>
                <div className="contactus-form-group d-flex">
                  <label htmlFor="email">Email:</label>
                  <div className="contactus-form-validation">
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <em className="form-error">{errors.email.message}</em>
                  )}
                  </div>
                </div>
                <div className="contactus-form-group d-flex">
                  <label htmlFor="subject">Subject:</label>
                  <div className="contactus-form-validation">
                  <input
                    type="text"
                    id="subject"
                    className="form-control"
                    placeholder="Enter the subject"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <em className="form-error">{errors.subject.message}</em>
                  )}
                  </div>
                </div>
                <div className="contactus-form-group d-flex">
                  <label htmlFor="message">Message:</label>
                  <div className="contactus-form-validation">
                  <textarea
                    id="message"
                    className="form-control"
                    placeholder="Enter your message"
                    {...register("message")}
                  ></textarea>
                  {errors.message && (
                    <em className="form-error">{errors.message.message}</em>
                  )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary contactus-btn btn-red"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contactus;

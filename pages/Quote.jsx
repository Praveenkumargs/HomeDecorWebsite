import React, { useState } from "react";
import "./Quote.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import API_URL from "../api";

function Quote() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Enquiry submitted:", data);

      setSubmitted(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    }
  }

  return (
    <>
      <SEO
        title="Book an Appointment | Lucky Home Decor"
        description="Contact Lucky Home Decor to discuss curtains, blinds, installation and home interior requirements in Bangalore."
        path="/quote"
      />
      <Header />

      <main className="quote-page">
        <section className="quote-hero">
          <p className="quote-label">GET IN TOUCH</p>

          <h1>
            Let's create something
            <span> beautiful.</span>
          </h1>

          <p>
            Tell us what you have in mind and our team will help you find the
            perfect solution for your space.
          </p>
        </section>

        <section className="quote-section">
          <div className="quote-info">
            <p className="quote-label">REQUEST A QUOTE</p>

            <h2>
              Bring your vision
              <br />
              to life.
            </h2>

            <p>
              Whether you're looking for elegant curtains, modern blinds, or
              custom sofa, we'd love to hear about your project.
            </p>
          </div>

          <div className="quote-form-container">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>

                <h3>Thank you!</h3>

                <p>
                  Your enquiry has been submitted successfully. We'll get back
                  to you soon.
                </p>

                <button onClick={() => setSubmitted(false)}>
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form className="quote-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label>What are you looking for?</label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service</option>

                    <option value="Curtains">Curtains</option>

                    <option value="Blinds">Blinds</option>

                    <option value="Sofa">Sofa</option>

                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tell us about your project</label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you have in mind..."
                    rows="5"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Send Enquiry
                  <span>→</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Quote;

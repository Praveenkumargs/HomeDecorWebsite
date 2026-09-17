import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PublicGallery from "../components/PublicGallery";
import SEO from "../components/SEO";
import API_URL from "../api";

import "./ProductPage.css";

function Curtains() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/products/1`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SEO 
        title="Custom Curtains in Bangalore | Lucky Home Decor"
        description="Explore custom curtains, curtain stitching and premium window solutions from Lucky Home Decor in Bangalore."
        path="/curtains"
      />
      <Header />

      <main className="product-page">
        {/* =====================================
                    CUSTOM CURTAINS
                ===================================== */}

        <section className="product-hero">
          <div className="product-image">
            <img src={product.image_url} alt={product.name} />
          </div>

          <div className="product-content">
            <p className="product-label">OUR COLLECTION</p>

            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <Link to="/quote" className="product-quote-btn">
              Book an Appointment →
            </Link>
          </div>
        </section>

        {/* =====================================
                    INSTALLATION LINK
                ===================================== */}

        <section className="product-installation-link">
          <div className="installation-link-content">
            <p>NEED INSTALLATION?</p>

            <h2>We also provide professional curtain & blind installation.</h2>
          </div>

          <Link to="/installation" className="installation-link-button">
            Explore Installation Services →
          </Link>
        </section>

        <PublicGallery
          category="curtains"
          title={
            <>
              Our Best
              <br />
              Curtain Work
            </>
          }
          description="A selection of curtains crafted and installed for beautiful homes and spaces."
        />
      </main>

      <Footer />
    </>
  );
}

export default Curtains;

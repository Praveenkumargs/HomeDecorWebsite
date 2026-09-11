import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./ProductPage.css";

function Curtains() {

    const [product, setProduct] = useState(null);

    useEffect(() => {

        fetch("http://localhost:3000/api/products/1")
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }, []);


    if (!product) {
        return <p>Loading...</p>;
    }


    return (

        <>
            <Header />

            <main className="product-page">

                {/* =====================================
                    CUSTOM CURTAINS
                ===================================== */}

                <section className="product-hero">

                    <div className="product-image">

                        <img
                            src={product.image_url}
                            alt={product.name}
                        />

                    </div>


                    <div className="product-content">

                        <p className="product-label">
                            OUR COLLECTION
                        </p>

                        <h1>
                            {product.name}
                        </h1>

                        <p>
                            {product.description}
                        </p>

                        <Link
                            to="/quote"
                            className="product-quote-btn"
                        >
                            Get a Quote →
                        </Link>

                    </div>

                </section>


                {/* =====================================
                    INSTALLATION LINK
                ===================================== */}

                <section className="product-installation-link">

                    <div className="installation-link-content">

                        <p>
                            NEED INSTALLATION?
                        </p>

                        <h2>
                            We also provide professional
                            curtain & blind installation.
                        </h2>

                    </div>


                    <Link
                        to="/installation"
                        className="installation-link-button"
                    >
                        Explore Installation Services →
                    </Link>

                </section>

            </main>

            <Footer />
        </>

    );

}

export default Curtains;
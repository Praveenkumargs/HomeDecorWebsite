import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./ProductPage.css";


function Sofa() {

    const [product, setProduct] = useState(null);

    useEffect(() => {

        fetch("http://localhost:3000/api/products/3")
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

                        <a
                            href="/quote"
                            className="product-quote-btn"
                        >
                            Get a Quote →
                        </a>

                    </div>

                </section>

            </main>

            <Footer />
        </>

    );

}

export default Sofa;
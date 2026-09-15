import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Collections.css";

function Collections() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetch("http://localhost:3000/api/products")

            .then((response) => response.json())

            .then((data) => {
                console.log("Products received:", data);
                setProducts(data);
            })

            .catch((error) => {
                console.error("Error fetching products:", error);
            });

    }, []);


    return (
        <section className="collections">

            {/* =========================
                SECTION HEADING
            ========================= */}

            <div className="collections-heading">

                <div className="collections-heading-title">

                    <p className="section-label">
                        OUR COLLECTION
                    </p>

                    <h2>
                        Designed for
                        <br />
                        <span>Beautiful Spaces.</span>
                    </h2>

                </div>


                <p className="section-description">
                    From timeless curtains to contemporary blinds,
                    discover beautifully crafted window solutions
                    designed to complement your lifestyle.
                </p>

            </div>


            {/* =========================
                COLLECTION CARDS
            ========================= */}

            <div className="collection-grid">

                {products.map((product) => (

                    <div
                        className="collection-card"
                        key={product.id}
                    >

                        <Link
                            to={`/${product.name.toLowerCase()}`}
                            className="collection-link"
                        >

                            {/* Image */}

                            <img
                                src={product.image_url}
                                alt={product.name}
                            />


                            {/* Dark overlay */}

                            <div className="card-overlay"></div>


                            {/* Card content */}

                            <div className="card-content">

                                <p>
                                    {String(product.id).padStart(2, "0")}
                                </p>

                                <h3>
                                    {product.name}
                                </h3>

                                <span>
                                    Explore Collection
                                    <strong>→</strong>
                                </span>

                            </div>

                        </Link>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default Collections;
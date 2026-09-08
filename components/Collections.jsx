import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Collections.css"

function Collections() {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((data) => {
            console.log("Products recieved: ", data);
            
            setProducts(data);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
    }, []);

    return (
        <section className="collections">

            {/* Section Heading */}

            <div className="collections-heading">

                <div>
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


            {/* Collection Cards */}

            <div className="collection-grid">

                {/* Curtains */}

                {products.map((product) => (

                    <div className="collection-card"
                        key={product.id}
                    >

                        <Link to={`/${product.name}`} className="card-content">
                            <img src={product.image_url} alt={product.name} />

                             <p>
                                {String(product.id).padStart(2,"0")}
                            </p>

                            <h3>
                                {product.name}
                            </h3>

                            <span>
                                {/* <Link to={`/${product.name}`}> */}
                                Explore Collection →
                                {/* </Link> */}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default Collections;
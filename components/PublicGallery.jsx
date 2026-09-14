import React, { useEffect, useState } from "react";
import "../css/PublicGallery.css";

function PublicGallery({ category, title, description }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch(
            `http://localhost:3000/api/gallery?category=${category}`
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch gallery");
                }

                return response.json();
            })
            .then(data => {
                setImages(data);
            })
            .catch(error => {
                console.error("Error fetching gallery:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [category]);


    // Close lightbox with Escape
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setSelectedImage(null);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, []);


    function getImageUrl(imageUrl) {
        return `http://localhost:3000${imageUrl}`;
    }


    return (
        <>
            <section className="public-gallery">

                {/* =========================
                    HEADING
                ========================= */}

                <div className="public-gallery-heading">

                    <div>
                        <p className="public-gallery-eyebrow">
                            OUR WORK
                        </p>

                        <h2>
                            {title}
                        </h2>
                    </div>

                    <p>
                        {description}
                    </p>

                </div>


                {/* =========================
                    LOADING
                ========================= */}

                {loading && (
                    <div className="public-gallery-message">
                        <p>Loading images...</p>
                    </div>
                )}


                {/* =========================
                    EMPTY
                ========================= */}

                {!loading && images.length === 0 && (
                    <div className="public-gallery-message">
                        <p>
                            Our latest work will be showcased here soon.
                        </p>
                    </div>
                )}


                {/* =========================
                    IMAGE GRID
                ========================= */}

                {!loading && images.length > 0 && (
                    <div className="public-gallery-grid">

                        {images.map((image, index) => (
                            <button
                                className={`public-gallery-item ${
                                    index === 0
                                        ? "gallery-item-large"
                                        : ""
                                }`}
                                key={image.id}
                                onClick={() =>
                                    setSelectedImage(image)
                                }
                                aria-label="View image"
                            >
                                <img
                                    src={getImageUrl(
                                        image.image_url
                                    )}
                                    alt={
                                        category === "curtains"
                                            ? "Custom curtain installation"
                                            : "Custom blind installation"
                                    }
                                />

                                <span className="gallery-view">
                                    View
                                </span>
                            </button>
                        ))}

                    </div>
                )}

            </section>


            {/* =========================
                LIGHTBOX
            ========================= */}

            {selectedImage && (
                <div
                    className="gallery-lightbox"
                    onClick={() =>
                        setSelectedImage(null)
                    }
                >

                    <button
                        className="gallery-lightbox-close"
                        onClick={() =>
                            setSelectedImage(null)
                        }
                        aria-label="Close image"
                    >
                        ×
                    </button>


                    <div
                        className="gallery-lightbox-content"
                        onClick={event =>
                            event.stopPropagation()
                        }
                    >
                        <img
                            src={getImageUrl(
                                selectedImage.image_url
                            )}
                            alt={
                                category === "curtains"
                                    ? "Custom curtain"
                                    : "Custom blind"
                            }
                        />
                    </div>

                </div>
            )}
        </>
    );
}

export default PublicGallery;
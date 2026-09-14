import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../pages/Testimonials.css";

function Testimonials() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/api/reviews")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch reviews");
                }

                return response.json();
            })
            .then(data => {
                setReviews(data);
            })
            .catch(error => {
                console.error("Error fetching reviews:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Header />

            <main className="testimonials-page">

                {/* HERO */}
                <section className="testimonials-hero">
                    <div className="testimonials-hero-content">
                        <p className="testimonials-eyebrow">
                            CUSTOMER STORIES
                        </p>

                        <h1>
                            What our customers
                            <br />
                            say about us.
                        </h1>

                        <p>
                            Real experiences from customers who trusted
                            us with their curtains, blinds and interiors.
                        </p>
                    </div>
                </section>


                {/* REVIEWS */}
                <section className="testimonials-section">

                    <div className="testimonials-heading">
                        <p className="section-eyebrow">
                            TESTIMONIALS
                        </p>

                        <h2>
                            Trusted by our customers
                        </h2>

                        <p>
                            We believe great interiors are built not only
                            with quality materials, but also with great
                            service.
                        </p>
                    </div>


                    {loading ? (
                        <div className="testimonials-empty">
                            <p>Loading reviews...</p>
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="testimonials-empty">
                            <div className="empty-symbol">◇</div>

                            <h3>
                                Reviews Coming Soon
                            </h3>

                            <p>
                                Customer reviews will appear here soon.
                            </p>
                        </div>
                    ) : (
                        <div className="reviews-grid">

                            {reviews.map(review => (
                                <article
                                    className="review-card"
                                    key={review.id}
                                >

                                    <div className="review-top">

                                        <div className="review-stars">
                                            {"★".repeat(review.rating)}
                                            {"☆".repeat(5 - review.rating)}
                                        </div>

                                        <span className="review-mark">
                                            “
                                        </span>

                                    </div>


                                    <p className="review-text">
                                        {review.review}
                                    </p>


                                    <div className="review-customer">

                                        <div className="customer-avatar">
                                            {review.customer_name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <h3>
                                                {review.customer_name}
                                            </h3>

                                            {review.location && (
                                                <span>
                                                    {review.location}
                                                </span>
                                            )}
                                        </div>

                                    </div>

                                </article>
                            ))}

                        </div>
                    )}

                </section>


                {/* CTA */}
                <section className="testimonials-cta">

                    <div>
                        <p className="section-eyebrow">
                            READY TO TRANSFORM YOUR SPACE?
                        </p>

                        <h2>
                            Let's create something
                            <br />
                            beautiful together.
                        </h2>
                    </div>

                    <div className="testimonials-cta-right">

                        <p>
                            From custom curtains and blinds to
                            professional installation, we're here
                            to help bring your vision to life.
                        </p>

                        <Link
                            to="/quote"
                            className="testimonials-cta-button"
                        >
                            Book an Appointment →
                        </Link>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default Testimonials;
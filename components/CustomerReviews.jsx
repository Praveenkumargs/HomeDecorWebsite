import React, { useEffect, useState } from "react";
import "../css/CustomerReviews.css";

function CustomerReviews() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchReviews() {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/reviews"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch reviews");
                }

                const data = await response.json();

                setReviews(data);

            } catch (error) {

                console.error("Error fetching reviews:", error);

                setError("Unable to load reviews.");

            } finally {

                setLoading(false);

            }
        }

        fetchReviews();

    }, []);


    // Loading state
    if (loading) {
        return (
            <section className="reviews-section">

                <div className="reviews-container">

                    <div className="reviews-heading">

                        <div>
                            <p className="reviews-label">
                                CLIENT STORIES
                            </p>

                            <h2>
                                Loved by
                                <br />
                                <span>Our Customers.</span>
                            </h2>
                        </div>

                        <p className="reviews-intro">
                            Every beautiful space begins with trust.
                            Here's what our customers have to say
                            about their experience with us.
                        </p>

                    </div>

                    <p>Loading reviews...</p>

                </div>

            </section>
        );
    }


    // Error state
    if (error) {
        return (
            <section className="reviews-section">

                <div className="reviews-container">

                    <p>{error}</p>

                </div>

            </section>
        );
    }


    // No reviews
    if (reviews.length === 0) {
        return (
            <section className="reviews-section">

                <div className="reviews-container">

                    <div className="reviews-heading">

                        <div>
                            <p className="reviews-label">
                                CLIENT STORIES
                            </p>

                            <h2>
                                Loved by
                                <br />
                                <span>Our Customers.</span>
                            </h2>
                        </div>

                    </div>

                    <p>No reviews available yet.</p>

                </div>

            </section>
        );
    }


    // First review becomes featured review
    const featuredReview = reviews[0];

    // Remaining reviews
    const smallerReviews = reviews.slice(1, 4);


    return (
        <section className="reviews-section">

            <div className="reviews-container">

                {/* Section Heading */}

                <div className="reviews-heading">

                    <div>

                        <p className="reviews-label">
                            CLIENT STORIES
                        </p>

                        <h2>
                            Loved by
                            <br />
                            <span>Our Customers.</span>
                        </h2>

                    </div>

                    <p className="reviews-intro">
                        Every beautiful space begins with trust.
                        Here's what our customers have to say
                        about their experience with us.
                    </p>

                </div>


                {/* Featured Review */}

                <div className="featured-review">

                    <div className="quote-mark">
                        “
                    </div>

                    <div className="featured-content">

                        <div className="stars">
                            {"★ ".repeat(featuredReview.rating)}
                        </div>

                        <blockquote>
                            {featuredReview.review}
                        </blockquote>

                        <div className="customer">

                            <div className="customer-avatar">
                                {featuredReview.customer_name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>

                                <h4>
                                    {featuredReview.customer_name}
                                </h4>

                                <p>
                                    Bengaluru
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Smaller Reviews */}

                <div className="review-grid">

                    {smallerReviews.map((review) => (

                        <div
                            className="review-card"
                            key={review.id}
                        >

                            <div className="stars">
                                {"★ ".repeat(review.rating)}
                            </div>

                            <p>
                                {review.review}
                            </p>

                            <div className="review-author">

                                <strong>
                                    {review.customer_name}
                                </strong>

                                <span>
                                    Bengaluru
                                </span>

                            </div>

                        </div>

                    ))}

                </div>


                {/* Google CTA */}

                <div className="google-reviews">

                    <div>

                        <p className="google-small">
                            HAVE A LOOK AT OUR
                        </p>

                        <h3>
                            Google Reviews
                        </h3>

                    </div>

                    <div className="google-rating">

                        <span className="rating-number">
                            5.0
                        </span>

                        <span className="rating-stars">
                            ★★★★★
                        </span>

                        <span className="rating-text">
                            Customer Rating
                        </span>

                    </div>

                    <a
                        href="https://www.google.com/search?q=lucky+home+decor&sca_esv=3fef462c9433d111&sxsrf=APpeQnv8ZqmNnUyf1Wk_OpOE6MiQdH3bzA%3A1788266378783&ei=iseWauikL_-ohvcPwuueuAo&biw=1440&bih=782&ved=2ahUKEwjokZWys82WAxV_lOEIHcK1B6cQ4dUDegQIBhAM&uact=5&oq=lucky+home+decor&gs_lp=Egxnd3Mtd2l6LXNlcnAiEGx1Y2t5IGhvbWUgZGVjb3IyCBAAGIAEGLADMgkQABgHGB4YsAMyCBAAGIAEGLADMggQABiABBiwAzIIEAAYgAQYsAMyDhAuGIAEGMcBGK8BGLADMgcQABgeGLADMgkQABgIGB4YsAMyCRAAGAgYHhiwAzIJEAAYCBgeGLADSIwBUABYAHABeACQAQCYAQCgAQCqAQCwAQC4AQPIAQCYAgGgAgSYAwDiAwQYACBd4gMEGAAgXuIDBBgAIF_iAwQYACBg4gMEGAAgYeIDBBgAIGKIBgGQBgqSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgB&sclient=gws-wiz-serp#lrd=0x3bae177f1d675379:0xe1d1b4b114afc7c4,1,,,,"
                        className="google-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View All Reviews
                        <span>↗</span>
                    </a>

                </div>

            </div>

        </section>
    );
}

export default CustomerReviews;
import React from "react";
import "../css/CustomerReviews.css"

function CustomerReviews() {
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
                            ★ ★ ★ ★ ★
                        </div>

                        <blockquote>
                            We are Highly impressed with Lucky Home Decor's curtain collections. Service done by Mr. Venkat and team service was excellent, If you are looking for good customized curtains in reasonable cost, go for it !

                        </blockquote>

                        <div className="customer">

                            <div className="customer-avatar">
                                P
                            </div>

                            <div>
                                <h4>
                                    Praveen Kumar G S
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

                    <div className="review-card">

                        <div className="stars">
                            ★ ★ ★ ★ ★
                        </div>

                        <p>
                            Good quality fabrics and well thought designs. They guide you well on the selection of colors and designs . Overall happy with the final outcome.
                        </p>

                        <div className="review-author">
                            <strong>
                                Mohan Kumar
                            </strong>

                            <span>
                                Bengaluru
                            </span>
                        </div>

                    </div>


                    <div className="review-card">

                        <div className="stars">
                            ★ ★ ★ ★ ★
                        </div>

                        <p>
                            Recently I have taken their service for Roman Blinds purchase and installation and I am very much impressed with their collection as well as perfect and quick installation. Everything was so professional and work was done just within 2 days. Will definitely look forward for more purchase soon
                        </p>

                        <div className="review-author">
                            <strong>
                                Anand Shivraj
                            </strong>

                            <span>
                                Bengaluru
                            </span>
                        </div>

                    </div>


                    <div className="review-card">

                        <div className="stars">
                            ★ ★ ★ ★ ★
                        </div>

                        <p>
                            "I highly recommend Lucky Home Decor if you’re looking for high-quality curtains and blinds, along with reliable service."
                        </p>

                        <div className="review-author">
                            <strong>
                                Anil Kumar Manvi
                            </strong>

                            <span>
                                Bengaluru
                            </span>
                        </div>

                    </div>

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
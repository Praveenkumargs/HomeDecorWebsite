import React from "react";
import { Link } from "react-router-dom";
import "../css/Hero.css";

function Hero() {
    return (
        <section className="hero">

            {/* Background Image */}
            <div className="hero-image"></div>

            {/* Dark overlay */}
            <div className="hero-overlay"></div>

            {/* Content */}
            <div className="hero-content">

                <p className="hero-small-text">
                    CURTAINS • BLINDS • INTERIORS
                </p>

                <h1>
                    Elegance
                    <br />
                    <span>Beyond the Window</span>
                </h1>

                <p className="hero-description">
                    Beautifully crafted curtains and blinds,
                    designed to transform your space with
                    comfort, style and timeless elegance.
                </p>

                <div className="hero-buttons">

                    <a href="#" className="primary-btn">
                        Explore Collection
                        <span>→</span>
                    </a>

                    <Link to={"/quote"}  className="secondary-btn">
                        Book an Appointment                       
                    </Link>

                </div>

            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <span></span>
                Scroll to explore
            </div>

        </section>
    );
}

export default Hero;
import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Brand */}
                <div className="footer-brand">

                    <div className="footer-logo">
                        <span className="footer-logo-mark">C</span>

                        <div>
                            <h3>CURTAIN</h3>
                            <span>INTERIORS</span>
                        </div>
                    </div>

                    <p>
                        Beautiful curtains and blinds,
                        thoughtfully designed to transform
                        your space.
                    </p>

                    <Link to={'/quote'} className="footer-cta">
                        Get a Quote
                        <span>→</span>
                    </Link>

                </div>


                {/* Services */}
                <div className="footer-column">

                    <p className="footer-label">
                        SERVICES
                    </p>

                    <h3>
                        What We Do
                    </h3>

                    <ul>
                        <li>
                            <a href="#">
                                Curtain Stitching
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                Curtain Installation
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                Blind Stitching
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                Blind Installation
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                Curtain Rod & Track Installation
                            </a>
                        </li>
                    </ul>

                </div>


                {/* Products */}
                <div className="footer-column">

                    <p className="footer-label">
                        COLLECTIONS
                    </p>

                    <h3>
                        Our Products
                    </h3>

                    <ul>
                        <li>
                            <Link to={"/curtains"}>
                                Custom Curtains
                            </Link>
                        </li>

                        <li>
                            <Link to={"/curtains"}>
                                Ready-made Curtains
                            </Link>
                        </li>

                        <li>
                            <Link to={"/blinds"}>
                                Roller & Roman Blinds
                            </Link>
                        </li>

                        <li>
                            <Link to={"/blinds"}>
                                Vertical Blinds
                            </Link>
                        </li>

                        <li>
                            <a href="#">
                                Curtain Hardware
                            </a>
                        </li>
                    </ul>

                </div>


                {/* Contact */}
                <div className="footer-column contact-column">

                    <p className="footer-label">
                        GET IN TOUCH
                    </p>

                    <h3>
                        Contact Us
                    </h3>


                    {/* Address */}

                    <a
                        href="https://maps.app.goo.gl/BgqE5j9QxhLG7uoj9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-item"
                    >

                        <span className="contact-icon">
                            ⌖
                        </span>

                        <span>
                            No. 143, C K V K Complex,
                            <br />
                            Amba Bayani Temple Main Road,
                            <br />
                            Vidyaranyapura,
                            <br />
                            Bangalore - 560097
                        </span>

                    </a>


                    {/* Phone */}

                    <a
                        href="tel:+919900561661"
                        className="contact-item"
                    >

                        <span className="contact-icon">
                            ☎
                        </span>

                        <span>
                            +91 99005 61661
                        </span>

                    </a>


                    <a
                        href="tel:+918105861452"
                        className="contact-item"
                    >

                        <span className="contact-icon">
                            ☎
                        </span>

                        <span>
                            +91 81058 61452
                        </span>

                    </a>


                    {/* Email */}

                    <a
                        href="mailto:luckyhomedecor2019@gmail.com"
                        className="contact-item"
                    >

                        <span className="contact-icon">
                            ✉
                        </span>

                        <span>
                            luckyhomedecor2019@gmail.com
                        </span>

                    </a>

                </div>

            </div>


            {/* Bottom Footer */}

            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} Curtain Interiors.
                    All rights reserved.
                </p>

                <div className="footer-links">

                    <a href="#">
                        Privacy Policy
                    </a>

                    <a href="#">
                        Terms & Conditions
                    </a>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
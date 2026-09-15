import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className="Header">

            {/* =========================
                LOGO
            ========================= */}

            <div className="logocombo">

                <Link
                    to="/"
                    className="logo"
                    onClick={closeMenu}
                >

                    <img
                        className="logo-mark"
                        src="/images/LHD_Logo.jpeg"
                        alt="Lucky Home Decor Logo"
                    />

                    <span className="brand">
                        <span className="brand-name">
                            LUCKY HOME DECOR
                        </span>
                    </span>

                </Link>

            </div>


            {/* =========================
                NAVIGATION
            ========================= */}

            <nav
                className={`navbar ${
                    menuOpen ? "mobile-open" : ""
                }`}
            >

                <ul className="header-list">

                    <li>
                        <Link
                            className="list-items"
                            to="/"
                            onClick={closeMenu}
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="list-items"
                            to="/curtains"
                            onClick={closeMenu}
                        >
                            Curtains
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="list-items"
                            to="/blinds"
                            onClick={closeMenu}
                        >
                            Blinds
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="list-items"
                            to="/sofa"
                            onClick={closeMenu}
                        >
                            Sofa
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="list-items"
                            to="/testimonials"
                            onClick={closeMenu}
                        >
                            Testimonials
                        </Link>
                    </li>

                </ul>


                {/* Mobile Appointment Button */}

                <Link
                    to="/quote"
                    className="mobile-quote-btn"
                    onClick={closeMenu}
                >
                    <span>Book an Appointment</span>
                    <span>→</span>
                </Link>

            </nav>


            {/* =========================
                DESKTOP APPOINTMENT BUTTON
            ========================= */}

            <Link
                to="/quote"
                className="quote-btn"
                onClick={closeMenu}
            >
                <span>Book an Appointment</span>
                <span>→</span>
            </Link>


            {/* =========================
                MOBILE MENU BUTTON
            ========================= */}

            <button
                className={`menu-toggle ${
                    menuOpen ? "open" : ""
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

        </header>
    );
}

export default Header;
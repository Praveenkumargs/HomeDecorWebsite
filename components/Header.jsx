import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";


function Header() {
    return (
        <header className="Header">

            {/* Logo */}
            <div className="logocombo">
                <Link to={"/"} className="logo">
                    <img className="logo-mark" src="../images/LHD_Logo.jpeg" alt="Logo" />

                    <span className="brand">
                        <span className="brand-name">LUCKY HOME DECOR</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="navbar">
                <ul className="header-list">
                    <li>
                        <Link className="list-items active" to={"/"} >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link className="list-items" to={'/curtains'}>
                            Curtains
                        </Link>
                    </li>

                    <li>
                        <Link className="list-items" to={'/blinds'}>
                            Blinds
                        </Link>
                    </li>

                    <li>
                        <Link className="list-items" to={'/sofa'}>
                            Sofa
                        </Link>
                    </li>

                    <li>
                        <Link className="list-items" to={'/testimonials'}>
                            Testimonials
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* CTA */}
            <Link to={"/quote"} className="quote-btn">
                Book an Appointment
                <span>→</span>
            </Link>

        </header>
    );
}

export default Header;
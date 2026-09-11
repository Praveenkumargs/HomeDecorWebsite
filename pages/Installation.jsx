import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Installation.css";

function Installation() {

    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInstallationProjects();
    }, []);

    async function fetchInstallationProjects() {
        try {

            const response = await fetch(
                "http://localhost:3000/api/portfolio"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch portfolio");
            }

            const data = await response.json();

            const installationProjects = data.filter(
                project =>
                    project.category === "curtain-installation" ||
                    project.category === "blind-installation"
            );

            setProjects(installationProjects);

        } catch (error) {

            console.error(
                "Error fetching installation projects:",
                error
            );

        } finally {

            setLoading(false);

        }
    }

    const filteredProjects =
        activeFilter === "all"
            ? projects
            : projects.filter(
                project =>
                    project.category === activeFilter
            );


    return (
        <>

            <Header />

            <main className="installation-page">

                {/* =====================================
                    HERO
                ===================================== */}

                <section className="installation-hero">

                    <div className="installation-hero-content">

                        <p className="installation-eyebrow">
                            INSTALLATION SERVICES
                        </p>

                        <h1>
                            Curtain & Blind
                            <br />
                            Installation
                        </h1>

                        <p className="installation-hero-text">
                            Professional installation for curtains,
                            blinds and their hardware, finished with
                            precision and care.
                        </p>

                        <Link
                            to="/quote"
                            className="installation-primary-button"
                        >
                            Book an Installation
                        </Link>

                    </div>

                </section>


                {/* =====================================
                    INTRO
                ===================================== */}

                <section className="installation-intro">

                    <div className="installation-intro-heading">

                        <p className="section-eyebrow">
                            WHAT WE DO
                        </p>

                        <h2>
                            Professional installation,
                            <br />
                            done right.
                        </h2>

                    </div>

                    <div className="installation-intro-text">

                        <p>
                            Already have your curtains or blinds?
                            We can take care of the installation.
                        </p>

                        <p>
                            Our installation service covers curtain
                            hardware, blind mounting systems and
                            complete installation for your space.
                        </p>

                    </div>

                </section>


                {/* =====================================
                    SERVICES
                ===================================== */}

                <section className="installation-services">

                    <div className="installation-section-heading">

                        <p className="section-eyebrow">
                            OUR SERVICES
                        </p>

                        <h2>
                            Installation for every setup
                        </h2>

                    </div>


                    <div className="installation-service-grid">

                        <article className="installation-service-card">

                            <span className="service-number">
                                01
                            </span>

                            <div className="service-icon">
                                ◇
                            </div>

                            <h3>
                                Curtain Installation
                            </h3>

                            <p>
                                Professional installation of curtains
                                with the right mounting system for
                                your space.
                            </p>

                            <ul>
                                <li>Curtain rods</li>
                                <li>Curtain tracks</li>
                                <li>Wall-mounted systems</li>
                                <li>Ceiling-mounted systems</li>
                            </ul>

                        </article>


                        <article className="installation-service-card">

                            <span className="service-number">
                                02
                            </span>

                            <div className="service-icon">
                                □
                            </div>

                            <h3>
                                Blind Installation
                            </h3>

                            <p>
                                Precise installation of different
                                blind systems for a clean and
                                finished appearance.
                            </p>

                            <ul>
                                <li>Roller blinds</li>
                                <li>Roman blinds</li>
                                <li>Zebra blinds</li>
                                <li>Other blind systems</li>
                            </ul>

                        </article>


                        <article className="installation-service-card">

                            <span className="service-number">
                                03
                            </span>

                            <div className="service-icon">
                                +
                            </div>

                            <h3>
                                Hardware Installation
                            </h3>

                            <p>
                                Already have your curtains or blinds?
                                We can install the hardware for you.
                            </p>

                            <ul>
                                <li>Rods</li>
                                <li>Tracks</li>
                                <li>Channels</li>
                                <li>Mounting hardware</li>
                            </ul>

                        </article>

                    </div>

                </section>


                {/* =====================================
                    PORTFOLIO
                ===================================== */}

                <section className="installation-portfolio">

                    <div className="installation-section-heading">

                        <p className="section-eyebrow">
                            OUR WORK
                        </p>

                        <h2>
                            Installation projects
                        </h2>

                        <p>
                            Explore some of our completed curtain
                            and blind installation work.
                        </p>

                    </div>


                    <div className="installation-filters">

                        <button
                            className={
                                activeFilter === "all"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setActiveFilter("all")
                            }
                        >
                            All
                        </button>

                        <button
                            className={
                                activeFilter === "curtain-installation"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setActiveFilter(
                                    "curtain-installation"
                                )
                            }
                        >
                            Curtains
                        </button>

                        <button
                            className={
                                activeFilter === "blind-installation"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setActiveFilter(
                                    "blind-installation"
                                )
                            }
                        >
                            Blinds
                        </button>

                    </div>


                    {loading ? (

                        <div className="installation-empty">
                            <p>Loading projects...</p>
                        </div>

                    ) : filteredProjects.length === 0 ? (

                        <div className="installation-empty">

                            <div className="empty-symbol">
                                ◇
                            </div>

                            <h3>
                                Projects Coming Soon
                            </h3>

                            <p>
                                We're adding our latest installation
                                projects here.
                            </p>

                        </div>

                    ) : (

                        <div className="installation-project-grid">

                            {filteredProjects.map(project => (

                                <article
                                    className="installation-project-card"
                                    key={project.id}
                                >

                                    <div className="installation-project-image">

                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                        />

                                    </div>


                                    <div className="installation-project-content">

                                        <span>
                                            {
                                                project.category ===
                                                "curtain-installation"
                                                    ? "Curtain Installation"
                                                    : "Blind Installation"
                                            }
                                        </span>

                                        <h3>
                                            {project.title}
                                        </h3>

                                        {project.description && (
                                            <p>
                                                {project.description}
                                            </p>
                                        )}

                                        {project.location && (
                                            <small>
                                                📍 {project.location}
                                            </small>
                                        )}

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>


                {/* =====================================
                    CTA
                ===================================== */}

                <section className="installation-cta">

                    <div>

                        <p className="section-eyebrow">
                            NEED INSTALLATION?
                        </p>

                        <h2>
                            Let us handle the
                            <br />
                            installation for you.
                        </h2>

                    </div>

                    <div className="installation-cta-right">

                        <p>
                            Whether you need curtain hardware,
                            blind installation or both, we're ready
                            to help.
                        </p>

                        <Link
                            to="/quote"
                            className="installation-secondary-button"
                        >
                            Book an Installation →
                        </Link>

                    </div>

                </section>

            </main>

            <Footer />

        </>
    );
}

export default Installation;
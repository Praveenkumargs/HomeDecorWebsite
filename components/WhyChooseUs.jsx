import React from "react";
import "../css/WhyChooseUs.css"

function WhyChooseUs() {
    return (
        <section className="why-section">

            <div className="why-container">

                {/* LEFT SIDE */}

                <div className="why-intro">

                    <p className="why-label">
                        WHY CHOOSE US
                    </p>

                    <h2>
                        More Than
                        <br />
                        <span>Just Curtains.</span>
                    </h2>

                    <p className="why-description">
                        We believe every window deserves to be
                        beautifully designed. From selecting the
                        perfect fabric to professional installation,
                        we take care of every detail.
                    </p>

                </div>


                {/* RIGHT SIDE */}

                <div className="why-features">

                    {/* Feature 1 */}

                    <div className="why-feature">

                        <div className="feature-number">
                            01
                        </div>

                        <div className="feature-content">

                            <h3>
                                Custom Designed
                            </h3>

                            <p>
                                Every curtain and blind is tailored
                                to your space, style and requirements.
                            </p>

                        </div>

                    </div>


                    {/* Feature 2 */}

                    <div className="why-feature">

                        <div className="feature-number">
                            02
                        </div>

                        <div className="feature-content">

                            <h3>
                                Premium Quality
                            </h3>

                            <p>
                                Carefully selected fabrics and
                                materials built for beauty and
                                lasting performance.
                            </p>

                        </div>

                    </div>


                    {/* Feature 3 */}

                    <div className="why-feature">

                        <div className="feature-number">
                            03
                        </div>

                        <div className="feature-content">

                            <h3>
                                Expert Installation
                            </h3>

                            <p>
                                Our experienced team ensures every
                                installation is precise and finished
                                to perfection.
                            </p>

                        </div>

                    </div>


                    {/* Feature 4 */}

                    <div className="why-feature">

                        <div className="feature-number">
                            04
                        </div>

                        <div className="feature-content">

                            <h3>
                                Personalised Service
                            </h3>

                            <p>
                                From consultation to installation,
                                we help you make the right choice
                                for your home.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default WhyChooseUs;
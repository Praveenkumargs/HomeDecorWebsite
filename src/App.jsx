import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Collections from "../components/Collections";
import WhyChooseUs from "../components/WhyChooseUs";
import CustomerReviews from "../components/CustomerReviews";
import Footer from "../components/Footer";

import "../src/App.css";

import Quote from "../pages/Quote";
import Curtains from "../pages/Curtains";
import Blinds from "../pages/Blinds";
import Sofa from "../pages/Sofa";

import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Installation from "../pages/Installation";
import Testimonials from "../pages/Testimonials";

import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsAndConditions from "../components/TermsAndConditions";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";

function Home() {
  return (
    <div>
      <SEO 
        title="Lucky Home Decor | Curtains, Blinds & Home Interiors in Bangalore"
        description="Lucky Home Decor offers premium curtains, blinds, curtain stitching, blind installation and home interior solutions in Bangalore."
        path="/"
      />
      <Header />
      <Hero />
      <Collections />
      <WhyChooseUs />
      <CustomerReviews />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Quote */}
        <Route path="/quote" element={<Quote />} />

        {/* Curtains */}
        <Route path="/curtains" element={<Curtains />} />

        {/* Blinds */}
        <Route path="/blinds" element={<Blinds />} />

        {/* Sofa */}
        <Route path="/sofa" element={<Sofa />} />

        {/* Installation */}
        <Route path="/installation" element={<Installation />} />

        {/* Testimonials */}
        <Route path="/testimonials" element={<Testimonials />} />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Hero from '../components/Hero';
import Collections from '../components/Collections';
import WhyChooseUs from '../components/WhyChooseUs';
import CustomerReviews from "../components/CustomerReviews";
import Footer from '../components/Footer';

import "../src/App.css";

import Quote from '../pages/Quote';
import Curtains from '../pages/Curtains';
import Blinds from '../pages/Blinds';
import Sofa from '../pages/Sofa';

function Home() {

  return (
    <div>
      <Header />
      <Hero />
      <Collections />
      <WhyChooseUs />
      <CustomerReviews />
      <Footer />
    </div>
  );
}

function App(){
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path='/' element={<Home />} />

        {/* Quote */}
        <Route path='/quote' element={<Quote />} />

        {/* Curtains */}
        <Route path='/curtains' element={<Curtains />} />

        {/* Blinds */}
        <Route path='/blinds' element={<Blinds />} />

        {/* Sofa */}
        <Route path='/sofa' element={<Sofa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

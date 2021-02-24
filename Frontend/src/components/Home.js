import React from 'react';
import '../App.css';
import Navbar from './navbar';
import Footer from './Footer';
import Card from './Card';
import HeroSection from './HeroSection';



function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Card />
      <Footer />
    </>
  );
}

export default Home;

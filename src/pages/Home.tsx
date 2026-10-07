import React from 'react';
import Hero from '../components/hero/Hero';
import BrandIntro from '../components/sections/BrandIntro';
import PlywoodShowcase from '../components/sections/PlywoodShowcase';
import BrandShowcase from '../components/sections/BrandShowcase';
import MaterialLibrary from '../components/sections/MaterialLibrary';
import Expertise from '../components/sections/Expertise';
import Showroom from '../components/sections/Showroom';
import Enquiry from '../components/sections/Enquiry';
import Location from '../components/sections/Location';
import Footer from '../components/navigation/Footer';

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div id="home"><Hero /></div>
      <div id="about"><BrandIntro /></div>
      <div id="products"><PlywoodShowcase /></div>
      <BrandShowcase />
      <MaterialLibrary />
      <Expertise />
      <div id="showroom"><Showroom /></div>
      <div id="contact">
        <Enquiry />
        <Location />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

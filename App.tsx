
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ApproachSection from './components/ApproachSection';
import PartnersSection from './components/PartnersSection';
import TeamSection from './components/TeamSection';
import ContactFooter from './components/ContactFooter';

const App: React.FC = () => {
  return (
    <div className="bg-pdi-light-gray font-sans text-pdi-gray">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ApproachSection />
        <PartnersSection />
        <TeamSection />
      </main>
      <ContactFooter />
    </div>
  );
};

export default App;

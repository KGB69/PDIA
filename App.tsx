import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ApproachSection from './components/ApproachSection';
import PartnersSection from './components/PartnersSection';
import TeamSection from './components/TeamSection';
import ContactFooter from './components/ContactFooter';
import { ContentProvider, useContent } from './ContentContext';
import AdminDashboard from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { isAdmin, setIsAdmin } = useContent();
  const [clickCount, setClickCount] = React.useState(0);
  const [lastClickTime, setLastClickTime] = React.useState(0);

  const handleAdminToggle = () => {
    const now = Date.now();

    // Reset count if more than 1 second has passed since last click
    if (now - lastClickTime > 1000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }

    setLastClickTime(now);

    // Toggle admin mode on triple click
    if (clickCount >= 2) {
      setIsAdmin(!isAdmin);
      setClickCount(0);
    }
  };

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <PartnersSection />
      <TeamSection />
      <ContactFooter />

      {/* Invisible Admin Toggle - Triple Click */}
      <button
        onClick={handleAdminToggle}
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-transparent hover:bg-gray-100/10 transition-all duration-300 opacity-0 hover:opacity-20 cursor-default z-50"
        aria-label="Admin Access"
        title=""
      />
    </div>
  );
};

function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;

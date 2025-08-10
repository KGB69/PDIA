
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={className}>
      <img 
        src="/icons/logo.png" 
        alt="PDIA LTD Logo" 
        className="h-16" 
      />
    </div>
  );
};

export default Logo;

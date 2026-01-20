
import React from 'react';

const Logo: React.FC<{ className?: string; src?: string }> = ({ className = '', src }) => {
  return (
    <div className={className}>
      <img
        src={src || "/icons/logo.png"}
        alt="PDIA LTD Logo"
        className="max-h-[100px] max-w-[100px] h-auto w-auto object-contain"
      />
    </div>
  );
};

export default Logo;

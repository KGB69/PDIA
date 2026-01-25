import React from 'react';

const Logo: React.FC<{ src?: string; className?: string }> = ({ src, className }) => {
  if (!src) return null;

  return (
    <img
      src={src}
      alt="PDIA Logo"
      className={className || "h-16 w-auto max-w-[250px] object-contain"}
    />
  );
};

export default Logo;

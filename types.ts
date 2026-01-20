
import React from 'react';

export interface Service {
  icon: string;
  title: string;
  description: string;
  subItems?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export interface Approach {
  title: string;
  description: string;
  icon: string;
}

export interface Partner {
  name: string;
  icon: string;
}

export interface Branding {
  logoTop: string;
  logoBottom: string;
}

export interface About {
  title: string;
  subtitle: string;
  whoWeAre: string;
  mission: string;
  vision: string;
}

export interface Content {
  navLinks: { name: string; href: string }[];
  branding: Branding;
  about: About;
  services: Service[];
  team: TeamMember[];
  approach: Approach[];
  partners: Partner[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
}

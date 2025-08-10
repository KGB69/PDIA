
import React from 'react';

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  subItems?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface Approach {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Partner {
    name: string;
    icon: React.ReactNode;
}

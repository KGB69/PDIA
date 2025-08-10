
import React from 'react';
import { SERVICES_DATA } from '../constants';
import type { Service } from '../types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col h-full">
    {service.icon}
    <h3 className="text-xl font-bold text-pdi-dark-blue mb-3">{service.title}</h3>
    <p className="text-pdi-gray leading-relaxed flex-grow">{service.description}</p>
    {service.subItems && (
      <ul className="mt-4 space-y-2 list-inside list-disc text-pdi-gray">
        {service.subItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-pdi-dark-blue">
            Our Core Services
          </h2>
          <p className="mt-4 text-lg text-pdi-gray max-w-2xl mx-auto">
            Providing evidence-based solutions to strengthen education systems.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

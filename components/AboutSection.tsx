import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-pdi-light-gray scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-pdi-dark-blue">
                About PDIA
            </h2>
            <p className="mt-4 text-lg text-pdi-gray max-w-2xl mx-auto">
                Advancing quality, relevance, and equity in learning.
            </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pdi-dark-blue mb-4">Who We Are</h3>
                <p className="text-base text-pdi-gray leading-relaxed mb-4">
                    PDIA Ltd is a leading education-focused consultancy firm committed to advancing quality, relevance, and equity in learning. We specialize in education system strengthening through evidence-based solutions in curriculum design, teacher training, ICT integration, and capacity building for key education stakeholders. And advocacy for integration of evidence-based innovations into national policy frameworks.
                </p>
                <p className="text-base text-pdi-gray leading-relaxed">
                    With a team of experienced educators, policy experts, curriculum specialists, digital learning experts and instruction and pedagogy experts, we partner with governments, NGOs, schools, and development organizations to transform education.
                </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pdi-dark-blue mb-4">Our Mission</h3>
                <p className="text-base text-pdi-gray leading-relaxed">
                    To deliver innovative, inclusive, and sustainable education solutions that empower educators, learners, and communities to thrive in a dynamic and digital world.
                </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pdi-dark-blue mb-4">Our Vision</h3>
                <p className="text-base text-pdi-gray leading-relaxed">
                    To be a trusted partner in redefining education through locally relevant, globally informed, and technology-enhanced solutions.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

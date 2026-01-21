
import React from 'react';
import { useContent } from '../ContentContext';
import IconRenderer from './IconRenderer';
import type { Approach } from '../types';

const ApproachCard: React.FC<{ approach: Approach }> = ({ approach }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-pdi-red/10 p-3 rounded-full">
            <IconRenderer iconName={approach.icon} className="w-[75px] h-[75px]" />
        </div>
        <div>
            <h4 className="text-lg font-bold text-pdi-dark-blue">{approach.title}</h4>
            <p className="text-pdi-gray mt-1">{approach.description}</p>
        </div>
    </div>
);


const ApproachSection: React.FC = () => {
    const { content } = useContent();

    return (
        <section id="approach" className="py-20 bg-pdi-light-gray scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-pdi-dark-blue">
                            Our Approach
                        </h2>
                        <p className="mt-4 text-lg text-pdi-gray">
                            We believe in solutions that are co-designed, evidence-based, and built for sustainable impact.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {content.approach.map((item, index) => (
                            <ApproachCard key={index} approach={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApproachSection;

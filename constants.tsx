import React from 'react';
import type { Service, TeamMember, Approach, Partner } from './types';

// Icons
const BookOpenIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

const ComputerDesktopIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
);

const AcademicCapIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" />
    </svg>
);

const UsersIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.226A3 3 0 0113.126 13a3 3 0 012.748 4.057l-1.581 1.581A3 3 0 0110.627 18m-7.5-2.226A3 3 0 013.126 13a3 3 0 012.748 4.057l-1.581 1.581A3 3 0 01.627 18M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const MagnifyingGlassIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const ArrowPathIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183a8.25 8.25 0 00-11.664 0l3.181 3.183z" />
    </svg>
);

const UserGroupIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.226A3 3 0 0 1 13.126 13a3 3 0 0 1 2.748 4.057l-1.581 1.581A3 3 0 0 1 10.627 18m-7.5-2.226A3 3 0 0 1 3.126 13a3 3 0 0 1 2.748 4.057l-1.581 1.581A3 3 0 0 1 .627 18m12.19-9.043c.125.083.25.167.375.25a2.25 2.25 0 0 1 3.375 0c.125-.083.25-.167.375-.25a2.25 2.25 0 0 1 3.375 0c.125.083.25.167.375.25a2.25 2.25 0 0 1 0 3.375c-.083.125-.167.25-.25.375a2.25 2.25 0 0 1 0 3.375c.083.125.167.25.25.375a2.25 2.25 0 0 1 0 3.375c-.125-.083-.25-.167-.375-.25a2.25 2.25 0 0 1-3.375 0c-.125.083-.25.167-.375.25a2.25 2.25 0 0 1-3.375 0c-.125-.083-.25-.167-.375-.25a2.25 2.25 0 0 1-3.375 0c-.083-.125-.167-.25-.25-.375a2.25 2.25 0 0 1 0-3.375c.083-.125.167.25.25.375a2.25 2.25 0 0 1 0-3.375c.125-.083.25-.167.375-.25a2.25 2.25 0 0 1 3.375 0ZM15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);


const BeakerIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

const CpuChipIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 15v1.5M12 4.5v-1.5m0 18v-1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5v10.5h-7.5z" />
    </svg>
);

const HandRaisedIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.832.168l-1.171 1.953M21.75 12h-2.25m-3.362 5.332l-1.17-1.953M6.168 15.832l-1.953-1.17M2.25 12h2.25m3.362-5.332l1.953-1.17M17.832 6.168l1.953 1.17M12 21.75v-2.25" />
    </svg>
);

// Data
export const NAV_LINKS = [
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

export const SERVICES_DATA: Service[] = [
    {
        icon: <BookOpenIcon className="w-10 h-10 mb-4 text-pdi-red" />,
        title: 'Curriculum Design & Review',
        description: 'We develop and adapt curricula that are competency-based, inclusive, culturally responsive, and aligned with both national and global standards. Our work supports both formal and non-formal education settings.',
    },
    {
        icon: <ComputerDesktopIcon className="w-10 h-10 mb-4 text-pdi-red" />,
        title: 'ICT Integration in Education',
        description: 'We support schools and institutions to embed Information and Communication Technology (ICT) into teaching and learning. This includes:',
        subItems: [
            'Digital content development',
            'Blended and remote learning solutions',
            'Training for teachers in educational technology tools',
            'ICT strategy and infrastructure planning',
            'ICT integration into teaching and learning'
        ]
    },
    {
        icon: <AcademicCapIcon className="w-10 h-10 mb-4 text-pdi-red" />,
        title: 'Teacher Training & Professional Development',
        description: 'We design and deliver continuous professional development (CPD) programs that improve teaching practice, subject mastery, classroom management, and learner-centred pedagogy.',
    },
    {
        icon: <img src="/icons/Stakeholder Capacity Development.svg" className="w-10 h-10 mb-4" alt="Stakeholder Capacity Development" />,
        title: 'Stakeholder Capacity Development',
        description: 'We strengthen the capacity of education stakeholders—including school leaders, policy makers, and community actors—through training, coaching, and systems support. We help build collaborative and effective education ecosystems.',
    },
    {
        icon: <MagnifyingGlassIcon className="w-10 h-10 mb-4 text-pdi-red" />,
        title: 'Research, Monitoring & Evaluation',
        description: 'We conduct educational research, needs assessments, and evaluations to inform policy, program design, and implementation.',
    },
    {
        icon: <img src="/icons/Policy and Transformation.svg" className="w-10 h-10 mb-4" alt="Policy and Transformation" />,
        title: 'Policy and Transformation',
        description: 'We advocate for transformation of education systems, ownership and adoption of evidence-based innovation in the education system. We offer technical support for institutionalization of methodologies at school, district local governments and national develop to ensure scale-up and sustainability of innovations by governments.',
    }
];

export const TEAM_DATA: TeamMember[] = [
    { name: 'DR. GRACE KIIRIA', role: 'Expert in Educational Development, Management and Administration' },
    { name: 'DR. NAMBI BERNADICT', role: 'Specialist in curriculum development and review' },
    { name: 'MR. MOSES TUHAME', role: 'Expert in ICT' },
    { name: 'MR. DAVID OKELLO', role: 'Expert in social development and administration' },
    { name: 'MS. RACHAEL KALEMBE', role: 'Educationist and Professional trainer' },
    { name: 'MR. NAIGO PAUL', role: 'Educationist and professional trainer' },
    { name: 'MR. OMODING JONATHAN OKIA', role: 'Graphics & Product Design Lead' }
];

export const APPROACH_DATA: Approach[] = [
    {
        icon: <img src="/icons/Participatory & Contextualized.svg" className="w-8 h-8" alt="Participatory & Contextualized" />,
        title: 'Participatory & Contextualized',
        description: 'We co-design solutions with clients and communities to ensure relevance and sustainability.',
    },
    {
        icon: <BeakerIcon className="w-8 h-8 text-pdi-red" />,
        title: 'Evidence-Based',
        description: 'Our recommendations and training draw from global research, best practices, and local realities.',
    },
    {
        icon: <CpuChipIcon className="w-8 h-8 text-pdi-red" />,
        title: 'Technology-Enabled',
        description: 'We promote digital solutions where they can increase reach, efficiency, and engagement.',
    },
    {
        icon: <img src="/icons/Capacity-Focused.svg" className="w-8 h-8" alt="Capacity-Focused" />,
        title: 'Capacity-Focused',
        description: 'We empower clients and beneficiaries with the tools and skills they need to lead and sustain change.',
    },
];

export const PARTNERS_DATA: Partner[] = [
    { name: 'Ministries of Education and Government Agencies', icon: <AcademicCapIcon className="w-10 h-10 text-pdi-red" /> },
    { name: 'Non-Governmental Organizations (NGOs)', icon: <img src="/icons/Non-Governmental Organizations (NGOs).svg" className="w-10 h-10" alt="NGOs" /> },
    { name: 'Schools and Teacher Training Institutions', icon: <BookOpenIcon className="w-10 h-10 text-pdi-red" /> },
    { name: 'Development Partners and Donors', icon: <img src="/icons/Development Partners and Donors.svg" className="w-10 h-10" alt="Development Partners and Donors" /> },
    { name: 'Community-Based Organizations', icon: <img src="/icons/Community-Based Organizations.svg" className="w-10 h-10" alt="Community-Based Organizations" /> },
];

export const CONTACT_INFO = {
    email: 'pdiaconsultancy@gmail.com',
    phone: '+256 772 193 208',
    address: 'Mutebbi Rd Seeta. Mukono'
};
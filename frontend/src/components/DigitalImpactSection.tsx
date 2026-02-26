import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Mail, Users, School, MessageSquare } from 'lucide-react';

const initiatives = [
  {
    icon: Mail,
    title: 'Digital Newsletter',
    description: 'Monthly e-newsletter keeping the CGCT community informed about Vision 2036 progress, school achievements, and upcoming events.',
    color: 'bg-maroon-700',
  },
  {
    icon: Users,
    title: 'Brand Ambassadors',
    description: 'A network of passionate alumni and staff serving as CGCT brand ambassadors, spreading the Vision 2036 message across communities.',
    color: 'bg-gold-600',
  },
  {
    icon: School,
    title: 'School Liaison Network',
    description: 'Dedicated liaison officers in each school ensuring seamless communication between the Education Board and individual institutions.',
    color: 'bg-sage-600',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp & Email Strategy',
    description: 'Structured digital communication channels using WhatsApp groups and targeted email campaigns to engage all stakeholders effectively.',
    color: 'bg-maroon-900',
  },
];

function InitiativeCard({ initiative, index }: { initiative: typeof initiatives[0]; index: number }) {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const Icon = initiative.icon;

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`w-14 h-14 rounded-2xl ${initiative.color} flex items-center justify-center mb-4`}>
        <Icon className="text-white" size={26} />
      </div>
      <h3 className="text-lg font-bold text-maroon-800 mb-2">{initiative.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{initiative.description}</p>
    </div>
  );
}

export default function DigitalImpactSection() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);

  return (
    <section id="digital" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-maroon-800 mb-3">
            Digital Impact Initiatives
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leveraging technology to amplify our reach and strengthen community connections
          </p>
          <div className="mt-4 w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((initiative, i) => (
            <InitiativeCard key={initiative.title} initiative={initiative} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

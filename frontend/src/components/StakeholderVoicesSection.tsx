import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Users, BookOpen, Cpu, Heart, Globe, Star } from 'lucide-react';

const insights = [
  {
    icon: BookOpen,
    title: 'Curriculum Modernization',
    description: 'Stakeholders emphasized the urgent need to align CGCT curriculum with NEP 2020 while preserving Christian values and heritage.',
    color: 'bg-maroon-700',
    badge: 'Academic Meeting — Feb 3, 2026',
  },
  {
    icon: Cpu,
    title: 'Digital Infrastructure',
    description: 'School principals highlighted the critical gap in digital infrastructure and called for smart classrooms across all CGCT institutions.',
    color: 'bg-gold-600',
    badge: 'Tech Forum — Feb 7, 2026',
  },
  {
    icon: Users,
    title: 'Alumni Engagement',
    description: 'Alumni representatives stressed the importance of structured mentorship programs connecting graduates with current students.',
    color: 'bg-sage-600',
    badge: 'Alumni Meet — Feb 10, 2026',
  },
  {
    icon: Heart,
    title: 'Holistic Wellbeing',
    description: 'Parents and counselors advocated for comprehensive mental health support and social-emotional learning programs.',
    color: 'bg-maroon-900',
    badge: 'Parent Forum — Feb 12, 2026',
  },
  {
    icon: Globe,
    title: 'Global Competitiveness',
    description: 'Industry leaders called for preparing students for global opportunities through language skills, critical thinking, and entrepreneurship.',
    color: 'bg-maroon-600',
    badge: 'Industry Meet — Feb 17, 2026',
  },
  {
    icon: Star,
    title: 'Teacher Empowerment',
    description: 'Educators requested continuous professional development, better compensation structures, and recognition programs.',
    color: 'bg-gold-700',
    badge: 'Teachers Forum — Feb 21, 2026',
  },
];

function InsightCard({ insight, index }: { insight: typeof insights[0]; index: number }) {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const Icon = insight.icon;

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`${insight.color} p-4 flex items-center gap-3`}>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Icon className="text-white" size={20} />
        </div>
        <h3 className="text-white font-bold">{insight.title}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm leading-relaxed mb-3">{insight.description}</p>
        <span className="inline-block bg-maroon-50 text-maroon-700 text-xs font-medium px-3 py-1 rounded-full border border-maroon-100">
          {insight.badge}
        </span>
      </div>
    </div>
  );
}

export default function StakeholderVoicesSection() {
  const { t } = useLanguage();
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);

  return (
    <section id="stakeholders" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-maroon-800 mb-3">
            Stakeholder Voices
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Key insights from our February 2026 virtual stakeholder consultation meetings
          </p>
          <div className="mt-4 w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, i) => (
            <InsightCard key={insight.title} insight={insight} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

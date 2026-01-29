import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Palette,
  Users,
  Layout,
  Smartphone,
  Globe,
  Zap,
  GitBranch,
  Figma,
  Coffee,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code2,
    skills: [
      { name: 'HTML5', level: 95, icon: Layout },
      { name: 'CSS3', level: 90, icon: Palette },
      { name: 'JavaScript', level: 88, icon: Code2 },
      { name: 'React', level: 85, icon: Zap },
      { name: 'TypeScript', level: 80, icon: Code2 },
    ],
  },
  {
    title: 'Design & Tools',
    icon: Palette,
    skills: [
      { name: 'UI/UX Design', level: 85, icon: Layout },
      { name: 'Figma', level: 80, icon: Figma },
      { name: 'Responsive Design', level: 90, icon: Smartphone },
      { name: 'Tailwind CSS', level: 92, icon: Palette },
      { name: 'Git & GitHub', level: 85, icon: GitBranch },
    ],
  },
  {
    title: 'Soft Skills',
    icon: Users,
    skills: [
      { name: 'Communication', level: 90, icon: Globe },
      { name: 'Teamwork', level: 88, icon: Users },
      { name: 'Problem Solving', level: 92, icon: Zap },
      { name: 'Time Management', level: 85, icon: Coffee },
      { name: 'Adaptability', level: 87, icon: Code2 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.skills-heading',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards orbit in animation
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            x: 0, 
            y: 100, 
            opacity: 0,
            scale: 0.8 
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
            delay: index * 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Progress bars animation
      const progressBars = sectionRef.current?.querySelectorAll('.progress-bar');
      progressBars?.forEach((bar, index) => {
        const level = skillCategories[Math.floor(index / 5)].skills[index % 5].level;
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Skill icons pop animation
      const icons = sectionRef.current?.querySelectorAll('.skill-icon');
      icons?.forEach((icon, index) => {
        gsap.fromTo(
          icon,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)',
            delay: 1 + index * 0.05,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black py-24 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />

      {/* SVG Connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF6B35" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="20%"
          y1="30%"
          x2="50%"
          y2="50%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          className="hidden lg:block"
        />
        <line
          x1="50%"
          y1="50%"
          x2="80%"
          y2="30%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          className="hidden lg:block"
        />
      </svg>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-orange-500 font-medium text-sm tracking-widest uppercase mb-4 block">
              What I Do
            </span>
            <h2 className="skills-heading heading-lg text-white">My Skills</h2>
          </div>

          {/* Skills Grid */}
          <div
            ref={cardsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="skill-card group relative bg-dark-100 rounded-2xl p-8 border border-dark-200 hover:border-orange-500/50 transition-all duration-500 hover:shadow-glow"
              >
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors duration-300">
                    <category.icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="font-display text-2xl text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <skill.icon className="skill-icon w-4 h-4 text-orange-500" />
                          <span className="text-gray-300 text-sm font-medium">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-orange-500 text-sm font-medium">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                        <div
                          className="progress-bar h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <div className="mt-16 text-center">
            <h3 className="font-display text-2xl text-white mb-8">
              Other Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Next.js',
                'Vue.js',
                'SASS',
                'Webpack',
                'Vite',
                'Jest',
                'REST APIs',
                'GraphQL',
                'MongoDB',
                'Firebase',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-6 py-3 bg-dark-100 text-gray-300 rounded-full border border-dark-200 hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

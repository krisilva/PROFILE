import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A full-featured online shopping platform with cart functionality, user authentication, and payment integration. Built with modern technologies for optimal performance.',
    image: '/project-1.jpg',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Portfolio CMS',
    description:
      'A content management system designed for creatives to showcase their work. Features drag-and-drop layout builder and real-time preview.',
    image: '/project-2.jpg',
    tech: ['Next.js', 'GraphQL', 'PostgreSQL', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    description:
      'A secure and intuitive mobile banking application with real-time transactions, budget tracking, and financial insights.',
    image: '/project-3.jpg',
    tech: ['React Native', 'Firebase', 'Plaid API', 'TypeScript'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'AI Analytics Dashboard',
    description:
      'An intelligent dashboard that leverages machine learning to provide actionable insights and predictive analytics for businesses.',
    image: '/project-4.jpg',
    tech: ['Python', 'D3.js', 'TensorFlow', 'FastAPI'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.projects-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Project cards stagger animation
      const cards = containerRef.current?.querySelectorAll('.project-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, skewY: 5 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1,
            ease: 'expo.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black py-24 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/5 to-transparent" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-orange-500 font-medium text-sm tracking-widest uppercase mb-4 block">
                My Work
              </span>
              <h2 className="projects-heading heading-lg text-white">
                Featured Projects
              </h2>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 md:mt-0 flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors duration-300 group"
            >
              <span className="font-medium">View All Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Projects Grid */}
          <div
            ref={containerRef}
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card group relative bg-dark-100 rounded-2xl overflow-hidden border border-dark-200 hover:border-orange-500/50 transition-all duration-500 ${
                  index % 2 === 1 ? 'md:mt-12' : ''
                }`}
              >
                {/* Image Container */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* View Project Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-orange-600"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Project
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-2xl sm:text-3xl text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-dark-200 text-orange-500 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-2 text-white hover:text-orange-500 transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-2 text-white hover:text-orange-500 transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Source Code</span>
                    </a>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

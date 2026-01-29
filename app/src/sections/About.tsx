import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 6, suffix: '+', label: 'Months Experience' },
  { value: 10, suffix: '+', label: 'Projects Completed' },
  { value: 10, suffix: '+', label: 'Happy Clients' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image 3D flip reveal
      gsap.fromTo(
        imageRef.current,
        { rotateY: 90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bio text word stagger
      gsap.fromTo(
        '.about-text-word',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-bio',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-value');
      statElements?.forEach((el, index) => {
        const targetValue = stats[index].value;
        gsap.fromTo(
          el,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Counter animation
        gsap.fromTo(
          { value: 0 },
          { value: targetValue },
          {
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function () {
              el.textContent = Math.floor(this.targets()[0].value).toString();
            },
          }
        );
      });

      // Marquee scroll effect
      gsap.to('.marquee-text', {
        x: '-50%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bioText =
    "I'm a creative frontend developer And Intern DevOps Engineer with a keen eye for design and a passion for building seamless user interfaces. With over 6 Months  of experience in DevOps Engineer And 3+ Years Academic Experience of web development, I specialize in creating responsive, interactive, and visually stunning websites that leave a lasting impression. My journey began with a curiosity for how things work on the web, which evolved into a deep love for crafting digital experiences. I believe in writing clean, maintainable code and staying up-to-date with the latest technologies and best practices.";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-white py-24 overflow-hidden"
    >
      {/* Marquee Background */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
        <div className="marquee-text whitespace-nowrap font-display text-[200px] text-gray-100 opacity-50">
          ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME •
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-orange-500 font-medium text-sm tracking-widest uppercase mb-4 block">
              Get to Know Me
            </span>
            <h2 className="heading-lg text-black">About Me</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div
              ref={imageRef}
              className="relative perspective-1000"
            >
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/3.jpeg"
                  alt="About Kavirathna"
                  className="w-100 h-100 object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange-500 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-500 rounded-lg -z-10" />
            </div>

            {/* Bio Content */}
            <div className="about-bio">
              <h3 className="font-display text-3xl sm:text-4xl text-black mb-6">
                Crafting Digital Experiences with Passion
              </h3>
              <p className="body-text text-gray-600 mb-6 leading-relaxed">
                {bioText.split(' ').map((word, index) => (
                  <span key={index} className="about-text-word inline-block mr-1">
                    {word}
                  </span>
                ))}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'UI/UX Design','LINUX', 'GIT','PYTHON','FLUTTER','PROGRAMMING C AND C#',].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-orange-500 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-gray-200"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-4xl sm:text-5xl md:text-6xl text-black mb-2">
                  <span className="stat-value">0</span>
                  <span className="text-orange-500">{stat.suffix}</span>
                </div>
                <span className="text-gray-500 text-sm sm:text-base">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

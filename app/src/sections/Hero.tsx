import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Image mask reveal
      tl.fromTo(
        '.hero-image-mask',
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.2 },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1, duration: 1.4 }
      );

      // Headline character stagger
      tl.fromTo(
        '.hero-char',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, stagger: 0.03 },
        '-=1'
      );

      // Subheadline
      tl.fromTo(
        '.hero-subheadline',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      // CTA buttons
      tl.fromTo(
        '.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      );

      // Social links
      tl.fromTo(
        '.hero-social',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );

      // Scroll indicator
      tl.fromTo(
        '.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse move effect for 3D tilt
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = image.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / rect.height) * -10;
      const rotateY = (mouseX / rect.width) * 10;

      gsap.to(image, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    image.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      image.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const headlineText = "HI, I'M KAVIRATHNA RUMESHA ISHINI SILVA";

  const handleScrollToWork = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full bg-black overflow-hidden flex items-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-orange-950/20" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative w-full section-padding py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* Text Content */}
          <div ref={textRef} className="order-2 lg:order-1 relative z-10">
            {/* Headline */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 overflow-hidden">
              {headlineText.split('').map((char, index) => (
                <span
                  key={index}
                  className="hero-char inline-block"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p className="hero-subheadline body-text max-w-lg mb-8">
              A Passionate{' '}
              <span className="text-orange-500 font-medium">Frontend Web Developer And DevOps Engineer</span>{' '}
              crafting beautiful, responsive, and interactive digital experiences And Website Deploy And CI/CD.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button onClick={handleScrollToWork} className="hero-cta btn-primary">
                View My Work
              </button>
              <button onClick={handleScrollToContact} className="hero-cta btn-outline">
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social text-gray-400 hover:text-orange-500 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social text-gray-400 hover:text-orange-500 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:ishinisilva19@gmail.com.com"
                className="hero-social text-gray-400 hover:text-orange-500 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000">
            <div
              ref={imageRef}
              className="relative preserve-3d animate-breathe"
            >
              {/* Image container with mask */}
              <div className="hero-image-mask relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] rounded-2xl overflow-hidden">
                <img
                  src="/001.png"
                  alt="Kavirathna Rumesha Ishini Silva"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Decorative border */}
              <div className="absolute -inset-4 border-2 border-orange-500/30 rounded-3xl -z-10" />
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-glow">
                <span className="font-display text-xl">6 Months</span>
                <span className="block text-xs font-body opacity-80">Experience</span>
                <span className="font-display text-xl">3+ Years Academic</span>
                <span className="block text-xs font-body opacity-80">Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-500 font-body">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-orange-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

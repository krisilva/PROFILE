import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Particle background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const particleCount = 30;
    const connectionDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Mouse attraction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 107, 53, 0.5)';
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 107, 53, ${0.2 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading glitch reveal
      gsap.fromTo(
        '.contact-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form lines draw in
      gsap.fromTo(
        '.form-line',
        { width: '0%' },
        {
          width: '100%',
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info items
      gsap.fromTo(
        '.contact-info-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Button pulse in
      gsap.fromTo(
        '.submit-btn',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.submit-btn',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black py-24 overflow-hidden"
    >
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-orange-500 font-medium text-sm tracking-widest uppercase mb-4 block">
              Get in Touch
            </span>
            <h2 className="contact-heading heading-lg text-white">
              Let's Work Together
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="contact-info space-y-8">
              <p className="body-text text-lg mb-8">
                Have a project in mind or want to collaborate? Feel free to reach out.
                I'm always open to discussing new opportunities and creative ideas.
              </p>

              <div className="space-y-6">
                <div className="contact-info-item flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-sm">Email</span>
                    <a
                      href="mailto:kavirathna@example.com"
                      className="text-white hover:text-orange-500 transition-colors duration-300"
                    >
                      kavirathna@example.com
                    </a>
                  </div>
                </div>

                <div className="contact-info-item flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-sm">Phone</span>
                    <a
                      href="tel:+1234567890"
                      className="text-white hover:text-orange-500 transition-colors duration-300"
                    >
                      +1 234 567 890
                    </a>
                  </div>
                </div>

                <div className="contact-info-item flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-sm">Location</span>
                    <span className="text-white">Colombo, Sri Lanka</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <span className="block text-gray-500 text-sm mb-4">Follow Me</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-dark-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-dark-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-dark-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="contact-form space-y-8">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your Name"
                  required
                  className="w-full bg-transparent text-white text-lg py-4 px-0 border-0 outline-none placeholder:text-gray-600"
                />
                <div className="form-line absolute bottom-0 left-0 h-0.5 bg-dark-200">
                  <div
                    className={`h-full bg-orange-500 transition-all duration-500 ${
                      focusedField === 'name' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your Email"
                  required
                  className="w-full bg-transparent text-white text-lg py-4 px-0 border-0 outline-none placeholder:text-gray-600"
                />
                <div className="form-line absolute bottom-0 left-0 h-0.5 bg-dark-200">
                  <div
                    className={`h-full bg-orange-500 transition-all duration-500 ${
                      focusedField === 'email' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full bg-transparent text-white text-lg py-4 px-0 border-0 outline-none placeholder:text-gray-600 resize-none"
                />
                <div className="form-line absolute bottom-0 left-0 h-0.5 bg-dark-200">
                  <div
                    className={`h-full bg-orange-500 transition-all duration-500 ${
                      focusedField === 'message' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn group relative w-full bg-orange-500 text-white py-4 px-8 rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-glow"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                {/* Liquid fill effect */}
                <div className="absolute inset-0 bg-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

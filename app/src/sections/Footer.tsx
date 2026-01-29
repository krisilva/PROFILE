import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-dark-100 py-12 border-t border-dark-200">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <a href="#home" className="font-display text-2xl tracking-wider">
                <span className="text-orange-500">K</span>
                <span className="text-white">R</span>
                <span className="text-orange-500">S</span>
              </a>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                © {currentYear} Kavirathna Silva. Made with
                <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-8">
              <a
                href="#home"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm"
              >
                Contact
              </a>
            </div>

            {/* Back to Top */}
            <button
              onClick={handleScrollToTop}
              className="group w-12 h-12 bg-dark-200 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

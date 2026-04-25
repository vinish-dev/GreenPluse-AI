import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, User, Globe, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/report', label: 'Report' },
    { to: '/profile', label: 'Profile' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
      isScrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100/80'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-display font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white drop-shadow-sm'
            }`}>
              GreenPulse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Nav links inside a glass pill container */}
            <div className={`flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-gray-100/80'
                : 'bg-white/10 backdrop-blur-md border border-white/20'
            }`}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    location.pathname === link.to
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                      : isScrolled
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-white'
                        : 'text-white/80 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className={`w-px h-6 mx-2 ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`} />

            {/* Language Switcher */}
            <button
              onClick={() => {
                const langs = ['en', 'es', 'hi'];
                const nextIndex = (langs.indexOf(language) + 1) % langs.length;
                setLanguage(langs[nextIndex]);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isScrolled
                  ? 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                  : 'border border-white/25 text-white/80 hover:bg-white/10 hover:text-white'
              }`}
              title="Switch language"
            >
              <Globe className="w-3.5 h-3.5 inline mr-1" />
              {language}
            </button>

            {/* Profile icon */}
            <Link
              to="/profile"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                isScrolled
                  ? 'border border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:text-emerald-600 shadow-sm'
                  : 'border border-white/25 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <User className="w-4 h-4" />
            </Link>

            {/* CTA Button */}
            <Link
              to="/auth"
              className="ml-1 flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-teal-400 hover:scale-105 hover:shadow-emerald-500/40 transition-all duration-200"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-all duration-200 ${
              isScrolled
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-3 right-3 top-[4.5rem] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden animate-fade-up">
            <div className="p-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    location.pathname === link.to
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-px bg-gray-100 my-1" />

              {/* Mobile language */}
              <div className="flex items-center gap-2 px-4 py-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <div className="flex gap-1.5">
                  {['en', 'es', 'hi'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        language === lang
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/auth"
                className="flex items-center justify-center gap-2 px-4 py-3 mt-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

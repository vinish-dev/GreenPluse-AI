import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Mail, Leaf, ArrowRight, Send } from 'lucide-react';
import Container from './Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const socialLinks = [
    { name: 'Twitter',  href: 'https://twitter.com/greenpulse',                icon: Twitter  },
    { name: 'GitHub',   href: 'https://github.com/yourusername/greenpulse',    icon: Github   },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/greenpulse',       icon: Linkedin },
    { name: 'Email',    href: 'mailto:contact@greenpulse.app',                 icon: Mail     },
  ];

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Report Issue',    href: '/report'        },
        { name: 'Live Dashboard',  href: '/dashboard'     },
        { name: 'Impact Map',      href: '/map'           },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Voting Forum',    href: '/voting'        },
        { name: 'Collaboration',   href: '/collaboration' },
        { name: 'Join Us',         href: '/auth'          },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Impact Data',     href: '/impact'        },
        { name: 'Privacy Policy',  href: '#'              },
        { name: 'Terms of Service',href: '#'              },
      ],
    },
  ];

  return (
    <footer className="footer-dark relative pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-emerald-900/40 rounded-full blur-[80px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">
                GreenPulse
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs text-sm">
              Empowering citizens to take direct action against climate change through localized reporting and community collaboration.
            </p>

            {/* Social icons */}
            <div className="flex space-x-3 pt-1">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-5">
                <h3 className="text-xs font-bold text-emerald-400 tracking-[0.15em] uppercase font-display">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-emerald-400 mr-0 group-hover:mr-2 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter column */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-emerald-400 tracking-[0.15em] uppercase font-display">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get the latest reports and impact updates delivered to your inbox.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">✓</span>
                You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative pt-8 border-t border-white/8">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} GreenPulse. All rights reserved.
            </p>
            <div className="flex items-center space-x-5 text-sm text-gray-500">
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="text-emerald-500 font-medium">Null Pointer Bros</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

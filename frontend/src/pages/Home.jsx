// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Users, TrendingUp, Shield,
  ArrowRight, CheckCircle, Clock, BarChart2, Search,
  ChevronDown, Lock, Globe, BadgeCheck, Leaf
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/layout/Container';
import MapView from '../components/MapView';
import { motion, useInView } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import { reportsAPI } from '../services/api';

// ─────────────────────────────────────────────
// Count-up hook
// ─────────────────────────────────────────────
function useCountUp(target, duration = 1800, startOnView = false, ref = null) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(!startOnView);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (startOnView && inView) setTriggered(true);
  }, [inView, startOnView]);

  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const numeric = parseInt(String(target).replace(/\D/g, ''), 10);
    if (!numeric) { setCount(target); return; }
    const step = numeric / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) {
        setCount(target);
        clearInterval(timer);
      } else {
        const str = String(target);
        const suffix = str.replace(/[\d,]/g, '');
        const prefix = str.match(/^[^\d]*/)?.[0] || '';
        setCount(prefix + Math.floor(start).toLocaleString() + suffix);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, target, duration]);

  return count;
}

// ─────────────────────────────────────────────
// Animated stat item
// ─────────────────────────────────────────────
function StatItem({ value, label, icon, index }) {
  const ref = useRef(null);
  const animatedValue = useCountUp(value, 1600, true, ref);
  return (
    <div ref={ref} className="px-4 group flex flex-col items-center" style={{ animationDelay: `${index * 120}ms` }}>
      <div className="flex justify-center mb-3 text-emerald-300 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold mb-1.5 font-display tracking-tight animate-count-up">
        {animatedValue || value}
      </div>
      <div className="text-emerald-200 font-medium text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await reportsAPI.getAll({ limit: 6 });
        if (response && response.reports) setReports(response.reports);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = reports.filter(report => {
    let statusMatch = false;
    if (activeTab === 'all') statusMatch = true;
    else if (activeTab === 'pending') statusMatch = report.status === 'pending';
    else if (activeTab === 'in-progress') statusMatch = ['under_review', 'in_progress', 'implemented'].includes(report.status);
    else if (activeTab === 'resolved') statusMatch = ['approved', 'completed', 'resolved'].includes(report.status);
    const textMatch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.address?.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && textMatch;
  });

  const stats = [
    { value: '1,200+', label: 'Reports Submitted', icon: <BarChart2 className="w-6 h-6" /> },
    { value: '850+',   label: 'Issues Resolved',   icon: <CheckCircle className="w-6 h-6" /> },
    { value: '95%',    label: 'Satisfaction',       icon: <TrendingUp className="w-6 h-6" /> },
    { value: '24/7',   label: 'Support',            icon: <Clock className="w-6 h-6" /> },
  ];

  const features = [
    {
      step: '01',
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: 'Geo-Tagged Reports',
      description: 'Pinpoint environmental issues with precise location tracking',
      gradient: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-emerald-400/30',
    },
    {
      step: '02',
      icon: <Users className="w-6 h-6 text-white" />,
      title: 'Community Driven',
      description: 'Join thousands making a difference in their communities',
      gradient: 'from-blue-400 to-indigo-500',
      shadow: 'shadow-blue-400/30',
    },
    {
      step: '03',
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: 'Real-time Updates',
      description: 'Track the progress of reported issues in real-time',
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'shadow-amber-400/30',
    },
    {
      step: '04',
      icon: <Shield className="w-6 h-6 text-white" />,
      title: 'Verified Actions',
      description: 'Trust in our verification system for legitimate reports',
      gradient: 'from-rose-400 to-pink-500',
      shadow: 'shadow-rose-400/30',
    },
  ];

  const backgrounds = [
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1665474581125-8e9b0dd6628c?q=80&w=2670&auto=format&fit=crop",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 font-sans">

        {/* ──────────────────────────────── HERO ──────────────────────────────── */}
        <section className="relative overflow-hidden min-h-[720px] flex items-center justify-center bg-gradient-hero text-white pt-24 pb-20">

          {/* Ambient blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[100px] animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
          </div>

          {/* Rotating background images */}
          {backgrounds.map((bg, index) => (
            <motion.img
              key={index}
              src={bg}
              alt={`Background ${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentBgIndex ? 0.45 : 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ zIndex: 0 }}
            />
          ))}

          {/* Rich overlay */}
          <div className="absolute inset-0 hero-overlay" style={{ zIndex: 1 }} />

          <Container className="relative" style={{ zIndex: 2 }}>
            <div className="max-w-5xl mx-auto text-center px-4">

              {/* Badge pill */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-white/90">🌱 Live Community Reports — Join the movement</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-tight"
              >
                Empowering Communities for a{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-lime-300 bg-clip-text text-transparent">
                    Greener Tomorrow
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-lime-400 rounded-full opacity-60" />
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl font-light mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed"
              >
                Report, track, and resolve environmental issues in your area. Join the movement to make a real impact.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Link to="/report">
                  <Button size="lg" className="rounded-full px-8 py-4 text-lg font-semibold shadow-2xl shadow-emerald-900/40 hover:scale-105 hover:shadow-emerald-500/30 transition-all duration-300">
                    Report an Issue <ArrowRight className="inline ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="glass" size="lg" className="rounded-full px-8 py-4 text-lg font-semibold hover:bg-white/20 transition-all duration-300">
                    View Dashboard
                  </Button>
                </Link>
              </motion.div>

              {/* Carousel dots */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {backgrounds.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${i === currentBgIndex ? 'active' : ''}`}
                    onClick={() => setCurrentBgIndex(i)}
                    aria-label={`Go to background ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </Container>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce-slow" style={{ zIndex: 2 }}>
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </section>

        {/* ──────────────────────────────── SEARCH / FILTER ──────────────────────────────── */}
        <section className="relative z-20 -mt-16 px-4">
          <Container>
            <div className="bg-white/85 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-2xl shadow-black/5 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for issues..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/60 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
                  {['all', 'pending', 'in-progress', 'resolved'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all duration-200 text-sm ${
                        activeTab === tab
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                          : 'bg-gray-100/60 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ──────────────────────────────── MAP ──────────────────────────────── */}
        <section className="py-20 md:py-28">
          <Container>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-4 border border-emerald-100">
                Active Reports
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-5 text-gray-900">
                Explore Environmental Issues
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Browse through reported environmental issues in your area and track their progress through our interactive map.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/60 overflow-hidden border border-gray-100 h-[580px] w-full hover:shadow-3xl transition-shadow duration-500">
              <MapView reports={filteredReports} />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 mb-4">
                Found <span className="font-bold text-emerald-600">{filteredReports.length}</span> reports matching your criteria.
              </p>
              {searchQuery && filteredReports.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                  {filteredReports.slice(0, 3).map(report => (
                    <Card key={report.id} className="p-4 border hover:shadow-md transition glow-card">
                      <h4 className="font-bold text-gray-800 mb-1">{report.title}</h4>
                      <p className="text-sm text-gray-500 mb-3 truncate">{report.location?.address}</p>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        report.status === 'pending'  ? 'bg-yellow-100 text-yellow-800' :
                        report.status === 'approved' ? 'bg-green-100 text-green-800'  : 'bg-gray-100 text-gray-800'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </Card>
                  ))}
                  {filteredReports.length > 3 && (
                    <p className="col-span-full text-center text-sm text-gray-500">
                      ...and {filteredReports.length - 3} more on the map.
                    </p>
                  )}
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* ──────────────────────────────── FEATURES ──────────────────────────────── */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.025]" />
          {/* Soft ambient glow behind the section */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-100 rounded-full blur-[80px] opacity-60" />
          <Container className="relative">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-4 border border-emerald-100">
                How It Works
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-5 text-gray-900">
                Four Simple Steps
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Our platform empowers you to make a tangible difference.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
            >
              {/* Connector lines (desktop only) */}
              <div className="hidden lg:block absolute top-10 left-[calc(25%-0px)] w-[calc(75%-0px)] h-px bg-gradient-to-r from-emerald-200 via-blue-200 to-rose-200 z-0" />

              {features.map((feature, index) => (
                <motion.div variants={itemVariants} key={index} className="relative z-10">
                  <div className="gradient-border glow-card p-8 text-center h-full group bg-white rounded-2xl border border-gray-100 shadow-sm">
                    {/* Step number */}
                    <div className="text-xs font-bold text-gray-300 tracking-[0.2em] uppercase mb-4">
                      Step {feature.step}
                    </div>
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* ──────────────────────────────── STATS ──────────────────────────────── */}
        <section className="py-20 bg-gradient-stats text-white relative overflow-hidden">
          {/* Floating leaf particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-white/5 text-6xl animate-float select-none"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${5 + i}s`,
                }}
              >
                🌿
              </div>
            ))}
          </div>
          <Container className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10"
            >
              {stats.map((stat, index) => (
                <StatItem key={index} {...stat} index={index} />
              ))}
            </motion.div>
          </Container>
        </section>

        {/* ──────────────────────────────── CTA ──────────────────────────────── */}
        <section className="py-24">
          <Container>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-cta p-12 md:p-20 text-white text-center shadow-2xl shadow-emerald-500/20"
            >
              {/* Decorative blobs */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-teal-900/25 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
              {/* Mesh grid overlay */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }} />

              <div className="relative z-10 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 mb-8 text-sm font-medium">
                  <Leaf className="w-4 h-4" /> Make an impact today
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                  Ready to make a{' '}
                  <span className="text-emerald-200">difference?</span>
                </h2>
                <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of citizens already making their communities greener and more sustainable today. Every report counts.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                  <Button
                    to="/auth"
                    size="lg"
                    className="bg-white text-emerald-700 hover:bg-gray-50 shadow-xl border-0 font-bold px-10 py-4 text-lg hover:scale-105 transition-transform duration-200"
                  >
                    Get Started Now <ArrowRight className="ml-2 w-5 h-5 inline" />
                  </Button>
                  <Button
                    to="/impact"
                    variant="glass"
                    size="lg"
                    className="border-white/35 hover:bg-white/15 px-10 py-4 text-lg"
                  >
                    See Real Impact
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="trust-badge"><Lock className="w-3.5 h-3.5" /> Secure & Private</span>
                  <span className="trust-badge"><Globe className="w-3.5 h-3.5" /> Open Source</span>
                  <span className="trust-badge"><BadgeCheck className="w-3.5 h-3.5" /> Verified Reports</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

      </div>
    </PageTransition>
  );
};

export default Home;
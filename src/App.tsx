/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  ArrowRight, 
  Menu, 
  X, 
  Github, 
  Twitter, 
  Linkedin,
  ChevronRight,
  Sparkles,
  Layers,
  Code,
  User,
  Phone,
  Mail,
  Lock
} from 'lucide-react';

const UserOnboarding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const checkStatus = async () => {
      const hasOnboarded = localStorage.getItem('techspark_onboarded');
      if (hasOnboarded === 'true') {
        setIsOpen(false);
        return;
      }

      try {
        const response = await fetch('/api/check-submission');
        const data = await response.json();
        if (data.submitted) {
          localStorage.setItem('techspark_onboarded', 'true');
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Failed to check submission status:', err);
        setIsOpen(true); // Fallback to showing it
      }
    };

    checkStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save lead');

      localStorage.setItem('techspark_onboarded', 'true');
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            className="glass max-w-md w-full p-8 rounded-[2.5rem] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary" />
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-brand-primary" size={32} />
              </div>
              <h2 className="text-3xl font-display font-bold mb-2">Welcome to TechSpark</h2>
              <p className="text-white/60">Please provide your details to access the platform.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/40">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-primary transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/40">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-primary transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/40">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    required
                    type="tel" 
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-primary transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-brand-primary text-brand-dark rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
              >
                Enter Platform
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Services', href: '#services' },
    { name: 'Technology', href: '#tech' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 glass' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap className="text-brand-dark fill-brand-dark" size={24} />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">TechSpark</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-brand-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="px-6 py-2.5 bg-white text-brand-dark rounded-full text-sm font-bold hover:bg-brand-primary transition-colors">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t-0 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-white/70 hover:text-brand-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-4 bg-brand-primary text-brand-dark rounded-xl font-bold">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6">
            <Sparkles size={14} className="text-brand-primary" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-primary">Next-Gen Innovation</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-extrabold leading-[0.9] mb-8">
            Ignite Your <br />
            <span className="text-gradient">Digital Future.</span>
          </h1>
          <p className="text-xl text-white/60 max-w-lg mb-10 leading-relaxed">
            TechSpark provides the infrastructure and intelligence to scale your vision from concept to global dominance. Built for the bold.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-brand-primary text-brand-dark rounded-2xl font-bold flex items-center gap-2 group hover:scale-105 transition-transform">
              Launch Platform <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 glass rounded-2xl font-bold hover:bg-white/10 transition-colors">
              View Documentation
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6 text-white/40">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">Trusted by 2,000+ innovative startups</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{ perspective: 1000 }}
          className="relative"
        >
          <motion.div 
            whileHover={{ rotateY: 15, rotateX: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10 glass rounded-[2.5rem] p-4 aspect-square flex items-center justify-center overflow-hidden shadow-2xl"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent" />
             <div className="grid grid-cols-2 gap-4 w-full h-full p-4">
                <div className="bg-white/5 rounded-3xl p-6 flex flex-col justify-between animate-float">
                  <Cpu size={32} className="text-brand-primary" />
                  <div>
                    <div className="text-2xl font-bold">99.9%</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Uptime</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 flex flex-col justify-between animate-float [animation-delay:1s]">
                  <Globe size={32} className="text-brand-secondary" />
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Regions</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 flex flex-col justify-between animate-float [animation-delay:2s]">
                  <Shield size={32} className="text-brand-primary" />
                  <div>
                    <div className="text-2xl font-bold">AES-256</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Security</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 flex flex-col justify-between animate-float [animation-delay:1.5s]">
                  <Layers size={32} className="text-brand-secondary" />
                  <div>
                    <div className="text-2xl font-bold">Infinite</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Scalability</div>
                  </div>
                </div>
             </div>
          </motion.div>
          {/* Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "Neural Engine",
      description: "Proprietary AI models that optimize your workflow in real-time.",
      icon: <Cpu className="text-brand-primary" />,
      color: "from-brand-primary/20"
    },
    {
      title: "Global Mesh",
      description: "Deploy to edge nodes worldwide with sub-10ms latency.",
      icon: <Globe className="text-brand-secondary" />,
      color: "from-brand-secondary/20"
    },
    {
      title: "Fortress Security",
      description: "Military-grade encryption and automated threat detection.",
      icon: <Shield className="text-brand-primary" />,
      color: "from-brand-primary/20"
    },
    {
      title: "DevX First",
      description: "The most intuitive CLI and API documentation ever built.",
      icon: <Code className="text-brand-secondary" />,
      color: "from-brand-secondary/20"
    }
  ];

  return (
    <section id="solutions" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-brand-primary mb-4">The Ecosystem</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold">Everything you need to <br /> <span className="text-white/40 italic">build the future.</span></h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: 2000 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15, 
                rotateY: 10, 
                rotateX: -5,
                z: 50,
                boxShadow: "0 25px 50px -12px rgba(0, 255, 136, 0.25)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: i * 0.1 
              }}
              className="glass p-8 rounded-[2rem] relative group overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{f.title}</h4>
                <p className="text-white/50 leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/10" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Ready to spark <br /> your next big idea?</h2>
            <p className="text-xl text-white/60 mb-12">
              Join thousands of founders building on TechSpark. Start your 14-day free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-brand-dark rounded-2xl font-bold text-lg hover:bg-brand-primary transition-colors">
                Get Started Now
              </button>
              <button className="w-full sm:w-auto px-10 py-5 glass rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-brand-dark/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            className="glass max-w-2xl w-full p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold">{title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar text-white/60 leading-relaxed">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <footer className="py-20 border-t border-white/5">
      <Modal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
        title="Privacy Policy"
      >
        <p className="mb-4">Your privacy is important to us. It is TechSpark's policy to respect your privacy regarding any information we may collect from you across our website.</p>
        <h4 className="text-white font-bold mb-2">1. Information We Collect</h4>
        <p className="mb-4">We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
        <h4 className="text-white font-bold mb-2">2. Use of Information</h4>
        <p className="mb-4">We only retain collected information for as long as necessary to provide you with your requested service.</p>
      </Modal>

      <Modal 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)} 
        title="Terms of Service"
      >
        <p className="mb-4">By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations.</p>
        <h4 className="text-white font-bold mb-2">1. Use License</h4>
        <p className="mb-4">Permission is granted to temporarily download one copy of the materials on TechSpark's website for personal, non-commercial transitory viewing only.</p>
      </Modal>

      <Modal 
        isOpen={activeModal === 'cookies'} 
        onClose={() => setActiveModal(null)} 
        title="Cookie Policy"
      >
        <p className="mb-4">We use cookies to help improve your experience of our website. This cookie policy is part of TechSpark's privacy policy.</p>
      </Modal>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center">
                <Zap className="text-brand-dark fill-brand-dark" size={18} />
              </div>
              <span className="text-xl font-display font-bold">TechSpark</span>
            </div>
            <p className="text-white/40 max-w-sm mb-4">
              The world's most advanced platform for digital innovation. We empower creators to build what's next.
            </p>
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-3 text-white/60 hover:text-brand-primary transition-colors">
                <Phone size={16} />
                <a href="tel:8519883365">8519883365</a>
              </div>
              <div className="flex items-center gap-3 text-white/60 hover:text-brand-primary transition-colors">
                <Mail size={16} />
                <a href="mailto:contact@techspark.ai">contact@techspark.ai</a>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-brand-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-brand-primary transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-brand-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-6">Product</h5>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
        </div>
        
          <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 text-xs">
            <div className="flex flex-col items-center md:items-start gap-4">
              <p className="text-white/20">© 2024 TechSpark Inc. All rights reserved.</p>
              <div className="flex gap-4">
                <button 
                  onClick={onAdminClick}
                  className="flex items-center gap-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary px-4 py-2 rounded-full transition-all cursor-pointer font-medium border border-brand-primary/20"
                >
                  <Layers size={14} />
                  View Leads (Admin)
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('techspark_onboarded');
                    window.location.reload();
                  }}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/40 px-4 py-2 rounded-full transition-all cursor-pointer border border-white/10"
                >
                  <Sparkles size={14} />
                  Reset Onboarding
                </button>
              </div>
            </div>
            <div className="flex gap-8 mt-6 md:mt-0 text-white/20">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
              <button onClick={() => setActiveModal('cookies')} className="hover:text-white transition-colors cursor-pointer">Cookie Policy</button>
            </div>
        </div>
      </div>
    </footer>
  );
};

const AdminDashboard = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && isLoggedIn) {
      fetchLeads();
    }
  }, [isOpen, isLoggedIn]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'meruga' && loginForm.password === '1234') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            className="glass max-w-4xl w-full p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold">Admin Dashboard</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {!isLoggedIn ? (
              <div className="flex-1 flex flex-col items-center justify-center py-10">
                <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                  <Lock className="text-brand-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-6">Admin Login Required</h3>
                <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/40">Username</label>
                    <input 
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/40">Password</label>
                    <input 
                      type="password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <button 
                    type="submit"
                    className="w-full bg-brand-primary text-brand-dark font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-brand-primary/20 transition-all"
                  >
                    Login
                  </button>
                </form>
              </div>
            ) : (
              <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : leads.length === 0 ? (
                  <div className="text-center py-20 text-white/40">No leads found yet.</div>
                ) : (
                  <div className="grid gap-4">
                    {leads.map((lead) => (
                      <div key={lead.id} className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-lg">{lead.name}</div>
                          <div className="text-white/60 text-sm">{lead.email}</div>
                        </div>
                        <div className="flex items-center gap-6">
                          <a 
                            href={`tel:${lead.phone}`}
                            className="text-brand-primary font-mono hover:underline flex items-center gap-2"
                          >
                            <Phone size={14} />
                            {lead.phone}
                          </a>
                          <div className="text-white/20 text-xs">{new Date(lead.created_at).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <UserOnboarding />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      
      {/* Floating Admin Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-brand-primary text-brand-dark rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:shadow-brand-primary/20 transition-all"
        title="Admin Dashboard"
      >
        <Layers size={24} />
      </motion.button>

      <Navbar />
      <Hero />
      <Features />
      
      {/* Services Section */}
      <section id="services" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-brand-primary mb-4">Our Services</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold mb-6">Tailored <span className="text-gradient">Solutions</span></h3>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              We provide end-to-end digital transformation services to help your business scale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Cloud Infrastructure', desc: 'Scalable, secure, and high-performance cloud solutions for modern apps.', icon: <Globe size={24} /> },
              { title: 'AI Integration', desc: 'Leverage the power of machine learning to automate and optimize your workflows.', icon: <Cpu size={24} /> },
              { title: 'Cyber Security', desc: 'Advanced threat protection and data encryption to keep your assets safe.', icon: <Shield size={24} /> },
              { title: 'Custom Software', desc: 'Bespoke applications built with the latest technologies for your unique needs.', icon: <Code size={24} /> },
              { title: 'Data Analytics', desc: 'Turn your raw data into actionable insights with our advanced BI tools.', icon: <Zap size={24} /> },
              { title: '24/7 Support', desc: 'Dedicated experts available around the clock to ensure your success.', icon: <Phone size={24} /> }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-[2rem] hover:border-brand-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <p className="text-white/40 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
              style={{ perspective: 1000 }}
            >
              <motion.div 
                whileHover={{ rotateY: -10, rotateX: 5 }}
                className="glass rounded-[3rem] p-4 aspect-[4/5] relative overflow-hidden group"
              >
                <img 
                  src="https://picsum.photos/seed/rajanikanth/800/1000" 
                  alt="Rajanikanth" 
                  className="w-full h-full object-cover rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10">
                  <div className="text-4xl font-display font-bold">Rajanikanth</div>
                  <div className="text-brand-primary font-mono uppercase tracking-widest text-sm">Founder & Visionary</div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-brand-primary mb-4">The Visionary</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold mb-8">Meet <span className="text-gradient">Rajanikanth</span></h3>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
                With over two decades of experience in disruptive technologies, Rajanikanth founded TechSpark with a singular mission: to democratize high-performance digital infrastructure.
              </p>
              <p className="text-lg text-white/40 mb-10">
                His leadership has steered TechSpark from a garage startup to a global powerhouse, consistently pushing the boundaries of what's possible in AI and cloud computing.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-brand-primary">20+</div>
                  <div className="text-sm text-white/40 uppercase tracking-wider">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-secondary">15</div>
                  <div className="text-sm text-white/40 uppercase tracking-wider">Global Awards</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 glass border-x-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-display font-bold mb-2">120M+</div>
            <div className="text-white/40 text-sm uppercase tracking-widest">Requests/sec</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-display font-bold mb-2">99.99%</div>
            <div className="text-white/40 text-sm uppercase tracking-widest">SLA Guaranteed</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-display font-bold mb-2">180+</div>
            <div className="text-white/40 text-sm uppercase tracking-widest">Countries</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-display font-bold mb-2">24/7</div>
            <div className="text-white/40 text-sm uppercase tracking-widest">Expert Support</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-brand-primary mb-4">Contact Us</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold mb-8">Let's Build <span className="text-gradient">Together</span></h3>
              <p className="text-xl text-white/60 mb-12 leading-relaxed">
                Have a project in mind? Our team of experts is ready to help you turn your vision into reality.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-white/40 uppercase tracking-widest mb-1">Call Us</div>
                    <a href="tel:8519883365" className="text-xl font-bold hover:text-brand-primary transition-colors">8519883365</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-white/40 uppercase tracking-widest mb-1">Email Us</div>
                    <a href="mailto:contact@techspark.ai" className="text-xl font-bold hover:text-brand-primary transition-colors">contact@techspark.ai</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    <Globe size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-white/40 uppercase tracking-widest mb-1">Location</div>
                    <div className="text-xl font-bold">Hyderabad, India</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-10 rounded-[3rem]">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/40">First Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-colors" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/40">Last Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/40">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/40">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
                </div>
                <button className="w-full py-5 bg-brand-primary text-brand-dark rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/20 flex items-center justify-center mb-8">
                <Sparkles className="text-brand-primary" size={32} />
              </div>
              <blockquote className="text-3xl md:text-4xl font-display font-medium leading-tight mb-8">
                "TechSpark didn't just provide us with a platform; they provided us with a competitive edge. Our deployment speed increased by 400% in the first month."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src="https://picsum.photos/seed/ceo/100/100" alt="CEO" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-bold">Sarah Chen</div>
                  <div className="text-white/40 text-sm">CEO at Flux Dynamics</div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="glass rounded-[2.5rem] p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-sm font-mono text-brand-primary">SYSTEM_STATUS: OPTIMAL</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    <div className="w-2 h-2 rounded-full bg-brand-primary/40" />
                    <div className="w-2 h-2 rounded-full bg-brand-primary/20" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-white/5 rounded-full w-full relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.random() * 60 + 40}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <div className="text-xs text-white/40 mb-1 uppercase">Latency</div>
                    <div className="text-xl font-bold">12ms</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <div className="text-xs text-white/40 mb-1 uppercase">Throughput</div>
                    <div className="text-xl font-bold">4.2GB/s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer onAdminClick={() => setIsAdminOpen(true)} />
    </div>
  );
}

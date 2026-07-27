'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'אודות', href: '#about' },
    { label: 'האתגר האינטראקטיבי', href: '#game' },
    { label: 'סוגי מופעים', href: '#shows' },
    { label: 'רגעים מהשטח', href: '#gallery' },
    { label: 'המלצות', href: '#testimonials' },
    { label: 'שאלות', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/logo.svg" 
            alt="לוגו יונתן רבינוביץ'" 
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className={`text-xl font-black tracking-tight transition-colors ${
              isScrolled ? 'text-slate-900 group-hover:text-orange-500' : 'text-white group-hover:text-orange-400'
            }`}>
              יונתן רבינוביץ'
            </span>
            <span className={`text-sm font-semibold tracking-wide ${
              isScrolled ? 'text-slate-500' : 'text-white/80'
            }`}>
              אמנות החושים והאשליות
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-base font-bold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-orange-500 hover:after:w-full after:transition-all after:duration-300 after:rounded-full ${
                isScrolled ? 'text-slate-600 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${
              isScrolled 
                ? 'bg-slate-900 hover:bg-slate-800 text-white' 
                : 'bg-white hover:bg-slate-100 text-slate-900'
            }`}
          >
            <span>לתיאום והצעת מחיר</span>
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`p-2 transition-colors md:hidden ${
            isScrolled ? 'text-slate-900' : 'text-white'
          }`}
          aria-label="פתח תפריט"
        >
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-slate-200 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 mt-2 absolute w-full left-0 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-bold text-slate-700 hover:text-orange-500 transition-colors py-3 border-b border-slate-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full mt-6 flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition-colors"
          >
            <span>לתיאום והצעת מחיר</span>
          </a>
        </div>
      )}
    </header>
  );
}

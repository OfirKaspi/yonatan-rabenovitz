'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CalendarCheck, Gamepad2, Star, ShieldCheck, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-900">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://static.wixstatic.com/media/682abe_d232a3fd29a74faa95facd638c038395~mv2.png" 
          alt="מופע אמנות חושים" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradients to blend with the light theme sections below */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-[#FAFAFA]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-[1px] w-12 bg-orange-400 opacity-60" />
          <span className="text-orange-400 text-sm font-bold tracking-widest uppercase">מופע אמנות חושים ומנטליזם יוקרתי</span>
          <div className="h-[1px] w-12 bg-orange-400 opacity-60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg"
        >
          חוויה שיוצאת מגבולות ההיגיון –{' '}
          <span className="text-gradient block mt-2 inline-block drop-shadow-sm">
            מופע שכולם ידברו עליו
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-200 max-w-3xl mb-12 leading-relaxed font-medium drop-shadow-md"
        >
          שילוב ייחודי של קריאת מחשבות, אשליות חזותיות והומור שנוגע בכל אורח. הופכים כל אירוע חברה, חתונה או יום הולדת לרגע בלתי נשכח.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-orange-500 text-white font-bold text-base tracking-wide hover:bg-orange-400 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            לתיאום מופע וקבלת הצעת מחיר
          </a>

          <a
            href="#game"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-transparent border border-white/60 text-white font-bold text-base tracking-wide hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
          >
            האתגר האינטראקטיבי
          </a>
        </motion.div>

      </div>
    </section>
  );
}

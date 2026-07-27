'use client';

import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.svg" 
                alt="לוגו" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl font-black text-white tracking-wide">
                יונתן רבינוביץ'
              </span>
            </div>
            
            <p className="text-base text-slate-400 max-w-md leading-relaxed font-medium">
              מופע אמנות חושים ומנטליזם שיוצא מגבולות ההיגיון. הופכים כל אירוע חברה, חתונה או אירוע פרטי לחוויה בלתי נשכחת שכולם ממשיכים לדבר עליה.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4 border-b border-slate-800 pb-3">
              ניווט מהיר
            </h4>
            <ul className="space-y-3 text-base font-medium">
              <li>
                <a href="#about" className="hover:text-orange-400 transition-colors">אודות יונתן</a>
              </li>
              <li>
                <a href="#game" className="hover:text-orange-400 transition-colors">האתגר האינטראקטיבי</a>
              </li>
              <li>
                <a href="#shows" className="hover:text-orange-400 transition-colors">סוגי מופעים</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-orange-400 transition-colors">רגעים מהשטח</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-orange-400 transition-colors">המלצות וחוות דעת</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange-400 transition-colors">שאלות נפוצות</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4 border-b border-slate-800 pb-3">
              יצירת קשר
            </h4>
            <ul className="space-y-4 text-base font-medium">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <span>kaspiofir@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>מופעים בכל רחבי הארץ והעולם</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4 font-medium">
          <p>© {new Date().getFullYear()} יונתן רבינוביץ' - אמנות החושים והאשליות. כל הזכויות שמורות.</p>
          <p className="flex items-center gap-1.5">
            נבנה בעזרת <Heart className="w-4 h-4 text-orange-500 fill-orange-500" /> על ידי Antigravity
          </p>
        </div>
      </div>
    </footer>
  );
}

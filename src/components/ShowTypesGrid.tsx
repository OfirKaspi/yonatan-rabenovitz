'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Heart, GraduationCap, Check, ArrowLeft, Sparkles } from 'lucide-react';

export default function ShowTypesGrid() {
  const shows = [
    {
      id: 'corporate',
      icon: Building2,
      badge: 'המומלץ לחברות',
      title: 'אירועי חברה וגיבוש',
      subtitle: 'מופע במה מרכזי, סוחף ומצחיק',
      bullets: [
        'מותאם לערכי החברה והצוות',
        'השתתפות קורעת מצחוק של העובדים',
        'שילוב קריאת מחשבות והומור גבוה',
      ],
      popular: true,
      image: 'https://static.wixstatic.com/media/682abe_d232a3fd29a74faa95facd638c038395~mv2.png',
    },
    {
      id: 'weddings',
      icon: Heart,
      badge: 'הכי מבוקש לחתונות',
      title: 'חתונות ואירועים פרטיים',
      subtitle: 'קבלת פנים מקרוב (Close-Up)',
      bullets: [
        'מינגלינג שובר קרח מושלם בין האורחים',
        'אשליות מטורפות מתחת לאף',
        'יצירת אווירה אנרגטית וזכירות גבוהה',
      ],
      popular: false,
      image: 'https://static.wixstatic.com/media/682abe_13de8c3df56b46718cd332936526184f~mv2.jpg',
    },
    {
      id: 'workshops',
      icon: GraduationCap,
      badge: 'חוויית VIP אינטימית',
      title: 'סדנאות ומפגשים אינטימיים',
      subtitle: 'חוויה פסיכולוגית ומרתקת',
      bullets: [
        'גילוי סודות הפסיכולוגיה של השפעה',
        'התנסות מעשית מרתקת של המשתתפים',
        'מתאים לימי הולדת וערבי מנהלים',
      ],
      popular: false,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600',
    },
  ];

  return (
    <section id="shows" className="py-24 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
            <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">סוגי מופעים וחוויות</span>
            <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            מופע שמתאים <span className="text-gradient">בדיוק לאירוע שלך</span>
          </h2>

          <p className="text-slate-600 text-lg font-medium">
            בין אם מדובר בכנס חברה של 500 איש או במפגש VIP אינטימי – כל מופע נתפר ומותאם אישית לאופיו של האירוע ולקהל היעד.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shows.map((show, idx) => {
            const IconComponent = show.icon;
            return (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative rounded-3xl bg-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                  show.popular
                    ? 'border-2 border-orange-400 shadow-xl shadow-orange-200'
                    : 'border border-slate-200 shadow-md hover:shadow-xl'
                }`}
              >
                {show.popular && (
                  <div className="absolute top-4 right-4 z-20 px-4 py-1.5 rounded-full bg-orange-500 text-white font-black text-xs tracking-wider shadow-lg">
                    {show.badge}
                  </div>
                )}

                <div className="relative h-48 overflow-hidden group">
                   <div className="absolute inset-0 bg-slate-900/40 z-10" />
                   <img src={show.image} alt={show.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center text-orange-500">
                     <IconComponent className="w-6 h-6" />
                   </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {show.title}
                  </h3>

                  <p className="text-orange-500 text-sm font-bold mb-6">
                    {show.subtitle}
                  </p>

                  <ul className="space-y-4 mb-8 flex-1">
                    {show.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <div className="p-1 rounded-full bg-orange-100 text-orange-600 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`w-full py-4 px-6 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                      show.popular
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>הזמן מופע זה</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

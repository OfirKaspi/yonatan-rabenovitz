'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Smile, Flame, Award, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: Brain,
      title: 'פסיכולוגיה וסוגסטיות',
      description: 'שימוש בטכניקות השפעה, קריאת שפת גוף ופענוח מחשבות בזמן אמת.',
    },
    {
      icon: Smile,
      title: 'הומור אינטליגנטי',
      description: 'מופע מצחיק שיוצר חיבור מיידי ואווירה משוחררת עם הקהל.',
    },
    {
      icon: Flame,
      title: 'אשליות חזותיות',
      description: 'קטעי במה עוצמתיים לצד קסמים מקרוב מתחת לאף של האורחים.',
    },
    {
      icon: Award,
      title: 'מקצועיות מוכחת',
      description: 'מאות מופעים עבור חברות ענק, זוגות ביום חתונתם ואירועי VIP.',
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-slate-50 overflow-hidden border-y border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="absolute -inset-2 bg-gradient-to-tr from-orange-300 to-orange-500 rounded-[2.5rem] blur-xl opacity-20" />
              
              <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-2xl shadow-slate-200/50 border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://static.wixstatic.com/media/11062b_1339594ba7264331b0659489d6afdf9d~mv2_d_2553_2553_s_4_2.jpg"
                  alt="יונתן רבינוביץ' אמן חושים ומנטליסט"
                  className="w-full h-[500px] object-cover object-center"
                />

                <div className="absolute bottom-6 right-6 left-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white flex items-center justify-between shadow-lg">
                  <div>
                    <span className="block text-3xl font-black text-slate-900">10+ שנים</span>
                    <span className="text-sm text-slate-600 font-bold">על הבמות המובילות בישראל</span>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 text-right"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
              <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">אודות יונתן רבינוביץ'</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
              אומנות החושים שפוגשת <span className="text-gradient">אנשים</span>
            </h2>

            <p className="text-slate-600 text-xl leading-relaxed mb-10 font-medium">
              יונתן רבינוביץ' אינו רק קוסם או מנטליסט – הוא יוצר חוויות. עם שנים של ניסיון על הבמות המובילות, יונתן משלב טכניקות פסיכולוגיות מתקדמות, זריזות ידיים מרתקת והומור אינטליגנטי בגובה העיניים.
              <br /><br />
              המטרה: לא רק להדהים את הקהל, אלא לגרום לו לצחוק, להתרגש ולהרגיש חלק פעיל ובלתי נפרד מהקסם.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-orange-50 text-orange-500 shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

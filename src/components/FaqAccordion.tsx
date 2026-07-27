'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FaqAccordion() {
  const faqs = [
    {
      question: 'כמה זמן מראש מומלץ לשריין מקום?',
      answer:
        'מומלץ לשריין כ-3 עד 6 שבועות מראש, במיוחד בעונות השיא של האירועים (עונת החתונות, חגים וסופי שנה אזרחית/עברית). במידה והאירוע שלכם מתקיים בקרוב, כדאי לבדוק זמינות טלפונית בהקדם.',
    },
    {
      question: 'האם המופע מתאים גם לקהל שאינו דובר עברית?',
      answer:
        'בהחלט! יונתן מעביר מופעים מלאים וקולחים גם באנגלית ברמת שפת אם, ושימש כקוסם ומנטליסט באירועים בינלאומיים רב-תרבותיים בארץ ובחו"ל.',
    },
    {
      question: 'מהם הדרישות הטכניות של המופע?',
      answer:
        'יונתן מגיע מצויד במערכת הגברה מקצועית ומיקרופונים שמתאימים למגוון חללים. כל מה שנדרש מצדכם הוא נקודת חיבור לחשמל ומקום ישיבה מסודר לאורחים.',
    },
    {
      question: 'האם המופע מותאם לערכי חברה או לבעלי השמחה?',
      answer:
        'כן! לפני כל מופע נערכת שיחת אפיון קצרה בה יונתן אוסף פרטים מצחיקים ואישיים על מנהלי החברה, העובדים או חתני השמחה, ומשלב אותם בהומור ובטבעיות בתוך הקסמים.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
            <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">תשובות לשאלות נפוצות</span>
            <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            כל מה שרציתם <span className="text-gradient">לדעת על המופע</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-orange-300 shadow-md shadow-orange-100' : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-right flex items-center justify-between gap-4 font-black text-lg sm:text-xl text-slate-900 hover:text-orange-600 transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-4">
                    <Sparkles className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-orange-500' : 'text-slate-300'}`} />
                    {faq.question}
                  </span>
                  <div className={`p-2.5 rounded-full transition-all duration-300 ${isOpen ? 'bg-orange-100 rotate-180 text-orange-600' : 'bg-slate-50 text-slate-400'}`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-600 font-medium text-lg leading-relaxed">
                        <div className="pt-4 border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

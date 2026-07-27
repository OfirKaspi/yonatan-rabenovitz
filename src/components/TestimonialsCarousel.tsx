'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

export default function TestimonialsCarousel() {
  const testimonials = [
    {
      quote:
        'יונתן הופיע באירוע החברה השנתי שלנו. הצוות לא הפסיק לדבר על המופע ימים אחרי! מצחיק, מדהים ומלא באנרגיה. הוא ידע בדיוק איך לשתף את המנהלים והעובדים בצורה הכי זורמת שיש.',
      author: 'עדי לוי',
      role: 'מנהלת HR בחברת הייטק',
      eventType: 'אירוע חברה שנתי',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    },
    {
      quote:
        'בחתונות בדרך כלל בקבלת פנים אנשים עומדים בצד. יונתן פשוט הרים את האווירה, אנשים צרחו מרוב תדהמה! הוא הסתובב בין האורחים ועשה קסמים מקרוב שאף אחד לא הצליח להבין. מומלץ בחום!',
      author: 'תומר ודנה',
      role: 'זוג מאושר',
      eventType: 'קבלת פנים בחתונה',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=150',
    },
    {
      quote:
        'אינטליגנטי, שנון ומטריף ת׳מוח. יונתן הפך את יום ההולדת 50 של אבא שלי לאירוע של פעם בחיים. הוא קרא מחשבות של כולנו בצורה מעבירה צמרמורת בשילוב צחוק בלתי פוסק.',
      author: 'רועי שחר',
      role: 'אירוע פרטי VIP',
      eventType: 'יום הולדת 50',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const active = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative bg-slate-50 overflow-hidden border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">חוות דעת והמלצות</span>
          <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-12 tracking-tight">
          מה אומרים אלו שכבר <span className="text-gradient">חוו את הקסם?</span>
        </h2>

        <div className="relative bg-white rounded-[2.5rem] p-8 sm:p-14 border border-slate-100 shadow-xl shadow-slate-200/50 text-right min-h-[380px] flex flex-col justify-between mx-auto max-w-4xl">
          <Quote className="absolute top-8 left-10 w-24 h-24 text-slate-100 rotate-180 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col justify-between h-full relative z-10"
            >
              <div className="flex items-center gap-1 mb-8">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-orange-400 fill-orange-400" />
                ))}
                <span className="mr-3 text-sm font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
                  {active.eventType}
                </span>
              </div>

              <p className="text-xl sm:text-3xl text-slate-800 font-bold leading-relaxed mb-10">
                "{active.quote}"
              </p>

              <div className="flex items-center justify-between border-t border-slate-100 pt-8">
                <div className="flex items-center gap-4">
                   <img src={active.image} alt={active.author} className="w-14 h-14 rounded-full object-cover border-2 border-orange-200" />
                   <div>
                     <h4 className="text-xl font-black text-slate-900">{active.author}</h4>
                     <p className="text-base text-slate-500 font-medium">{active.role}</p>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prevTestimonial}
                    className="p-3.5 rounded-full bg-slate-50 hover:bg-orange-100 text-slate-600 hover:text-orange-600 border border-slate-200 transition-colors shadow-sm"
                    aria-label="הקודם"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-3.5 rounded-full bg-slate-50 hover:bg-orange-100 text-slate-600 hover:text-orange-600 border border-slate-200 transition-colors shadow-sm"
                    aria-label="הבא"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-10 bg-orange-500'
                  : 'w-3 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`עבור לביקורת ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

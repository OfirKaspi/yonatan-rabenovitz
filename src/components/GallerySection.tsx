'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';

export default function GallerySection() {
  const images = [
    { src: 'https://static.wixstatic.com/media/11062b_1339594ba7264331b0659489d6afdf9d~mv2_d_2553_2553_s_4_2.jpg', alt: 'קהל צוחק במופע', span: 'col-span-2 md:col-span-2 row-span-2' },
    { src: 'https://static.wixstatic.com/media/682abe_13de8c3df56b46718cd332936526184f~mv2.jpg', alt: 'אירוע חברה', span: 'col-span-1 md:col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800', alt: 'קסם מקרוב', span: 'col-span-1 md:col-span-1 row-span-1' },
    { src: 'https://static.wixstatic.com/media/682abe_d232a3fd29a74faa95facd638c038395~mv2.png', alt: 'אווירה באירוע', span: 'col-span-2 md:col-span-2 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800', alt: 'הופעה חיה', span: 'col-span-1 md:col-span-2 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800', alt: 'אנשים מחייכים', span: 'col-span-1 md:col-span-2 row-span-1' },
  ];

  return (
    <section id="gallery" className="py-24 relative bg-white overflow-hidden border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
            <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">רגעים מהשטח</span>
            <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            הקסם <span className="text-gradient">קורה במציאות</span>
          </h2>
          
          <p className="text-slate-600 text-lg">
            תמונות שוות אלף מילים, אבל החיוכים, התדהמה והצחוק של האורחים – מדברים בעד עצמם. 
            הנה כמה רגעים אמיתיים מתוך אירועים.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[220px]">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${img.span}`}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                 <span className="text-white font-bold flex items-center gap-2 text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    {img.alt}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

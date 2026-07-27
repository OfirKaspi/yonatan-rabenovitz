'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, Sparkles, CheckCircle2, PhoneCall, Calendar, User, FileText, AlertCircle, Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'נא להזין שם מלא (לפחות 2 אותיות)' }),
  phone: z.string().min(9, { message: 'נא להזין מספר טלפון תקין' }),
  eventType: z.string().min(1, { message: 'נא לבחור סוג אירוע' }),
  eventDate: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      eventType: 'אירוע חברה וערב גיבוש',
      eventDate: '',
      notes: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'שגיאה בשליחת הטופס');
      }

      setIsSubmitted(true);
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || 'מתנצלים, אירעה שגיאה. נסה שנית או התקשר ישירות.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-50 overflow-hidden border-y border-slate-200">
      
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-right">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
              <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">יצירת קשר והזמנות</span>
              <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
              רוצים לבדוק זמינות <span className="text-gradient">לאירוע שלכם?</span>
            </h2>

            <p className="text-slate-600 text-lg sm:text-xl mb-10 leading-relaxed font-medium">
              השאירו פרטים קצרים ויונתן יחזור אליכם בהקדם עם הצעה מותאמת אישית למופע בלתי נשכח!
            </p>

            <div className="space-y-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-orange-500">
                  <PhoneCall className="w-7 h-7" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-500">מענה מהיר בווטסאפ או בטלפון</span>
                  <a href="tel:0500000000" className="text-2xl font-black text-slate-900 hover:text-orange-500 transition-colors">
                    050-XXXXXXX
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-orange-500">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-500">דוא"ל למענה עסקי</span>
                  <span className="text-xl font-black text-slate-900">kaspiofir@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 relative">
              {isSubmitted ? (
                <div className="text-center py-16 animate-in fade-in zoom-in-95 duration-400">
                  <div className="w-24 h-24 rounded-full bg-orange-100 mx-auto flex items-center justify-center text-orange-500 mb-6 shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                    הפנייה התקבלה!
                  </h3>
                  <p className="text-slate-600 text-lg max-w-md mx-auto mb-10 font-medium">
                    תודה רבה. יונתן קיבל את הפרטים ויחזור אליך בהקדם האפשרי.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all text-base shadow-lg"
                  >
                    שלח פנייה נוספת
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      שם מלא <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="ישראל ישראלי"
                        className={`w-full px-5 py-4 pr-12 rounded-xl bg-slate-50 border text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors ${
                          errors.name ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                      <User className="absolute right-4 top-4 w-6 h-6 text-slate-400" />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      מספר טלפון <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="050-0000000"
                        className={`w-full px-5 py-4 pr-12 rounded-xl bg-slate-50 border text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors ${
                          errors.phone ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                      <PhoneCall className="absolute right-4 top-4 w-6 h-6 text-slate-400" />
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      סוג אירוע <span className="text-orange-500">*</span>
                    </label>
                    <select
                      {...register('eventType')}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
                    >
                      <option value="אירוע חברה וערב גיבוש">אירוע חברה / ערב גיבוש</option>
                      <option value="חתונה / קבלת פנים">חתונה / קבלת פנים</option>
                      <option value="יום הולדת / אירוע פרטי">יום הולדת / אירוע פרטי</option>
                      <option value="סדנה אינטימית / VIP">סדנה אינטימית / VIP</option>
                      <option value="אירוע אחר">סוג אירוע אחר</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      תאריך משוער (אופציונלי)
                    </label>
                    <div className="relative">
                      <input
                        {...register('eventDate')}
                        type="date"
                        className="w-full px-5 py-4 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
                      />
                      <Calendar className="absolute right-4 top-4 w-6 h-6 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      הערות או בקשות מיוחדות
                    </label>
                    <div className="relative">
                      <textarea
                        {...register('notes')}
                        rows={3}
                        placeholder="ספרו מעט על האירוע..."
                        className="w-full px-5 py-4 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors resize-none"
                      />
                      <FileText className="absolute right-4 top-4 w-6 h-6 text-slate-400" />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold text-center">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 rounded-full bg-orange-500 text-white font-bold text-lg tracking-wide hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>שולח פנייה...</span>
                      </>
                    ) : (
                      <>
                        <span>קבלת הצעת מחיר</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

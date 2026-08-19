"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";
import { contactSection, contact, assets, sleeve, brand } from "@/content/site";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const formSchema = z.object({
  name: z.string().min(2, { message: "נא להזין שם מלא (לפחות 2 אותיות)" }),
  phone: z.string().min(9, { message: "נא להזין מספר טלפון תקין" }),
  eventType: z.string().min(1, { message: "נא לבחור סוג אירוע" }),
  eventDate: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      eventType: sleeve.items[0].title,
      eventDate: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setIsSubmitted(true);
      setShowToast(true);
      reset();
    } catch (err) {
      setErrorMessage(contact.phoneDisplay);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!showToast) return;
    const t = window.setTimeout(() => setShowToast(false), 5000);
    return () => window.clearTimeout(t);
  }, [showToast]);

  const fieldBase =
    "w-full rounded-2xl border bg-sand-50 px-4 py-3 text-ink-900 placeholder:text-ink-500/60 transition-colors focus:border-gold-500 focus:bg-white focus:outline-none";

  return (
    <section id="contact" className="bg-sand-100 py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-8">
        {/* Left — the invitation + WhatsApp-first */}
        <div className="md:col-span-6 md:pt-4">
          <Reveal>
            <h2 className="text-center font-display font-bold tracking-tight leading-snug text-5xl text-ink-900 md:text-start md:text-6xl">
              {contactSection.title}
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-whatsapp px-7 py-4 text-lg font-display font-bold tracking-wide text-white transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-6 w-6" />
              {contactSection.title}
            </a>
          </Reveal>

          <Reveal delay={300}>
            <dl className="mt-10 space-y-3 border-t border-sand-200 pt-8 text-ink-700">
              <div>
                <dd>
                  <a
                    href={contact.phoneHref}
                    className="text-lg font-medium transition-colors hover:text-gold-600"
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-lg font-medium transition-colors hover:text-gold-600"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Right — secondary form */}
        <div className="md:col-span-6">
          <Reveal variant="mask" className="overflow-hidden rounded-3xl border border-sand-200 bg-sand-50">
            <div className="relative aspect-3/1 w-full">
              <Image
                src={assets.audience1}
                alt={brand.name}
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              {isSubmitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                    <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden />
                  </div>
                  <p className="font-display font-bold text-2xl text-ink-900">
                    {contactSection.successTitle}
                  </p>
                  <p className="mt-3 text-lg text-ink-700">
                    {contactSection.successBody}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
                  <div>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="שם"
                      className={cn(fieldBase, errors.name ? "border-gold-500" : "border-sand-200")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs font-medium tracking-wider text-gold-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder={contact.phoneDisplay}
                      className={cn(fieldBase, errors.phone ? "border-gold-500" : "border-sand-200")}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs font-medium tracking-wider text-gold-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <select
                    {...register("eventType")}
                    className={cn(fieldBase, "border-sand-200")}
                  >
                    {sleeve.items.map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>

                  <input
                    {...register("eventDate")}
                    type="date"
                    className={cn(fieldBase, "border-sand-200")}
                  />

                  <textarea
                    {...register("notes")}
                    rows={3}
                    className={cn(fieldBase, "resize-none border-sand-200")}
                  />

                  {errorMessage && (
                    <p className="rounded-2xl bg-gold-500/10 px-4 py-3 text-center text-sm font-medium text-gold-600">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full border border-gold-400 bg-ink-900 py-3.5 text-base font-display font-bold tracking-wide text-sand-50 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {contactSection.title}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-24 left-1/2 z-50 w-[min(92vw,24rem)] -translate-x-1/2 rounded-2xl border border-sand-200 bg-ink-900 px-5 py-4 text-center shadow-lg shadow-ink-900/20 md:bottom-8"
        >
          <p className="font-display font-bold text-sand-50">
            {contactSection.successTitle}
          </p>
          <p className="mt-1 text-sm text-sand-200">
            {contactSection.successBody}
          </p>
        </div>
      )}
    </section>
  );
}


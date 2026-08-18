"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";
import { contactSection, contact, assets, sleeve } from "@/content/site";

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
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "שגיאה בשליחת הטופס");
      setIsSubmitted(true);
      reset();
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "מתנצלים, אירעה שגיאה. נסו שוב או שלחו הודעת וואטסאפ.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldBase =
    "w-full rounded-xs border bg-sand-50 px-4 py-3 text-ink-900 placeholder:text-ink-500/60 transition-colors focus:border-suede-500 focus:bg-white focus:outline-none";

  return (
    <section id="contact" className="bg-sand-100 py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-8">
        {/* Left — the invitation + WhatsApp-first */}
        <div className="md:col-span-6 md:pt-4">
          <Reveal>
            <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-suede-600">
              {contactSection.kicker}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-4xl font-bold leading-tight text-ink-900 md:text-5xl">
              {contactSection.title}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-700">
              {contactSection.sub}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-whatsapp px-7 py-4 text-lg font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-6 w-6" />
              {contactSection.whatsappCta}
            </a>
          </Reveal>

          {/* Direct details — real values pending (flagged placeholders). */}
          <Reveal delay={400}>
            <dl className="mt-10 space-y-3 border-t border-sand-200 pt-8 text-ink-700">
              <div className="flex items-baseline gap-3">
                <dt className="text-sm font-semibold text-ink-500">טלפון</dt>
                <dd>
                  <a
                    href={contact.phoneHref}
                    className="text-lg font-medium transition-colors hover:text-suede-600"
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              {contact.instagram && (
                <div className="flex items-baseline gap-3">
                  <dt className="text-sm font-semibold text-ink-500">אינסטגרם</dt>
                  <dd>
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium transition-colors hover:text-suede-600"
                    >
                      @yonatan.rabinovitz
                    </a>
                  </dd>
                </div>
              )}
              {contact.email && (
                <div className="flex items-baseline gap-3">
                  <dt className="text-sm font-semibold text-ink-500">אימייל</dt>
                  <dd>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-lg font-medium transition-colors hover:text-suede-600"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>

        {/* Right — secondary form */}
        <div className="md:col-span-6">
          <Reveal variant="mask" className="overflow-hidden rounded-sm border border-sand-200 bg-sand-50">
            <div className="relative aspect-3/1 w-full">
              <Image
                src={assets.audience1}
                alt="רגע של פליאה מול הקהל"
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              {isSubmitted ? (
                <div className="py-10 text-center">
                  <h3 className="font-display text-2xl font-bold text-ink-900">
                    הפנייה התקבלה, תודה.
                  </h3>
                  <p className="mt-3 text-ink-700">
                    יונתן קיבל את הפרטים ויחזור אליכם בהקדם.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-sm font-semibold text-suede-600 hover:text-suede-500"
                  >
                    שליחת פנייה נוספת
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
                  <p className="text-sm font-semibold text-ink-500">
                    {contactSection.formTitle}
                  </p>

                  <div>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="שם מלא"
                      className={cn(fieldBase, errors.name ? "border-suede-500" : "border-sand-200")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs font-medium text-suede-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="טלפון"
                      className={cn(fieldBase, errors.phone ? "border-suede-500" : "border-sand-200")}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs font-medium text-suede-600">{errors.phone.message}</p>
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
                    <option value="אירוע אחר">אירוע אחר</option>
                  </select>

                  <input
                    {...register("eventDate")}
                    type="date"
                    className={cn(fieldBase, "border-sand-200")}
                  />

                  <textarea
                    {...register("notes")}
                    rows={3}
                    placeholder="ספרו מעט על האירוע..."
                    className={cn(fieldBase, "resize-none border-sand-200")}
                  />

                  {errorMessage && (
                    <p className="rounded-xs bg-suede-500/10 px-4 py-3 text-center text-sm font-medium text-suede-600">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-ink-900 py-3.5 text-base font-semibold text-sand-50 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {isSubmitting ? "שולח..." : "שליחה"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

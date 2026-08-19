"use client";

import OptimizedImage from "@/components/OptimizedImage";
import Reveal from "@/components/Reveal";
import { about, assets, brand, cld } from "@/content/site";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 bg-sand-50 py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 md:grid-cols-12 md:gap-12 md:px-8">
        <div className="md:col-span-5">
          <Reveal
            variant="mask"
            className="relative aspect-[4/5] w-full md:w-[124%] md:max-w-none md:-me-[12%] md:sticky md:top-20"
          >
            <OptimizedImage
              src={cld(
                "e_background_removal,f_png,q_auto,w_960",
                assets.ted2,
              )}
              alt={brand.name}
              fill
              width={960}
              height={1200}
              className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_78%,rgb(0_0_0_/_0.45)_92%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_78%,rgb(0_0_0_/_0.45)_92%,transparent)]"
            />
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pt-8">
          <Reveal>
            <h2 className="title-rule title-rule-start-md text-center font-display font-bold tracking-tight leading-snug text-5xl text-ink-900 md:text-start md:text-6xl">
              {about.title}
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={150 + i * 100}>
                <p className="text-lg font-normal leading-7 text-ink-700">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <blockquote className="mt-10 border-r-2 border-gold-500 pr-6">
              <p className="font-display font-bold leading-snug text-2xl text-ink-900 md:text-3xl">
                {about.pullQuote}
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

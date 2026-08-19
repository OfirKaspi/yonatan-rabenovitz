import Reveal from "@/components/Reveal";
import InstagramIcon from "@/components/InstagramIcon";
import MediaGallery from "@/components/gallery/MediaGallery";
import { moments, brand, contact } from "@/content/site";

export default function MomentsSection() {
  return (
    <section id="gallery" className="scroll-mt-28 bg-sand-100 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="title-rule mb-12 text-center font-display font-bold tracking-tight leading-snug text-5xl text-ink-900 md:mb-16 md:text-6xl">
            {moments.title}
          </h2>
        </Reveal>

        <MediaGallery
          items={moments.items}
          title={moments.title}
          fallbackAlt={brand.name}
        />

        <Reveal className="mt-8 flex justify-center md:mt-10">
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#f58529,#dd2a7b,#8134af,#515bd4)] px-7 py-3.5 text-base font-display font-bold tracking-wide text-white"
          >
            <InstagramIcon className="h-5 w-5" />
            {moments.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

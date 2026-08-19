import Reveal from "@/components/Reveal";
import MediaGallery from "@/components/gallery/MediaGallery";
import { moments, brand } from "@/content/site";

export default function MomentsSection() {
  return (
    <section id="gallery" className="bg-sand-50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="mb-12 text-center font-display font-bold tracking-tight leading-snug text-5xl text-ink-900 md:mb-16 md:text-6xl">
            {moments.title}
          </h2>
        </Reveal>

        <MediaGallery
          items={moments.items}
          title={moments.title}
          fallbackAlt={brand.name}
        />
      </div>
    </section>
  );
}

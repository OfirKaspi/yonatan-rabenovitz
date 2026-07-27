import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import NineDotsGame from '@/components/NineDotsGame';
import AboutSection from '@/components/AboutSection';
import ShowTypesGrid from '@/components/ShowTypesGrid';
import GallerySection from '@/components/GallerySection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900">
      <Navbar />
      <HeroSection />
      <NineDotsGame />
      <AboutSection />
      <ShowTypesGrid />
      <GallerySection />
      <TestimonialsCarousel />
      <FaqAccordion />
      <ContactForm />
      <Footer />
    </main>
  );
}

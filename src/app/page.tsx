import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SleeveSection from "@/components/SleeveSection";
import VideosSection from "@/components/VideosSection";
import MomentsSection from "@/components/MomentsSection";
import PuzzleSection from "@/components/PuzzleSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-sand-50 text-ink-900">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SleeveSection />
      <VideosSection />
      <MomentsSection />
      <PuzzleSection />
      <ContactForm />
      <Footer />
    </main>
  );
}

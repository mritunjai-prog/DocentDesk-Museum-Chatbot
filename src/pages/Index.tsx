import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ExhibitShowcase } from "@/components/ExhibitShowcase";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main" role="main" aria-label="Main content">
        <HeroSection />
        <ExhibitShowcase />
        <FeaturesSection />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;

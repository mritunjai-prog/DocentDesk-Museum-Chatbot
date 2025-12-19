import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockArtifacts } from "@/data/artifacts";
import { useState } from "react";
import { ArtifactModal } from "@/components/tour/ArtifactModal";
import { Artifact3DCard } from "@/components/Artifact3DCard";
import { Clock, MapPin, Sparkles } from "lucide-react";

const Exhibits = () => {
  const [selectedArtifact, setSelectedArtifact] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Art",
    "Sculpture",
    "History",
    "Pottery",
    "Artifact",
  ];

  const filteredArtifacts =
    selectedCategory === "All"
      ? mockArtifacts
      : mockArtifacts.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 border-primary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Museum Collection
            </Badge>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Ancient Egyptian <span className="text-gradient">Exhibits</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Journey through 3,000 years of pharaonic civilization. Discover
              priceless artifacts from the land of the pyramids, from golden
              treasures to sacred hieroglyphs.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-muted-foreground">
                  Open Daily: 9AM - 6PM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-muted-foreground">
                  Main Hall, Floor 2-3
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="px-4 py-12 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-gold text-white"
                      : "border-primary/30 hover:bg-primary/10"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Artifacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtifacts.map((artifact, index) => (
                <Artifact3DCard
                  key={artifact.id}
                  artifact={artifact}
                  index={index}
                  onClick={() => setSelectedArtifact(artifact)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Collection Stats */}
        <section className="px-4 py-20 bg-gradient-to-b from-background to-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8">
                <div className="text-5xl font-bold text-gold mb-2">12+</div>
                <div className="text-lg text-muted-foreground">
                  Unique Artifacts
                </div>
              </div>
              <div className="p-8">
                <div className="text-5xl font-bold text-gold mb-2">3000+</div>
                <div className="text-lg text-muted-foreground">
                  Years of History
                </div>
              </div>
              <div className="p-8">
                <div className="text-5xl font-bold text-gold mb-2">5</div>
                <div className="text-lg text-muted-foreground">
                  Ancient Dynasties
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatbot />

      {/* Artifact Detail Modal */}
      {selectedArtifact && (
        <ArtifactModal
          open={!!selectedArtifact}
          artifact={selectedArtifact}
          onClose={() => setSelectedArtifact(null)}
        />
      )}
    </div>
  );
};

export default Exhibits;

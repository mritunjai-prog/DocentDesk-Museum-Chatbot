import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useArtifacts, type Artifact } from "@/hooks/useArtifacts";
import { ArtifactModal } from "./tour/ArtifactModal";

const categories = ["All", "Art", "Sculpture", "History", "Pottery", "Artifact"];

export const ExhibitShowcase = () => {
  const { data: artifacts, isLoading } = useArtifacts();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const filteredArtifacts = artifacts?.filter(
    (a) => selectedCategory === "All" || a.category === selectedCategory
  ) || [];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredArtifacts.length / itemsPerPage);
  const displayedArtifacts = filteredArtifacts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sculpture":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Pottery":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "History":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Art":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      default:
        return "bg-teal-500/20 text-teal-300 border-teal-500/30";
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/95">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Our Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Featured <span className="text-gradient">Exhibits</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collection of artifacts spanning thousands of years of human history
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(0);
              }}
              className={
                selectedCategory === category
                  ? "bg-primary hover:bg-primary/90"
                  : "border-primary/30 hover:bg-primary/10"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Artifacts grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="glass-card border-primary/10 animate-pulse">
                <div className="aspect-square bg-primary/10 rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-primary/10 rounded mb-2" />
                  <div className="h-3 bg-primary/5 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedArtifacts.map((artifact) => (
              <Card
                key={artifact.id}
                className="glass-card border-primary/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer overflow-hidden"
                onClick={() => setSelectedArtifact(artifact)}
              >
                {/* Artifact visual */}
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-full bg-primary/30 group-hover:bg-primary/50 transition-colors" />
                    </div>
                  </div>
                  {artifact.is_featured && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button
                    size="sm"
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary hover:bg-primary/90"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <Badge className={`mb-2 text-xs ${getCategoryColor(artifact.category)}`}>
                    {artifact.category}
                  </Badge>
                  <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {artifact.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {artifact.era && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {artifact.era}
                      </span>
                    )}
                    {artifact.origin && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {artifact.origin}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="border-primary/30"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentPage + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="border-primary/30"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Artifact detail modal */}
      <ArtifactModal
        artifact={selectedArtifact}
        open={!!selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
      />
    </section>
  );
};

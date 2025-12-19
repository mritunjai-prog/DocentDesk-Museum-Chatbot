import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Grid3x3, LayoutGrid } from "lucide-react";
import { useArtifacts, type Artifact } from "@/hooks/useArtifacts";
import { ArtifactModal } from "./tour/ArtifactModal";
import { Artifact3DCard } from "./Artifact3DCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = [
  "All",
  "Art",
  "Sculpture",
  "History",
  "Pottery",
  "Artifact",
];

export const ExhibitShowcase = () => {
  const { data: artifacts, isLoading } = useArtifacts();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  const filteredArtifacts =
    artifacts?.filter(
      (a) => selectedCategory === "All" || a.category === selectedCategory
    ) || [];

  const itemsPerPage = viewMode === "grid" ? 4 : 3;
  const totalPages = Math.ceil(filteredArtifacts.length / itemsPerPage);
  const displayedArtifacts = filteredArtifacts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleAddToCollection = (artifact: Artifact) => {
    // This will be connected to Supabase later
    console.log("Adding to collection:", artifact.name);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/95">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 text-primary"
          >
            Our Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Featured <span className="text-gradient">Exhibits</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collection of artifacts spanning
            thousands of years of human history
          </p>
        </div>

        {/* Category filters and view toggle */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
          <div className="flex flex-wrap justify-center gap-2">
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

          {/* View mode toggle */}
          <div className="flex gap-1 border border-primary/30 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8"
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "carousel" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("carousel")}
              className="h-8"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Artifacts display */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card
                key={i}
                className="glass-card border-primary/10 animate-pulse"
              >
                <div className="aspect-square bg-primary/10 rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-primary/10 rounded mb-2" />
                  <div className="h-3 bg-primary/5 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : viewMode === "carousel" ? (
          /* Carousel view */
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {filteredArtifacts.map((artifact, index) => (
                <CarouselItem
                  key={artifact.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Artifact3DCard
                    artifact={artifact}
                    onClick={() => setSelectedArtifact(artifact)}
                    onAddToCollection={() => handleAddToCollection(artifact)}
                    index={index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 border-primary/30 hover:bg-primary/20" />
            <CarouselNext className="right-0 border-primary/30 hover:bg-primary/20" />
          </Carousel>
        ) : (
          /* Grid view with enhanced 3D cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedArtifacts.map((artifact, index) => (
              <Artifact3DCard
                key={artifact.id}
                artifact={artifact}
                onClick={() => setSelectedArtifact(artifact)}
                onAddToCollection={() => handleAddToCollection(artifact)}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Pagination (only for grid view) */}
        {viewMode === "grid" && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="border-primary/30 hover:bg-primary/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={currentPage === totalPages - 1}
              className="border-primary/30 hover:bg-primary/20"
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

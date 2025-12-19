import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Search,
  Filter,
  Grid3x3,
  List,
  Calendar,
  MapPin,
  X,
} from "lucide-react";
import type { Artifact } from "@/hooks/useArtifacts";

export function MyCollection() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock collection data
  const [collection] = useState<Artifact[]>([
    {
      id: "1",
      name: "Venus de Milo",
      category: "Sculpture",
      era: "130-100 BCE",
      origin: "Greece",
      description:
        "Famous ancient Greek statue depicting Aphrodite, the goddess of love and beauty.",
      is_featured: true,
      image_url:
        "https://images.unsplash.com/photo-1566305977571-5666677c6e98?w=800&auto=format&fit=crop",
      model_url: null,
      position_x: null,
      position_y: null,
      position_z: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Rosetta Stone",
      category: "History",
      era: "196 BCE",
      origin: "Egypt",
      description:
        "Ancient Egyptian granodiorite stele inscribed with decree in three scripts.",
      is_featured: true,
      image_url:
        "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop",
      model_url: null,
      position_x: null,
      position_y: null,
      position_z: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Terracotta Amphora",
      category: "Pottery",
      era: "6th century BCE",
      origin: "Athens",
      description:
        "Black-figured amphora depicting mythological scenes from ancient Greek culture.",
      is_featured: false,
      image_url:
        "https://images.unsplash.com/photo-1567020672396-0a6e5e2e8576?w=800&auto=format&fit=crop",
      model_url: null,
      position_x: null,
      position_y: null,
      position_z: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const filteredCollection = collection.filter(
    (artifact) =>
      artifact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artifact.category.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="space-y-6">
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-current" />
              My Collection ({collection.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search your collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Collection Grid/List */}
          {filteredCollection.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-4"
              }
            >
              {filteredCollection.map((artifact) => (
                <Card
                  key={artifact.id}
                  className="glass-card hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                >
                  <CardContent
                    className={viewMode === "grid" ? "p-4" : "p-4 flex gap-4"}
                  >
                    {/* Artifact Visual */}
                    <div
                      className={`${
                        viewMode === "grid" ? "mb-4" : "w-24 flex-shrink-0"
                      } aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 shadow-xl" />
                      </div>
                      {artifact.is_featured && (
                        <Badge className="absolute top-2 right-2 text-xs bg-gold">
                          ⭐
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 left-2 text-red-500 bg-red-500/20 hover:bg-red-500/30 rounded-full"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>

                    {/* Artifact Details */}
                    <div className="flex-1 space-y-2">
                      <Badge
                        className={`text-xs ${getCategoryColor(
                          artifact.category
                        )}`}
                      >
                        {artifact.category}
                      </Badge>
                      <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                        {artifact.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {artifact.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-2">
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery
                  ? "No artifacts found"
                  : "Your collection is empty"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Try adjusting your search"
                  : "Start exploring and save your favorite artifacts"}
              </p>
              {!searchQuery && <Button>Explore Exhibits</Button>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

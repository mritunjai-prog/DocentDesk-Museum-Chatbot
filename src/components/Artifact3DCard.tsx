import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ArrowRight, Heart } from "lucide-react";
import type { Artifact } from "@/hooks/useArtifacts";
import { useToast } from "@/hooks/use-toast";
import { ArtifactImage } from "@/components/ArtifactImage";

interface Artifact3DCardProps {
  artifact: Artifact;
  onClick: () => void;
  onAddToCollection?: () => void;
  index?: number;
}

export function Artifact3DCard({
  artifact,
  onClick,
  onAddToCollection,
  index = 0,
}: Artifact3DCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();

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

  const handleAddToCollection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    if (onAddToCollection) {
      onAddToCollection();
    }
    toast({
      title: isFavorited ? "Removed from collection" : "Added to collection",
      description: isFavorited
        ? `${artifact.name} has been removed from your collection.`
        : `${artifact.name} has been added to your collection.`,
    });
  };

  return (
    <div
      className="relative animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className="glass-card border-primary/10 hover:border-primary/30 transition-all duration-500 group cursor-pointer overflow-hidden h-full hover:shadow-2xl hover:shadow-primary/20"
        onClick={onClick}
        style={{
          transform: isHovered
            ? "perspective(1000px) rotateY(5deg) rotateX(-2deg) scale(1.02)"
            : "none",
          transformStyle: "preserve-3d",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Favorite button */}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-3 left-3 z-10 rounded-full transition-all duration-300 ${
            isFavorited
              ? "text-red-500 bg-red-500/20 hover:bg-red-500/30"
              : "text-muted-foreground bg-background/50 hover:bg-background/80"
          }`}
          onClick={handleAddToCollection}
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isFavorited ? "fill-current scale-110" : ""
            }`}
          />
        </Button>

        {/* Artifact visual with 3D effect */}
        <div
          className="aspect-square relative overflow-hidden"
          style={{
            transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Artifact Image with fallback */}
          <div
            className="absolute inset-0 transition-transform duration-700"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          >
            <ArtifactImage
              src={artifact.image_url}
              alt={artifact.name}
              className="w-full h-full"
            />
          </div>

          {/* Animated background gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 transition-all duration-1000 pointer-events-none"
            style={{
              transform: isHovered
                ? "rotate(180deg) scale(1.5)"
                : "rotate(0deg) scale(1)",
              opacity: 0.6,
            }}
          />

          {/* Featured badge */}
          {artifact.is_featured && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground shadow-lg">
              ⭐ Featured
            </Badge>
          )}

          {/* Hover overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sparkle effects on hover */}
          {isHovered && (
            <>
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
              <div
                className="absolute top-3/4 right-1/3 w-2 h-2 bg-accent rounded-full animate-ping"
                style={{ animationDelay: "0.3s" }}
              />
              <div
                className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-ping"
                style={{ animationDelay: "0.6s" }}
              />
            </>
          )}
        </div>

        {/* Card content */}
        <CardContent
          className="p-4"
          style={{
            transform: isHovered ? "translateZ(10px)" : "translateZ(0)",
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Badge
            className={`mb-2 text-xs ${getCategoryColor(artifact.category)}`}
          >
            {artifact.category}
          </Badge>
          <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {artifact.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {artifact.description ||
              "Discover the fascinating story behind this artifact."}
          </p>
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
                <span className="truncate">{artifact.origin}</span>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

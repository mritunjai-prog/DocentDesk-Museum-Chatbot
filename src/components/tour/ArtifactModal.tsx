import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Info, Heart, Share2 } from "lucide-react";
import type { Artifact } from "@/hooks/useArtifacts";

interface ArtifactModalProps {
  artifact: Artifact | null;
  open: boolean;
  onClose: () => void;
}

export const ArtifactModal = ({ artifact, open, onClose }: ArtifactModalProps) => {
  if (!artifact) return null;

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <Badge className={`mb-2 ${getCategoryColor(artifact.category)}`}>
                {artifact.category}
              </Badge>
              <DialogTitle className="text-2xl font-display text-foreground">
                {artifact.name}
              </DialogTitle>
            </div>
            {artifact.is_featured && (
              <Badge variant="outline" className="border-primary text-primary">
                Featured
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Artifact image placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Info className="w-12 h-12 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">3D Model Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Artifact details */}
          <div className="grid grid-cols-2 gap-4">
            {artifact.era && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm">{artifact.era}</span>
              </div>
            )}
            {artifact.origin && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">{artifact.origin}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {artifact.description && (
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-foreground/80 leading-relaxed">{artifact.description}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="flex-1">
              <Heart className="w-4 h-4 mr-2" />
              Save to Collection
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
              Learn More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

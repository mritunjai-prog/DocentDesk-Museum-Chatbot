import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourScene } from "@/components/tour/TourScene";
import { TourControls } from "@/components/tour/TourControls";
import { Minimap } from "@/components/tour/Minimap";
import { ArtifactModal } from "@/components/tour/ArtifactModal";
import { useArtifacts, type Artifact } from "@/hooks/useArtifacts";

const VirtualTour = () => {
  const { data: artifacts, isLoading } = useArtifacts();
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [showMinimap, setShowMinimap] = useState(true);
  const [controlsEnabled, setControlsEnabled] = useState(true);

  const handleArtifactClick = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    setControlsEnabled(false);
    // Exit pointer lock when modal opens
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  };

  const handleCloseModal = () => {
    setSelectedArtifact(null);
    setControlsEnabled(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading virtual tour...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="outline" size="sm" className="glass-card border-primary/30 hover:bg-primary/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Tour title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="glass-card px-6 py-2 rounded-full">
          <h1 className="text-lg font-display font-semibold text-foreground">
            <span className="text-primary">DocentDesk</span> Virtual Museum Tour
          </h1>
        </div>
      </div>

      {/* 3D Tour scene */}
      <div className="w-full h-screen">
        <TourScene
          artifacts={artifacts || []}
          onArtifactClick={handleArtifactClick}
          controlsEnabled={controlsEnabled}
        />
      </div>

      {/* Minimap */}
      <Minimap artifacts={artifacts || []} visible={showMinimap} />

      {/* Controls overlay */}
      <TourControls
        onToggleMinimap={() => setShowMinimap(!showMinimap)}
        showMinimap={showMinimap}
      />

      {/* Artifact detail modal */}
      <ArtifactModal
        artifact={selectedArtifact}
        open={!!selectedArtifact}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default VirtualTour;

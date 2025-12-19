import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourScene } from "@/components/tour/TourScene";
import { TourControls } from "@/components/tour/TourControls";
import { Minimap } from "@/components/tour/Minimap";
import { ArtifactModal } from "@/components/tour/ArtifactModal";
import { useArtifacts, type Artifact } from "@/hooks/useArtifacts";
import { useToast } from "@/hooks/use-toast";

const VirtualTour = () => {
  const { data: artifacts, isLoading } = useArtifacts();
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(
    null
  );
  const [showMinimap, setShowMinimap] = useState(true);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [guidedMode, setGuidedMode] = useState(false);
  const [currentArtifactIndex, setCurrentArtifactIndex] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

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

  const handleToggleGuidedMode = () => {
    setGuidedMode(!guidedMode);
    if (!guidedMode) {
      setCurrentArtifactIndex(0);
      toast({
        title: "Guided Tour Started",
        description: "Sit back and enjoy the automated tour!",
      });

      // Auto-advance through artifacts
      const interval = setInterval(() => {
        setCurrentArtifactIndex((prev) => {
          if (prev >= (artifacts?.length || 0) - 1) {
            clearInterval(interval);
            setGuidedMode(false);
            toast({
              title: "Tour Complete!",
              description: "You've seen all artifacts in this collection.",
            });
            return prev;
          }
          return prev + 1;
        });
      }, 8000); // 8 seconds per artifact

      return () => clearInterval(interval);
    }
  };

  const handleScreenshot = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `docentdesk-tour-${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    }
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
          <Button
            variant="outline"
            size="sm"
            className="glass-card border-primary/30 hover:bg-primary/20"
          >
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

      {/* Guided tour progress */}
      {guidedMode && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
          <div className="glass-card px-6 py-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Artifact {currentArtifactIndex + 1} of {artifacts?.length || 0}
            </p>
            <h3 className="text-primary font-semibold">
              {artifacts?.[currentArtifactIndex]?.name}
            </h3>
          </div>
        </div>
      )}

      {/* 3D Tour scene */}
      <div className="w-full h-screen">
        <TourScene
          artifacts={artifacts || []}
          onArtifactClick={handleArtifactClick}
          controlsEnabled={controlsEnabled}
          guidedMode={guidedMode}
          currentArtifactIndex={currentArtifactIndex}
        />
      </div>

      {/* Minimap */}
      <Minimap artifacts={artifacts || []} visible={showMinimap} />

      {/* Controls overlay */}
      <TourControls
        onToggleMinimap={() => setShowMinimap(!showMinimap)}
        showMinimap={showMinimap}
        onScreenshot={handleScreenshot}
        onToggleGuidedMode={handleToggleGuidedMode}
        guidedMode={guidedMode}
        currentFloor={currentFloor}
        onFloorChange={setCurrentFloor}
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

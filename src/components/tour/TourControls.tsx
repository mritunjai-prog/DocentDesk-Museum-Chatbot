import {
  Keyboard,
  Mouse,
  Camera,
  Map,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Building,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TourControlsProps {
  onScreenshot?: () => void;
  onToggleMinimap?: () => void;
  showMinimap?: boolean;
  onToggleGuidedMode?: () => void;
  guidedMode?: boolean;
  currentFloor?: number;
  onFloorChange?: (floor: number) => void;
}

export const TourControls = ({
  onScreenshot,
  onToggleMinimap,
  showMinimap,
  onToggleGuidedMode,
  guidedMode = false,
  currentFloor = 1,
  onFloorChange,
}: TourControlsProps) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const { toast } = useToast();

  const handleScreenshot = () => {
    if (onScreenshot) {
      onScreenshot();
      toast({
        title: "Screenshot captured!",
        description: "Your virtual tour moment has been saved.",
      });
    }
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
      {/* Controls guide */}
      <div className="glass-card p-4 rounded-lg pointer-events-auto max-w-sm">
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Navigation className="w-4 h-4 text-primary" />
          Navigation Controls
        </h4>
        <div className="space-y-2 text-xs text-muted-foreground">
          {!guidedMode && (
            <>
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-primary" />
                <span>WASD / Arrow Keys to move</span>
              </div>
              <div className="flex items-center gap-2">
                <Mouse className="w-4 h-4 text-primary" />
                <span>Click to enable camera, move mouse to look</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-[8px] text-white">
              ●
            </div>
            <span>Click glowing artifacts to view details</span>
          </div>
          {guidedMode && (
            <Badge
              variant="secondary"
              className="mt-2 bg-primary/20 text-primary"
            >
              <Play className="w-3 h-3 mr-1" />
              Guided Tour Active
            </Badge>
          )}
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex flex-col gap-2 pointer-events-auto">
        {/* Floor selector */}
        <div className="glass-card p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-primary" />
            <Select
              value={currentFloor.toString()}
              onValueChange={(value) => onFloorChange?.(parseInt(value))}
            >
              <SelectTrigger className="h-8 w-32 border-primary/30">
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ground Floor</SelectItem>
                <SelectItem value="2">First Floor</SelectItem>
                <SelectItem value="3">Second Floor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action buttons */}
        <div className="glass-card p-2 rounded-lg flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-primary/30 hover:bg-primary/20 h-9 w-9"
            onClick={onToggleGuidedMode}
            title={guidedMode ? "Stop Guided Tour" : "Start Guided Tour"}
          >
            {guidedMode ? (
              <Pause className="w-4 h-4 text-primary" />
            ) : (
              <Play className="w-4 h-4 text-primary" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-primary/30 hover:bg-primary/20 h-9 w-9"
            onClick={() => setAudioEnabled(!audioEnabled)}
            title={audioEnabled ? "Mute Audio" : "Enable Audio"}
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-primary" />
            ) : (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-primary/30 hover:bg-primary/20 h-9 w-9"
            onClick={onToggleMinimap}
            title={showMinimap ? "Hide Minimap" : "Show Minimap"}
          >
            <Map
              className={`w-4 h-4 ${
                showMinimap ? "text-primary" : "text-muted-foreground"
              }`}
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-primary/30 hover:bg-primary/20 h-9 w-9"
            onClick={handleScreenshot}
            title="Take Screenshot"
          >
            <Camera className="w-4 h-4 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
};

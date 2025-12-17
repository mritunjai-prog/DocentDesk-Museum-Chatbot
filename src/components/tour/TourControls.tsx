import { Keyboard, Mouse, Camera, Map, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TourControlsProps {
  onScreenshot?: () => void;
  onToggleMinimap?: () => void;
  showMinimap?: boolean;
}

export const TourControls = ({ onScreenshot, onToggleMinimap, showMinimap }: TourControlsProps) => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
      {/* Controls guide */}
      <div className="glass-card p-4 rounded-lg pointer-events-auto">
        <h4 className="text-sm font-semibold text-foreground mb-3">Navigation Controls</h4>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-primary" />
            <span>WASD / Arrow Keys to move</span>
          </div>
          <div className="flex items-center gap-2">
            <Mouse className="w-4 h-4 text-primary" />
            <span>Click to enable camera, move mouse to look</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-[8px] text-white">
              ●
            </div>
            <span>Click glowing artifacts to view details</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pointer-events-auto">
        <Button
          variant="outline"
          size="icon"
          className="glass-card border-primary/30 hover:bg-primary/20"
          onClick={() => setAudioEnabled(!audioEnabled)}
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
          className="glass-card border-primary/30 hover:bg-primary/20"
          onClick={onToggleMinimap}
        >
          <Map className={`w-4 h-4 ${showMinimap ? "text-primary" : "text-muted-foreground"}`} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="glass-card border-primary/30 hover:bg-primary/20"
          onClick={onScreenshot}
        >
          <Camera className="w-4 h-4 text-primary" />
        </Button>
      </div>
    </div>
  );
};

import type { Artifact } from "@/hooks/useArtifacts";

interface MinimapProps {
  artifacts: Artifact[];
  visible: boolean;
}

export const Minimap = ({ artifacts, visible }: MinimapProps) => {
  if (!visible) return null;

  return (
    <div className="absolute top-4 right-4 w-48 h-48 glass-card rounded-lg p-2 pointer-events-none">
      <div className="relative w-full h-full bg-background/50 rounded border border-primary/20">
        {/* Room outline */}
        <div className="absolute inset-2 border border-primary/30 rounded" />
        
        {/* Artifact markers */}
        {artifacts.map((artifact) => {
          // Convert 3D position to minimap position (scale from -10 to 10 -> 0 to 100%)
          const x = ((artifact.position_x || 0) + 10) * 5;
          const y = ((artifact.position_z || 0) + 10) * 5;
          
          return (
            <div
              key={artifact.id}
              className={`absolute w-2 h-2 rounded-full ${
                artifact.is_featured ? "bg-primary" : "bg-accent"
              } animate-pulse`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
              title={artifact.name}
            />
          );
        })}

        {/* Center marker (player position indicator) */}
        <div
          className="absolute w-3 h-3 bg-white rounded-full border-2 border-primary"
          style={{
            left: "50%",
            top: "70%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Legend */}
        <div className="absolute bottom-1 left-1 right-1 flex justify-center gap-3 text-[8px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" /> Featured
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Exhibit
          </span>
        </div>
      </div>
    </div>
  );
};

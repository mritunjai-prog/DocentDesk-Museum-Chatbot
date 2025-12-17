import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { MuseumRoom } from "./MuseumRoom";
import { ArtifactHotspot } from "./ArtifactHotspot";
import { CameraController } from "./CameraController";
import type { Artifact } from "@/hooks/useArtifacts";

interface TourSceneProps {
  artifacts: Artifact[];
  onArtifactClick: (artifact: Artifact) => void;
  controlsEnabled: boolean;
}

export const TourScene = ({ artifacts, onArtifactClick, controlsEnabled }: TourSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 1.7, 6], fov: 75 }}
      shadows
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Environment */}
        <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
        <fog attach="fog" args={["#0f0f23", 10, 30]} />

        {/* Museum room */}
        <MuseumRoom />

        {/* Artifact hotspots */}
        {artifacts.map((artifact) => (
          <ArtifactHotspot
            key={artifact.id}
            artifact={artifact}
            onClick={onArtifactClick}
          />
        ))}

        {/* Camera controls */}
        <CameraController enabled={controlsEnabled} />
      </Suspense>
    </Canvas>
  );
};

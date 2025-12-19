import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Stars, SpotLight } from "@react-three/drei";
import { MuseumRoom } from "./MuseumRoom";
import { ArtifactHotspot } from "./ArtifactHotspot";
import { CameraController } from "./CameraController";
import type { Artifact } from "@/hooks/useArtifacts";

interface TourSceneProps {
  artifacts: Artifact[];
  onArtifactClick: (artifact: Artifact) => void;
  controlsEnabled: boolean;
  guidedMode?: boolean;
  currentArtifactIndex?: number;
}

export const TourScene = ({
  artifacts,
  onArtifactClick,
  controlsEnabled,
  guidedMode = false,
  currentArtifactIndex = 0,
}: TourSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 1.7, 6], fov: 75 }}
      shadows
      className="w-full h-full"
      gl={{ preserveDrawingBuffer: true }} // Enable screenshot capability
    >
      <Suspense fallback={null}>
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={0.6}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Spot lights on artifacts for dramatic effect */}
        {artifacts.map((artifact, index) => (
          <SpotLight
            key={`light-${artifact.id}`}
            position={[
              artifact.position_x,
              artifact.position_y + 2,
              artifact.position_z,
            ]}
            angle={0.4}
            penumbra={0.5}
            intensity={guidedMode && index === currentArtifactIndex ? 1.5 : 0.8}
            castShadow
            color={
              guidedMode && index === currentArtifactIndex
                ? "#F4D03F"
                : "#ffffff"
            }
          />
        ))}

        {/* Additional fill lights */}
        <pointLight position={[-8, 3, 0]} intensity={0.3} color="#5EEAD4" />
        <pointLight position={[8, 3, 0]} intensity={0.3} color="#5EEAD4" />
        <pointLight position={[0, 3, -8]} intensity={0.3} color="#D4AF37" />

        {/* Environment */}
        <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
        <fog attach="fog" args={["#0f0f23", 12, 35]} />
        <Environment preset="night" />

        {/* Museum room */}
        <MuseumRoom />

        {/* Artifact hotspots */}
        {artifacts.map((artifact, index) => (
          <ArtifactHotspot
            key={artifact.id}
            artifact={artifact}
            onClick={onArtifactClick}
            isHighlighted={guidedMode && index === currentArtifactIndex}
          />
        ))}

        {/* Camera controls */}
        <CameraController
          enabled={controlsEnabled && !guidedMode}
          guidedMode={guidedMode}
          targetPosition={
            guidedMode && artifacts[currentArtifactIndex]
              ? [
                  artifacts[currentArtifactIndex].position_x,
                  artifacts[currentArtifactIndex].position_y + 1.7,
                  artifacts[currentArtifactIndex].position_z + 3,
                ]
              : undefined
          }
        />
      </Suspense>
    </Canvas>
  );
};

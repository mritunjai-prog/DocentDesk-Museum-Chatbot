import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Artifact } from "@/hooks/useArtifacts";

interface ArtifactHotspotProps {
  artifact: Artifact;
  onClick: (artifact: Artifact) => void;
}

export const ArtifactHotspot = ({ artifact, onClick }: ArtifactHotspotProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y =
        (artifact.position_y || 1.5) + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(hovered ? 1.5 : 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });

  const getArtifactGeometry = () => {
    switch (artifact.category) {
      case "Sculpture":
        return <cylinderGeometry args={[0.3, 0.4, 0.8, 8]} />;
      case "Pottery":
        return <cylinderGeometry args={[0.2, 0.3, 0.6, 16]} />;
      case "History":
        return <boxGeometry args={[0.5, 0.4, 0.1]} />;
      case "Art":
        return <planeGeometry args={[0.6, 0.5]} />;
      default:
        return <dodecahedronGeometry args={[0.3]} />;
    }
  };

  const getArtifactColor = () => {
    switch (artifact.category) {
      case "Sculpture":
        return "#e8e4d9";
      case "Pottery":
        return "#c4a574";
      case "History":
        return "#8b7355";
      case "Art":
        return "#d4af37";
      default:
        return "#f59e0b";
    }
  };

  return (
    <group
      position={[
        artifact.position_x || 0,
        artifact.position_y || 1.5,
        artifact.position_z || 0,
      ]}
    >
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color={hovered ? "#f59e0b" : "#14b8a6"}
          transparent
          opacity={hovered ? 0.3 : 0.15}
        />
      </mesh>

      {/* Main artifact representation */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(artifact)}
      >
        {getArtifactGeometry()}
        <meshStandardMaterial
          color={getArtifactColor()}
          metalness={0.3}
          roughness={0.4}
          emissive={hovered ? "#f59e0b" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Pedestal */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Label on hover */}
      {hovered && (
        <Html position={[0, 1, 0]} center>
          <div className="bg-background/90 backdrop-blur-sm border border-primary/30 rounded-lg px-4 py-2 pointer-events-none">
            <p className="text-primary font-display text-sm font-semibold whitespace-nowrap">
              {artifact.name}
            </p>
            <p className="text-muted-foreground text-xs">{artifact.era}</p>
          </div>
        </Html>
      )}
    </group>
  );
};

import { useRef } from "react";
import * as THREE from "three";

export const MuseumRoom = () => {
  const floorRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* Floor */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Floor pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#16213e"
          metalness={0.2}
          roughness={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f0f23" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Walls */}
      {/* Back wall */}
      <mesh position={[0, 3, -10]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Front wall */}
      <mesh position={[0, 3, 10]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#1e3a5a" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Right wall */}
      <mesh position={[10, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#1e3a5a" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Decorative columns */}
      {[[-8, -8], [-8, 8], [8, -8], [8, 8], [-4, -8], [4, -8], [-4, 8], [4, 8]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Column base */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.5, 0.6, 0.4, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Column shaft */}
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.35, 0.4, 5.2, 16]} />
            <meshStandardMaterial color="#e8e4d9" metalness={0.1} roughness={0.6} />
          </mesh>
          {/* Column capital */}
          <mesh position={[0, 5.8, 0]}>
            <cylinderGeometry args={[0.6, 0.4, 0.4, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Wall decorative frames */}
      {[[-6, -9.9], [-2, -9.9], [2, -9.9], [6, -9.9]].map(([x, z], i) => (
        <mesh key={i} position={[x, 2.5, z]}>
          <boxGeometry args={[2, 2.5, 0.1]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.2} />
        </mesh>
      ))}

      {/* Ambient museum lighting from ceiling */}
      {[[-4, -4], [4, -4], [-4, 4], [4, 4], [0, 0]].map(([x, z], i) => (
        <group key={i} position={[x, 5.9, z]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
          </mesh>
          <pointLight color="#fef3c7" intensity={0.5} distance={8} decay={2} />
        </group>
      ))}
    </group>
  );
};

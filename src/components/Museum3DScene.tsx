import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function FloatingArtifact({ position, color, scale = 1, speed = 1 }: { position: [number, number, number]; color: string; scale?: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.005 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Column({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, -2.5, 0]}>
        <boxGeometry args={[1.2, 0.5, 1.2]} />
        <meshStandardMaterial color="#1a2744" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Column body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 5, 16]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Capital */}
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[1, 0.4, 1]} />
        <meshStandardMaterial color="#1a2744" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

function GoldenOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 + 1;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 1, 0]}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshStandardMaterial
        color="#f59e0b"
        roughness={0.1}
        metalness={1}
        emissive="#f59e0b"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f59e0b"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#f59e0b"
        castShadow
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#14b8a6" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#f59e0b" />

      {/* Central golden orb */}
      <GoldenOrb />

      {/* Floating artifacts */}
      <FloatingArtifact position={[-3, 2, -2]} color="#14b8a6" scale={0.6} speed={0.8} />
      <FloatingArtifact position={[3.5, 1.5, -1]} color="#f59e0b" scale={0.5} speed={1.2} />
      <FloatingArtifact position={[-2, -1, 2]} color="#14b8a6" scale={0.4} speed={1} />
      <FloatingArtifact position={[2.5, -0.5, 1.5]} color="#f59e0b" scale={0.45} speed={0.9} />

      {/* Columns */}
      <Column position={[-4, 0, -3]} />
      <Column position={[4, 0, -3]} />
      <Column position={[-4, 0, 3]} />
      <Column position={[4, 0, 3]} />

      {/* Particles */}
      <ParticleField />
      <Sparkles count={100} scale={12} size={2} speed={0.3} color="#f59e0b" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </>
  );
}

export function Museum3DScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

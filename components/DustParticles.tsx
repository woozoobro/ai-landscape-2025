"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DustParticlesProps {
  count?: number;
}

export default function DustParticles({ count = 300 }: DustParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions and sizes
  const [positions, sizes, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread across a large area
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Random sizes
      siz[i] = Math.random() * 0.08 + 0.02;

      // Random speeds for floating
      spd[i] = Math.random() * 0.5 + 0.2;
    }

    return [pos, siz, spd];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slow rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;

    // Update individual particle positions for floating effect
    const posAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = posAttr.getY(i);
      const newY = y + Math.sin(state.clock.elapsedTime * speeds[i] + i) * 0.002;
      posAttr.setY(i, newY);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

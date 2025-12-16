"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Company } from "@/app/data/events";

// Color palette
export const COLORS: Record<Company, string> = {
  Anthropic: "#d97757",
  OpenAI: "#10a37f",
  Google: "#4285f4",
};

// Size based on importance (1-5)
function getSize(importance: number): number {
  const baseSize = 0.35;
  const scale = [0.7, 0.85, 1.0, 1.3, 1.7]; // importance 1-5
  return baseSize * scale[importance - 1];
}

interface CompanyNodeProps {
  company: Company;
  importance: number;
  hovered: boolean;
  selected: boolean;
}

export default function CompanyNode({
  company,
  importance,
  hovered,
  selected,
}: CompanyNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const size = getSize(importance);
  const color = COLORS[company];

  // Rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle idle rotation
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.001;

      // Faster rotation when selected
      if (selected) {
        meshRef.current.rotation.y += 0.015;
      }

      // Scale animation
      const targetScale = selected ? 1.6 : hovered ? 1.3 : 1.0;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  // Geometry based on company
  const geometry = useMemo(() => {
    switch (company) {
      case "Anthropic":
        // Dodecahedron - multi-faceted expertise
        return <dodecahedronGeometry args={[size, 0]} />;
      case "OpenAI":
        // TorusKnot - interconnected, flowing conversation
        return <torusKnotGeometry args={[size * 0.55, 0.12, 64, 8, 2, 3]} />;
      case "Google":
        // Octahedron - diamond shape, solid infrastructure
        return <octahedronGeometry args={[size]} />;
      default:
        return <sphereGeometry args={[size, 32, 32]} />;
    }
  }, [company, size]);

  return (
    <mesh ref={meshRef}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={selected ? 3 : hovered ? 2 : 1}
        roughness={0.15}
        metalness={0.85}
        envMapIntensity={1}
      />
    </mesh>
  );
}

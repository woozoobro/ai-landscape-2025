"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import * as THREE from "three";

// Custom shader for soft radial gradient
const nebulaVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 center = vec2(0.5);
    float dist = distance(vUv, center);

    // Softer falloff
    float alpha = smoothstep(0.5, 0.1, dist) * uOpacity;

    // Subtle noise
    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    alpha *= (0.85 + noise * 0.15);

    gl_FragColor = vec4(uColor, alpha);
  }
`;

// Single nebula cloud - uses Billboard to always face camera
function NebulaCloud({
  position,
  color,
  scale = 1,
  opacity = 0.1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(() => {
    const colorObj = new THREE.Color(color);
    return new THREE.ShaderMaterial({
      vertexShader: nebulaVertexShader,
      fragmentShader: nebulaFragmentShader,
      uniforms: {
        uColor: { value: colorObj },
        uOpacity: { value: opacity },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [color, opacity]);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 0.08) * 0.03 + 1;
      meshRef.current.scale.setScalar(scale * pulse * 20);
    }
  });

  return (
    <Billboard position={position}>
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <primitive object={shaderMaterial} attach="material" />
      </mesh>
    </Billboard>
  );
}

// Company nebula region - multiple clouds surrounding the planet area
function CompanyNebula({
  center,
  color,
}: {
  center: [number, number, number];
  color: string;
}) {
  const [cx, cy, cz] = center;

  return (
    <group>
      {/* Main backdrop - directly behind */}
      <NebulaCloud
        position={[cx, cy, cz - 12]}
        color={color}
        scale={2.2}
        opacity={0.12}
      />

      {/* Upper layer */}
      <NebulaCloud
        position={[cx - 3, cy + 8, cz - 8]}
        color={color}
        scale={1.5}
        opacity={0.08}
      />

      {/* Lower layer */}
      <NebulaCloud
        position={[cx + 4, cy - 6, cz - 10]}
        color={color}
        scale={1.3}
        opacity={0.07}
      />

      {/* Side wisps - left */}
      <NebulaCloud
        position={[cx - 10, cy, cz - 5]}
        color={color}
        scale={1.0}
        opacity={0.06}
      />

      {/* Side wisps - right */}
      <NebulaCloud
        position={[cx + 10, cy + 2, cz - 6]}
        color={color}
        scale={1.1}
        opacity={0.06}
      />

      {/* Front subtle glow */}
      <NebulaCloud
        position={[cx, cy - 2, cz + 5]}
        color={color}
        scale={0.8}
        opacity={0.04}
      />
    </group>
  );
}

// Planet positions (must match SpaceGraph.tsx)
const PLANET_POSITIONS = {
  Anthropic: [-22, 0, 0] as [number, number, number],
  OpenAI: [22, 0, 0] as [number, number, number],
  Google: [0, 5, -25] as [number, number, number],
};

const COLORS = {
  Anthropic: "#d97757",
  OpenAI: "#10a37f",
  Google: "#4285f4",
};

export default function Nebula() {
  return (
    <group>
      {/* Anthropic region */}
      <CompanyNebula center={PLANET_POSITIONS.Anthropic} color={COLORS.Anthropic} />

      {/* OpenAI region */}
      <CompanyNebula center={PLANET_POSITIONS.OpenAI} color={COLORS.OpenAI} />

      {/* Google region */}
      <CompanyNebula center={PLANET_POSITIONS.Google} color={COLORS.Google} />
    </group>
  );
}

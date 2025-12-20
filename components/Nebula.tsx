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
  revealed,
  delay,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  opacity?: number;
  revealed: boolean;
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTimeRef = useRef<number | null>(null);

  const shaderMaterial = useMemo(() => {
    const colorObj = new THREE.Color(color);
    return new THREE.ShaderMaterial({
      vertexShader: nebulaVertexShader,
      fragmentShader: nebulaFragmentShader,
      uniforms: {
        uColor: { value: colorObj },
        uOpacity: { value: 0 }, // Start at 0
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [color]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Ink spreading animation - scale + opacity together
    let scaleMultiplier = 0;

    if (revealed && shaderMaterial) {
      if (startTimeRef.current === null) {
        startTimeRef.current = state.clock.elapsedTime + delay;
      }

      const elapsed = state.clock.elapsedTime - startTimeRef.current;
      if (elapsed > 0) {
        const duration = 2.0; // Slower, more elegant fade
        const progress = Math.min(elapsed / duration, 1);

        // Smooth ease-out for both scale and opacity
        const eased = 1 - Math.pow(1 - progress, 4); // Quartic ease-out

        // Scale: 0.3 → 1.0 (ink spreading effect)
        scaleMultiplier = 0.3 + 0.7 * eased;

        // Opacity: fade in
        shaderMaterial.uniforms.uOpacity.value = opacity * eased;
      }
    }

    // Apply scale with pulse animation (only after reveal starts)
    const pulse = Math.sin(state.clock.elapsedTime * 0.08) * 0.03 + 1;
    meshRef.current.scale.setScalar(scale * pulse * 20 * scaleMultiplier);
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

// Golden angle for even spherical distribution
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// Seeded random for consistent positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Depth compensation multipliers for each company
// Google is at z=-25 (further back), so we scale it up to look equal
const DEPTH_COMPENSATION: Record<string, { scale: number; opacity: number; radius: number }> = {
  Anthropic: { scale: 1.0, opacity: 1.0, radius: 1.0 },
  OpenAI: { scale: 1.0, opacity: 1.0, radius: 1.0 },
  Google: { scale: 1.2, opacity: 1.2, radius: 1.3 },  // Slightly bigger for depth, but not too much
};

// Company nebula region - spherical distribution around the planet cluster
function CompanyNebula({
  center,
  color,
  company,
  revealed,
  delay,
}: {
  center: [number, number, number];
  color: string;
  company: string;
  revealed: boolean;
  delay: number;
}) {
  const [cx, cy, cz] = center;
  const compensation = DEPTH_COMPENSATION[company] || { scale: 1, opacity: 1, radius: 1 };

  // Configuration for spherical nebula
  const NEBULA_CONFIG = {
    cloudCount: 8,           // Number of clouds per company
    minRadius: 10 * compensation.radius,   // Inner boundary (scaled for depth)
    maxRadius: 16 * compensation.radius,   // Outer boundary (scaled for depth)
    baseScale: 1.2 * compensation.scale,   // Base cloud size (scaled for depth)
    scaleVariation: 0.6,     // Random size variation
    baseOpacity: 0.04 * compensation.opacity,  // Base opacity (scaled for depth) - more subtle
    opacityVariation: 0.025,  // Random opacity variation - reduced
  };

  // Generate spherical positions using Fibonacci distribution
  const clouds = useMemo(() => {
    const result: Array<{
      position: [number, number, number];
      scale: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < NEBULA_CONFIG.cloudCount; i++) {
      // Fibonacci sphere distribution
      const y = 1 - (i / (NEBULA_CONFIG.cloudCount - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = GOLDEN_ANGLE * i;

      // Random radius within bounds
      const seed = i * 137.5;
      const radiusRandom = seededRandom(seed);
      const radius = NEBULA_CONFIG.minRadius +
        (NEBULA_CONFIG.maxRadius - NEBULA_CONFIG.minRadius) * radiusRandom;

      // Position in spherical coordinates
      const x = cx + Math.cos(theta) * radiusAtY * radius;
      const posY = cy + y * radius * 0.6; // Slightly flattened vertically
      const z = cz + Math.sin(theta) * radiusAtY * radius;

      // Random scale and opacity for natural variation
      const scaleRandom = seededRandom(seed + 50);
      const opacityRandom = seededRandom(seed + 100);

      const scale = NEBULA_CONFIG.baseScale +
        NEBULA_CONFIG.scaleVariation * scaleRandom;
      const opacity = NEBULA_CONFIG.baseOpacity +
        NEBULA_CONFIG.opacityVariation * opacityRandom;

      result.push({
        position: [x, posY, z] as [number, number, number],
        scale,
        opacity,
      });
    }

    return result;
  }, [cx, cy, cz, compensation.radius, compensation.scale, compensation.opacity]);

  return (
    <group>
      {clouds.map((cloud, i) => (
        <NebulaCloud
          key={i}
          position={cloud.position}
          color={color}
          scale={cloud.scale}
          opacity={cloud.opacity}
          revealed={revealed}
          delay={delay}
        />
      ))}
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

export default function Nebula({ introComplete }: { introComplete: boolean }) {
  return (
    <group>
      {/* Anthropic region */}
      <CompanyNebula
        center={PLANET_POSITIONS.Anthropic}
        color={COLORS.Anthropic}
        company="Anthropic"
        revealed={introComplete}
        delay={0}
      />

      {/* OpenAI region */}
      <CompanyNebula
        center={PLANET_POSITIONS.OpenAI}
        color={COLORS.OpenAI}
        company="OpenAI"
        revealed={introComplete}
        delay={0.3}
      />

      {/* Google region */}
      <CompanyNebula
        center={PLANET_POSITIONS.Google}
        color={COLORS.Google}
        company="Google"
        revealed={introComplete}
        delay={0.6}
      />
    </group>
  );
}

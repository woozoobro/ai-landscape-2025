"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
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
    // Distance from center (0.5, 0.5)
    vec2 center = vec2(0.5);
    float dist = distance(vUv, center);

    // Soft radial falloff (stronger at center, fades to edges)
    float alpha = smoothstep(0.5, 0.0, dist) * uOpacity;

    // Add some noise-like variation
    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    alpha *= (0.8 + noise * 0.2);

    gl_FragColor = vec4(uColor, alpha);
  }
`;

// Soft nebula cloud using custom shader
function NebulaCloud({
  position,
  color,
  scale = 1,
  opacity = 0.15,
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
      // Very slow pulsing
      const pulse = Math.sin(state.clock.elapsedTime * 0.1) * 0.05 + 1;
      meshRef.current.scale.setScalar(scale * pulse * 25);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}

// Planet positions for reference
// Anthropic: [-18, 0, 5]
// OpenAI: [18, 0, 5]
// Google: [0, 0, -20]

export default function Nebula() {
  return (
    <group>
      {/* Anthropic region - orange (behind Anthropic planet) */}
      <NebulaCloud
        position={[-18, 0, -8]}
        color="#d97757"
        scale={1.8}
        opacity={0.15}
      />

      {/* OpenAI region - green (behind OpenAI planet) */}
      <NebulaCloud
        position={[18, 0, -8]}
        color="#10a37f"
        scale={1.8}
        opacity={0.15}
      />

      {/* Google region - blue (behind Google planet) */}
      <NebulaCloud
        position={[0, 0, -35]}
        color="#4285f4"
        scale={1.8}
        opacity={0.15}
      />
    </group>
  );
}

"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ===========================================
// GPU-BASED DUST PARTICLE SHADER
// All animation computed on GPU for performance
// ===========================================

const dustVertexShader = `
  uniform float uTime;
  attribute float aSpeed;
  attribute float aPhase;
  attribute float aSize;

  varying float vOpacity;

  void main() {
    vec3 pos = position;

    // GPU-based floating animation
    pos.y += sin(uTime * aSpeed + aPhase) * 0.3;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Size attenuation (smaller when far)
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 10.0);

    gl_Position = projectionMatrix * mvPosition;

    // Fade out at distance
    float dist = length(mvPosition.xyz);
    vOpacity = smoothstep(100.0, 20.0, dist);
  }
`;

const dustFragmentShader = `
  uniform float uOpacity;
  varying float vOpacity;

  void main() {
    // Circular point shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;

    // Soft edge
    float alpha = smoothstep(0.5, 0.2, dist) * uOpacity * vOpacity;

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`;

interface DustParticlesProps {
  count?: number;
}

export default function DustParticles({ count = 300 }: DustParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle attributes (only once)
  const { positions, speeds, phases, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const pha = new Float32Array(count);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread across a large area
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Animation parameters
      spd[i] = Math.random() * 0.5 + 0.2;
      pha[i] = Math.random() * Math.PI * 2;
      siz[i] = Math.random() * 2 + 0.5;
    }

    return { positions: pos, speeds: spd, phases: pha, sizes: siz };
  }, [count]);

  // Create shader material (only once)
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.25 },
      },
      vertexShader: dustVertexShader,
      fragmentShader: dustFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Only update time uniform per frame (O(1) instead of O(n))
  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slow rotation (very cheap)
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;

    // Update time uniform for GPU animation
    shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[phases, 1]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}

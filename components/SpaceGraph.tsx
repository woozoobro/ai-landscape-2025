"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { events, EventNode, Company } from "@/app/data/events";
import Nebula from "./Nebula";
import DustParticles from "./DustParticles";

// Color palette
const COLORS: Record<Company, string> = {
  Anthropic: "#d97757",
  OpenAI: "#10a37f",
  Google: "#4285f4",
};

// Planet positions (triangle formation) - spread out more
const PLANET_POSITIONS: Record<Company, [number, number, number]> = {
  Anthropic: [-22, 0, 0],
  OpenAI: [22, 0, 0],
  Google: [0, 5, -25],
};

const PLANET_RADIUS = 2.5;
const CLUSTER_RADIUS = 12; // Radius of the node cluster around each planet

// Depth compensation - Google is at z=-25, scale up to look equal
const DEPTH_SCALE: Record<Company, number> = {
  Anthropic: 1.0,
  OpenAI: 1.0,
  Google: 1.35,  // Scale up to compensate for distance
};

// Golden angle for Fibonacci sphere distribution
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// ===========================================
// FLOATING ANIMATION CONFIG
// Subtle up/down bobbing for all nodes
// ===========================================
const FLOATING_CONFIG = {
  amplitude: 0.15,      // Vertical movement range
  baseSpeed: 0.5,       // Base oscillation speed
  speedVariation: 0.3,  // Random speed variation per node
};

// ===========================================
// PULSE ANIMATION CONFIG
// Glow pulse for importance 5 nodes only
// ===========================================
const PULSE_CONFIG = {
  speed: 1.2,             // Pulse speed
  minEmissive: 0.8,       // Minimum emissive intensity
  maxEmissive: 2.5,       // Maximum emissive intensity
  minGlowOpacity: 0.08,   // Minimum glow opacity
  maxGlowOpacity: 0.25,   // Maximum glow opacity
};

// Seeded random for consistent positions
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

// Simple force simulation to prevent overlap
function simulateForces(
  positions: Array<{ id: string; pos: [number, number, number]; company: Company }>,
  iterations: number = 30
): Map<string, [number, number, number]> {
  const result = positions.map((p) => ({
    ...p,
    pos: [...p.pos] as [number, number, number],
  }));

  const minDistance = 2.2;

  for (let iter = 0; iter < iterations; iter++) {
    // Repulsion between nodes
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        const dx = result[j].pos[0] - result[i].pos[0];
        const dy = result[j].pos[1] - result[i].pos[1];
        const dz = result[j].pos[2] - result[i].pos[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < minDistance && dist > 0.01) {
          const force = ((minDistance - dist) / dist) * 0.3;
          result[i].pos[0] -= dx * force;
          result[i].pos[1] -= dy * force;
          result[i].pos[2] -= dz * force;
          result[j].pos[0] += dx * force;
          result[j].pos[1] += dy * force;
          result[j].pos[2] += dz * force;
        }
      }
    }

    // Attraction to cluster center (but not too close)
    for (let i = 0; i < result.length; i++) {
      const planetPos = PLANET_POSITIONS[result[i].company];
      const depthScale = DEPTH_SCALE[result[i].company];
      const dx = result[i].pos[0] - planetPos[0];
      const dy = result[i].pos[1] - planetPos[1];
      const dz = result[i].pos[2] - planetPos[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // Keep within cluster bounds (scaled for depth compensation)
      const maxDist = (CLUSTER_RADIUS + 3) * depthScale;
      const minDist = (PLANET_RADIUS + 2) * depthScale;

      if (dist > maxDist) {
        const scale = 0.1;
        result[i].pos[0] -= dx * scale;
        result[i].pos[1] -= dy * scale;
        result[i].pos[2] -= dz * scale;
      } else if (dist < minDist) {
        const scale = 0.1;
        result[i].pos[0] += dx * scale;
        result[i].pos[1] += dy * scale;
        result[i].pos[2] += dz * scale;
      }
    }
  }

  const map = new Map<string, [number, number, number]>();
  result.forEach((r) => map.set(r.id, r.pos));
  return map;
}

interface SpaceGraphProps {
  onNodeSelect: (node: EventNode | null) => void;
  onNodeHover: (node: EventNode | null) => void;
  selectedNode: EventNode | null;
  introComplete: boolean;
}

// Easing function for bounce effect
function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

// Planet component - large sphere representing each company (center of cluster)
function Planet({
  company,
  revealed,
  delay,
}: {
  company: Company;
  revealed: boolean;
  delay: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const position = PLANET_POSITIONS[company];
  const color = COLORS[company];
  const depthScale = DEPTH_SCALE[company];
  const scaledRadius = PLANET_RADIUS * depthScale;

  const [currentScale, setCurrentScale] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }

    if (!groupRef.current) return;

    // Reveal animation with bounce
    if (revealed) {
      if (startTimeRef.current === null) {
        startTimeRef.current = state.clock.elapsedTime + delay;
      }

      const elapsed = state.clock.elapsedTime - startTimeRef.current;
      if (elapsed > 0) {
        const duration = 0.8; // Animation duration in seconds
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutBack(progress);
        setAnimationProgress(progress);
        setCurrentScale(easedProgress);
      }
    }

    groupRef.current.scale.setScalar(currentScale);
  });

  // Don't render label until animation is mostly complete
  const showLabel = animationProgress > 0.7;

  return (
    <group ref={groupRef} position={position}>
      {/* Planet body - smaller, acts as cluster center */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[scaledRadius, 64, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.4}
          metalness={0.4}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[scaledRadius * 1.2, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[scaledRadius * 1.5, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planet label */}
      {showLabel && (
        <Html position={[0, scaledRadius + 1.2, 0]} center zIndexRange={[1000, 0]}>
          <div
            className="text-white text-xs font-bold tracking-widest uppercase pointer-events-none select-none px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{
              backgroundColor: `${color}40`,
              border: `1px solid ${color}60`,
              textShadow: `0 0 8px ${color}`,
            }}
          >
            {company}
          </div>
        </Html>
      )}
    </group>
  );
}

// Node component - Obsidian-style graph node
function GraphNode({
  event,
  position,
  onSelect,
  onHover,
  selected,
  revealed,
}: {
  event: EventNode;
  position: [number, number, number];
  onSelect: (e: EventNode) => void;
  onHover: (e: EventNode | null) => void;
  selected: boolean;
  revealed: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [currentScale, setCurrentScale] = useState(0);
  const color = COLORS[event.company];
  const depthScale = DEPTH_SCALE[event.company];

  // Calculate per-node floating parameters (consistent based on id)
  const floatSeed = useMemo(() => seededRandom(event.id), [event.id]);
  const floatSpeed = FLOATING_CONFIG.baseSpeed + floatSeed * FLOATING_CONFIG.speedVariation;
  const floatOffset = floatSeed * Math.PI * 2; // Phase offset for variety

  // ===========================================
  // NODE SIZE CONFIGURATION
  // Adjust these values to change node sizes based on importance (1-5)
  // ===========================================
  const NODE_SIZE_CONFIG = {
    baseSize: 0.35,           // Minimum size for importance 1
    sizePerImportance: 0.12,  // Additional size per importance level
    // Result: importance 1 = 0.47, importance 5 = 0.95
  };

  const baseSize = (NODE_SIZE_CONFIG.baseSize + event.importance * NODE_SIZE_CONFIG.sizePerImportance) * depthScale;

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    // Reveal animation
    const targetScale = revealed ? 1 : 0;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.06);
    setCurrentScale(newScale);

    // Hover/select scale
    const interactionScale = selected ? 1.4 : hovered ? 1.2 : 1;
    const finalScale = newScale * interactionScale;
    groupRef.current.scale.setScalar(finalScale);

    // Floating animation (only after reveal is mostly complete)
    if (currentScale > 0.9) {
      const floatY = Math.sin(state.clock.elapsedTime * floatSpeed + floatOffset) * FLOATING_CONFIG.amplitude;
      groupRef.current.position.y = position[1] + floatY;
    }

    // Bring selected node forward (towards camera) for visibility
    const targetZ = selected ? position[2] + 4 : position[2];
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.1
    );

    // Pulse animation for importance 5 nodes
    if (event.importance === 5 && meshRef.current.material && glowRef.current?.material) {
      const pulse = (Math.sin(state.clock.elapsedTime * PULSE_CONFIG.speed) + 1) / 2; // 0-1 range
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;

      // Pulse emissive intensity (unless hovered/selected which has priority)
      if (!hovered && !selected) {
        material.emissiveIntensity = PULSE_CONFIG.minEmissive + pulse * (PULSE_CONFIG.maxEmissive - PULSE_CONFIG.minEmissive);
        glowMaterial.opacity = PULSE_CONFIG.minGlowOpacity + pulse * (PULSE_CONFIG.maxGlowOpacity - PULSE_CONFIG.minGlowOpacity);
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main node sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          setHovered(true);
          onHover(event);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          setHovered(false);
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(event);
        }}
      >
        <sphereGeometry args={[baseSize, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 3 : hovered ? 2 : 0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[baseSize * 1.3, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={selected ? 0.3 : hovered ? 0.2 : 0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Label */}
      {currentScale > 0.5 && (
        <Html
          position={[0, baseSize + 0.8, 0]}
          center
          zIndexRange={[1000, 0]}
          style={{
            opacity: currentScale < 0.9 ? (currentScale - 0.5) * 2.5 : (selected || hovered ? 1 : 0.7),
            transition: "opacity 0.2s",
          }}
        >
          <div
            className="pointer-events-none select-none text-center whitespace-nowrap"
            style={{
              fontSize: "10px",
              color: hovered || selected ? "#fff" : "#aaa",
              textShadow: `0 0 6px ${color}`,
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {event.label.length > 15
              ? event.label.substring(0, 15) + "..."
              : event.label}
          </div>
        </Html>
      )}

    </group>
  );
}

// Calculate initial position using Fibonacci sphere distribution
function getInitialClusterPosition(
  company: Company,
  index: number,
  total: number,
  seed: string
): [number, number, number] {
  const planetPos = PLANET_POSITIONS[company];
  const depthScale = DEPTH_SCALE[company];

  // Fibonacci sphere for even distribution
  const y = 1 - (index / Math.max(total - 1, 1)) * 2;
  const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = GOLDEN_ANGLE * index;

  // Add some randomness for organic feel
  const randomOffset = seededRandom(seed);
  const radius = CLUSTER_RADIUS * depthScale * (0.5 + randomOffset * 0.5);

  return [
    planetPos[0] + Math.cos(theta) * radiusAtY * radius,
    planetPos[1] + y * radius * 0.7, // Flatten vertically
    planetPos[2] + Math.sin(theta) * radiusAtY * radius,
  ];
}

export default function SpaceGraph({
  onNodeSelect,
  onNodeHover,
  selectedNode,
  introComplete,
}: SpaceGraphProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [revealedNodes, setRevealedNodes] = useState<Set<string>>(new Set());
  // Group events by company
  const eventsByCompany = useMemo(() => {
    const grouped: Record<Company, EventNode[]> = {
      Anthropic: [],
      OpenAI: [],
      Google: [],
    };

    events.forEach((event) => {
      grouped[event.company].push(event);
    });

    // Sort by date within each company
    Object.keys(grouped).forEach((company) => {
      grouped[company as Company].sort((a, b) => a.date.localeCompare(b.date));
    });

    return grouped;
  }, []);

  // Calculate positions with force simulation for cluster layout
  const nodesWithPositions = useMemo(() => {
    // First, generate initial positions using Fibonacci sphere
    const initialPositions: Array<{
      id: string;
      pos: [number, number, number];
      company: Company;
    }> = [];

    (Object.keys(eventsByCompany) as Company[]).forEach((company) => {
      const companyEvents = eventsByCompany[company];
      companyEvents.forEach((event, index) => {
        initialPositions.push({
          id: event.id,
          pos: getInitialClusterPosition(
            company,
            index,
            companyEvents.length,
            event.id
          ),
          company,
        });
      });
    });

    // Apply force simulation to prevent overlap
    const simulatedPositions = simulateForces(initialPositions);

    // Map back to events
    const result: Array<{ event: EventNode; position: [number, number, number] }> = [];
    events.forEach((event) => {
      const pos = simulatedPositions.get(event.id);
      if (pos) {
        result.push({ event, position: pos });
      }
    });

    return result;
  }, [eventsByCompany]);

  // Staggered node reveal - starts after planets appear
  useEffect(() => {
    if (!introComplete) return;

    // Wait for planets to finish appearing (3 planets * 0.3s delay + 0.8s animation)
    const planetAnimationTime = 1500;

    const timer = setTimeout(() => {
      const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
      sorted.forEach((node, i) => {
        setTimeout(() => {
          setRevealedNodes((prev) => new Set([...prev, node.id]));
        }, i * 40); // Faster reveal for nodes
      });
    }, planetAnimationTime);

    return () => clearTimeout(timer);
  }, [introComplete]);


  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 30, 30]} intensity={1.5} />
      <pointLight position={[-30, -10, -10]} intensity={0.5} color="#d97757" />
      <pointLight position={[30, -10, -10]} intensity={0.5} color="#10a37f" />
      <pointLight position={[0, -10, -30]} intensity={0.5} color="#4285f4" />

      {/* Background */}
      <Stars
        radius={150}
        depth={80}
        count={4000}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />
      <Nebula introComplete={introComplete} />
      <DustParticles count={200} />

      <group ref={groupRef}>
        {/* Planets - cluster centers with staggered reveal */}
        <Planet company="Anthropic" revealed={introComplete} delay={0} />
        <Planet company="OpenAI" revealed={introComplete} delay={0.3} />
        <Planet company="Google" revealed={introComplete} delay={0.6} />

        {/* Graph Nodes - Obsidian style */}
        {nodesWithPositions.map(({ event, position }) => (
          <GraphNode
            key={event.id}
            event={event}
            position={position}
            onSelect={onNodeSelect}
            onHover={onNodeHover}
            selected={selectedNode?.id === event.id}
            revealed={revealedNodes.has(event.id)}
          />
        ))}
      </group>
    </>
  );
}

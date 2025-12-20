"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
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

// Company logo paths (PNG for GPU texture rendering)
const COMPANY_LOGOS: Record<Company, string> = {
  Anthropic: "/logos/anthropic.png",
  OpenAI: "/logos/openai.png",
  Google: "/logos/google.png",
};

// Logo scale adjustment per company (to make logos visually equal)
const LOGO_SCALE: Record<Company, number> = {
  Anthropic: 0.7,
  OpenAI: 1.3,
  Google: 1.0,
};

// Planet positions (triangle formation) - spread out more
const PLANET_POSITIONS: Record<Company, [number, number, number]> = {
  Anthropic: [-28, 0, 0],
  OpenAI: [28, 0, 0],
  Google: [0, 5, -32],
};

const PLANET_RADIUS = 3.0;
const CLUSTER_RADIUS = 20; // Radius of the node cluster around each planet (increased for spacing)

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

// ===========================================
// TOON SHADING GRADIENT TEXTURE
// Creates a 3-step gradient for cel-shading effect
// ===========================================
function createToonGradientTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 1;
  const ctx = canvas.getContext('2d')!;

  // 3-step gradient: dark | mid | mid | bright
  ctx.fillStyle = '#444';
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = '#999';
  ctx.fillRect(1, 0, 2, 1);
  ctx.fillStyle = '#fff';
  ctx.fillRect(3, 0, 1, 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  return texture;
}

// Singleton gradient texture (created once, shared by all materials)
let toonGradientTexture: THREE.CanvasTexture | null = null;
function getToonGradientTexture(): THREE.CanvasTexture {
  if (!toonGradientTexture) {
    toonGradientTexture = createToonGradientTexture();
  }
  return toonGradientTexture;
}

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

  const minDistance = 2.8; // Increased for more spacing between nodes

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
      const maxDist = (CLUSTER_RADIUS + 5) * depthScale;
      const minDist = (PLANET_RADIUS + 4.5) * depthScale; // Increased for more distance from planet

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

// Logo Sprite component - GPU-rendered texture
function LogoSprite({ company, visible }: { company: Company; visible: boolean }) {
  const texture = useLoader(THREE.TextureLoader, COMPANY_LOGOS[company]);
  const spriteRef = useRef<THREE.Sprite>(null);
  const depthScale = DEPTH_SCALE[company];

  // Calculate aspect ratio from texture
  const aspect = useMemo(() => {
    if (texture.image) {
      return texture.image.width / texture.image.height;
    }
    return 1;
  }, [texture]);

  const logoSize = 3.5 * depthScale * LOGO_SCALE[company];

  useFrame(() => {
    if (spriteRef.current) {
      // Smooth fade in
      const targetOpacity = visible ? 1 : 0;
      const material = spriteRef.current.material as THREE.SpriteMaterial;
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1);
    }
  });

  return (
    <sprite ref={spriteRef} scale={[logoSize * aspect, logoSize, 1]} position={[0, 0, 0.1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0}
        depthTest={false}
      />
    </sprite>
  );
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

  // Performance: useRef instead of useState to avoid re-renders every frame
  const scaleRef = useRef(0);
  const progressRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const [logoVisible, setLogoVisible] = useState(false);
  const wasLogoVisibleRef = useRef(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }

    if (!groupRef.current) return;

    // Reveal animation with bounce - use refs to avoid re-renders
    if (revealed) {
      if (startTimeRef.current === null) {
        startTimeRef.current = state.clock.elapsedTime + delay;
      }

      const elapsed = state.clock.elapsedTime - startTimeRef.current;
      if (elapsed > 0) {
        const duration = 0.8; // Animation duration in seconds
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutBack(progress);
        progressRef.current = progress;
        scaleRef.current = easedProgress;

        // Only trigger re-render when crossing logo visibility threshold
        const shouldShowLogo = progress > 0.7;
        if (shouldShowLogo !== wasLogoVisibleRef.current) {
          wasLogoVisibleRef.current = shouldShowLogo;
          setLogoVisible(shouldShowLogo);
        }
      }
    }

    groupRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Planet body - smaller, acts as cluster center (Toon shading) */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[scaledRadius, 64, 64]} />
        <meshToonMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          gradientMap={getToonGradientTexture()}
        />
      </mesh>

      {/* Toon outline - bright white-ish for visibility */}
      <mesh scale={1.06}>
        <sphereGeometry args={[scaledRadius, 32, 32]} />
        <meshBasicMaterial color="#ffffff" side={THREE.BackSide} transparent opacity={0.8} />
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

      {/* Planet logo - GPU rendered sprite */}
      <LogoSprite company={company} visible={logoVisible} />
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
  // Performance: useRef instead of useState to avoid re-renders every frame
  const scaleRef = useRef(0);
  const [labelVisible, setLabelVisible] = useState(false);
  const wasVisibleRef = useRef(false);
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
    baseSize: 0.18,           // Minimum size for importance 1 (increased)
    sizePerImportance: 0.20,  // Additional size per importance level (increased)
    // Result: importance 1 = 0.57, importance 5 = 1.17
  };

  const baseSize = (NODE_SIZE_CONFIG.baseSize + event.importance * NODE_SIZE_CONFIG.sizePerImportance) * depthScale;

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    // Reveal animation - use ref instead of state to avoid re-renders
    const targetScale = revealed ? 1 : 0;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, 0.06);

    // Hover/select scale
    const interactionScale = selected ? 1.4 : hovered ? 1.2 : 1;
    const finalScale = scaleRef.current * interactionScale;
    groupRef.current.scale.setScalar(finalScale);

    // Floating animation (only after reveal is mostly complete)
    if (scaleRef.current > 0.9) {
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

    // Only trigger re-render when crossing label visibility threshold
    const shouldBeVisible = scaleRef.current > 0.5;
    if (shouldBeVisible !== wasVisibleRef.current) {
      wasVisibleRef.current = shouldBeVisible;
      setLabelVisible(shouldBeVisible);
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
        <meshToonMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 3 : hovered ? 2.2 : 1.0}
          gradientMap={getToonGradientTexture()}
        />
      </mesh>

      {/* Toon outline - bright white for visibility */}
      <mesh scale={1.18}>
        <sphereGeometry args={[baseSize, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          side={THREE.BackSide}
          transparent
          opacity={0.7}
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

      {/* Label - render when visible, opacity controlled by CSS transition */}
      {labelVisible && (
        <Html
          position={[0, baseSize + 0.8, 0]}
          center
          zIndexRange={[1000, 0]}
          style={{
            opacity: selected || hovered ? 1 : 0.7,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <div
            className="pointer-events-none select-none text-center whitespace-nowrap"
            style={{
              fontSize: "14px",
              color: hovered || selected ? "#fff" : "#aaa",
              textShadow: `0 0 6px ${color}`,
              maxWidth: "160px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {event.label}
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

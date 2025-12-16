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

// Planet positions (triangle formation)
const PLANET_POSITIONS: Record<Company, [number, number, number]> = {
  Anthropic: [-18, 0, 5],
  OpenAI: [18, 0, 5],
  Google: [0, 0, -20],
};

const PLANET_RADIUS = 3;
const ORBIT_BASE_RADIUS = 6;

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

interface SpaceGraphProps {
  onNodeSelect: (node: EventNode | null) => void;
  selectedNode: EventNode | null;
}

// Planet component - large sphere representing each company
function Planet({ company }: { company: Company }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const position = PLANET_POSITIONS[company];
  const color = COLORS[company];

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={position}>
      {/* Planet body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[PLANET_RADIUS, 64, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[PLANET_RADIUS * 1.15, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planet label */}
      <Html position={[0, PLANET_RADIUS + 1.5, 0]} center>
        <div
          className="text-white text-sm font-bold tracking-widest uppercase pointer-events-none select-none px-3 py-1 rounded-full"
          style={{
            backgroundColor: `${color}30`,
            borderColor: `${color}50`,
            borderWidth: 1,
            textShadow: `0 0 10px ${color}`,
          }}
        >
          {company}
        </div>
      </Html>
    </group>
  );
}

// Satellite component - small sphere representing each event
function Satellite({
  event,
  position,
  onSelect,
  selected,
  revealed,
}: {
  event: EventNode;
  position: [number, number, number];
  onSelect: (e: EventNode) => void;
  selected: boolean;
  revealed: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(0);

  // Size based on importance
  const size = 0.25 + event.importance * 0.12;
  const color = COLORS[event.company];

  // Animation offset
  const timeOffset = useMemo(() => seededRandom(event.id) * 100, [event.id]);

  useFrame((state) => {
    if (meshRef.current) {
      // Reveal animation
      const targetScale = revealed ? 1 : 0;
      const newScale = THREE.MathUtils.lerp(scale, targetScale, 0.08);
      setScale(newScale);
      meshRef.current.scale.setScalar(newScale);

      // Gentle floating
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8 + timeOffset) * 0.15;

      // Scale on hover/select
      const hoverScale = selected ? 1.5 : hovered ? 1.3 : 1;
      meshRef.current.scale.multiplyScalar(hoverScale);
    }
  });

  return (
    <group position={[position[0], position[1], position[2]]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          setHovered(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          setHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(event);
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 2.5 : hovered ? 1.8 : 1}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Hover tooltip */}
      {hovered && !selected && (
        <Html distanceFactor={15} position={[0, size + 0.5, 0]} center>
          <div className="bg-black/90 text-white px-3 py-2 rounded-lg border border-white/20 text-xs w-44 backdrop-blur-md shadow-xl pointer-events-none select-none">
            <div className="font-bold text-sm mb-0.5">{event.label}</div>
            <div className="text-zinc-500 text-[10px]">{event.date}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Calculate satellite position around planet
function getSatellitePosition(
  company: Company,
  month: number,
  indexInMonth: number,
  totalInMonth: number
): [number, number, number] {
  const planetPos = PLANET_POSITIONS[company];

  // Distribute around the planet based on month (angle) and index (radius)
  const baseAngle = ((month - 1) / 12) * Math.PI * 2 - Math.PI / 2; // Start from top
  const angleOffset = (indexInMonth / Math.max(totalInMonth, 1)) * 0.5 - 0.25;
  const angle = baseAngle + angleOffset;

  // Vary radius slightly for same-month events
  const radius = ORBIT_BASE_RADIUS + indexInMonth * 0.8;

  // Slight Y offset for depth
  const yOffset = (seededRandom(`${company}-${month}-${indexInMonth}`) - 0.5) * 2;

  return [
    planetPos[0] + Math.cos(angle) * radius,
    planetPos[1] + yOffset,
    planetPos[2] + Math.sin(angle) * radius,
  ];
}

export default function SpaceGraph({
  onNodeSelect,
  selectedNode,
}: SpaceGraphProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  // Group events by company and month for positioning
  const eventsByCompanyMonth = useMemo(() => {
    const grouped: Record<Company, Record<number, EventNode[]>> = {
      Anthropic: {},
      OpenAI: {},
      Google: {},
    };

    events.forEach((event) => {
      const month = parseInt(event.date.split("-")[1]);
      if (!grouped[event.company][month]) {
        grouped[event.company][month] = [];
      }
      grouped[event.company][month].push(event);
    });

    return grouped;
  }, []);

  // Calculate positions for all satellites
  const satellitesWithPositions = useMemo(() => {
    const result: Array<{ event: EventNode; position: [number, number, number] }> = [];

    (Object.keys(eventsByCompanyMonth) as Company[]).forEach((company) => {
      const monthGroups = eventsByCompanyMonth[company];
      Object.entries(monthGroups).forEach(([monthStr, monthEvents]) => {
        const month = parseInt(monthStr);
        monthEvents.forEach((event, index) => {
          result.push({
            event,
            position: getSatellitePosition(
              company,
              month,
              index,
              monthEvents.length
            ),
          });
        });
      });
    });

    return result;
  }, [eventsByCompanyMonth]);

  // Staggered reveal animation
  useEffect(() => {
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
    sorted.forEach((node, i) => {
      setTimeout(() => {
        setRevealed((prev) => new Set([...prev, node.id]));
      }, i * 50 + 500);
    });
  }, []);

  // Very gentle scene rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0001;
    }
  });

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
      <Nebula />
      <DustParticles count={200} />

      <group ref={groupRef}>
        {/* Planets */}
        <Planet company="Anthropic" />
        <Planet company="OpenAI" />
        <Planet company="Google" />

        {/* Satellites */}
        {satellitesWithPositions.map(({ event, position }) => (
          <Satellite
            key={event.id}
            event={event}
            position={position}
            onSelect={onNodeSelect}
            selected={selectedNode?.id === event.id}
            revealed={revealed.has(event.id)}
          />
        ))}
      </group>
    </>
  );
}

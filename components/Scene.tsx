"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect, useCallback } from "react";
import SpaceGraph from "./SpaceGraph";
import TimelineBar from "./TimelineBar";
import { CameraControls, Loader } from "@react-three/drei";
import { EventNode, Company, events } from "@/app/data/events";
import { X } from "lucide-react";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import type { CameraControls as CameraControlsType } from "@react-three/drei";

// Panel width for viewport offset calculation
const PANEL_WIDTH = 450;

// Planet positions for camera targeting
const PLANET_POSITIONS: Record<string, [number, number, number]> = {
  Anthropic: [-30, 0, 1],
  OpenAI: [30, 0, 1],
  Google: [0, 5, -35],
};

// Camera positions
const CAMERA_START = { pos: [0, 80, 180], target: [0, 0, -20] }; // Far away in space
const CAMERA_DEFAULT = { pos: [0, 30, 55], target: [0, 0, -10] }; // Normal view

// Camera controller component that handles zoom transitions
function CameraController({
  selectedNode,
  cameraControlsRef,
  onIntroComplete,
}: {
  selectedNode: EventNode | null;
  cameraControlsRef: React.RefObject<CameraControlsType | null>;
  onIntroComplete: () => void;
}) {
  const { camera, size } = useThree();
  const [introPlayed, setIntroPlayed] = useState(false);
  const currentOffsetRef = useRef(0);
  const targetOffsetRef = useRef(0);

  // Update target offset when selection changes
  useEffect(() => {
    targetOffsetRef.current = selectedNode ? PANEL_WIDTH / 2 : 0;
  }, [selectedNode]);

  // Animate viewport offset smoothly
  useFrame(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const target = targetOffsetRef.current;
    const current = currentOffsetRef.current;

    // Lerp towards target
    if (Math.abs(target - current) > 0.1) {
      currentOffsetRef.current = THREE.MathUtils.lerp(current, target, 0.02);

      perspectiveCamera.setViewOffset(
        size.width,
        size.height,
        currentOffsetRef.current,
        0,
        size.width,
        size.height
      );
      perspectiveCamera.updateProjectionMatrix();
    } else if (current !== target) {
      // Snap to final value
      currentOffsetRef.current = target;
      if (target === 0) {
        perspectiveCamera.clearViewOffset();
      } else {
        perspectiveCamera.setViewOffset(
          size.width,
          size.height,
          target,
          0,
          size.width,
          size.height
        );
      }
      perspectiveCamera.updateProjectionMatrix();
    }
  });

  // Intro animation - zoom in from far away
  useEffect(() => {
    if (!cameraControlsRef.current || introPlayed) return;

    const controls = cameraControlsRef.current;

    // Start from far away
    controls.setLookAt(
      CAMERA_START.pos[0],
      CAMERA_START.pos[1],
      CAMERA_START.pos[2],
      CAMERA_START.target[0],
      CAMERA_START.target[1],
      CAMERA_START.target[2],
      false // No animation - instant
    );

    // Animate to default view after a short delay
    const timer = setTimeout(() => {
      controls.setLookAt(
        CAMERA_DEFAULT.pos[0],
        CAMERA_DEFAULT.pos[1],
        CAMERA_DEFAULT.pos[2],
        CAMERA_DEFAULT.target[0],
        CAMERA_DEFAULT.target[1],
        CAMERA_DEFAULT.target[2],
        true // Animate
      );
      setIntroPlayed(true);

      // Notify parent that intro is complete (for planet/node reveals)
      setTimeout(() => {
        onIntroComplete();
      }, 1500); // After camera animation completes
    }, 500); // Small delay before starting

    return () => clearTimeout(timer);
  }, [cameraControlsRef, introPlayed, onIntroComplete]);

  // Handle node selection (after intro)
  useEffect(() => {
    if (!cameraControlsRef.current || !introPlayed) return;

    const controls = cameraControlsRef.current;

    if (selectedNode) {
      // Use planet position as the focal point (shows whole cluster)
      const planetPos = PLANET_POSITIONS[selectedNode.company];
      if (planetPos) {
        // Per-company camera angles to isolate each planet from others
        // ViewOffset handles panel compensation, this handles hiding other planets
        const cameraOffsets: Record<string, { x: number; y: number; z: number }> = {
          Anthropic: { x: -12, y: 28, z: 35 },  // Camera from above-left → hides Google behind
          OpenAI: { x: 12, y: 28, z: 35 },      // Camera from above-right → hides Google behind
          Google: { x: 0, y: 28, z: 50 },       // Camera from above → hides Anthropic/OpenAI below
        };

        const offset = cameraOffsets[selectedNode.company] || cameraOffsets.Anthropic;

        controls.setLookAt(
          planetPos[0] + offset.x,  // Camera X
          planetPos[1] + offset.y,  // Camera Y
          planetPos[2] + offset.z,  // Camera Z
          planetPos[0],             // Target X: planet center
          planetPos[1],             // Target Y: planet center
          planetPos[2],             // Target Z: planet center
          true
        );
      }
    } else {
      // Reset to default view
      controls.setLookAt(
        CAMERA_DEFAULT.pos[0],
        CAMERA_DEFAULT.pos[1],
        CAMERA_DEFAULT.pos[2],
        CAMERA_DEFAULT.target[0],
        CAMERA_DEFAULT.target[1],
        CAMERA_DEFAULT.target[2],
        true
      );
    }
  }, [selectedNode, cameraControlsRef, introPlayed]);

  return (
    <CameraControls
      ref={cameraControlsRef}
      makeDefault
      minDistance={15}
      maxDistance={120}
      dollySpeed={0.5}
      truckSpeed={0.5}
      smoothTime={0.8} // Smoother camera movement
    />
  );
}

// Color palette for tooltips
const COLORS: Record<string, string> = {
  Anthropic: "#d97757",
  OpenAI: "#10a37f",
  Google: "#4285f4",
};

// Presentation Mode state interface
interface PresentationState {
  active: boolean;
  company: Company | null;
  currentIndex: number;
  sortedEvents: EventNode[];
}

export default function Scene() {
  const [selectedNode, setSelectedNode] = useState<EventNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<EventNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [introComplete, setIntroComplete] = useState(false);
  const cameraControlsRef = useRef<CameraControlsType | null>(null);

  // Presentation Mode state
  const [presentation, setPresentation] = useState<PresentationState>({
    active: false,
    company: null,
    currentIndex: 0,
    sortedEvents: [],
  });

  // Handle node selection
  const handleNodeSelect = useCallback((node: EventNode | null) => {
    setSelectedNode(node);

    // Sync presentation index when clicking a node during presentation mode
    if (presentation.active && node) {
      const nodeIndex = presentation.sortedEvents.findIndex(e => e.id === node.id);
      if (nodeIndex !== -1 && nodeIndex !== presentation.currentIndex) {
        setPresentation(prev => ({ ...prev, currentIndex: nodeIndex }));
      }
    }
  }, [presentation.active, presentation.sortedEvents, presentation.currentIndex]);

  // Enter Presentation Mode for a company
  const enterPresentationMode = useCallback((company: Company) => {
    const sortedEvents = events
      .filter((e) => e.company === company)
      .sort((a, b) => a.date.localeCompare(b.date));

    if (sortedEvents.length === 0) return;

    setPresentation({
      active: true,
      company,
      currentIndex: 0,
      sortedEvents,
    });

    // Auto-select first event
    setSelectedNode(sortedEvents[0]);
  }, []);

  // Exit Presentation Mode
  const exitPresentationMode = useCallback(() => {
    setPresentation({
      active: false,
      company: null,
      currentIndex: 0,
      sortedEvents: [],
    });
    setSelectedNode(null);
  }, []);

  // Navigate to next event
  const goToNextEvent = useCallback(() => {
    if (!presentation.active) return;

    const nextIndex = presentation.currentIndex + 1;
    if (nextIndex >= presentation.sortedEvents.length) return; // Stop at end

    setPresentation((prev) => ({ ...prev, currentIndex: nextIndex }));
    setSelectedNode(presentation.sortedEvents[nextIndex]);
  }, [presentation]);

  // Navigate to previous event
  const goToPrevEvent = useCallback(() => {
    if (!presentation.active) return;

    const prevIndex = presentation.currentIndex - 1;
    if (prevIndex < 0) return; // Stop at start

    setPresentation((prev) => ({ ...prev, currentIndex: prevIndex }));
    setSelectedNode(presentation.sortedEvents[prevIndex]);
  }, [presentation]);

  // Navigate to specific event (for timeline clicks)
  const goToEvent = useCallback((index: number) => {
    if (!presentation.active) return;
    if (index < 0 || index >= presentation.sortedEvents.length) return;

    setPresentation((prev) => ({ ...prev, currentIndex: index }));
    setSelectedNode(presentation.sortedEvents[index]);
  }, [presentation]);

  // Keyboard navigation for Presentation Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!presentation.active) return;

      switch (e.key) {
        case "ArrowRight":
        case " ": // Space
          e.preventDefault();
          goToNextEvent();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrevEvent();
          break;
        case "Escape":
          e.preventDefault();
          exitPresentationMode();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentation.active, goToNextEvent, goToPrevEvent, exitPresentationMode]);

  // Track mouse position for tooltip
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 80, 180], fov: 50 }} // Start far away
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, toneMappingExposure: 1.2 }}
      >
        <color attach="background" args={["#030308"]} />
        <Suspense fallback={null}>
          <SpaceGraph
            onNodeSelect={handleNodeSelect}
            onNodeHover={setHoveredNode}
            onPlanetClick={enterPresentationMode}
            selectedNode={selectedNode}
            introComplete={introComplete}
            presentationMode={presentation.active}
            presentationCompany={presentation.company}
          />
          <CameraController
            selectedNode={selectedNode}
            cameraControlsRef={cameraControlsRef}
            onIntroComplete={() => setIntroComplete(true)}
          />
          <EffectComposer multisampling={0}>
            {/* Core glow - bright parts */}
            <Bloom
              luminanceThreshold={0.6}
              luminanceSmoothing={0.3}
              mipmapBlur
              intensity={1.5}
              radius={0.4}
            />
            {/* Wide glow - atmosphere */}
            <Bloom
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              mipmapBlur
              intensity={0.4}
              radius={0.9}
            />
            {/* Vignette - focus attention */}
            <Vignette eskil={false} offset={0.2} darkness={0.6} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <Loader />

      {/* Hover Tooltip - follows mouse */}
      {hoveredNode && !selectedNode && (
        <div
          className="fixed pointer-events-none"
          style={{
            zIndex: 99999,
            left: mousePos.x + 16,
            top: mousePos.y + 16,
            transform: mousePos.x > window.innerWidth - 280 ? "translateX(-100%)" : undefined,
          }}
        >
          <div
            className="bg-zinc-900/95 backdrop-blur-xl rounded-xl border px-5 py-4 shadow-2xl w-64"
            style={{
              borderColor: `${COLORS[hoveredNode.company]}40`,
              boxShadow: `0 0 30px ${COLORS[hoveredNode.company]}20`,
            }}
          >
            {/* Company badge */}
            <div
              className="text-[10px] font-bold tracking-widest uppercase mb-2"
              style={{ color: COLORS[hoveredNode.company] }}
            >
              {hoveredNode.company}
            </div>

            {/* Title */}
            <h3 className="text-white font-bold text-base leading-tight mb-1">
              {hoveredNode.label}
            </h3>

            {/* Date */}
            <div className="text-zinc-500 text-xs font-mono mb-3">
              {hoveredNode.date}
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
              {hoveredNode.description}
            </p>

            {/* Importance dots */}
            <div className="flex gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      i <= hoveredNode.importance
                        ? COLORS[hoveredNode.company]
                        : "#3f3f46",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail Overlay */}
      {selectedNode && (
        <div className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-zinc-900/95 backdrop-blur-xl border-l border-white/10 p-8 z-[2000] flex flex-col transform transition-transform duration-300">
          <button
            onClick={() => handleNodeSelect(null)}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-zinc-400" />
          </button>

          <div className="mt-20">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border border-white/10
                    ${
                      selectedNode.company === "Anthropic"
                        ? "text-orange-400 bg-orange-400/10"
                        : selectedNode.company === "OpenAI"
                        ? "text-green-400 bg-green-400/10"
                        : "text-blue-400 bg-blue-400/10"
                    }`}
            >
              {selectedNode.company}
            </span>

            <h2 className="text-4xl font-bold text-white mb-2 leading-tight">
              {selectedNode.label}
            </h2>
            <div className="text-zinc-500 font-mono mb-8 text-lg">
              {selectedNode.date}
            </div>

            <p className="text-zinc-300 leading-relaxed text-lg border-l-2 border-white/20 pl-4">
              {selectedNode.description}
            </p>

            {/* Importance indicator */}
            <div className="mt-8 flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-600">
                Importance
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= selectedNode.importance
                        ? selectedNode.company === "Anthropic"
                          ? "bg-orange-400"
                          : selectedNode.company === "OpenAI"
                          ? "bg-green-400"
                          : "bg-blue-400"
                        : "bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Presentation Mode Timeline Bar */}
      {presentation.company && (
        <TimelineBar
          events={presentation.sortedEvents}
          currentIndex={presentation.currentIndex}
          company={presentation.company}
          visible={presentation.active}
          onEventClick={goToEvent}
        />
      )}
    </div>
  );
}

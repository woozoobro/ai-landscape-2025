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

// Planet positions for camera targeting
const PLANET_POSITIONS: Record<string, [number, number, number]> = {
  Anthropic: [-30, 0, 1],
  OpenAI: [30, 0, 1],
  Google: [0, 5, -35],
};

// Camera positions
const CAMERA_START = { pos: [0, 80, 180], target: [0, 0, -20] }; // Far away in space
const CAMERA_DEFAULT = { pos: [0, 30, 55], target: [0, 0, -10] }; // Normal view

// Zoom level type for label visibility optimization
type ZoomLevel = "far" | "mid" | "close";

// Camera controller component that handles zoom transitions
function CameraController({
  selectedNode,
  cameraControlsRef,
  onIntroComplete,
  onZoomLevelChange,
}: {
  selectedNode: EventNode | null;
  cameraControlsRef: React.RefObject<CameraControlsType | null>;
  onIntroComplete: () => void;
  onZoomLevelChange: (level: ZoomLevel) => void;
}) {
  const { camera, size } = useThree();
  const [introPlayed, setIntroPlayed] = useState(false);
  const currentOffsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const lastZoomLevelRef = useRef<ZoomLevel>("mid");

  // Update target offset when selection changes (50% panel = size.width/4 offset)
  useEffect(() => {
    targetOffsetRef.current = selectedNode ? size.width / 4 : 0;
  }, [selectedNode, size.width]);

  // Animate viewport offset smoothly + track zoom level
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

    // Track zoom level for label visibility optimization
    const distance = camera.position.length();
    const newZoomLevel: ZoomLevel = distance > 100 ? "far" : distance > 50 ? "mid" : "close";
    if (newZoomLevel !== lastZoomLevelRef.current) {
      lastZoomLevelRef.current = newZoomLevel;
      onZoomLevelChange(newZoomLevel);
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
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("mid");
  const cameraControlsRef = useRef<CameraControlsType | null>(null);

  // Presentation Mode state
  const [presentation, setPresentation] = useState<PresentationState>({
    active: false,
    company: null,
    currentIndex: 0,
    sortedEvents: [],
  });

  // Handle node selection - auto-enter Presentation Mode
  const handleNodeSelect = useCallback((node: EventNode | null) => {
    if (!node) {
      setSelectedNode(null);
      return;
    }

    setSelectedNode(node);

    // Presentation Mode가 꺼져있거나 다른 회사면 → 새로 진입
    if (!presentation.active || presentation.company !== node.company) {
      const sortedEvents = events
        .filter((e) => e.company === node.company)
        .sort((a, b) => a.date.localeCompare(b.date));

      const nodeIndex = sortedEvents.findIndex(e => e.id === node.id);

      setPresentation({
        active: true,
        company: node.company,
        currentIndex: nodeIndex !== -1 ? nodeIndex : 0,
        sortedEvents,
      });
    } else {
      // 같은 회사 내에서 노드 클릭 → 인덱스만 업데이트
      const nodeIndex = presentation.sortedEvents.findIndex(e => e.id === node.id);
      if (nodeIndex !== -1) {
        setPresentation(prev => ({ ...prev, currentIndex: nodeIndex }));
      }
    }
  }, [presentation.active, presentation.company, presentation.sortedEvents]);

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

  // Preload next media in Presentation Mode
  useEffect(() => {
    if (!presentation.active) return;

    const nextIndex = presentation.currentIndex + 1;
    if (nextIndex >= presentation.sortedEvents.length) return;

    const nextEvent = presentation.sortedEvents[nextIndex];
    if (!nextEvent.media) return;

    // Preload image or video
    if (nextEvent.media.type === "image") {
      const img = new Image();
      img.src = nextEvent.media.src;
    } else {
      const video = document.createElement("video");
      video.preload = "auto";
      video.src = nextEvent.media.src;
    }
  }, [presentation.active, presentation.currentIndex, presentation.sortedEvents]);

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
            zoomLevel={zoomLevel}
          />
          <CameraController
            selectedNode={selectedNode}
            cameraControlsRef={cameraControlsRef}
            onIntroComplete={() => setIntroComplete(true)}
            onZoomLevelChange={setZoomLevel}
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

      {/* Detail Overlay - Slide animation */}
      <div
        className={`absolute top-0 right-0 h-full w-full md:w-1/2 bg-zinc-900/95 backdrop-blur-xl border-l border-white/10 p-8 z-2000 flex flex-col transition-transform duration-2400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          selectedNode ? 'translate-x-0' : 'translate-x-full'
        }`}
        inert={!selectedNode ? true : undefined}
      >
        <button
          onClick={() => {
            handleNodeSelect(null);
            exitPresentationMode();
          }}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-zinc-400" />
        </button>

        {selectedNode && (
          <div className="mt-2 flex flex-col h-full">
            <div>
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
            </div>

            {/* Media 영역 */}
            {selectedNode.media && (
              <div className="mt-8 flex-1 min-h-0">
                {selectedNode.media.type === "image" ? (
                  <img
                    key={selectedNode.id}
                    src={selectedNode.media.src}
                    alt={selectedNode.label}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                ) : (
                  <video
                    key={selectedNode.id}
                    src={selectedNode.media.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-contain rounded-lg"
                  />
                )}
              </div>
            )}

            {/* 하단 출처 링크들 */}
            {selectedNode.sources && selectedNode.sources.length > 0 && (
              <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-3">
                {selectedNode.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
                  >
                    📎 {source.label || new URL(source.url).hostname}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Presentation Mode Timeline Bar - 항상 렌더링, visible로 애니메이션 */}
      <TimelineBar
        events={presentation.sortedEvents}
        currentIndex={presentation.currentIndex}
        company={presentation.company || "Anthropic"}
        visible={presentation.active}
        onEventClick={goToEvent}
      />
    </div>
  );
}

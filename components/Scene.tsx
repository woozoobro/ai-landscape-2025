"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect } from "react";
import SpaceGraph from "./SpaceGraph";
import { CameraControls, Loader } from "@react-three/drei";
import { EventNode, events } from "@/app/data/events";
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
  Anthropic: [-22, 0, 0],
  OpenAI: [22, 0, 0],
  Google: [0, 5, -25],
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
  const [introPlayed, setIntroPlayed] = useState(false);

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
      // Zoom to company cluster when node is selected
      const planetPos = PLANET_POSITIONS[selectedNode.company];
      if (planetPos) {
        controls.setLookAt(
          planetPos[0] + 10,
          planetPos[1] + 15,
          planetPos[2] + 32,
          planetPos[0],
          planetPos[1],
          planetPos[2],
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

export default function Scene() {
  const [selectedNode, setSelectedNode] = useState<EventNode | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const cameraControlsRef = useRef<CameraControlsType | null>(null);

  // Find the related event labels for display
  const getRelatedEventLabel = (id: string): string => {
    const event = events.find((e) => e.id === id);
    return event?.label || id;
  };

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
            onNodeSelect={setSelectedNode}
            selectedNode={selectedNode}
            introComplete={introComplete}
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

      {/* Title Overlay */}
      <div className="absolute top-8 left-8 text-white pointer-events-none select-none z-10">
        <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
          AI LANDSCAPE
        </h1>
        <p className="text-zinc-500 font-mono text-sm mt-2 tracking-widest">
          2025 RETROSPECTIVE
        </p>
      </div>

      {/* Company Legend */}
      <div className="absolute bottom-8 left-8 flex gap-6 z-10 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_8px_#d97757]" />
          <span className="text-xs text-zinc-500 font-mono">Anthropic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_#10a37f]" />
          <span className="text-xs text-zinc-500 font-mono">OpenAI</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_8px_#4285f4]" />
          <span className="text-xs text-zinc-500 font-mono">Google</span>
        </div>
      </div>

      {/* Detail Overlay */}
      {selectedNode && (
        <div className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-zinc-900/60 backdrop-blur-xl border-l border-white/10 p-8 z-20 flex flex-col transform transition-transform duration-300">
          <button
            onClick={() => setSelectedNode(null)}
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

            {/* Related Events */}
            {selectedNode.connections &&
              selectedNode.connections.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xs uppercase tracking-widest text-zinc-600 mb-3">
                    Related Events
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.connections.map((id) => (
                      <button
                        key={id}
                        onClick={() => {
                          const event = events.find((e) => e.id === id);
                          if (event) setSelectedNode(event);
                        }}
                        className="text-xs text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                      >
                        {getRelatedEventLabel(id)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

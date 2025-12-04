"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Layer descriptions for the Transformer model
const layerInfo = {
  embedding: {
    name: "Embedding Layer",
    description: "Converts input tokens into dense vector representations. Each token is mapped to a high-dimensional embedding space.",
    color: "#6B4EFF",
  },
  attention: {
    name: "Self-Attention",
    description: "Computes attention scores between all token pairs, allowing the model to focus on relevant parts of the input sequence.",
    color: "#00FFD1",
  },
  feedforward: {
    name: "Feed-Forward Network",
    description: "Applies non-linear transformations to each token independently, expanding and compressing the representation.",
    color: "#FF4ECD",
  },
  normalization: {
    name: "Layer Normalization",
    description: "Normalizes activations to stabilize training and improve gradient flow through the network.",
    color: "#FFD700",
  },
  output: {
    name: "Output Head",
    description: "Projects the final hidden states to vocabulary logits for next token prediction.",
    color: "#FF6B6B",
  },
};

// Single layer block component
function LayerBlock({
  position,
  size,
  color,
  layerType,
  onHover,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  layerType: keyof typeof layerInfo;
  onHover: (info: typeof layerInfo[keyof typeof layerInfo] | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.05 : 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => {
        setHovered(true);
        onHover(layerInfo[layerType]);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
        transparent
        opacity={hovered ? 0.9 : 0.7}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
}

// Connection lines between layers
function ConnectionLines({ layerPositions }: { layerPositions: [number, number, number][] }) {
  const points = useMemo(() => {
    return layerPositions.map(pos => new THREE.Vector3(...pos));
  }, [layerPositions]);

  return (
    <group>
      {points.slice(0, -1).map((point, i) => (
        <mesh key={i} position={[0, (point.y + points[i + 1].y) / 2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, Math.abs(points[i + 1].y - point.y), 8]} />
          <meshBasicMaterial color="#6B4EFF" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// Animated data flow particles
function DataFlowParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = Math.random() * 8 - 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positionArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Move particles upward
        positionArray[i * 3 + 1] += 0.02;

        // Reset when reaching top
        if (positionArray[i * 3 + 1] > 4) {
          positionArray[i * 3 + 1] = -4;
        }

        // Add wave motion
        positionArray[i * 3] = (Math.random() - 0.5) * 0.5 + Math.sin(state.clock.getElapsedTime() + i) * 0.1;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00FFD1"
        size={0.05}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main transformer visualization
function TransformerModel({ onLayerHover }: { onLayerHover: (info: typeof layerInfo[keyof typeof layerInfo] | null) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  const layers: Array<{
    type: keyof typeof layerInfo;
    position: [number, number, number];
    size: [number, number, number];
  }> = [
      { type: "embedding", position: [0, -3, 0], size: [2, 0.3, 1] },
      { type: "attention", position: [0, -2, 0], size: [2, 0.5, 1] },
      { type: "normalization", position: [0, -1.2, 0], size: [2, 0.2, 1] },
      { type: "feedforward", position: [0, -0.4, 0], size: [2, 0.6, 1] },
      { type: "normalization", position: [0, 0.5, 0], size: [2, 0.2, 1] },
      { type: "attention", position: [0, 1.3, 0], size: [2, 0.5, 1] },
      { type: "normalization", position: [0, 2.1, 0], size: [2, 0.2, 1] },
      { type: "feedforward", position: [0, 2.9, 0], size: [2, 0.6, 1] },
      { type: "output", position: [0, 3.8, 0], size: [2, 0.3, 1] },
    ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, index) => (
        <LayerBlock
          key={index}
          position={layer.position}
          size={layer.size}
          color={layerInfo[layer.type].color}
          layerType={layer.type}
          onHover={onLayerHover}
        />
      ))}
      <ConnectionLines layerPositions={layers.map(l => l.position)} />
      <DataFlowParticles />
    </group>
  );
}

// Scene component
function Scene({ onLayerHover }: { onLayerHover: (info: typeof layerInfo[keyof typeof layerInfo] | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFD1" />

      <TransformerModel onLayerHover={onLayerHover} />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate
        autoRotateSpeed={0.3}
        minDistance={5}
        maxDistance={15}
      />
    </>
  );
}

// Main ModelVisualizer component
export function ModelVisualizer() {
  const [hoveredLayer, setHoveredLayer] = useState<typeof layerInfo[keyof typeof layerInfo] | null>(null);
  const [inputText, setInputText] = useState("Hello, world!");
  const [tokens, setTokens] = useState<string[]>([]);

  // Simple mock tokenization
  const handleTokenize = () => {
    const tokenized = inputText.split(/\s+/).map((word, i) =>
      `<${word}>`
    );
    setTokens(tokenized);
  };

  return (
    <TooltipProvider>
      <div className="w-full h-screen flex flex-col md:flex-row pt-16 overflow-hidden">
        {/* 3D Visualization */}
        <div className="flex-1 relative bg-[var(--bg-dark)] h-full">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <Scene onLayerHover={setHoveredLayer} />
          </Canvas>

          {/* Layer info tooltip overlay */}
          {hoveredLayer && (
            <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm glass rounded-lg p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                {hoveredLayer.name}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {hoveredLayer.description}
              </p>
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div className="w-full md:w-80 bg-[var(--bg-dark-secondary)] border-t md:border-t-0 md:border-l border-[var(--glass-border)] p-6 h-full overflow-y-auto">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
            Model Explorer
          </h2>

          {/* Input section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Input Text
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-24 px-3 py-2 bg-[var(--bg-dark)] border border-[var(--glass-border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-purple)] resize-none"
              placeholder="Enter text to tokenize..."
            />
            <button
              onClick={handleTokenize}
              className="mt-2 w-full btn-primary text-sm"
            >
              Tokenize & Visualize
            </button>
          </div>

          {/* Tokens display */}
          {tokens.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Tokens
              </label>
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] border border-[var(--accent-purple)]/30"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Layer legend */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Layer Legend
            </label>
            <div className="space-y-2">
              {Object.entries(layerInfo).map(([key, info]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: info.color }}
                  />
                  <span className="text-sm text-[var(--text-primary)]">
                    {info.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-[var(--bg-dark)] rounded-lg">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
              Instructions
            </h4>
            <ul className="text-xs text-[var(--text-secondary)] space-y-1">
              <li>• Drag to rotate the model</li>
              <li>• Scroll to zoom in/out</li>
              <li>• Hover on layers for details</li>
              <li>• Enter text to see tokenization</li>
            </ul>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

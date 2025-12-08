"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, OrbitControls, PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

// Particle system component
function ParticleField({ count = 5000, performanceLevel = "high" }: { count?: number; performanceLevel?: string }) {
  const points = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  // Adjust particle count based on performance
  const actualCount = useMemo(() => {
    if (performanceLevel === "low") return Math.min(count, 1000);
    if (performanceLevel === "medium") return Math.min(count, 3000);
    return count;
  }, [count, performanceLevel]);

  // Generate random positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const colors = new Float32Array(actualCount * 3);

    const purple = new THREE.Color("#6B4EFF");
    const cyan = new THREE.Color("#00FFD1");

    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;
      // Spread particles in a sphere
      const radius = Math.random() * 8 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Color gradient
      const mixFactor = Math.random();
      const color = purple.clone().lerp(cyan, mixFactor);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, [actualCount]);

  useFrame((state) => {
    if (!points.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate the entire particle system slowly
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Mouse interaction
    if (mouse && points.current.geometry.attributes.position) {
      const positionArray = points.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < actualCount; i++) {
        const i3 = i * 3;
        const x = positionArray[i3];
        const y = positionArray[i3 + 1];

        // Add subtle floating motion
        positionArray[i3 + 1] = positions[i3 + 1] + Math.sin(time + i * 0.01) * 0.1;

        // Mouse repulsion effect
        const dx = x - mouse.x * viewport.width * 0.5;
        const dy = y - mouse.y * viewport.height * 0.5;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2) {
          const force = (2 - dist) * 0.02;
          positionArray[i3] += dx * force * 0.1;
          positionArray[i3 + 1] += dy * force * 0.1;
        }
      }

      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Animated text component
function AnimatedTitle({ performanceLevel }: { performanceLevel: string }) {
  const textRef = useRef<THREE.Group>(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if font is available
    setFontLoaded(true);
  }, []);

  useFrame((state) => {
    if (!textRef.current) return;
    const time = state.clock.getElapsedTime();
    textRef.current.position.y = Math.sin(time * 0.5) * 0.1;
  });

  if (!fontLoaded || performanceLevel === "low") {
    // Fallback for low performance or while loading
    return null;
  }

  return (
    <Center ref={textRef}>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={0.8}
        height={0.2}
        curveSegments={performanceLevel === "high" ? 12 : 6}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={performanceLevel === "high" ? 5 : 2}
      >
        GARLIC
        <meshStandardMaterial
          color="#6B4EFF"
          emissive="#6B4EFF"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </Center>
  );
}

// Glowing ring effect
function GlowingRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (ring1.current) {
      ring1.current.rotation.x = time * 0.2;
      ring1.current.rotation.y = time * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.x = time * 0.15;
      ring2.current.rotation.z = time * 0.2;
    }
    if (ring3.current) {
      ring3.current.rotation.y = time * 0.25;
      ring3.current.rotation.z = time * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#6B4EFF" transparent opacity={0.8} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00FFD1" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#FF4ECD" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Camera animation component
function CameraAnimation() {
  const { camera } = useThree();

  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 0, 8);

    // Animate camera on load
    gsap.from(camera.position, {
      z: 15,
      duration: 2,
      ease: "power2.out",
    });
  }, [camera]);

  return null;
}

// Scene component
function Scene({ performanceLevel }: { performanceLevel: string }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6B4EFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFD1" />

      <ParticleField count={5000} performanceLevel={performanceLevel} />
      <GlowingRings />
      {/* AnimatedTitle removed to avoid overlap with HTML overlay */}

      <CameraAnimation />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

// Static fallback for non-WebGL browsers
function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-black gradient-text mb-4 animate-pulse-glow">
          GARLIC
        </h1>
        <p className="text-[var(--text-secondary)]">
          Next-generation Large Language Model
        </p>
      </div>
      {/* Static particle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--accent-purple)] animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Main Hero3D component
interface Hero3DProps {
  performanceLevel?: "high" | "medium" | "low";
}

export function Hero3D({ performanceLevel = "high" }: Hero3DProps) {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  if (!webGLSupported || prefersReducedMotion) {
    return (
      <div ref={containerRef} className="relative w-full h-screen bg-[var(--bg-dark)]">
        <StaticFallback />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: performanceLevel === "high",
          powerPreference: performanceLevel === "high" ? "high-performance" : "low-power"
        }}
        dpr={performanceLevel === "high" ? [1, 2] : [1, 1]}
      >
        <Scene performanceLevel={performanceLevel} />
      </Canvas>

      {/* Screen reader accessible content */}
      <div className="sr-only">
        <h1>GARLIC LLM - Next-generation Large Language Model</h1>
        <p>An interactive 3D visualization of the Garlic AI model with animated particles and neural network visualization.</p>
      </div>
    </div>
  );
}

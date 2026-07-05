"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;

      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);

      // Accent color with variation
      const brightness = 0.7 + Math.random() * 0.3;
      colors[i * 3] = 0.8 * brightness; // R
      colors[i * 3 + 1] = 1.0 * brightness; // G
      colors[i * 3 + 2] = 0.0; // B
    }
    return { positions: p, colors };
  }, [count]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle rotation
    ref.current.rotation.y = time * 0.03;
    ref.current.rotation.x = Math.sin(time * 0.02) * 0.1;

    // Mouse influence
    ref.current.rotation.y += mousePos.x * 0.05;
    ref.current.rotation.x += mousePos.y * 0.03;
  });

  return (
    <Points
      ref={ref}
      positions={positions.positions}
      colors={positions.colors}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Floating wireframe geometry
function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.05;
    meshRef.current.rotation.y = time * 0.08;
    meshRef.current.position.y = Math.sin(time * 0.3) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -2]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial
        color="#ccff00"
        wireframe
        transparent
        opacity={0.04}
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={[1, 1.5]} // Responsive pixel ratio for performance
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleField count={2500} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}

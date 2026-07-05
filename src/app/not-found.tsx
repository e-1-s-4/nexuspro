"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { Magnetic } from "@/components/ui/Magnetic";

// Floating particles for 404 background
function GlitchParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 800;

  const positions = useMemo(
    () => new Float32Array(Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 10)),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.04;
    ref.current.rotation.x = Math.sin(time * 0.02) * 0.15;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ccff00"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

// Floating geometric shapes
function FloatingGeometry() {
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      {/* Torus Knot */}
      <mesh position={[-3, 1.5, -2]} rotation={[0.5, 0.3, 0]}>
        <torusKnotGeometry args={[0.6, 0.15, 64, 8, 2, 3]} />
        <meshStandardMaterial color="#ccff00" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Icosahedron */}
      <mesh position={[3, -1, -1.5]}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#ccff00" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Octahedron */}
      <mesh position={[-2, -2, -1]} rotation={[0.3, 0.5, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#ccff00" wireframe transparent opacity={0.07} />
      </mesh>

      {/* Torus */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[2.5, 2, -2]} rotation={[1, 0.5, 0.3]}>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          <meshStandardMaterial color="#ccff00" wireframe transparent opacity={0.05} />
        </mesh>
      </Float>

      {/* Dodecahedron */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[0, 0, -3]} rotation={[0.2, 0.8, 0.4]}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#ccff00" wireframe transparent opacity={0.04} />
        </mesh>
      </Float>
    </Float>
  );
}

// Mouse-tracking light
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!lightRef.current) return;
      lightRef.current.position.x = ((e.clientX / window.innerWidth) - 0.5) * 10;
      lightRef.current.position.y = -((e.clientY / window.innerHeight) - 0.5) * 10;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 5]}
      intensity={2}
      color="#ccff00"
      distance={15}
      decay={2}
    />
  );
}

function Scene404() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <MouseLight />
      <GlitchParticles />
      <FloatingGeometry />
    </Canvas>
  );
}

export default function NotFoundPage() {
  const [glitchText, setGlitchText] = useState("404");

  // Glitch effect
  useEffect(() => {
    const chars = "404";
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const glitched = Array.from({ length: 3 }, () =>
          Math.random() > 0.6 ? String.fromCharCode(33 + Math.floor(Math.random() * 93)) : chars[Math.floor(Math.random() * 3)]
        ).join("");
        setGlitchText(glitched);
      } else {
        setGlitchText("404");
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <Scene404 />
      </div>

      {/* Glitch Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-[1px] bg-accent/10"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              x: [-50, 50, -30, 40, -50],
              opacity: [0, 0.3, 0, 0.2, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-8"
        >
          <h1 className="text-[15vw] md:text-[14rem] font-black tracking-tighter leading-none text-accent select-none">
            {glitchText}
          </h1>
          {/* Ghost text - RGB split */}
          <motion.span
            className="absolute inset-0 text-[15vw] md:text-[14rem] font-black tracking-tighter leading-none text-red-500/15 select-none"
            animate={{ x: [-4, 4, -3, 5, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            {glitchText}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-[15vw] md:text-[14rem] font-black tracking-tighter leading-none text-blue-500/15 select-none"
            animate={{ x: [4, -4, 3, -5, 4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            {glitchText}
          </motion.span>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold uppercase italic tracking-tighter mb-4">
            Page Not Found
          </h2>
          <p className="text-foreground/40 text-lg max-w-md mx-auto mb-12">
            Looks like you ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic>
              <Link
                href="/"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest font-bold border border-accent/40 px-8 py-4 rounded-full hover:bg-accent hover:text-background transition-all duration-300"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Back to Home
              </Link>
            </Magnetic>

            <Magnetic>
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest font-bold border border-muted px-8 py-4 rounded-full hover:border-accent/40 hover:text-accent transition-all duration-300"
              >
                Explore Our Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

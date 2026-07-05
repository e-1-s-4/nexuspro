"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Fragment shader: handles the distortion effect
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse;
    float dist = distance(uv, mouse);
    
    // Ripple distortion
    float ripple = sin(dist * 30.0 - uTime * 8.0) * 0.015;
    float falloff = smoothstep(0.5, 0.0, dist);
    float amount = ripple * falloff * uIntensity;
    
    // RGB shift
    float r = texture2D(uTexture, uv + vec2(amount, amount * 0.5)).r;
    float g = texture2D(uTexture, uv + vec2(amount * 0.8, amount * 0.3)).g;
    float b = texture2D(uTexture, uv + vec2(amount * 0.5, amount * 0.8)).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

// Vertex shader: passes UV coordinates
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function DistortionPlane({
  imageSrc,
  isHovered,
  containerRef,
}: {
  imageSrc: string;
  isHovered: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const intensityRef = useRef(0);
  const timeRef = useRef(0);

  // Load texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(imageSrc, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      setTexture(tex);
    });
  }, [imageSrc]);

  // Track mouse on container
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: 1.0 - (e.clientY - rect.top) / rect.height,
    };
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef, handleMouseMove]);

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    if (!mat.uniforms) return;

    timeRef.current += 0.016;
    mat.uniforms.uTime.value = timeRef.current;

    // Smooth mouse tracking
    const targetIntensity = isHovered ? 1.0 : 0.0;
    intensityRef.current += (targetIntensity - intensityRef.current) * 0.08;
    mat.uniforms.uIntensity.value = intensityRef.current;
    mat.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
  });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture]
  );

  if (!texture) {
    return (
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
    );
  }

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent
      />
    </mesh>
  );
}

interface DistortionImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export function DistortionImage({ src, alt, className }: DistortionImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label={alt}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1], fov: 90, near: 0.1, far: 10 }}
        gl={{ antialias: true, alpha: true }}
      >
        <DistortionPlane
          imageSrc={src}
          isHovered={isHovered}
          containerRef={containerRef}
        />
      </Canvas>
    </div>
  );
}

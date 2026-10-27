"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Box } from "@react-three/drei";
import * as THREE from "three";

function CosmicSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#4c1d95"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2 + Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });

  return (
    <Torus ref={meshRef} args={[radius, 0.02, 16, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </Torus>
  );
}

function FloatingCubes() {
  const cubes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        Math.sin(i * 0.8) * 3,
        Math.cos(i * 0.6) * 2,
        Math.sin(i * 1.2) * 2,
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.15,
      speed: 0.5 + Math.random() * 2,
    }));
  }, []);

  return (
    <>
      {cubes.map((cube, i) => (
        <Float key={i} speed={cube.speed} rotationIntensity={2} floatIntensity={1.5}>
          <Box args={[cube.scale, cube.scale, cube.scale]} position={cube.position}>
            <MeshWobbleMaterial
              color="#06b6d4"
              emissive="#0e7490"
              emissiveIntensity={0.3}
              factor={0.3}
              speed={1}
              transparent
              opacity={0.7}
            />
          </Box>
        </Float>
      ))}
    </>
  );
}

function ParticleField() {
  const points = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
      <pointLight position={[-5, -5, 3]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, 3, -5]} intensity={0.3} color="#06b6d4" />

      <CosmicSphere />
      <OrbitRing radius={2.2} speed={0.3} color="#a855f7" />
      <OrbitRing radius={2.8} speed={-0.2} color="#3b82f6" />
      <OrbitRing radius={3.3} speed={0.15} color="#06b6d4" />
      <FloatingCubes />
      <ParticleField />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function Interactive3D() {
  return (
    <section className="interactive-3d-section" id="explore">
      <div className="interactive-3d-wrapper">
        <div className="interactive-3d-info">
          <p className="section-label">Interactive Experience</p>
          <h2 className="section-title">Built for the<br />next dimension</h2>
          <p className="section-subtitle" style={{ margin: "0 0 0 0", maxWidth: "none" }}>
            Drag, rotate, and explore our technology in real-time 3D. This is
            how we visualize the power of your infrastructure.
          </p>
          <ul className="feature-list">
            <li>
              <span className="check-icon">✓</span>
              <span>Real-time 3D rendering with WebGL acceleration</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span>Interactive orbit controls — drag to explore</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span>Physics-based materials with distortion effects</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span>Dynamic particle systems and floating geometry</span>
            </li>
          </ul>
          <a href="#cta" className="btn-primary" id="explore-cta">
            Start Building →
          </a>
        </div>

        <div className="interactive-3d-canvas">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{ background: "transparent" }}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene />
          </Canvas>
        </div>
      </div>
    </section>
  );
}

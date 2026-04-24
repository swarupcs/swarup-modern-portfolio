'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, MeshDistortMaterial, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function InteractiveShape() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Smoothly rotate the group based on mouse pointer
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        (state.pointer.y * Math.PI) / 4,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        (state.pointer.x * Math.PI) / 4,
        0.1
      );
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <mesh castShadow receiveShadow>
          <torusKnotGeometry args={[1.2, 0.3, 256, 64]} />
          <MeshDistortMaterial
            color="#3b82f6" // Primary blue color
            roughness={0.2}
            metalness={0.8}
            distort={0.3} // Distort amount
            speed={2} // Distort speed
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Floating secondary shapes */}
      <Float speed={2} rotationIntensity={2} floatIntensity={3}>
        <Sphere args={[0.3, 32, 32]} position={[2, 1.5, -1]} castShadow receiveShadow>
          <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={0.8} />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron args={[0.4]} position={[-2.5, -1, 1]} castShadow receiveShadow>
          <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.5} wireframe />
        </Icosahedron>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={4}>
        <mesh position={[1.5, -2, 2]} castShadow receiveShadow>
          <octahedronGeometry args={[0.25]} />
          <meshStandardMaterial color="#10b981" roughness={0.3} metalness={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <>
      <ambientLight intensity={isDark ? 0.2 : 0.5} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 1 : 1.5} color="#ffffff" />
      <spotLight position={[-10, -10, -5]} intensity={isDark ? 0.5 : 1} color="#3b82f6" />
      
      <InteractiveShape />
      
      {/* Dynamic reflections */}
      <Environment preset={isDark ? 'night' : 'city'} />
      
      {/* Soft shadow underneath */}
      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={isDark ? 0.4 : 0.2}
        scale={15}
        blur={2.5}
        far={4}
      />
    </>
  );
}

export default function Hero3D({ eventSource }: { eventSource: React.RefObject<HTMLElement | null> }) {
  return (
    <div className="absolute inset-0 z-0 hidden md:block">
      <div className="w-full h-full opacity-50 dark:opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} eventSource={eventSource as React.RefObject<HTMLElement>}>
          <Scene />
        </Canvas>
      </div>
    </div>
  );
}

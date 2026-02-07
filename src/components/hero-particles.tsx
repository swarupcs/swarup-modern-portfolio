'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Particle component
function Particles({ count = 2000, theme }) {
  const mesh = useRef();
  const light = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // Generate random particles
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  // Colors based on theme
  const particleColor = theme === 'dark' ? '#4f6bff' : '#1a56db';
  const secondaryColor = theme === 'dark' ? '#8c61ff' : '#7c3aed';

  // Update particles on each frame
  useFrame((state) => {
    light.current.position.set(state.mouse.x * 20, state.mouse.y * 20, 0);

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10,
      );
      dummy.scale.set(s * 0.5, s * 0.5, s * 0.5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight
        ref={light}
        distance={60}
        intensity={20}
        color={secondaryColor}
      />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshPhongMaterial color={particleColor} />
      </instancedMesh>
    </>
  );
}

// Main component
export default function HeroParticles() {
  const { theme } = useTheme();
  const currentTheme = theme === 'system' ? 'light' : theme || 'light';

  return (
    <div className='absolute inset-0 -z-10'>
      <Canvas camera={{ position: [0, 0, 20], fov: 75, near: 0.1, far: 1000 }}>
        <color
          attach='background'
          args={[currentTheme === 'dark' ? '#030711' : '#f8fafc']}
        />
        <fog
          attach='fog'
          args={[currentTheme === 'dark' ? '#030711' : '#f8fafc', 20, 40]}
        />
        <Particles theme={currentTheme} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

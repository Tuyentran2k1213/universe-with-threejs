import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Points, Color } from 'three';

export function AdvancedParticles() {
  const points = useRef<Points>(null);
  const particleCount = 5000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const color = new Color();

    for (let i = 0; i < particleCount; i++) {
      // Create spiral galaxy formation
      const radius = THREE.MathUtils.randFloat(5, 15);
      const spinAngle = radius * 0.5;
      const branchAngle = (i % 3) * Math.PI * 2 / 3;

      const x = Math.cos(branchAngle + spinAngle) * radius;
      const y = THREE.MathUtils.randFloatSpread(2);
      const z = Math.sin(branchAngle + spinAngle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Create color gradient based on distance
      const distance = Math.sqrt(x * x + z * z);
      color.setHSL(distance * 0.02, 1, 0.5);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.z = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

export function FloatingIsland() {
  const islandRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.001;
      islandRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={islandRef} position={[0, -1, 0]}>
      <cylinderGeometry args={[2, 1.5, 0.5, 32]} />
      <meshStandardMaterial 
        color="#4a9375"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}
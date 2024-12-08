import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { generateTerrain } from '../utils/terrainGenerator';

export function ComplexIsland() {
  const islandRef = useRef<Mesh>(null);
  const waterRef = useRef<Mesh>(null);
  const terrainGeometry = generateTerrain(64, 1);

  useFrame((state) => {
    if (islandRef.current && waterRef.current) {
      islandRef.current.rotation.y += 0.001;
      const time = state.clock.elapsedTime;
      
      // Animate terrain vertices
      const position = terrainGeometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const y = position.getY(i);
        position.setY(i, y + Math.sin(time + i * 0.1) * 0.002);
      }
      position.needsUpdate = true;

      // Animate water
      waterRef.current.position.y = Math.sin(time * 0.2) * 0.1 - 1;
    }
  });

  return (
    <group>
      <mesh ref={islandRef} position={[0, -1, 0]} castShadow receiveShadow>
        <primitive object={terrainGeometry} />
        <meshStandardMaterial 
          color="#1a472a"
          roughness={0.8}
          metalness={0.2}
          displacementScale={0.2}
        />
      </mesh>
      
      <mesh ref={waterRef} position={[0, -1, 0]}>
        <cylinderGeometry args={[3, 3, 0.1, 64]} />
        <meshPhysicalMaterial 
          color="#0066cc"
          roughness={0}
          metalness={0.5}
          transmission={0.8}
          thickness={0.5}
        />
      </mesh>
    </group>
  );
}
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

export function ProfileCard() {
  const cardRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      cardRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.1 + 0.5;
    }
  });

  return (
    <group>
      <mesh ref={cardRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      <Text
        position={[0, 0.7, 0.1]}
        fontSize={0.2}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        John Doe
      </Text>
      <Text
        position={[0, 0.3, 0.1]}
        fontSize={0.1}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        Full Stack Developer
      </Text>
    </group>
  );
}
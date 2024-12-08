import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';

const skillsList = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 88 },
  { name: 'Three.js', level: 82 },
  { name: 'WebGL', level: 80 }
];

export function Skills() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {skillsList.map((skill, index) => (
        <group key={skill.name} position={[0, -index * 0.3, 0]}>
          <Text
            position={[-0.5, 0, 0]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="left"
          >
            {skill.name}
          </Text>
          <mesh position={[0.5, 0, 0]}>
            <boxGeometry args={[skill.level / 50, 0.1, 0.1]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
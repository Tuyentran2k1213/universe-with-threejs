import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group, Mesh } from 'three';

const technologies = [
  { name: 'React', color: '#61dafb', radius: 3, speed: 0.5, size: 0.4 },
  { name: 'TypeScript', color: '#3178c6', radius: 4, speed: 0.4, size: 0.4 },
  { name: 'Three.js', color: '#ffffff', radius: 5, speed: 0.3, size: 0.4 },
  { name: 'Node.js', color: '#68a063', radius: 6, speed: 0.2, size: 0.4 },
  { name: 'WebGL', color: '#990000', radius: 7, speed: 0.1, size: 0.4 }
];

export function FloatingTechnologies() {
  const groupRef = useRef<Group>(null);
  const techRefs = useRef<Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      technologies.forEach((tech, index) => {
        const mesh = techRefs.current[index];
        if (mesh) {
          const time = state.clock.elapsedTime * tech.speed;
          mesh.position.x = Math.cos(time) * tech.radius;
          mesh.position.z = Math.sin(time) * tech.radius;
          mesh.position.y = Math.sin(time * 2) * 0.5;
          mesh.rotation.y += 0.01;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {technologies.map((tech, index) => (
        <mesh
          key={tech.name}
          ref={(el) => (techRefs.current[index] = el as Mesh)}
          position={[tech.radius, 0, 0]}
        >
          <dodecahedronGeometry args={[tech.size]} />
          <meshPhysicalMaterial
            color={tech.color}
            roughness={0.2}
            metalness={0.8}
            emissive={tech.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
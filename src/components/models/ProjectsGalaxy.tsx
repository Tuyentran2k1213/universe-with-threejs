import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group, Mesh } from 'three';

interface Project {
  name: string;
  color: string;
  orbit: number;
  speed: number;
}

const projects: Project[] = [
  { name: 'E-Commerce Platform', color: '#ff3366', orbit: 4, speed: 0.5 },
  { name: 'AI Chat Application', color: '#33ff99', orbit: 5, speed: 0.4 },
  { name: 'Blockchain Explorer', color: '#3366ff', orbit: 6, speed: 0.3 },
  { name: 'IoT Dashboard', color: '#ff9933', orbit: 7, speed: 0.2 },
];

export function ProjectsGalaxy() {
  const galaxyRef = useRef<Group>(null);
  const projectRefs = useRef<Mesh[]>([]);

  useFrame((state) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.001;
      
      projectRefs.current.forEach((mesh, index) => {
        const project = projects[index];
        const time = state.clock.elapsedTime * project.speed;
        mesh.position.x = Math.cos(time) * project.orbit;
        mesh.position.z = Math.sin(time) * project.orbit;
        mesh.rotation.y += 0.02;
      });
    }
  });

  return (
    <group ref={galaxyRef} position={[0, 0, 0]}>
      {projects.map((project, index) => (
        <mesh
          key={project.name}
          ref={(el) => (projectRefs.current[index] = el as Mesh)}
          position={[project.orbit, 0, 0]}
        >
          <octahedronGeometry args={[0.3]} />
          <meshPhysicalMaterial
            color={project.color}
            roughness={0.2}
            metalness={0.8}
            emissive={project.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
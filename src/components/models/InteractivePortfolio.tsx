import { Text, useTexture, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Mesh, Group } from 'three';
import { Skills } from './Skills';

export function InteractivePortfolio() {
  const groupRef = useRef<Group>(null);
  const [activeSection, setActiveSection] = useState('about');
  const { camera } = useThree();

  const sections = {
    about: {
      title: 'About Me',
      content: 'Senior Full Stack Developer with 8+ years of experience',
      position: [0, 2, 0]
    },
    skills: {
      title: 'Skills',
      content: <Skills />,
      position: [2, 1, 2]
    },
    projects: {
      title: 'Projects',
      content: 'Interactive 3D Portfolio',
      position: [-2, 1, 2]
    }
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const handleSectionClick = (section: string, position: number[]) => {
    setActiveSection(section);
    camera.position.set(position[0] + 3, position[1] + 2, position[2] + 3);
  };

  return (
    <group ref={groupRef}>
      {Object.entries(sections).map(([key, section]) => (
        <group key={key} position={section.position as any}>
          <mesh
            onClick={() => handleSectionClick(key, section.position as number[])}
            onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
            onPointerOut={(e) => (document.body.style.cursor = 'default')}
          >
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial
              color={activeSection === key ? '#00ff88' : '#ffffff'}
              emissive={activeSection === key ? '#00ff88' : '#000000'}
              emissiveIntensity={0.5}
            />
          </mesh>
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.2}
            color={activeSection === key ? '#00ff88' : '#ffffff'}
          >
            {section.title}
          </Text>
          {activeSection === key && (
            <Html position={[0, -0.5, 0]} center>
              <div className="bg-black/80 text-white p-4 rounded-lg">
                {section.content}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}
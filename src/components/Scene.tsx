import { Environment, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ComplexIsland } from './models/ComplexIsland';
import { InteractivePortfolio } from './models/InteractivePortfolio';
import { AdvancedParticles } from './effects/AdvancedParticles';
import { FloatingTechnologies } from './models/FloatingTechnologies';
import { ProjectsGalaxy } from './models/ProjectsGalaxy';
import { PostProcessing } from './effects/PostProcessing';

export function Scene() {
  return (
    <Canvas className="w-full h-full" shadows>
      <PerspectiveCamera makeDefault position={[0, 3, 8]} />
      <OrbitControls 
        enableZoom={true}
        maxDistance={15}
        minDistance={3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
      <Environment preset="sunset" />
      <fog attach="fog" args={['#000000', 5, 20]} />
      
      <Suspense fallback={null}>
        <ComplexIsland />
        <InteractivePortfolio />
        <AdvancedParticles />
        <FloatingTechnologies />
        <ProjectsGalaxy />
        <PostProcessing />
      </Suspense>
    </Canvas>
  );
}
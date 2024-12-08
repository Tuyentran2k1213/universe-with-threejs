import * as THREE from 'three';

export function generateTerrain(resolution: number, height: number) {
  const geometry = new THREE.PlaneGeometry(4, 4, resolution, resolution);
  geometry.rotateX(-Math.PI / 2);

  const position = geometry.attributes.position;
  
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    
    const nx = x / 4 + 0.5;
    const nz = z / 4 + 0.5;
    
    let y = 0;
    
    // Multiple layers of noise for more interesting terrain
    y += noise(nx * 3, nz * 3) * 0.5;
    y += noise(nx * 6, nz * 6) * 0.25;
    y += noise(nx * 12, nz * 12) * 0.125;
    
    position.setY(i, y * height);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
  
  return geometry;
}

// Simple noise function for demonstration
function noise(x: number, z: number): number {
  const nx = Math.sin(x * 2 * Math.PI);
  const nz = Math.sin(z * 2 * Math.PI);
  return (nx + nz) * 0.5;
}
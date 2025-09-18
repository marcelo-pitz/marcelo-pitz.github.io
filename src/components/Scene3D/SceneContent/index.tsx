import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Center } from '@react-three/drei';
import { NavigationPortals } from './NavigationPortals';
import { ParticleSystem3D } from './ParticleSystem3D';
import { SkillsGalaxy } from './SkillsGalaxy';
import { ProjectsShowcase } from './ProjectsShowcase';
import { ContactSphere } from './ContactSphere';
import { useScene } from '../../../context/SceneContext';
import type { Group } from 'three';

export function SceneContent() {
  const groupRef = useRef<Group>(null);
  const { state } = useScene();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Iluminação otimizada - menos luzes */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow={false} // Desabilitar sombras para melhor performance
      />

      {/* Particle system background */}
      <ParticleSystem3D />

      {/* Main title for home section - sem Float para menos cálculos */}
      {state.currentSection === 'home' && (
        <Center position={[0, 3, 0]}>
          <Text
            fontSize={1.2} // Reduzido de 1.5
            color="#667eea"
            anchorX="center"
            anchorY="middle"
          >
            Marcelo Pitz
          </Text>
        </Center>
      )}

      {/* Navigation portals */}
      <NavigationPortals />

      {/* Section-specific content - renderizar condicionalmente */}
      {state.currentSection === 'skills' && <SkillsGalaxy />}
      {state.currentSection === 'projects' && <ProjectsShowcase />}
      {state.currentSection === 'contact' && <ContactSphere />}

      {/* Ground plane simplificado */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color="#1a1a2e" 
          transparent 
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import { useScene } from '../../../../context/SceneContext';
import type { Mesh } from 'three';

const portals = [
  { id: 'home', position: [0, 0, 0] as [number, number, number], label: 'Home', color: '#667eea' },
  { id: 'about', position: [-8, 2, -5] as [number, number, number], label: 'About', color: '#764ba2' },
  { id: 'skills', position: [8, 2, -5] as [number, number, number], label: 'Skills', color: '#f093fb' },
  { id: 'projects', position: [0, 4, -8] as [number, number, number], label: 'Projects', color: '#f5576c' },
  { id: 'contact', position: [0, -2, 5] as [number, number, number], label: 'Contact', color: '#4facfe' },
];

interface PortalProps {
  id: string;
  position: [number, number, number];
  label: string;
  color: string;
  isActive: boolean;
}

function Portal({ position, label, color, isActive, id }: PortalProps) {
  const meshRef = useRef<Mesh>(null);
  const { dispatch } = useScene();

  // Animação mais simples e menos custosa
  const frameCount = useRef(0);
  useFrame((_, delta) => {
    if (meshRef.current) {
      frameCount.current++;
      // Atualizar apenas a cada 3 frames
      if (frameCount.current % 3 === 0) {
        meshRef.current.rotation.y += delta * 0.3; // Reduzido de 0.5
        // Remover rotação Z para menos cálculos
      }
      
      // Escala mais simples
      if (isActive) {
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = () => {
    dispatch({ type: 'SET_CURRENT_SECTION', payload: id });
    dispatch({ type: 'INCREMENT_INTERACTION' });
  };

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[1.8, 1.8, 0.4]}
        radius={0.1}
        smoothness={2}
        onClick={handleClick}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isActive ? 0.9 : 0.7}
        />
      </RoundedBox>
      
      <Text
        position={[0, 0, 0.25]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-depthTest={true}
        material-depthWrite={true}
        renderOrder={1}
      >
        {label}
      </Text>
    </group>
  );
}

export function NavigationPortals() {
  const { state } = useScene();

  return (
    <group>
      {portals.map((portal) => (
        <Portal
          key={portal.id}
          {...portal}
          isActive={state.currentSection === portal.id}
        />
      ))}
    </group>
  );
}
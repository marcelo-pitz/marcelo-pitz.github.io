import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import { useScene } from '../../../../context/SceneContext';
import type { Group } from 'three';

const skills = [
  { name: 'React', level: 9, position: [4, 2, 0] as [number, number, number], color: '#61dafb' },
  { name: 'TypeScript', level: 8, position: [-4, 2, 0] as [number, number, number], color: '#3178c6' },
  { name: 'Three.js', level: 7, position: [0, 4, 2] as [number, number, number], color: '#000000' },
  { name: 'Node.js', level: 8, position: [2, 0, -3] as [number, number, number], color: '#339933' },
  { name: 'Python', level: 7, position: [-2, 0, -3] as [number, number, number], color: '#3776ab' },
  { name: 'GraphQL', level: 6, position: [0, -2, 1] as [number, number, number], color: '#e10098' },
];

interface SkillSphereProps {
  name: string;
  level: number;
  position: [number, number, number];
  color: string;
}

function SkillSphere({ name, level, position, color }: SkillSphereProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { dispatch } = useScene();

  const handleClick = () => {
    dispatch({ type: 'INCREMENT_INTERACTION' });
  };

  const radius = (level / 10) * 1.5 + 0.5;

  return (
    <group position={position}>
      <Sphere
        args={[radius, 32, 32]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={isHovered ? 0.9 : 0.7}
          emissive={color}
          emissiveIntensity={isHovered ? 0.2 : 0.05}
          roughness={0.3}
          metalness={0.1}
        />
      </Sphere>
      
      <Text
        position={[0, -radius - 0.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-depthTest={true}
        material-depthWrite={true}
        renderOrder={1}
      >
        {name}
      </Text>
      
      <Text
        position={[0, -radius - 0.8, 0]}
        fontSize={0.2}
        color="#888"
        anchorX="center"
        anchorY="middle"
        material-depthTest={true}
        material-depthWrite={true}
        renderOrder={1}
      >
        {level}/10
      </Text>
    </group>
  );
}

export function SkillsGalaxy() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill) => (
        <SkillSphere key={skill.name} {...skill} />
      ))}
    </group>
  );
}
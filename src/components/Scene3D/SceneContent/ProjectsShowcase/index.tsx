import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import { useScene } from '../../../../context/SceneContext';
import type { Group } from 'three';

const projects = [
  {
    id: 'project1',
    name: 'Portfolio 3D',
    position: [-3, 1, 0] as [number, number, number],
    color: '#667eea',
    technologies: ['React', 'Three.js', 'TypeScript']
  },
  {
    id: 'project2',
    name: 'E-commerce App',
    position: [3, 1, 0] as [number, number, number],
    color: '#764ba2',
    technologies: ['Next.js', 'GraphQL', 'Prisma']
  },
  {
    id: 'project3',
    name: 'Data Visualization',
    position: [0, -1, -2] as [number, number, number],
    color: '#f093fb',
    technologies: ['D3.js', 'Python', 'FastAPI']
  },
];

interface ProjectCardProps {
  name: string;
  position: [number, number, number];
  color: string;
  technologies: string[];
}

function ProjectCard({ name, position, color, technologies }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { dispatch } = useScene();

  const handleClick = () => {
    dispatch({ type: 'INCREMENT_INTERACTION' });
  };

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <RoundedBox
          args={[3, 2, 0.3]}
          radius={0.1}
          smoothness={4}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <meshStandardMaterial
            color={color}
            transparent
            opacity={isHovered ? 0.9 : 0.7}
            emissive={color}
            emissiveIntensity={isHovered ? 0.3 : 0.1}
            roughness={0.2}
            metalness={0.5}
          />
        </RoundedBox>
        
        <Text
          position={[0, 0.3, 0.21]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
          material-depthTest={true}
          material-depthWrite={true}
          renderOrder={1}
        >
          {name}
        </Text>
        
        <Text
          position={[0, -0.2, 0.21]}
          fontSize={0.2}
          color="#ccc"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
          material-depthTest={true}
          material-depthWrite={true}
          renderOrder={1}
        >
          {technologies.join(' • ')}
        </Text>
      </group>
    </Float>
  );
}

export function ProjectsShowcase() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </group>
  );
}
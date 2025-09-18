import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Ring } from '@react-three/drei';
import { useScene } from '../../../../context/SceneContext';
import type { Group } from 'three';

const contactMethods = [
  { name: 'Email', icon: '📧', color: '#ea4335' },
  { name: 'LinkedIn', icon: '💼', color: '#0077b5' },
  { name: 'GitHub', icon: '🐱', color: '#333' },
  { name: 'Twitter', icon: '🐦', color: '#1da1f2' },
];

export function ContactSphere() {
  const groupRef = useRef<Group>(null);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const { dispatch } = useScene();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const handleContactClick = (contactName: string) => {
    setSelectedContact(contactName);
    dispatch({ type: 'INCREMENT_INTERACTION' });
  };

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#667eea"
          transparent
          opacity={0.6}
          emissive="#667eea"
          emissiveIntensity={0.1}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
      
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-depthTest={true}
        material-depthWrite={true}
        renderOrder={1}
      >
        Get In Touch
      </Text>

      {/* Contact method rings */}
      {contactMethods.map((contact, index) => {
        const angle = (index / contactMethods.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isSelected = selectedContact === contact.name;

        return (
          <group key={contact.name} position={[x, 0, z]}>
            <Ring
              args={[0.8, 1.2, 16]}
              rotation={[-Math.PI / 2, 0, 0]}
              onClick={() => handleContactClick(contact.name)}
            >
              <meshStandardMaterial
                color={contact.color}
                transparent
                opacity={isSelected ? 0.9 : 0.6}
                emissive={contact.color}
                emissiveIntensity={isSelected ? 0.3 : 0.1}
              />
            </Ring>
            
            <Text
              position={[0, 0.5, 0]}
              fontSize={0.8}
              color="white"
              anchorX="center"
              anchorY="middle"
              material-depthTest={true}
              material-depthWrite={true}
              renderOrder={1}
            >
              {contact.icon}
            </Text>
            
            <Text
              position={[0, -0.5, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
              material-depthTest={true}
              material-depthWrite={true}
              renderOrder={1}
            >
              {contact.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}